import { ApiProperty } from '@nestjs/swagger';
import { Cart, CartType } from '@prisma/client';

import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto implements Partial<Cart> {
	@ApiProperty({ enum: ['COMMON', 'SPECIAL_DATED'] })
	@IsNotEmpty()
	@IsEnum(CartType, { each: true })
	type: CartType;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	ownerId: number;
}
