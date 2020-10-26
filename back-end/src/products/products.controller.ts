import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiParam } from '@nestjs/swagger';

import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(private productsService: ProductsService) {}

	@ApiOkResponse({ description: 'Products paginated retrived successfully' })
	@ApiParam({
		name: 'Skip',
		description: 'Amount of products to skip',
		example: '/products?skip=10',
		required: false,
	})
	@Get()
	async index(@Query('skip', new ParseIntPipe()) skip: number) {
		return await this.productsService.getProducts(skip);
	}
}
