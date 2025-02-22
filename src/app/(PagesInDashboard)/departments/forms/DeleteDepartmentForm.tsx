"use client";
import { DeleteFormModal } from "@/components/forms/DeleteFormModal";
import { DEPARTMENTS_FRONTEND_ENDPOINT } from "../departmentsConsts";
import useDeleteDepartmentFormHandler from "../hooks/useDeleteDepartmentFormHandler";

export default function DeleteDepartmentForm({ id }: { id: string }) {
  const { submit, errorMessage, isPending, isSuccess } = useDeleteDepartmentFormHandler({ id });

  return (
    <DeleteFormModal
      backUrl={DEPARTMENTS_FRONTEND_ENDPOINT}
      itemName={`Department`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitFn={submit}
    />
  );
}
