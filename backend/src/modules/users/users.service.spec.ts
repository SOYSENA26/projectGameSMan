import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a user', () => {
        const user = { id: '1', name: 'Test User', email: 'test@example.com', password: 'password123' };
        service.create(user);
        expect(service.findAll()).toContain(user);
    });

    it('should find a user by ID', () => {
        const user = { id: '2', name: 'Another User', email: 'another@example.com', password: 'password123' };
        service.create(user);
        const foundUser = service.findOne('2');
        expect(foundUser).toEqual(user);
    });

    it('should update a user', () => {
        const user = { id: '3', name: 'Old Name', email: 'old@example.com', password: 'password123' };
        service.create(user);
        const updatedUser = service.update('3', { name: 'Updated Name' });
        expect(updatedUser.name).toBe('Updated Name');
    });

    it('should delete a user', () => {
        const user = { id: '4', name: 'User to Delete', email: 'delete@example.com', password: 'password123' };
        service.create(user);
        service.remove('4');
        expect(service.findOne('4')).toBeUndefined();
    });
});
