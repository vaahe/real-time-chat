import { describe, it, expect } from 'vitest';
import { hashPassword } from './bcrypt.utils.js';

describe('BcryptUtils', () => {
    describe('hashPassword', () => {
        it('should hash the password', async () => {
            const password = 'test123';
            const hash = await hashPassword(password);

            expect(hash).toBeDefined();
            expect(hash).not.toEqual(password);
            expect(hash).toMatch(/^\$2b\$10\$/);
        });

        it('should throw BcryptError for empty password', async () => {
            await expect(hashPassword('')).rejects.toThrow('Password must be a non-empty string');
        });

        it('should throw BcryptError for invalid saltRounds', async () => {
            await expect(hashPassword('test123', 1)).rejects.toThrow('Salt rounds must be an integer between 4 and 31');
        });
    });
});