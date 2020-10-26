import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUserById(id: number): Promise<User> {
		const user = await this.prisma.user.findOne({
			where: { id },
		});
		if (!user) {
			throw new HttpException(
				'No user was found with that id',
				HttpStatus.NOT_FOUND,
			);
		}
		return user;
	}

	async findAll(skip: number) {
		if (!skip) {
			skip = 0;
		}
		return {
			pages: await this.prisma.user.count(),
			users: await this.prisma.user.findMany({
				take: 10,
				skip,
			}),
		};
	}
}
