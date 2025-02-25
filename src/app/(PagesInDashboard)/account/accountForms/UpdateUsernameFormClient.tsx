"use client";

import CustomForm from "@/components/forms/CustomForm";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Card, Grid, Typography } from "@mui/material";
import useUpdateMyUsernameFormHandler from "../hooks/useUpdateMyUsernameFormHandler";

const UpdateUsernameFormClient = ({ username }: { username: string }) => {
  const { controlAndErrors, submit, errorMessage, isPending, isValid, isSuccess, reset } = useUpdateMyUsernameFormHandler({ username });

  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid item xs={12} sm={8} md={12} lg={12} xl={12}>
        <Card elevation={9} sx={{ p: 4, zIndex: 1 }}>
          <Typography variant="h2" color="primary" mb={4}>
            Update Username
          </Typography>
          <CustomForm
            isValid={isValid}
            reset={reset}
            isSuccess={isSuccess}
            isPending={isPending}
            submitButtonText="Update Username"
            submitFn={submit}
            errorMessage={errorMessage}
          >
            <Grid container display="flex" justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={12} lg={12}>
                <CustomFormBox name="username" type="text" label="Username" disabled={isPending} {...controlAndErrors} />
              </Grid>
            </Grid>
          </CustomForm>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UpdateUsernameFormClient;
