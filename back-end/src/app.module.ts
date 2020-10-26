import { Module } from '@nestjs/common';

import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module';
import { CartProductsModule } from './cart-products/cart-products.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
	imports: [
		UserModule,
		ProductsModule,
		CartModule,
		CartProductsModule,
		OrderModule,
		PrismaModule,
	],
})
export class AppModule {}
