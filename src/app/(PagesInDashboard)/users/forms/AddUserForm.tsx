"use client";
import { AddOrEditFormModal } from "@/components/forms/AddOrEditFormModal";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
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
  userName: "anashaat959",
  first_name: "Ahmed",
  last_name: "Nashaat",
  email: "anashaat95@gmail.com",
  password: "TESTtest!@#123456",
  confirm_password: "TESTtest!@#123456",
  phone_number: "",
  image_url: "",
  company_id: "4deaba22-8d47-4c74-8d2a-3c8f41654c58",
  department_id: "ae3e348a-e29b-4afa-b9a1-0185169def95",
  lab_id: "6a1bfaa4-6ae4-4cc1-950e-833a9a151318",
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
      <AddOrEditFormModal
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
            <CustomFormBox name="userName" label="Username" {...controlAndErrors} />
            <CustomFormBox name="first_name" label="First Name" {...controlAndErrors} />
            <CustomFormBox name="password" type="password" label="Password" {...controlAndErrors} />
            <CustomFormBox name="phone_number" label="Phone Number" type="tel" {...controlAndErrors} />
            <CustomFormBox type="url" name="google_scholar_url" label="Google Scholar" {...controlAndErrors} />
            <CustomFormBox type="url" name="academia_url" label="Academia" {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="email" type="email" label="Email" {...controlAndErrors} />
            <CustomFormBox name="last_name" label="Last Name" {...controlAndErrors} />
            <CustomFormBox name="confirm_password" type="password" label="Confirm Password" {...controlAndErrors} />
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
    </>
  );
}
