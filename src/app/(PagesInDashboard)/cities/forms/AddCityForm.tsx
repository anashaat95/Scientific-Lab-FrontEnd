"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Grid } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import { CITIES_FRONTEND_ENDPOINT } from "../citiesConsts";
import { IAddCityFormInput } from "../citiesInterfaces";
import useAddCityFormHandler from "../hooks/useAddCityFormHandler";

const defaultValues: DefaultValues<IAddCityFormInput> = {
  name: "",
};

export default function AddCityForm() {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset } = useAddCityFormHandler(defaultValues);

  return (
    <>
      <AddOrUpdateFormModal
        isValid={isValid}
        reset={reset}
        title="Add City"
        errorMessage={errorMessage}
        isPending={isPending}
        isSuccess={isSuccess}
        submitButtonText="Add"
        submitFn={submit}
        backUrl={CITIES_FRONTEND_ENDPOINT}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="name" label="City Name" disabled={isPending} {...controlAndErrors} />
          </Grid>
        </Grid>
      </AddOrUpdateFormModal>
    </>
  );
}
