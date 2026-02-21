import { Routes } from "../navigation/routes";

export type RootStackParamList = {
  [Routes.UserList]: undefined;
  [Routes.UserDetail]: { id: number };
};