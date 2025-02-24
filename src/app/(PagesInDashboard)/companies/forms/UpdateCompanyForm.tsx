"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { COMPANIES_FRONTEND_ENDPOINT } from "../companiesConsts";
import { IUpdateCompanyFormInput } from "../companiesInterfaces";
import useUpdateCompanyFormHandler from "../hooks/useUpdateCompanyFormHandler";

interface IUpdateCompanyFormProps {
  cities: IItemInSelect[];
  countries: IItemInSelect[];
  company: IUpdateCompanyFormInput;
}

export default function UpdateCompanyForm({ cities, countries, company }: IUpdateCompanyFormProps) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useUpdateCompanyFormHandler(company);

  return (
    <AddOrUpdateFormModal
      isValid={isValid}
      reset={reset}
      title={`Update Company "${company.name}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Update"
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
  );
}
