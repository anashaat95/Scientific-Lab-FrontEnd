import CustomMessage from "@/components/CustomMessage";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import BusinessIcon from "@mui/icons-material/Business";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import ScienceIcon from "@mui/icons-material/Science";
import { Box } from "@mui/material";
import Link from "next/link";
import "server-only";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";
import { IUser } from "../usersInterfaces";
import UserSocialLinks from "./UserSocialLinks";

const flexCenter = { display: "flex", alignItems: "center", gap: 1 };

const tableHeader: Array<string> = ["Username", "Full Name", "Contact", "Location", "Expertise Area", "Social Links", ""];

const UsersTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }

  const users: IUser[] = data?.data;

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={USERS_FRONTEND_ENDPOINT}>
      {users?.map((user) => (
        <CustomTableContentRow key={user.id} endpoint={USERS_FRONTEND_ENDPOINT} id={user.id}>
          <CustomTableCell>{user.userName}</CustomTableCell>
          <CustomTableCell>
            {user.first_name} {user.last_name}
          </CustomTableCell>
          <CustomTableCell>
            <Box {...flexCenter} justifyContent={"center"}>
              <Box {...flexCenter}>
                {user.email_confirmed === "True" ? (
                  <Link href={`mailto:${user.email}`}>
                    <EmailIcon color="primary" />
                  </Link>
                ) : (
                  <EmailIcon color="disabled" />
                )}
              </Box>
              {user.phone_number && (
                <Box {...flexCenter}>
                  <Link href={`tel:${user.phone_number}`}>
                    <ContactPhoneIcon color="primary" />
                  </Link>
                </Box>
              )}
            </Box>
          </CustomTableCell>
          <CustomTableCell>
            <Box {...flexCenter}>
              <BusinessIcon color="primary" />
              {user.company_name} - {user.department_name}
            </Box>
            {user.lab_name && (
              <Box {...flexCenter} marginTop={1}>
                <ScienceIcon color="primary" />
                {user.lab_name}
              </Box>
            )}
          </CustomTableCell>
          <CustomTableCell>{user.expertise_area}</CustomTableCell>
          <CustomTableCell>
            <UserSocialLinks user={user} />
          </CustomTableCell>
        </CustomTableContentRow>
      ))}
    </CustomTable>
  );
};

export default UsersTable;
