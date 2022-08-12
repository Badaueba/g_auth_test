import { Prisma } from "@prisma/client";

export class UserQueryDto {
    email?: string;
    name?: string;
    take?: number;
    skip?: number;
    orderBy: 'name' | 'email';
}