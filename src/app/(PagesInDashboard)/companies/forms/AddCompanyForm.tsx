"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import { COMPANIES_FRONTEND_ENDPOINT } from "../companiesConsts";
import { IAddCompanyFormInput } from "../companiesInterfaces";
import useAddCompanyFormHandler from "../hooks/useAddCompanyFormHandler";

interface IAddCompanyForm {
  cities: IItemInSelect[];
  countries: IItemInSelect[];
}

const defaultValues: DefaultValues<IAddCompanyFormInput> = {
  name: "",
  street: "",
  zipCode: "",
  website: "",
  city_id: "",
  country_id: "",
};

export default function AddCompanyForm({ cities, countries }: IAddCompanyForm) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset } = useAddCompanyFormHandler(defaultValues);

  return (
    <>
      <AddOrUpdateFormModal
        isValid={isValid}
        reset={reset}
        title="Add Company"
        errorMessage={errorMessage}
        isPending={isPending}
        isSuccess={isSuccess}
        submitButtonText="Add"
        submitFn={submit}
        backUrl={COMPANIES_FRONTEND_ENDPOINT}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid container display="flex" justifyContent="center" spacing={2}>
            <Grid item xs={12} sm={6} lg={6}>
              <CustomFormBox name="name" label="Name" disabled={isPending} {...controlAndErrors} />
              <CustomFormBox name="zipCode" label="Zip Code" disabled={isPending} {...controlAndErrors} />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <CustomFormBox name="street" label="Street" disabled={isPending} {...controlAndErrors} />
              <CustomFormBox name="website" label="Website" type="url" disabled={isPending} {...controlAndErrors} />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormBox name="city_id" label="City Id" items={cities} disabled={isPending} {...controlAndErrors} />
              <CustomFormBox name="country_id" label="Country Id" items={countries} disabled={isPending} {...controlAndErrors} />
            </Grid>
          </Grid>
        </Grid>
      </AddOrUpdateFormModal>
    </>
  );
}
