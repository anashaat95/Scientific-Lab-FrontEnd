"use client";
import { CancelButton } from "@/elements/CustomButtons";
import { Card, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export interface IFormModal {
  title?: string;
  endpoint: string;
  children?: React.ReactNode;
  ActionButton: React.FC<any>;
  isSuccess?: Boolean;
}

export const CustomFormModal: React.FC<IFormModal> = ({ title, children, endpoint, isSuccess = false, ActionButton }) => {
  const router = useRouter();
  const handleClose = () => router.push(endpoint);

  useEffect(() => {
    if (isSuccess) {
      router.refresh();
      router.push(endpoint);
    }
  }, [isSuccess, endpoint, router]);

  return (
    <Dialog open={true} fullWidth maxWidth="sm" onClose={handleClose}>
      {!isSuccess && (
        <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "1200px", maxHeight: "80vh", overflowY: "auto" }}>
          {/* {isSuccess ? (
          <SuccessMessage backUrl={endpoint} />
        ) : ( */}
          <>
            {title && <DialogTitle variant="h2">{title}</DialogTitle>}
            <DialogContent>{children}</DialogContent>
            <DialogActions>
              <CancelButton onClick={handleClose}>Cancel</CancelButton>
              <ActionButton />
            </DialogActions>
          </>
        </Card>
      )}
    </Dialog>
  );
};
