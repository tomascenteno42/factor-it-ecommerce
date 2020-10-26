import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}

	async getProducts(skip: number) {
		if (!skip) {
			skip = 0;
		}
		return {
			pages: (await this.prisma.product.count()) / 10,
			products: await this.prisma.product.findMany({
				take: 10,
				skip,
			}),
		};
	}
}
