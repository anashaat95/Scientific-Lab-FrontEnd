"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import useAddMaintenanceLogFormHandler from "../hooks/useAddMaintenanceLogFormHandler";
import { MAINTENANCE_LOGS_FRONTEND_ENDPOINT } from "../MaintenanceLogsConsts";
import { IAddMaintenanceLogFormInput } from "../MaintenanceLogsInterfaces";

interface IAddMaintenanceLogForm {
  equipments: IItemInSelect[];
  statuses: IItemInSelect[];
  users: IItemInSelect[];
}

const defaultValues: DefaultValues<IAddMaintenanceLogFormInput> = {
  description: "",
  status: 0,
  equipment_id: "",
  technician_id: "",
};

export default function AddMaintenanceLogForm({ equipments, users, statuses }: IAddMaintenanceLogForm) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset } = useAddMaintenanceLogFormHandler(defaultValues);

  return (
    <>
      <AddOrUpdateFormModal
        reset={reset}
        isValid={isValid}
        title="Add Maintenance Log"
        errorMessage={errorMessage}
        isPending={isPending}
        isSuccess={isSuccess}
        submitButtonText="Add"
        submitFn={submit}
        backUrl={MAINTENANCE_LOGS_FRONTEND_ENDPOINT}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="equipment_id" label="Equipment" items={equipments} disabled={isPending} {...controlAndErrors} />
            <CustomFormBox name="technician_id" label="Technician" items={users} disabled={isPending} {...controlAndErrors} />
            <CustomFormBox name="description" label="Description" multiline={true} disabled={isPending} {...controlAndErrors} />
            <CustomFormBox name="status" label="Status" items={statuses} disabled={isPending} {...controlAndErrors} />
          </Grid>
        </Grid>
      </AddOrUpdateFormModal>
    </>
  );
}
