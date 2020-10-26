import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsOptional } from 'class-validator';

export class AddProductToCartDto {
	@ApiProperty()
	@IsNumber()
	@IsOptional()
	quantity: number;
}
