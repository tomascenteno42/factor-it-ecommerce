import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { OrderService } from './order.service';

import { CreateOrderDto } from './dto';

@ApiTags('Orders')
@Controller('/cart/:id/order')
export class OrderController {
	constructor(private orderService: OrderService) {}

	@ApiOkResponse({
		description:
			'Order stored and retrived successfully, and in the case of a vip case an user will be updated to a VIP user',
	})
	@ApiNotFoundResponse({
		description: 'Either the cart or the user was not found',
	})
	@Post()
	async store(
		@Param('id', new ParseIntPipe()) cart_id: number,
		@Body() createOrderDto: CreateOrderDto,
	) {
		return await this.orderService.createOrder(cart_id, createOrderDto);
	}
}
