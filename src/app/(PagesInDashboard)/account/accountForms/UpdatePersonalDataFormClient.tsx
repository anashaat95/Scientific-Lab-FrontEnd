"use client";

import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import CustomForm from "@/components/forms/CustomForm";
import { CustomFormBox } from "@/components/forms/CustomFormBox";
import { Card, Grid, Typography } from "@mui/material";
import useUpdateMyPersonalDataFormHandler from "../hooks/useUpdateMyPersonalDataFormHandler";

const PersonalDataUpdateFormClient = ({ currentUser }: { currentUser: IUser }) => {
  const { controlAndErrors, submit, errorMessage, isPending, isValid, isSuccess, reset } = useUpdateMyPersonalDataFormHandler(currentUser);

  return (
    <Grid container spacing={0} justifyContent="center" sx={{ height: "100%" }}>
      <Grid item xs={12} sm={8} md={12} lg={12} xl={12}>
        <Card elevation={9} sx={{ p: 4, zIndex: 1, maxWidth: "1200px" }}>
          <Typography variant="h2" color="primary" mb={4}>
            Update Your Personal Data
          </Typography>
          <CustomForm
            isValid={isValid}
            reset={reset}
            isSuccess={isSuccess}
            isPending={isPending}
            submitButtonText="Update Personal Data"
            submitFn={submit}
            errorMessage={errorMessage}
          >
            <Grid container display="flex" justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={6} lg={6}>
                <CustomFormBox name="first_name" label="First Name" disabled={isPending} {...controlAndErrors} />
                <CustomFormBox name="last_name" label="Last Name" disabled={isPending} {...controlAndErrors} />
                <CustomFormBox name="phone_number" type="text" label="Phone Number" disabled={isPending} {...controlAndErrors} />
                <CustomFormBox name="expertise_area" type="text" label="Expertise Area" disabled={isPending} {...controlAndErrors} />
                <CustomFormBox name="image_url" type="url" label="Image Url" disabled={isPending} {...controlAndErrors} />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <CustomFormBox name="google_scholar_url" type="url" label="Google Scholar" disabled={isPending} {...controlAndErrors} />
                <CustomFormBox name="academia_url" type="url" label="Academia" disabled={isPending} {...controlAndErrors} />
                <CustomFormBox name="scopus_url" type="url" label="Scopus" disabled={isPending} {...controlAndErrors} />
                <CustomFormBox name="researcher_gate_url" type="url" label="Research Gate" disabled={isPending} {...controlAndErrors} />
              </Grid>
            </Grid>
          </CustomForm>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PersonalDataUpdateFormClient;
