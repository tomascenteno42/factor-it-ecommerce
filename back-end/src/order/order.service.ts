import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Cart, Order, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateOrderDto } from './dto';

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async getUserByCartId(cart_id: number): Promise<User> {
		return await this.prisma.cart
			.findOne({
				where: { id: cart_id },
			})
			.owner();
	}

	async getOrdersTotal(userId: number) {
		return await this.prisma.order.aggregate({
			where: {
				userId,
			},
			sum: {
				total: true,
			},
		});
	}

	async getCartById(id: number): Promise<Cart> {
		return await this.prisma.cart.findOne({
			where: { id },
		});
	}

	async createOrder(
		cart_id: number,
		createOrderDto: CreateOrderDto,
	): Promise<Order> {
		const cart = await this.getCartById(cart_id);
		if (!cart) {
			throw new HttpException('No cart was found', HttpStatus.NOT_FOUND);
		}

		const user = await this.getUserByCartId(cart_id);
		if (!user) {
			throw new HttpException('No user was found', HttpStatus.NOT_FOUND);
		}

		const order = await this.prisma.order.create({
			data: {
				cart: { connect: { id: cart_id } },
				user: { connect: { id: user.id } },
				total: createOrderDto.total,
			},
		});

		const ordersTotal = (await this.getOrdersTotal(user.id)).sum.total;

		if (ordersTotal >= 10000) {
			await this.prisma.user.update({
				where: { id: user.id },
				data: {
					vip: true,
				},
			});
			return order;
		} else {
			return order;
		}
	}
}
