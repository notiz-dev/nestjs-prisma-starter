import { User } from './../generated/prisma-client';
import { environment } from './../environments/environment';
import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor() {

    }

    hash(password: string): Promise<string> {
        return hash(password, environment.saltOrRounds);
    }

    compare(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword);
    }

    createAuthPayload(user: User) {
        return {
            token: sign({ userId: user.id }, environment.secret),
            user,
        };
    }

}
