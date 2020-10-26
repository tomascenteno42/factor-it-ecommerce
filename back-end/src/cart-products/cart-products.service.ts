import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { AddProductToCartDto, UpdateProductFromCartDto } from './dto';

@Injectable()
export class CartProductsService {
	constructor(private prisma: PrismaService) {}

	async getCartById(id: number): Promise<Cart> {
		return await this.prisma.cart.findOne({ where: { id } });
	}

	async getProductById(id: number) {
		return await this.prisma.product.findOne({
			where: { id },
		});
	}

	async getProductOnCart(cartId: number, productId: number) {
		return await this.prisma.productOnCart.findMany({
			where: {
				cartId,
				productId,
			},
		});
	}

	async getCartProducts(cartId: number) {
		const cart = await this.prisma.productOnCart.findMany({
			where: { cartId },
			select: {
				product: true,
				quantity: true,
			},
		});
		return cart;
	}

	async addProductToCart(
		cartId: number,
		productId: number,
		data: AddProductToCartDto,
	) {
		if (!data.quantity) {
			data.quantity = 1;
		}
		const productToAdd = await this.getProductById(productId);

		if (!productToAdd) {
			throw new HttpException(
				'You cannot add that product to your cart',
				HttpStatus.NOT_FOUND,
			);
		}

		const productOnCart = await this.getProductOnCart(cartId, productId);
		if (productOnCart.length != 0) {
			return await this.prisma.productOnCart.updateMany({
				where: {
					cartId,
					productId,
				},
				data: {
					quantity: productOnCart[0].quantity + data.quantity,
				},
			});
		}

		return await this.prisma.productOnCart.create({
			data: {
				cart: { connect: { id: cartId } },
				product: { connect: { id: productId } },
				quantity: data.quantity,
			},
		});
	}

	async updateProductFromCart(
		cartId: number,
		productId: number,
		body: UpdateProductFromCartDto,
	) {
		const productToUpdate = await this.getProductById(productId);

		if (!productToUpdate) {
			throw new HttpException(
				'Product to update not found',
				HttpStatus.NOT_FOUND,
			);
		}
		const productOnCart = await this.getProductOnCart(cartId, productId);

		if (productOnCart.length === 0) {
			throw new HttpException(
				'That product is not in your cart',
				HttpStatus.NOT_FOUND,
			);
		}

		return await this.prisma.productOnCart.updateMany({
			where: {
				cartId,
				productId,
			},
			data: {
				quantity: body.quantity,
			},
		});
	}
	async deleteProductFromCart(cartId: number, productId: number) {
		const productToDelete = await this.prisma.product.findOne({
			where: { id: productId },
		});

		if (!productToDelete) {
			throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
		}
		const productOnCart = await this.getProductOnCart(cartId, productId);

		if (productOnCart.length === 0) {
			throw new HttpException(
				'You cannot delete that product',
				HttpStatus.NOT_FOUND,
			);
		}

		return await this.prisma.productOnCart.deleteMany({
			where: {
				cartId,
				productId,
			},
		});
	}
}
