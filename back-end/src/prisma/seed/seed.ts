import { PrismaService } from '../prisma.service';
import { commerce, name } from 'faker';

const prisma = new PrismaService();

export const seeder = async () => {
	await prisma.user.create({
		data: {
			name: 'ADMIN',
		},
	});

	for (let i = 0; i < 10; i++) {
		console.log(parseInt(commerce.price(100)));
		await prisma.user.create({
			data: {
				name: name.firstName(),
			},
		});
		await prisma.product.create({
			data: {
				name: commerce.productName(),
				price: parseInt(commerce.price(100)),
			},
		});
	}
};
