import { NormalButton } from "@/elements/CustomButtons";
import { Avatar, Box, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";

interface ICustomImageFieldController {
  name: string;
  control?: any;
  errors: any;
  rules?: any;
  disabled: boolean;
  btnText?: string;
  imageUrl?: string | null;
  imageAlt?: string;
}

export const CustomImageFieldController: React.FC<ICustomImageFieldController> = ({
  name,
  btnText = "Choose File",
  control,
  errors,
  rules,
  imageUrl,
  imageAlt,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <CustomTextrField btnText={btnText} field={field} name={name} errors={errors} disabled={disabled} imageUrl={imageUrl} imageAlt={imageAlt} />
      )}
    />
  );
};

const CustomTextrField = ({
  field,
  name,
  errors,
  imageUrl,
  imageAlt,
  btnText,
}: { field: ControllerRenderProps<FieldValues, string> } & ICustomImageFieldController) => {
  const [preview, setPreview] = useState(imageUrl && imageUrl !== null && imageUrl.trim() !== "" ? imageUrl.trim() : "/images/profile/user-1.jpg");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      field.onChange(file);
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        {preview && <Avatar src={preview} alt={`${imageAlt} || Image Preview`} sx={{ width: 75, height: 75 }} />}
        <NormalButton variant="outlined" component="label">
          {btnText}
          <input type="file" hidden onChange={handleFileChange} />
        </NormalButton>
      </Box>
      <Box height="10px">{errors?.[name] && <FormHelperText error>{errors?.[name]?.message?.toString() || undefined}</FormHelperText>}</Box>
    </>
  );
};
