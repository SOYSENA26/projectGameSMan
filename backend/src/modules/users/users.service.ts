import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    // Asumimos que el id es un string y lo generamos de forma más robusta
    private users: User[] = [
        {
            id: '1',  // Aseguramos que el ID sea un string
            email: 'admin@gmail.com',
            username: 'admin',
            password: 'hashed_password',
            isActive: true,
            name: 'Administrator',
        },
    ];

    // Obtener todos los usuarios
    findAll(): User[] {
        return this.users;
    }

    // Obtener un usuario por id
    findOne(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    // Crear un nuevo usuario
    create(userDto: any): User {
        // Aseguramos que el ID sea único y de tipo string
        const newUser: User = {
            ...userDto,
            id: (this.users.length + 1).toString(),  // Generamos el ID como string
        };
        this.users.push(newUser);
        return newUser;
    }

    // Actualizar un usuario
    update(id: string, userUpdates: any): User | null {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;

        this.users[userIndex] = { ...this.users[userIndex], ...userUpdates };
        return this.users[userIndex];
    }

    // Eliminar un usuario
    remove(id: string): User | null {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;

        const removedUser = this.users.splice(userIndex, 1);
        return removedUser[0];
    }

    // Buscar usuario por correo electrónico
    findByEmail(email: string): User | null {
        return this.users.find(user => user.email === email) || null;
    }
}
