import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { getUserByFieldService } from "@/app/(PagesInDashboard)/users/usersServicesBackEnd";
import PageContainer from "@/components/container/PageContainer";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import ProfileUpdateFormServer from "../../accountForms/UpdateProfileFormServer";
import { ProfilePageProps } from "../page";

const ProfileUpdatePage = async ({ params }: ProfilePageProps) => {
  const { username } = params;
  const data: IFetcherData = await fetcherFn(() => getUserByFieldService(username));
  const currentUser: IUser = data?.data?.data;

  return (
    <PageContainer title={`${currentUser.userName} | Update Profile`} description={`${currentUser.userName} Update Profile Page`}>
      <ProfileUpdateFormServer params={params} />
    </PageContainer>
  );
};

export default ProfileUpdatePage;
