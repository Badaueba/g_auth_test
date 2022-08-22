import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { UsersMiddleware } from '../../../prisma/middlewares/users-middleware';
import { UsersService } from '../../../src/users/users.service';
import { PrismaService } from '../../../prisma/prisma.service';

const mockedUser: User = {
  id: 1,
  name: 'TESTE',
  email: 'teste@teste.com',
  provider: 'provider1',
  providerId: '199293929329',
};

describe('users-middleware ', () => {
  let prismaService: PrismaService;
  let usersService: UsersService;
  let usersMiddleware: UsersMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMiddleware, PrismaService, UsersService],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
    usersMiddleware = module.get<UsersMiddleware>(UsersMiddleware);

    await prismaService.onModuleInit();
  });

  it('should user service', async () => {
    const usersServiceSpy = jest
      .spyOn(usersService, 'user')
      .mockResolvedValueOnce(mockedUser);

    await usersService.user({ email: 'teste@teste.com' });

    expect(usersServiceSpy).toBeCalled();
    expect(usersServiceSpy).toBeCalledWith({ email: 'teste@teste.com' });
  });

  it('should run users findUnique middleware', async () => {
    const usersMiddlewareSpy = jest.spyOn(
      usersMiddleware,
      'executeOrganizationsMiddleWares',
    );
    await usersService.user({ email: 'teste@teste.com' });
    expect(usersMiddlewareSpy).toHaveBeenCalled();
  });
});
