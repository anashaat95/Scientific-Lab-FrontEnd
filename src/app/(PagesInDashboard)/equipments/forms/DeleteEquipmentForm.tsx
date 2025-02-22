"use client";
import { DeleteFormModal } from "@/components/forms/DeleteFormModal";
import { EQUIPMENTS_FRONTEND_ENDPOINT } from "../equipmentsConsts";
import useDeleteEquipmentFormHandler from "../hooks/useDeleteEquipmentFormHandler";

export default function DeleteEquipmentForm({ id }: { id: string }) {
  const { submit, errorMessage, isPending, isSuccess } = useDeleteEquipmentFormHandler({ id });
  return (
    <DeleteFormModal
      backUrl={EQUIPMENTS_FRONTEND_ENDPOINT}
      itemName={`Equipment`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitFn={submit}
    />
  );
}
