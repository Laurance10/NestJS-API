/* eslint-disable prettier/prettier */
import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/user.entity';

// Decorator
export const GetUser = createParamDecorator(

    (data, req): User => {
        return req.args[0].user;
    },
);