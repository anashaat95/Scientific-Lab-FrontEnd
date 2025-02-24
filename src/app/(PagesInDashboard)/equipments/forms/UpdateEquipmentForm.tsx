"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { EQUIPMENTS_FRONTEND_ENDPOINT } from "../equipmentsConsts";
import { IUpdateEquipmentFormInput } from "../equipmentsInterfaces";
import useUpdateEquipmentFormHandler from "../hooks/useUpdateEquipmentFormHandler";

interface IUpdateEquipmentFormProps {
  companies: IItemInSelect[];
  statuses: IItemInSelect[];
  types: IItemInSelect[];
  yesOrNo: IItemInSelect[];
  equipment: IUpdateEquipmentFormInput;
}

//
export default function UpdateEquipmentForm({ companies, yesOrNo, statuses, types, equipment }: IUpdateEquipmentFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useUpdateEquipmentFormHandler(equipment);
  return (
    <AddOrUpdateFormModal
      reset={reset}
      isValid={isValid}
      title={`Update Equipment "${equipment.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Update"
      submitFn={submit}
      backUrl={EQUIPMENTS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="name" label="Name" disabled={isPending} {...controlAndErrors} />
          <CustomFormBox
            name="total_quantity"
            label="Total quantity"
            type="number"
            rules={{ min: 1 }}
            inputProps={{ min: 1 }}
            disabled={isPending}
            {...controlAndErrors}
          />
          <CustomFormBox name="CanBeLeftOverNight" label="Left Over Night" items={yesOrNo} disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="type" label="Type" items={types} disabled={isPending} {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="purchase_date" label="Purchase Date" type="date" disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="image_url" label="Image Url" disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="serial_number" label="Serial Number" disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="status" label="Status" items={statuses} disabled={isPending} {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="company_id" label="Company" items={companies} disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="description" label="Description" multiline={true} disabled={isPending} {...controlAndErrors} />
          <CustomFormBox name="specifications" label="Specifications" multiline={true} rows={2} disabled={isPending} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrUpdateFormModal>
  );
}
