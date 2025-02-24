"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Grid } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import { COUNTRIES_FRONTEND_ENDPOINT } from "../countriesConsts";
import { IAddCountryFormInput } from "../countriesInterfaces";
import useAddCountryFormHandler from "../hooks/useAddCountryFormHandler";

const defaultValues: DefaultValues<IAddCountryFormInput> = {
  name: "",
};

export default function AddCountryForm() {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset } = useAddCountryFormHandler(defaultValues);

  return (
    <>
      <AddOrUpdateFormModal
        isValid={isValid}
        reset={reset}
        title="Add Country"
        errorMessage={errorMessage}
        isPending={isPending}
        isSuccess={isSuccess}
        submitButtonText="Add"
        submitFn={submit}
        backUrl={COUNTRIES_FRONTEND_ENDPOINT}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="name" label="Country Name" disabled={isPending} {...controlAndErrors} />
          </Grid>
        </Grid>
      </AddOrUpdateFormModal>
    </>
  );
}
