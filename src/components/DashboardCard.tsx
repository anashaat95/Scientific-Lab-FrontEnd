import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  action?: React.JSX.Element | any;
  footer?: React.JSX.Element;
  cardheading?: string | React.JSX.Element;
  headtitle?: string | React.JSX.Element;
  headsubtitle?: string | React.JSX.Element;
  children?: React.JSX.Element;
  middlecontent?: string | React.JSX.Element;
};

const DashboardCard = ({ title, subtitle, children, action, footer, cardheading, headtitle, headsubtitle, middlecontent }: Props) => {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px" }}>
          {title ? (
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems={"center"} mb={3}>
              <Box>
                {title ? <Typography variant="h5">{title}</Typography> : ""}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
