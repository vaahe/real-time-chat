import * as bcrypt from 'bcrypt';

/**
 * Custom error class for bcrypt-related errors.
 */
class BcryptError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BcryptError';
    }
}

/**
 * Hashes a password using bcrypt.
 * @param password - The plain-text password to hash.
 * @param saltRounds - Number of salt rounds (default: 10).
 * @returns A promise resolving to the hashed password.
 * @throws BcryptError if the password is invalid or hashing fails.
 * @example
 * const hashed = await hashPassword('myPassword123');
 * console.log(hashed); // Outputs: $2b$10$...
 */
export async function hashPassword(password: string, saltRounds = 10): Promise<string> {
    if (!password || typeof password !== 'string' || password.trim() === '') {
        throw new BcryptError('Password must be a non-empty string');
    }

    if (!Number.isInteger(saltRounds) || saltRounds < 4 || saltRounds > 31) {
        throw new BcryptError('Salt rounds must be an integer between 4 and 31');
    }

    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new BcryptError(`Failed to hash password: ${error.message}`);
        }

        throw new BcryptError('Failed to hash password: Unknown error');
    }
}

/**
 * Compares a plain-text password with a bcrypt hash.
 * @param password - The plain-text password to compare.
 * @param hash - The bcrypt hash to compare against.
 * @returns A promise resolving to true if the password matches the hash, false otherwise.
 * @throws BcryptError if inputs are invalid or comparison fails.
 * @example
 * const isMatch = await comparePassword('myPassword123', '$2b$10$...');
 * console.log(isMatch); // Outputs: true or false
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    if (!password || typeof password !== 'string' || password.trim() === '') {
        throw new BcryptError('Password must be a non-empty string');
    }
    if (!hash || typeof hash !== 'string' || hash.trim() === '') {
        throw new BcryptError('Hash must be a non-empty string');
    }

    try {
        return await bcrypt.compare(password, hash);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new BcryptError(`Failed to compare password: ${error.message}`);
        }

        throw new BcryptError('Failed to compare password: Unknown error');
    }
}