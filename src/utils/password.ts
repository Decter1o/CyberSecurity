import bcrypt from 'bcryptjs';

export async function saltAndHashPasword(password: string): Promise<string> {
    const saltRounds = 10;

    return await bcrypt.hash(password, saltRounds);
}