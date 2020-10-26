import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCartDto, UpdateCartDto } from './dto';

@Injectable()
export class CartService {
	constructor(private prisma: PrismaService) {}
	async getCartById(id: Cart['id']): Promise<Cart> {
		const cart = await this.prisma.cart.findOne({ where: { id } });

		if (!cart) {
			throw new HttpException("That cart doesn't exist", HttpStatus.NOT_FOUND);
		}

		return cart;
	}

	async createCart(data: CreateCartDto): Promise<Cart> {
		return await this.prisma.cart.create({
			data: {
				type: data.type,
				owner: { connect: { id: data.ownerId } },
			},
		});
	}

	async updateCart(id: number, data: UpdateCartDto): Promise<Cart> {
		const cartToUpdate = await this.getCartById(id);

		if (!cartToUpdate) {
			throw new HttpException(
				"You can't update that cart",
				HttpStatus.NOT_FOUND,
			);
		}

		return await this.prisma.cart.update({
			where: { id },
			data,
		});
	}

	async deleteCart(id: number) {
		const cartToDelete = await this.getCartById(id);

		if (!cartToDelete) {
			throw new HttpException(
				"You can't delete that cart",
				HttpStatus.NOT_FOUND,
			);
		}
		await this.prisma.productOnCart.deleteMany({
			where: {
				cartId: id,
			},
		});
		return await this.prisma.cart.delete({
			where: { id },
		});
	}
}
