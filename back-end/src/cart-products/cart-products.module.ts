import { Module } from '@nestjs/common';

import { CartProductsController } from './cart-products.controller';
import { CartProductsService } from './cart-products.service';

@Module({
	controllers: [CartProductsController],
	providers: [CartProductsService],
})
export class CartProductsModule {}
