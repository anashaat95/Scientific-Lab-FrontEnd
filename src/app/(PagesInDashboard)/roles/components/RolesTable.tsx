import CustomMessage from "@/components/CustomMessage";
import StartAddElementRightNow from "@/components/StartAddElementRightNow";
import { HeadingText } from "@/elements/HeadingText";
import { IFetcherData } from "@/interfaces";
import { Box, Card } from "@mui/material";
import { ROLES_FRONTEND_ENDPOINT } from "../rolesConsts";
import { IRole } from "../rolesInterfaces";

const tableHeader: Array<string> = ["Name", ""];

const RolesTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }

  const roles: IRole[] = data?.data;

  if (roles?.length === 0) return <StartAddElementRightNow title="Roles" endpoint={ROLES_FRONTEND_ENDPOINT} />;

  return (
    <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%" }}>
      <Box display="flex" flexDirection="column" justifyContent="space-between" gap={4}>
        {roles.map((role) => (
          <HeadingText varient="h4" key={role.id}>
            {role.name}
          </HeadingText>
        ))}
      </Box>
    </Card>
  );
};

export default RolesTable;
