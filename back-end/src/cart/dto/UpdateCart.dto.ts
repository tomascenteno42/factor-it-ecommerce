import { ApiProperty } from '@nestjs/swagger';
import { CartType } from '@prisma/client';

import { IsEnum, IsOptional } from 'class-validator';

export class UpdateCartDto {
	@ApiProperty({ enum: ['COMMON', 'SPECIAL_DATED'] })
	@IsOptional()
	@IsEnum(CartType, { each: true })
	type: CartType;
}
