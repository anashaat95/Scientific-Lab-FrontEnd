"use client";
import { DeleteFormModal } from "@/components/forms/DeleteFormModal";
import useDeleteLabFormHandler from "../hooks/useDeleteLabFormHandler";
import { LABS_FRONTEND_ENDPOINT } from "../labsConsts";

export default function DeleteLabForm({ id }: { id: string }) {
  const { submit, errorMessage, isPending, isSuccess } = useDeleteLabFormHandler({ id });

  return (
    <DeleteFormModal
      backUrl={LABS_FRONTEND_ENDPOINT}
      itemName={`Lab`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitFn={submit}
    />
  );
}
