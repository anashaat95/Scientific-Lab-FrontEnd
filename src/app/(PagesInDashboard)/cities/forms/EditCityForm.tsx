"use client";
import { AddOrEditFormModal } from "@/components/forms/AddOrEditFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Grid } from "@mui/material";
import { CITIES_FRONTEND_ENDPOINT } from "../citiesConsts";
import { IEditCityFormInput } from "../citiesInterfaces";
import useEditCityFormHandler from "../hooks/useEditCityFormHandler";

export default function EditCityForm({ city }: { city: IEditCityFormInput }) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useEditCityFormHandler(city);

  return (
    <AddOrEditFormModal
      isValid={isValid}
      reset={reset}
      title={`Edit City "${city.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Edit"
      submitFn={submit}
      backUrl={CITIES_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="name" label="New Name" {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrEditFormModal>
  );
}
