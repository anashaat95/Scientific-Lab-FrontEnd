import PageContainer from "@/components/container/PageContainer";
import { GoToButton } from "@/elements/CustomButtons";
import { HeadingText } from "@/elements/HeadingText";
import { IFetcherData } from "@/interfaces";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { enUserRoles } from "../../roles/rolesInterfaces";
import UserSocialLinks from "../../users/components/UserSocialLinks";
import { IUser } from "../../users/usersInterfaces";
import { getUserByIdService } from "../../users/usersServicesBackEnd";

export interface ProfilePageProps {
  params: { id: string };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { id } = params;
  const data: IFetcherData = await fetcherFn(() => getUserByIdService(id));
  const user: IUser = data?.data?.data;

  const token = await GetJwtTokenPayload();
  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const isSameUser = token?.sub === user.id;

  let profileImageUrl = "/images/profile/user-1.jpg";
  if (user?.image_url && user?.image_url.trim().length > 0) profileImageUrl = user?.image_url;

  return (
    <PageContainer title={`${user.userName} | Profile`} description={`${user.userName} Profile Page`}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
        <Card sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 4, p: 2, display: "flex", justifyContent: "center" }} elevation={9}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar src={profileImageUrl} sx={{ width: 180, height: 180, mb: 2 }}>
                {user.first_name} {user.last_name}
              </Avatar>
              <Box>
                <HeadingText varient="h2">
                  {user.first_name} {user.last_name}
                </HeadingText>
                <Typography variant="body1" color="textSecondary" mt="10px" display="flex" justifyContent="center" alignItems="center" gap={1}>
                  <EmailIcon color="primary" />
                  {user.email}
                </Typography>
                {user.phone_number && (
                  <Typography variant="body1" color="textSecondary" mt="2px" display="flex" justifyContent="center" alignItems="center" gap={1}>
                    <ContactPhoneIcon color="primary" />
                    {user.phone_number}
                  </Typography>
                )}
                {user.expertise_area && (
                  <Typography variant="body1" color="textSecondary" mt="2px" display="flex" justifyContent="center" alignItems="center" gap={1}>
                    {user.expertise_area}
                  </Typography>
                )}
                <UserSocialLinks user={user} sx={{ mt: 2 }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
        {(isAdmin || isSameUser) && <GoToButton href={`/account/${id}/update`}>Update</GoToButton>}
      </Box>
    </PageContainer>
  );
};

export default ProfilePage;
