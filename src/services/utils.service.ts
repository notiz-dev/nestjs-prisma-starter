import { Injectable, createParamDecorator } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { environment } from 'environments/environment';
import { GqlArgumentsHost } from '@nestjs/graphql';

export const UserId = createParamDecorator(
    (data, [root, args, ctx, info]) => getUserId(ctx),
);

interface Token {
    userId: string;
}

export function getUserId(ctx) {
    const authorization = ctx.req.headers.authorization;
    if (authorization) {
        const token = authorization.replace('Bearer ', '');
        // tslint:disable-next-line:no-console
        console.log('token', token);
        const verifiedToken = verify(token, environment.secret) as Token;
        // tslint:disable-next-line:no-console
        console.log('verifiedToken', verifiedToken);
        return verifiedToken && verifiedToken.userId;
    }
}


