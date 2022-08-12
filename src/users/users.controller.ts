import { Controller, Get, Query } from '@nestjs/common';
import { UserQueryDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }
    @Get()
    async users(@Query() args: UserQueryDto) {
        return this.usersService.users({
            skip: args.skip || 0,
            take: args.skip || 10,
            orderBy: {[args.orderBy]: 'asc'},
            where: {
                OR: {
                    email: args.email,
                    name: args.name
                }
            }
        });
    }
}
