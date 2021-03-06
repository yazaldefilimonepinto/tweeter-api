import { UserUseCase } from '@/data/use-cases/user';
import { Encoder } from '@/infra/encoder';
import { UserRepository } from '@/infra/prisma/repositories/user';
import { CacheServices } from '@/infra/services/cache';
import {
  SignUpUserController,
  LoginUserController,
  UpdateAvatarController,
  UpdateUserProfileController,
  FindAllUserController,
  FindByIdUserController,
  FindByNameUserController,
  DeleteUserByIdController,
} from '@/presentation/controllers/user';
import { Request, Response } from 'express';

const userRepository = new UserRepository();
const encoder = new Encoder();
const cacheServices = new CacheServices();
const userUseCase = new UserUseCase(userRepository, cacheServices, encoder);

export const makeSignUpFacture = async function (request: Request, response: Response) {
  const signUpUserController = new SignUpUserController(userUseCase);
  const controller = await signUpUserController.execute(request, response);
  return controller;
};

export const makeLoginFacture = async function (request: Request, response: Response) {
  const loginUserController = new LoginUserController(userUseCase);
  const controller = await loginUserController.execute(request, response);
  return controller;
};

export const makeUpdateProfileFacture = async function (request: Request, response: Response) {
  const updateUserProfileController = new UpdateUserProfileController(userUseCase);
  const controller = await updateUserProfileController.execute(request, response);
  return controller;
};

export const makeUpdateAvatarFacture = async function (request: Request, response: Response) {
  const updateAvatarController = new UpdateAvatarController(userUseCase);
  const controller = await updateAvatarController.execute(request, response);
  return controller;
};

export const makeUpdateBannerFacture = async function (request: Request, response: Response) {
  const updateAvatarController = new UpdateAvatarController(userUseCase);
  const controller = await updateAvatarController.execute(request, response);
  return controller;
};

export const makeFindAllFacture = async function (request: Request, response: Response) {
  const findAllUserController = new FindAllUserController(userUseCase);
  const controller = await findAllUserController.execute(request, response);
  return controller;
};

export const makeFindByIdFacture = async function (request: Request, response: Response) {
  const findByIdUserController = new FindByIdUserController(userUseCase);
  const controller = await findByIdUserController.execute(request, response);
  return controller;
};

export const makeFindByNameFacture = async function (request: Request, response: Response) {
  const findByNameUserController = new FindByNameUserController(userUseCase);
  const controller = await findByNameUserController.execute(request, response);
  return controller;
};

export const makeDeleteUserByIdFacture = async function (request: Request, response: Response) {
  const deleteUserByIdController = new DeleteUserByIdController(userUseCase);
  const controller = await deleteUserByIdController.execute(request, response);
  return controller;
};
