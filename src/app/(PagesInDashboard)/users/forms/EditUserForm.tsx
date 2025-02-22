"use client";
import { AddOrEditFormModal } from "@/components/forms/AddOrEditFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import useEditUserFormHandler from "../hooks/useEditUserFormHandler";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";
import { IEditUserFormInput } from "../usersInterfaces";

interface IEditUserForm {
  companies: IItemInSelect[];
  departments: IItemInSelect[];
  labs: IItemInSelect[];
  user: IEditUserFormInput;
}

export default function EditUserForm({ companies, departments, labs, user }: IEditUserForm) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useEditUserFormHandler(user);
  return (
    <AddOrEditFormModal
      reset={reset}
      isValid={isValid}
      title={`Edit User "${user.userName}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Edit"
      submitFn={submit}
      backUrl={USERS_FRONTEND_ENDPOINT}
    >
      <Grid container display="flex" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="userName" label="Username" {...controlAndErrors} />
          <CustomFormBox name="first_name" label="First Name" {...controlAndErrors} />
          <CustomFormBox name="phone_number" label="Phone Number" type="tel" {...controlAndErrors} />
          <CustomFormBox type="url" name="google_scholar_url" label="Google Scholar" {...controlAndErrors} />
          <CustomFormBox type="url" name="academia_url" label="Academia" {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomFormBox name="email" type="email" label="Email" {...controlAndErrors} />
          <CustomFormBox name="last_name" label="Last Name" {...controlAndErrors} />
          <CustomFormBox name="expertise_area" label="Expertise Area" {...controlAndErrors} />
          <CustomFormBox type="url" name="scopus_url" label="Scopus" {...controlAndErrors} />
          <CustomFormBox type="url" name="researcher_gate_url" label="Research Gate" {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomFormBox type="url" name="image_url" label="Image Url" {...controlAndErrors} />
          <CustomFormBox name="company_id" label="Company" items={companies} {...controlAndErrors} />
          <CustomFormBox name="department_id" label="Department" items={departments} {...controlAndErrors} />
          <CustomFormBox name="lab_id" label="Lab" items={labs} {...controlAndErrors} />
        </Grid>
      </Grid>
    </AddOrEditFormModal>
  );
}
