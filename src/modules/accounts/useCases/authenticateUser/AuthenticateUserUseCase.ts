import auth from '@config/auth';
import {
  IUserAuthenticateRequest,
  IUserAuthenticateResponse,
} from '@modules/accounts/dtos/IUserDTO';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    email,
    password,
  }: IUserAuthenticateRequest): Promise<IUserAuthenticateResponse> {
    const user = await this.usersRepository.findByEmail({ email });

    if (!user) {
      throw new AppError('Email or password incorrect', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 401);
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expire_in_token,
    });

    const tokenReturn: IUserAuthenticateResponse = {
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
