"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomDatePicker } from "@/components/forms/CustomDatePicker";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import { EQUIPMENTS_FRONTEND_ENDPOINT } from "../equipmentsConsts";
import { IAddEquipmentFormInput } from "../equipmentsInterfaces";
import useAddEquipmentFormHandler from "../hooks/useAddEquipmentFormHandler";

interface IAddEquipmentForm {
  companies: IItemInSelect[];
  statuses: IItemInSelect[];
  types: IItemInSelect[];
  yesOrNo: IItemInSelect[];
}

const defaultValues: DefaultValues<IAddEquipmentFormInput> = {
  name: "",
  total_quantity: "1",
  type: 0,
  status: 0,
  purchase_date: new Date().toISOString().split("T")[0],
  serial_number: "",
  specifications: "",
  description: "",
  CanBeLeftOverNight: false,
  image_url: "",
  company_id: "",
};

export default function AddEquipmentForm({ companies, yesOrNo, statuses, types }: IAddEquipmentForm) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset } = useAddEquipmentFormHandler(defaultValues);

  return (
    <>
      <AddOrUpdateFormModal
        reset={reset}
        isValid={isValid}
        title="Add Equipment"
        errorMessage={errorMessage}
        isPending={isPending}
        isSuccess={isSuccess}
        submitButtonText="Add"
        submitFn={submit}
        backUrl={EQUIPMENTS_FRONTEND_ENDPOINT}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="name" label="Name" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox
              name="total_quantity"
              label="Total quantity"
              type="number"
              rules={{ min: 1 }}
              inputProps={{ min: 1 }}
              disabled={isPending}
              {...controlAndErrors}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="CanBeLeftOverNight" label="Left Over Night" items={yesOrNo} disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="type" label="Type" items={types} disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomDatePicker name="purchase_date" label="Purchase Date" disabled={isPending} {...controlAndErrors} />
            <CustomFormBox name="purchase_date" label="Purchase Date" type="date" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="image_url" label="Image Url" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="serial_number" label="Serial Number" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="status" label="Status" items={statuses} disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="company_id" label="Company" items={companies} disabled={isPending} {...controlAndErrors} />{" "}
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="description" label="Description" multiline={true} disabled={isPending} {...controlAndErrors} />{" "}
          </Grid>

          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="specifications" label="Specifications" multiline={true} rows={2} disabled={isPending} {...controlAndErrors} />
          </Grid>
        </Grid>
      </AddOrUpdateFormModal>
    </>
  );
}
