"use client";
import { useMutation } from "@tanstack/react-query";
import { IAddUserFormInput, IEditUserFormInput } from "../usersInterfaces";
import { addUserService, deleteUserService, editUserService } from "../usersServicesFrontEnd";

export const useUser = () => {
  const addUser = useMutation({
    mutationFn: async (data: IAddUserFormInput) => {
      await addUserService(data);
    },
  });

  const editUser = useMutation({
    mutationFn: (data: IEditUserFormInput) => {
      return editUserService({ id: data.id, data });
    },
  });

  const deleteUser = useMutation({
    mutationFn: deleteUserService,
  });

  return { addUser, editUser, deleteUser };
};
