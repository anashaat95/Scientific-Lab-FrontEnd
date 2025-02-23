import PageContainer from "@/components/container/PageContainer";
import ResearchGateIcon from "@/components/icons/ResearchGateIcon";
import ScopusIcon from "@/components/icons/ScopusIcon";
import { HeadingText } from "@/elements/HeadingText";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { IUser } from "../../users/usersInterfaces";
import { getUserByFieldService } from "../../users/usersServicesBackEnd";

interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { username } = params;
  const data: IFetcherData = await fetcherFn(() => getUserByFieldService(username));
  const currentUser: IUser = data?.data?.data;

  return (
    <PageContainer title={`${currentUser.userName} | Profile`} description={`${currentUser.userName} Profile Page`}>
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
              <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={2}>
                {currentUser.google_scholar_url && (
                  <Box>
                    <Link href={currentUser.google_scholar_url} target="_blank">
                      <FontAwesomeIcon icon={faGoogleScholar} style={{ color: "primary", width: "32px", height: "32px" }} />
                    </Link>
                  </Box>
                )}
                {currentUser.academia_url && (
                  <Box>
                    <Link href={currentUser.academia_url} target="_blank">
                      <FontAwesomeIcon icon={faGraduationCap} style={{ color: "primary", width: "32px", height: "32px" }} />
                    </Link>
                  </Box>
                )}
                {currentUser.scopus_url && (
                  <Box>
                    <Link href={currentUser.scopus_url} target="_blank">
                      <ScopusIcon size={32} />
                    </Link>
                  </Box>
                )}
                {currentUser.researcher_gate_url && (
                  <Box>
                    <Link href={currentUser.researcher_gate_url} target="_blank">
                      <ResearchGateIcon size={32} />
                    </Link>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ProfilePage;
