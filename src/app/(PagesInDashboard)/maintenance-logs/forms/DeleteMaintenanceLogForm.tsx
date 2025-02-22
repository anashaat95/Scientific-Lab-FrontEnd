"use client";
import { DeleteFormModal } from "@/components/forms/DeleteFormModal";
import useDeleteMaintenanceLogFormHandler from "../hooks/useDeleteMaintenanceLogFormHandler";
import { MAINTENANCE_LOGS_FRONTEND_ENDPOINT } from "../MaintenanceLogsConsts";

export default function DeleteMaintenanceLogForm({ id }: { id: string }) {
  const { submit, errorMessage, isPending, isSuccess } = useDeleteMaintenanceLogFormHandler({ id });

  return (
    <DeleteFormModal
      backUrl={MAINTENANCE_LOGS_FRONTEND_ENDPOINT}
      itemName={`Maintenance Log`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitFn={submit}
    />
  );
}
