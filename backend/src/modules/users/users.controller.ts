import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id') 
   async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: any) {
    return await this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
