"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Grid } from "@mui/material";
import { CITIES_FRONTEND_ENDPOINT } from "../citiesConsts";
import { IUpdateCityFormInput } from "../citiesInterfaces";
import useUpdateCityFormHandler from "../hooks/useUpdateCityFormHandler";

export default function UpdateCityForm({ city }: { city: IUpdateCityFormInput }) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useUpdateCityFormHandler(city);

  return (
    <AddOrUpdateFormModal
      isValid={isValid}
      reset={reset}
      title={`Update City "${city.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Update"
      submitFn={submit}
      backUrl={CITIES_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="name" label="New Name" disabled={isPending} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrUpdateFormModal>
  );
}
