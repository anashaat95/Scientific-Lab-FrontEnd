"use client";
import { DeleteFormModal } from "@/components/forms/DeleteFormModal";
import useDeleteUserFormHandler from "../hooks/useDeleteUserFormHandler";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";

export default function DeleteUserForm({ id }: { id: string }) {
  const { submit, errorMessage, isPending, isSuccess } = useDeleteUserFormHandler({ id });

  return (
    <DeleteFormModal
      backUrl={USERS_FRONTEND_ENDPOINT}
      itemName={`User`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitFn={submit}
    />
  );
}
