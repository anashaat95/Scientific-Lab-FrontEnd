import PageContainer from "@/components/container/PageContainer";
import { GoToButton } from "@/elements/CustomButtons";
import { HeadingText } from "@/elements/HeadingText";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import UserSocialLinks from "../../users/components/UserSocialLinks";
import { IUser } from "../../users/usersInterfaces";
import { getUserByFieldService } from "../../users/usersServicesBackEnd";

export interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { username } = params;
  const data: IFetcherData = await fetcherFn(() => getUserByFieldService(username));
  const currentUser: IUser = data?.data?.data;

  return (
    <PageContainer title={`${currentUser.userName} | Profile`} description={`${currentUser.userName} Profile Page`}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
        <Card sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 4, p: 2, display: "flex", justifyContent: "center" }} elevation={9}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar src={currentUser?.image_url ?? "/images/profile/user-1.jpg"} sx={{ width: 180, height: 180, mb: 2 }}>
                {currentUser.first_name} {currentUser.last_name}
              </Avatar>
              <Box>
                <HeadingText varient="h2">
                  {currentUser.first_name} {currentUser.last_name}
                </HeadingText>
                <Typography variant="body1" color="textSecondary" mt="10px" display="flex" justifyContent="center" alignItems="center" gap={1}>
                  <EmailIcon color="primary" />
                  {currentUser.email}
                </Typography>
                {currentUser.phone_number && (
                  <Typography variant="body1" color="textSecondary" mt="2px" display="flex" justifyContent="center" alignItems="center" gap={1}>
                    <ContactPhoneIcon color="primary" />
                    {currentUser.phone_number}
                  </Typography>
                )}
                {currentUser.expertise_area && (
                  <Typography variant="body1" color="textSecondary" mt="2px" display="flex" justifyContent="center" alignItems="center" gap={1}>
                    {currentUser.expertise_area}
                  </Typography>
                )}
                <UserSocialLinks user={currentUser} sx={{ mt: 2 }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
        <GoToButton href={`/account/${username}/update`}>Update</GoToButton>
      </Box>
    </PageContainer>
  );
};

export default ProfilePage;
