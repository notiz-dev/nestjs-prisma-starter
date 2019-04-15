
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class LoginInput {
    email: string;
    password: string;
}

export class SignupInput {
    email: string;
    password: string;
    name: string;
}

export class AuthPayload {
    token: string;
    user: User;
}

export abstract class IMutation {
    abstract signup(data: SignupInput): AuthPayload | Promise<AuthPayload>;

    abstract login(data: LoginInput): AuthPayload | Promise<AuthPayload>;
}

export class Post {
    id: string;
    title: string;
    author: User;
}

export abstract class IQuery {
    abstract helloWorld(): string | Promise<string>;

    abstract hello(name: string): string | Promise<string>;

    abstract publishedPosts(): Post[] | Promise<Post[]>;

    abstract post(postId: string): Post | Promise<Post>;

    abstract userPosts(userId: string): Post[] | Promise<Post[]>;

    abstract me(): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: string;
    registeredAt: DateTime;
    email: string;
    name: string;
    posts?: Post[];
}

export type DateTime = any;
