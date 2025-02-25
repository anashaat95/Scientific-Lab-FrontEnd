"use client";
import { getMeClientService } from "@/app/(Authentication)/authServicesClient";
import { updateCurrentUser } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IAddUserFormInput, IUpdateUserFormInput } from "../usersInterfaces";
import { addUserService, deleteUserService, updateUserService } from "../usersServicesFrontEnd";

export const useUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const addUser = useMutation({
    mutationFn: async (data: IAddUserFormInput) => {
      await addUserService(data);
    },
    onSuccess: () => {
      toast.success("User added successfully");
    },
  });

  const updateUser = useMutation({
    mutationFn: (data: IUpdateUserFormInput) => {
      return updateUserService({ id: data.id, data });
    },
    onSuccess: async () => {
      const data = await getMeClientService();
      dispatch(updateCurrentUser(data?.data));
      toast.success("User updated successfully");
    },
  });

  const deleteUser = useMutation({
    mutationFn: deleteUserService,
    onSuccess: () => {
      toast.success("User deleted successfully");
    },
  });

  return { addUser, updateUser, deleteUser };
};
