import { User } from "../../@types/common";
import { api } from "../axios/instance";

export const getUserList = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users", {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const getUser = async (params: {
  id: number;
}): Promise<User> => {
  const { data } = await api.get<User>(`/users/${params.id}`);
  return data;
};
