import { InputBaseComponentProps } from "@mui/material";
import { DefaultValues } from "react-hook-form";

export interface IFetcherData {
  data?: any;
  isSuccess: Boolean;
  errorMessage?: string | null;
  isError: Boolean;
  isNetworkError: Boolean;
}

export interface UseFormHandlerProps<TFormInput extends IFormInput> {
  defaultValues: DefaultValues<TFormInput>;
  onSubmit: (data: TFormInput) => Promise<any>;
  validationSchema: any;
}

export interface IFormInput {}

export interface ICustomFormLabelProps {
  name: string;
  label: string;
}

export interface ICustomFormControllerProps {
  name: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  control: any;
  errors: any;
  rules?: object;
  inputProps?: InputBaseComponentProps;
  multiline?: boolean;
  hidden?: boolean;
  rows?: number;
}

export interface ICustomFormBoxProps {
  name: string;
  label?: string;
  items?: IItemInSelect[];
  type?: React.HTMLInputTypeAttribute | undefined;
  control: any;
  errors: any;
  rules?: object;
  inputProps?: InputBaseComponentProps;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
}

export interface ICustomSelectControllerProps {
  name: string;
  items: IItemInSelect[];
  control: any;
  errors: any;
  rules?: object;
}

export interface IItemInSelect {
  value?: string | number | null | Boolean;
  label?: string | null;
}

export interface IEntitySelectOption {
  id: string;
  name: string;
}

export interface IHaveIdEntity {
  id: string;
}

export interface IEntity extends IHaveIdEntity {
  id: string;
  created_at: string;
  updated_at: string;
}
