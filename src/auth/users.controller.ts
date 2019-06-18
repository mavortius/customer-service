import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ValidateObjectIdPipe } from '../shared/pipes/validate-object-id.pipe';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {
  }

  @Get()
  @ApiOperation({title: 'Get users list'})
  @ApiOkResponse({ description: 'Retrieve a list of all users.'})
  async getAllUsers() {
    return await this.service.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({title: 'Get one user by ID'})
  @ApiOkResponse({description: 'Returns a user'})
  @ApiNotFoundResponse({description: 'User not found for given ID'})
  async getUser(@Param('id', new ValidateObjectIdPipe()) id: string) {
    const found = await this.service.getUser(id);

    if (!found) {
      throw new NotFoundException(`User with ID [${id}] not found.`);
    }

    return found;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addUser(@Body() dto: UserDto) {
    return await this.service.addUser(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id', new ValidateObjectIdPipe()) id: string, @Body() dto: UserDto) {
    const found = await this.service.updateUser(id, dto);

    if (!found) {
      throw new NotFoundException(`User with ID [${id}] not found.`);
    }

    return found;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id', new ValidateObjectIdPipe()) id: string) {
    const found = await this.service.deleteUser(id);

    if (!found) {
      throw new NotFoundException(`User with ID [${id}] not found.`);
    }
  }
}
