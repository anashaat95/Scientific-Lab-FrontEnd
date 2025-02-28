"use client";
import { AddOrUpdateFormModal } from "@/components/forms/AddOrUpdateFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { CustomImageFieldController } from "@/components/forms/CustomImageFieldController";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import useUpdateUserFormHandler from "../hooks/useUpdateUserFormHandler";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";
import { IUpdateUserFormInput } from "../usersInterfaces";

interface IUpdateUserForm {
  companies: IItemInSelect[];
  departments: IItemInSelect[];
  labs: IItemInSelect[];
  user: IUpdateUserFormInput;
}

export default function UpdateUserForm({ companies, departments, labs, user }: IUpdateUserForm) {
  const { controlAndErrors, submit, errorMessage, isPending, isSuccess, isValid, router, reset } = useUpdateUserFormHandler(user);
  return (
    <AddOrUpdateFormModal
      reset={reset}
      isValid={isValid}
      title={`Update User "${user.userName}"`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitButtonText="Update"
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
          <CustomFormBox name="phone_number" label="Phone Number" type="tel" disabled={isPending} {...controlAndErrors} />
        </Grid>
        <Grid item xs={12} sm={6} lg={6} alignItems="center">
          <CustomImageFieldController name="image" disabled={isPending} imageAlt="Image" imageUrl={user.image as string} {...controlAndErrors} />
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
  );
}
