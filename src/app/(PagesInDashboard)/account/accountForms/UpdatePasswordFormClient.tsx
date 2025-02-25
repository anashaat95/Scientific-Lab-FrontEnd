"use client";

import CustomForm from "@/components/forms/CustomForm";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Card, Grid, TextField, Typography } from "@mui/material";
import { DefaultValues } from "react-hook-form";
import { IUpdateMyPasswordForm } from "../accountInterfaces";
import useUpdateMyPasswordFormHandler from "../hooks/useUpdateMyPasswordFormHandler";

const defaultValues: DefaultValues<IUpdateMyPasswordForm> = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};

const UpdatePasswordFormClient = ({ username }: { username: string }) => {
  const { controlAndErrors, submit, errorMessage, isPending, isValid, isSuccess, reset } = useUpdateMyPasswordFormHandler(defaultValues);

  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid item xs={12} sm={8} md={12} lg={12} xl={12}>
        <Card elevation={9} sx={{ p: 4, zIndex: 1 }}>
          <Typography variant="h2" color="primary" mb={4}>
            Update Password
          </Typography>
          <CustomForm
            isValid={isValid}
            reset={reset}
            isSuccess={isSuccess}
            isPending={isPending}
            submitButtonText="Update Password"
            submitFn={submit}
            errorMessage={errorMessage}
          >
            <Grid container display="flex" justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField name="username" type="text" variant="outlined" autoComplete="username" style={{ display: "none" }} />
                <CustomFormBox
                  name="old_password"
                  type="password"
                  label="Password"
                  disabled={isPending}
                  {...controlAndErrors}
                  autoComplete="new-password"
                />
                <CustomFormBox
                  name="new_password"
                  type="password"
                  label="New Password"
                  disabled={isPending}
                  {...controlAndErrors}
                  autoComplete="new-password"
                />
                <CustomFormBox
                  name="confirm_new_password"
                  type="password"
                  label="Confirm New Password"
                  disabled={isPending}
                  {...controlAndErrors}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
          </CustomForm>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UpdatePasswordFormClient;
