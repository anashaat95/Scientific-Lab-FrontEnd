"use client";

import PageContainer from "@/components/container/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { UnderConstruction } from "@/components/UnderConstruction";
import { Box } from "@mui/material";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // if (isLoading) return <CircularProgress />;
  // if (error) return <Typography color="error">Failed to load profile</Typography>;

  // return (
  //   <PageContainer title="Profile" description="User Profile Page">
  //     <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, p: 2 }}>
  //       <CardContent>
  //         <Box display="flex" flexDirection="column" alignItems="center">
  //           <Avatar sx={{ width: 80, height: 80, mb: 2 }}>{user?.name[0]}</Avatar>
  //           <Typography variant="h5">{user?.name}</Typography>
  //           <Typography variant="body2" color="textSecondary">
  //             {user?.email}
  //           </Typography>
  //         </Box>

  //         {/* Editable Form */}
  //         <Box mt={3} component="form" onSubmit={handleSubmit(onSubmit)}>
  //           <Grid container spacing={2}>
  //             <Grid item xs={12}>
  //               <TextField label="Full Name" fullWidth {...register("name")} disabled={!isEditing} />
  //             </Grid>
  //             <Grid item xs={12}>
  //               <TextField label="Email" fullWidth {...register("email")} disabled />
  //             </Grid>
  //           </Grid>

  //           <Box mt={2} display="flex" justifyContent="space-between">
  //             {isEditing ? (
  //               <>
  //                 <Button type="submit" variant="contained" color="primary">
  //                   Save
  //                 </Button>
  //                 <Button
  //                   variant="outlined"
  //                   onClick={() => {
  //                     reset(user); // Reset form to original values
  //                     setIsEditing(false);
  //                   }}
  //                 >
  //                   Cancel
  //                 </Button>
  //               </>
  //             ) : (
  //               <Button variant="contained" onClick={() => setIsEditing(true)}>
  //                 Edit Profile
  //               </Button>
  //             )}
  //           </Box>
  //         </Box>
  //       </CardContent>
  //     </Card>
  //   </PageContainer>
  // );
  return (
    <PageContainer title="Account" description="this is Account page">
      <PageTitle title="Account" />
      <Box display="flex" flexDirection="column" gap={2} alignItems="center" width="100%">
        <UnderConstruction />
      </Box>
    </PageContainer>
  );
};

export default Profile;
