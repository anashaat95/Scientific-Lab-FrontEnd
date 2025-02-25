"use client";

import CustomForm from "@/components/forms/CustomForm";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Card, Grid, Typography } from "@mui/material";
import useUpdateMyEmailFormHandler from "../hooks/useUpdateMyEmailFormHandler";

const UpdateEmailFormClient = ({ email }: { email: string }) => {
  const { controlAndErrors, submit, errorMessage, isPending, isValid, isSuccess, reset } = useUpdateMyEmailFormHandler({
    new_email: email,
  });

  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid item xs={12} sm={8} md={12} lg={12} xl={12}>
        <Card elevation={9} sx={{ p: 4, zIndex: 1 }}>
          <Typography variant="h2" color="primary" mb={4}>
            Update Email
          </Typography>
          <CustomForm
            isValid={isValid}
            reset={reset}
            isSuccess={isSuccess}
            isPending={isPending}
            submitButtonText="Update Email"
            submitFn={submit}
            errorMessage={errorMessage}
          >
            <Grid container display="flex" justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={12} lg={12}>
                <CustomFormBox name="new_email" type={"email"} label="Email" disabled={isPending} {...controlAndErrors} />
              </Grid>
            </Grid>
          </CustomForm>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UpdateEmailFormClient;
