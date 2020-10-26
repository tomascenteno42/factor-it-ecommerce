import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@ApiOkResponse({ description: 'Users paginated retrived successfully' })
	@Get('all')
	async findAll(@Query('skip', new ParseIntPipe()) skip: number) {
		return await this.userService.findAll(skip);
	}

	@ApiOkResponse({ description: 'User by id retrived successfully' })
	@ApiNotFoundResponse({ description: 'No user with that id was found' })
	@Get(':id')
	async show(@Param('id', new ParseIntPipe()) id: number) {
		return await this.userService.getUserById(id);
	}
}
