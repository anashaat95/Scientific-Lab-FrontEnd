import { enUserRoles } from "@/app/(PagesInDashboard)/roles/rolesInterfaces";
import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { getUserByIdService } from "@/app/(PagesInDashboard)/users/usersServicesBackEnd";
import AccessDeniedMessage from "@/components/AccessDeniedMessage";
import PageContainer from "@/components/container/PageContainer";
import { IFetcherData } from "@/interfaces";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import ProfileUpdateFormServer from "../../accountForms/UpdateProfileFormServer";
import { ProfilePageProps } from "../page";

const ProfileUpdatePage = async ({ params }: ProfilePageProps) => {
  const { id } = params;
  const data: IFetcherData = await fetcherFn(() => getUserByIdService(id));
  const currentUser: IUser = data?.data?.data;

  const token = await GetJwtTokenPayload();
  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const isSameUser = token?.sub === currentUser.id;

  if (!isAdmin && !isSameUser) {
    return <AccessDeniedMessage />;
  }

  return (
    <PageContainer title={`${currentUser.userName} | Update Profile`} description={`${currentUser.userName} Update Profile Page`}>
      <ProfileUpdateFormServer params={params} />
    </PageContainer>
  );
};

export default ProfileUpdatePage;
