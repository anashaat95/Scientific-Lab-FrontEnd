import { SubmitButton } from "@/elements/CustomButtons";
import { HeadingText } from "@/elements/HeadingText";
import { Stack } from "@mui/material";
import { FormEvent } from "react";
import { CustomAlert } from "../Alert";
import CustomLoader from "../CustomLoader";
import { CustomFormModal } from "./CustomFormModal";

interface IDeleteFormModal {
  itemName?: string | null;
  errorMessage?: string | null;
  isPending: Boolean;
  isSuccess: Boolean;
  submitFn: (e?: any) => void;
  backUrl: string;
}

export const DeleteFormModal: React.FC<IDeleteFormModal> = ({
  itemName,
  backUrl: endpoint,
  isPending = false,
  isSuccess = false,
  errorMessage,
  submitFn,
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitFn();
  };

  return (
    <CustomFormModal
      title="Confirm Deletion"
      endpoint={endpoint}
      isSuccess={isSuccess}
      ActionButton={() => (
        <SubmitButton form="delete-modal" color="error">
          {isPending ? <CustomLoader color="secondary.light" /> : "Delete"}
        </SubmitButton>
      )}
    >
      <form id="delete-modal" onSubmit={handleSubmit}>
        <Stack marginY={2}>
          {errorMessage && <CustomAlert type="error">{errorMessage}</CustomAlert>}
          <HeadingText textAlign="left" varient="h6">
            Are you sure you want to delete <strong>{itemName || "this item"}</strong>? This action cannot be undone.
          </HeadingText>
        </Stack>
      </form>
    </CustomFormModal>
  );
};
