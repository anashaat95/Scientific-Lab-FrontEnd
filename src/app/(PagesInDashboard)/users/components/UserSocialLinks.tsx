import ScopusIcon from "@/components/icons/ScopusIcon";
import { Theme } from "@emotion/react";
import { faGoogleScholar, faResearchgate } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, SxProps, Typography } from "@mui/material";
import { IUser } from "../usersInterfaces";

const iconStyles = {
  width: 42,
  height: 42,
  transition: "transform 0.2s ease-in-out, color 0.2s",
  "&:hover": {
    transform: "scale(1.1)",
    color: "#3390c8",
  },
};

const UserSocialLinks = ({ user, sx }: { user: IUser; sx?: SxProps<Theme> }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={sx}>
      {user.google_scholar_url && (
        <IconButton component="a" href={user.google_scholar_url} target="_blank" aria-label="Google Scholar" sx={iconStyles}>
          <FontAwesomeIcon icon={faGoogleScholar} />
        </IconButton>
      )}
      {user.academia_url && (
        <IconButton component="a" href={user.academia_url} target="_blank" aria-label="Academia" sx={iconStyles}>
          <Typography fontWeight={500} fontSize={32}>
            A
          </Typography>
        </IconButton>
      )}
      {user.scopus_url && (
        <IconButton component="a" href={user.scopus_url} target="_blank" aria-label="Scopus" sx={iconStyles}>
          <ScopusIcon />
        </IconButton>
      )}
      {user.researcher_gate_url && (
        <IconButton component="a" href={user.researcher_gate_url} target="_blank" aria-label="ResearchGate" sx={iconStyles}>
          <FontAwesomeIcon icon={faResearchgate} />
        </IconButton>
      )}
    </Box>
  );
};

export default UserSocialLinks;
