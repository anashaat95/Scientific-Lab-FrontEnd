"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { CustomImageFieldController } from "@/components/forms/CustomImageFieldController";
import { DEFAULT_PASSWORD } from "@/consts";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import useAddUserFormHandler from "../hooks/useAddUserFormHandler";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";
import { IAddUserFormInput } from "../usersInterfaces";

interface IAddUserForm {
  companies: IItemInSelect[];
  departments: IItemInSelect[];
  labs: IItemInSelect[];
}

const defaultValues: DefaultValues<IAddUserFormInput> = {
  userName: "",
  first_name: "",
  last_name: "",
  email: "",
  password: DEFAULT_PASSWORD,
  confirm_password: DEFAULT_PASSWORD,
  phone_number: "",
  image: null,
  company_id: "",
  department_id: "",
  lab_id: "",
  google_scholar_url: "",
  academia_url: "",
  scopus_url: "",
  researcher_gate_url: "",
  expertise_area: "Drug Delivery Systems",
};

export default function AddUserForm({ companies, departments, labs }: IAddUserForm) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, reset } = useAddUserFormHandler(defaultValues);

  return (
    <>
      <AddOrUpdateFormModal
        reset={reset}
        isValid={isValid}
        title="Add User"
        errorMessage={errorMessage}
        isPending={isPending}
        isSuccess={isSuccess}
        submitButtonText="Add"
        submitFn={submit}
        backUrl={USERS_FRONTEND_ENDPOINT}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="userName" label="Username" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="email" type="email" label="Email" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="first_name" label="First Name" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="last_name" label="Last Name" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="password" type="password" label="Password" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="confirm_password" type="password" label="Confirm Password" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="phone_number" label="Phone Number" type="tel" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6} alignItems="center">
            <CustomImageFieldController name="image" disabled={isPending} imageAlt="Image" imageUrl="" {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="expertise_area" label="Expertise Area" multiline disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox type="url" name="google_scholar_url" label="Google Scholar" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox type="url" name="academia_url" label="Academia" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox type="url" name="scopus_url" label="Scopus" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox type="url" name="researcher_gate_url" label="Research Gate" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="company_id" label="Company" items={companies} disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="department_id" label="Department" items={departments} disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="lab_id" label="Lab" items={labs} disabled={isPending} {...controlAndErrors} />
          </Grid>
        </Grid>
      </AddOrUpdateFormModal>
    </>
  );
}
