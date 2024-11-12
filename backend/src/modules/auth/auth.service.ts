import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }


    async register(userDto: any): Promise<User> {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);

      
        return this.usersService.create({
            id: userDto.id,
            email: userDto.email,
            password: hashedPassword,
            username: userDto.username || 'defaultUsername', 
            isActive: true, 
            name: userDto.name || 'defaultName',  
        });
    }

    
    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
           
            return {
                id: user.id,
                email: user.email,
                password: user.password,
                username: user.username,
                isActive: user.isActive,
                name: user.name,
            };
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
