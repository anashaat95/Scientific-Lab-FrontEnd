"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import useUpdateMaintenanceLogFormHandler from "../hooks/useUpdateMaintenanceLogFormHandler";
import { MAINTENANCE_LOGS_FRONTEND_ENDPOINT } from "../MaintenanceLogsConsts";
import { IUpdateMaintenanceLogFormInput } from "../MaintenanceLogsInterfaces";

interface IUpdateMaintenanceLogFormProps {
  equipments: IItemInSelect[];
  statuses: IItemInSelect[];
  users: IItemInSelect[];
  maintenanceLog: IUpdateMaintenanceLogFormInput;
}

export default function UpdateMaintenanceLogForm({ equipments, statuses, users, maintenanceLog }: IUpdateMaintenanceLogFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useUpdateMaintenanceLogFormHandler(maintenanceLog);

  return (
    <AddOrUpdateFormModal
      reset={reset}
      isValid={isValid}
      title={`Update Maintenance Log`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Update"
      submitFn={submit}
      backUrl={MAINTENANCE_LOGS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="equipment_id" label="Equipment" items={equipments} {...controlAndErrors} disabled={true} />
          <CustomFormBox name="technician_id" label="Technician" items={users} {...controlAndErrors} disabled={true} />
          <CustomFormBox name="description" label="Description" multiline={true} disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="status" label="Status" items={statuses} disabled={isPending} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrUpdateFormModal>
  );
}
