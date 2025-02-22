import CustomMessage from "@/components/CustomMessage";
import ResearchGateIcon from "@/components/icons/ResearchGateIcon";
import ScopusIcon from "@/components/icons/ScopusIcon";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessIcon from "@mui/icons-material/Business";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import ScienceIcon from "@mui/icons-material/Science";
import { Box } from "@mui/material";
import Link from "next/link";
import "server-only";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";
import { IUser } from "../usersInterfaces";

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
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
              {user.google_scholar_url && (
                <Box>
                  <Link href={user.google_scholar_url} target="_blank">
                    <FontAwesomeIcon icon={faGoogleScholar} style={{ color: "primary", width: "32px", height: "32px" }} />
                  </Link>
                </Box>
              )}
              {user.academia_url && (
                <Box>
                  <Link href={user.academia_url} target="_blank">
                    <FontAwesomeIcon icon={faGraduationCap} style={{ color: "primary", width: "32px", height: "32px" }} />
                  </Link>
                </Box>
              )}
              {user.scopus_url && (
                <Box>
                  <Link href={user.scopus_url} target="_blank">
                    <ScopusIcon size={32} />
                  </Link>
                </Box>
              )}
              {user.researcher_gate_url && (
                <Box>
                  <Link href={user.researcher_gate_url} target="_blank">
                    <ResearchGateIcon size={32} />
                  </Link>
                </Box>
              )}
            </Box>
          </CustomTableCell>
        </CustomTableContentRow>
      ))}
    </CustomTable>
  );
};

export default UsersTable;
