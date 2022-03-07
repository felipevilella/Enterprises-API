import { TypeUsers } from "../infra/typeorm/entities/TypeUsers";

interface ICreateUserDTO {
  full_name: string;
  email: string;
  password: string;
  type_user_id: string;
  birth_date: string;
  uf_residence: string;
  city_residence: string;
  type_schooling_id?: string;
  active?: boolean;
}

interface IUpdateUserDTO {
  user_id_action?: string;
  id: string;
  full_name?: string;
  email?: string;
  password?: string;
  type_user_id?: string;
  birth_date?: string;
  uf_residence?: string;
  city_residence?: string;
  type_schooling_id?: string;
  active?: boolean;
}

interface IUserResponseDTO {
  id: string;
  full_name: string;
  email: string;
  type_user_id: string;
  birth_date: string;
  uf_residence: string;
  city_residence: string;
  type_schooling_id: string;
  active: boolean;
  password?: string;
  created_at?: Date;
  typeUsers?: TypeUsers;
}

interface IDetailtUser {
  user_id_action?: string;
  id: string;
}

interface IListUsers {
  id: string;
}

interface IUserDTO {
  id?: string;
  email?: string;
}

interface IUserAuthenticateResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

interface IUserAuthenticateRequest {
  email: string;
  password: string;
}

export {
  ICreateUserDTO,
  IUserDTO,
  IUpdateUserDTO,
  IDetailtUser,
  IListUsers,
  IUserAuthenticateRequest,
  IUserAuthenticateResponse,
  IUserResponseDTO,
};
