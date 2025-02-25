"use client";
import { SubmitButton } from "@/elements/CustomButtons";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { UseFormReset } from "react-hook-form";
import { CustomAlert } from "../Alert";
import CustomLoader from "../CustomLoader";
import { CustomFormModal } from "./CustomFormModal";

interface IAddOrUpdateFormModal {
  title?: string;
  children?: React.ReactNode;
  errorMessage?: string | null;
  isPending: Boolean;
  isSuccess: Boolean;
  isValid: Boolean;
  submitButtonText: "Update" | "Add";
  submitFn: () => Promise<void>;
  backUrl: string;
  reset: UseFormReset<any>;
}

export const AddOrUpdateFormModal: React.FC<IAddOrUpdateFormModal> = ({
  title,
  errorMessage,
  submitButtonText = "Update",
  submitFn,
  children,
  isPending = false,
  isSuccess = false,
  isValid = false,
  backUrl: backUrl,
  reset,
}) => {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitFn();
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     router.refresh();
  //     router.push(backUrl);
  //   }
  // }, [isSuccess, backUrl, router, reset]);

  return (
    <>
      <CustomFormModal
        title={title}
        endpoint={backUrl}
        ActionButton={() => (
          <SubmitButton form={`${submitButtonText}-form`} disabled={(isPending || !isValid) as boolean}>
            {isPending ? <CustomLoader color="primary" /> : submitButtonText}
          </SubmitButton>
        )}
        isSuccess={isSuccess}
      >
        <form id={`${submitButtonText}-form`} onSubmit={handleSubmit}>
          <Stack marginY={2}>
            {errorMessage && (
              <CustomAlert type="error" sx={{ fontSize: "16px", lineHeight: "1.3", fontWeight: "500" }}>
                {errorMessage}
              </CustomAlert>
            )}
            {children}
          </Stack>
        </form>
      </CustomFormModal>
    </>
  );
};
