"use client";

import CustomForm from "@/components/forms/CustomForm";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { CustomImageFieldController } from "@/components/forms/CustomImageFieldController";
import { Card, Grid, Typography } from "@mui/material";
import { IUser } from "../../users/usersInterfaces";
import useUpdateMyPersonalDataFormHandler from "../hooks/useUpdateMyPersonalDataFormHandler";

const PersonalDataUpdateFormClient = ({ currentUser }: { currentUser: IUser }) => {
  const { controlAndErrors, submit, errorMessage, isPending, isValid, isSuccess, reset } = useUpdateMyPersonalDataFormHandler({
    ...currentUser,
    image: null,
  });

  return (
    <Card elevation={9} sx={{ p: 4, zIndex: 1 }}>
      <Typography variant="h2" color="primary" mb={4}>
        Update Personal Data
      </Typography>
      <CustomForm
        isValid={isValid}
        reset={reset}
        isSuccess={isSuccess}
        isPending={isPending}
        submitButtonText="Update"
        submitFn={submit}
        errorMessage={errorMessage}
      >
        <Grid container display="flex" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="first_name" label="First Name" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="last_name" label="Last Name" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="phone_number" type="text" label="Phone Number" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6} alignItems="center">
            <CustomImageFieldController name="image" disabled={isPending} imageAlt="Image" imageUrl={currentUser.image_url} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormBox name="expertise_area" type="text" multiline label="Expertise Area" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="google_scholar_url" type="url" label="Google Scholar" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="academia_url" type="url" label="Academia" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="scopus_url" type="url" label="Scopus" disabled={isPending} {...controlAndErrors} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormBox name="researcher_gate_url" type="url" label="Research Gate" disabled={isPending} {...controlAndErrors} />
          </Grid>
        </Grid>
      </CustomForm>
    </Card>
  );
};

export default PersonalDataUpdateFormClient;
