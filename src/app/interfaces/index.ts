export interface ILoginResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
  message: string,
  meta: T;
}

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
  role?: IRole
}

export interface IAuthority {
  authority: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = ''
}

export enum IRoleType {
  user = "USER",
  superAdmin = 'ROLE_SUPER_ADMIN_ROLE',
}

export interface IRole {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string;
}

export interface IGame {
  id?: number;
  name?: string;
  imgURL?: string;
  status?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrder {
  id?: number;
  description?: string;
  total?: number;
}

export interface ISearch {
  page?: number;
  size?: number;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
}

export interface IMovie {
  id?: number;
  title?: string;
  director?: string;
  description?: string;
}

export interface IPreferenceList {
  id?: number;
  name?: string;
  movies?: IMovie[];
}

export interface ISportTeam {
  id?: number;
  name?: string;
  players?: IPlayer[];
  stadium?: string;
  founded?: number;
  coach?: string;
  isInClubsWorldCup?: boolean;
  teamLogo?: string;
}

export interface IPlayer {
  id?: number;
  name?: string;
}
export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
}
export interface IProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: {
    id: number;
  };
}