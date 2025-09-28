/**
 * Enum for bcrypt-related error messages.
 * Used to ensure consistent error messaging across services.
 */
export enum BcryptErrorMessage {
    INVALID_PASSWORD = 'Password must be a non-empty string',
    INVALID_HASH = 'Hash must be a non-empty string',
    INVALID_SALT_ROUNDS = 'Salt rounds must be an integer between 4 and 31',
    HASH_FAILED = 'Failed to hash password',
    COMPARE_FAILED = 'Failed to compare password',
}