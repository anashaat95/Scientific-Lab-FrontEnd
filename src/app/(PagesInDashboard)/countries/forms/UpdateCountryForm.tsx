"use client";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Grid } from "@mui/material";

import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { COUNTRIES_FRONTEND_ENDPOINT } from "../countriesConsts";
import { IUpdateCountryFormInput } from "../countriesInterfaces";
import useUpdateCountryFormHandler from "../hooks/useUpdateCountryFormHandler";

export default function UpdateCountryForm({ country }: { country: IUpdateCountryFormInput }) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useUpdateCountryFormHandler(country);

  return (
    <AddOrUpdateFormModal
      isValid={isValid}
      reset={reset}
      title={`Update Country "${country.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Update"
      submitFn={submit}
      backUrl={COUNTRIES_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox name="name" label="New Name" disabled={isPending} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrUpdateFormModal>
  );
}
