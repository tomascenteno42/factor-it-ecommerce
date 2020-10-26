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
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';

import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
	constructor(private cartService: CartService) {}

	@ApiOkResponse({ description: 'Cart retrieved succesfully' })
	@ApiNotFoundResponse({ description: 'No cart cart was found' })
	@Get(':id')
	async index(@Param('id', new ParseIntPipe()) cartId: number) {
		return await this.cartService.getCartById(cartId);
	}

	@ApiCreatedResponse({ description: 'A cart was created succesfully' })
	@Post()
	async create(@Body() createCartDto: CreateCartDto) {
		return await this.cartService.createCart(createCartDto);
	}

	@ApiOkResponse({ description: 'Cart updated successfully' })
	@ApiNotFoundResponse({ description: 'Cart not found' })
	@Patch(':id')
	async update(
		@Param('id', new ParseIntPipe()) cartId: number,
		@Body() updateCartDto: UpdateCartDto,
	) {
		return await this.cartService.updateCart(cartId, updateCartDto);
	}

	@ApiOkResponse({ description: 'Cart succesffuly deleted' })
	@ApiNotFoundResponse({ description: 'Cart not found' })
	@Delete(':id')
	async destroy(@Param('id', new ParseIntPipe()) cartId: number) {
		return await this.cartService.deleteCart(cartId);
	}
}
