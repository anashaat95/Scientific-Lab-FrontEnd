"use client";

import CustomForm from "@/components/forms/CustomForm";
import { IItemInSelect } from "@/interfaces";
import { Grid } from "@mui/material";
import { CustomFormBox } from "../../../components/forms/CustomFormBox";
import useRegisterFormHandler from "../authHooks/useRegisterFormHandler";
import { ITitleAndChildrenProps } from "../authInterfaces";

interface IAuthRegisterForm extends ITitleAndChildrenProps {
  companies: IItemInSelect[];
  departments: IItemInSelect[];
  labs: IItemInSelect[];
}

const AuthRegisterForm = ({ title, children, companies, departments, labs }: IAuthRegisterForm) => {
  const { controlAndErrors, submit, errorMessage, isPending, isValid, isSuccess, reset } = useRegisterFormHandler();

  return (
    <>
      <CustomForm
        isValid={isValid}
        reset={reset}
        isSuccess={isSuccess}
        title={title}
        isPending={isPending}
        submitButtonText="Sign Up"
        submitFn={submit}
        errorMessage={errorMessage}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="userName" label="Username" {...controlAndErrors} />
            <CustomFormBox name="first_name" label="First Name" {...controlAndErrors} />
            <CustomFormBox name="last_name" label="Last Name" {...controlAndErrors} />
            <CustomFormBox name="lab_id" label="Lab" items={labs} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="email" type="email" label="Email" {...controlAndErrors} />
            <CustomFormBox name="password" type="password" label="Password" {...controlAndErrors} />
            <CustomFormBox name="confirm_password" type="password" label="Confirm Password" {...controlAndErrors} />
            <CustomFormBox name="department_id" label="Department" items={departments} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="company_id" label="Company" items={companies} {...controlAndErrors} />
          </Grid>
        </Grid>
      </CustomForm>
      {children}
    </>
  );
};

export default AuthRegisterForm;
