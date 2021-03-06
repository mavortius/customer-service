import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ValidateObjectIdPipe } from '../shared/pipes/validate-object-id.pipe';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRATOR')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRATOR')
  async addUser(@Body() dto: UserDto) {
    return await this.service.addUser(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRATOR')
  async updateUser(@Param('id', new ValidateObjectIdPipe()) id: string, @Body() dto: UserDto) {
    const found = await this.service.updateUser(id, dto);

    if (!found) {
      throw new NotFoundException(`User with ID [${id}] not found.`);
    }

    return found;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRATOR')
  async deleteUser(@Param('id', new ValidateObjectIdPipe()) id: string) {
    const found = await this.service.deleteUser(id);

    if (!found) {
      throw new NotFoundException(`User with ID [${id}] not found.`);
    }
  }
}
