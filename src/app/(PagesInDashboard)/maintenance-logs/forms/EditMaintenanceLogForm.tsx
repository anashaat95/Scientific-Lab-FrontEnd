"use client";
import { AddOrEditFormModal } from "@/components/forms/AddOrEditFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import useEditMaintenanceLogFormHandler from "../hooks/useEditMaintenanceLogFormHandler";
import { MAINTENANCE_LOGS_FRONTEND_ENDPOINT } from "../MaintenanceLogsConsts";
import { IEditMaintenanceLogFormInput } from "../MaintenanceLogsInterfaces";

interface IEditMaintenanceLogFormProps {
  equipments: IItemInSelect[];
  statuses: IItemInSelect[];
  users: IItemInSelect[];
  maintenanceLog: IEditMaintenanceLogFormInput;
}

export default function EditMaintenanceLogForm({ equipments, statuses, users, maintenanceLog }: IEditMaintenanceLogFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useEditMaintenanceLogFormHandler(maintenanceLog);

  return (
    <AddOrEditFormModal
      reset={reset}
      isValid={isValid}
      title={`Edit Maintenance Log`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Edit"
      submitFn={submit}
      backUrl={MAINTENANCE_LOGS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="equipment_id" label="Equipment" items={equipments} {...controlAndErrors} disabled={true} />
          <CustomFormBox name="technician_id" label="Technician" items={users} {...controlAndErrors} disabled={true} />
          <CustomFormBox name="description" label="Description" multiline={true} {...controlAndErrors} />
          <CustomFormBox name="status" label="Status" items={statuses} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrEditFormModal>
  );
}
