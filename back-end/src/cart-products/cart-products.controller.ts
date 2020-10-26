import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CartProductsService } from './cart-products.service';
import { AddProductToCartDto, UpdateProductFromCartDto } from './dto';

@ApiTags('Cart products')
@Controller('cart/:id/products')
export class CartProductsController {
	constructor(private cartProductsService: CartProductsService) {}

	@ApiOkResponse({ description: 'Cart products retrieved successfully' })
	@Get()
	async index(@Param('id', new ParseIntPipe()) cartId: number) {
		return await this.cartProductsService.getCartProducts(cartId);
	}

	@ApiOkResponse({ description: 'Product added to cart successfully' })
	@ApiNotFoundResponse({ description: 'Product not found' })
	@Post(':product_id')
	async store(
		@Body() body: AddProductToCartDto,
		@Param('product_id', new ParseIntPipe()) productId: number,
		@Param('id', new ParseIntPipe()) cartId: number,
	) {
		return await this.cartProductsService.addProductToCart(
			cartId,
			productId,
			body,
		);
	}

	@ApiOkResponse({ description: 'Product in cart updated successfully' })
	@ApiNotFoundResponse({
		description:
			"Product doesn't exist or the product to update is not in the cart",
	})
	@Patch(':product_id')
	async update(
		@Param('product_id', new ParseIntPipe()) productId: number,
		@Param('id', new ParseIntPipe()) cartId: number,
		@Body() body: UpdateProductFromCartDto,
	) {
		return await this.cartProductsService.updateProductFromCart(
			cartId,
			productId,
			body,
		);
	}

	@ApiOkResponse({ description: 'Product deleted from cart successfully' })
	@ApiNotFoundResponse({
		description: 'Product not found or product does not exist in the cart',
	})
	@Delete(':product_id')
	async destroy(
		@Param('product_id', new ParseIntPipe()) productId: number,
		@Param('id', new ParseIntPipe()) cartId: number,
	) {
		return await this.cartProductsService.deleteProductFromCart(
			cartId,
			productId,
		);
	}
}
