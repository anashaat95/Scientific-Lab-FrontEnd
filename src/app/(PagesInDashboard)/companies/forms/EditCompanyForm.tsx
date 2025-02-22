"use client";
import { AddOrEditFormModal } from "@/components/forms/AddOrEditFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { COMPANIES_FRONTEND_ENDPOINT } from "../companiesConsts";
import { IEditCompanyFormInput } from "../companiesInterfaces";
import useEditCompanyFormHandler from "../hooks/useEditCompanyFormHandler";

interface IEditCompanyFormProps {
  cities: IItemInSelect[];
  countries: IItemInSelect[];
  company: IEditCompanyFormInput;
}

export default function EditCompanyForm({ cities, countries, company }: IEditCompanyFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useEditCompanyFormHandler(company);

  return (
    <AddOrEditFormModal
      isValid={isValid}
      reset={reset}
      title={`Edit Company "${company.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Edit"
      submitFn={submit}
      backUrl={COMPANIES_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="name" label="Name" {...controlAndErrors} />
            <CustomFormBox name="zipCode" label="Zip Code" {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="street" label="Street" {...controlAndErrors} />
            <CustomFormBox name="website" label="Website" type="url" {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="city_id" label="City Id" items={cities} {...controlAndErrors} />
            <CustomFormBox name="country_id" label="Country Id" items={countries} {...controlAndErrors} />
          </Grid>
        </Grid>
      </Grid>
    </AddOrEditFormModal>
  );
}
