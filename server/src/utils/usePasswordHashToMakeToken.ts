import jwt from 'jsonwebtoken';

export default async function usePasswordHashToMakeToken(passwordHash: string, userId: Number) {
    const secret = passwordHash;

    const token = jwt.sign({ userId }, secret, {
        expiresIn: 3600 
    });

    return token
}
