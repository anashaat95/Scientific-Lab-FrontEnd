import { ADDRESS_MAX, ADDRESS_MIN, NAME_MAX, NAME_MIN, urlPattern, ZIP_CODE_MAX, ZIP_CODE_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IEditCompanyFormInput } from "../companiesInterfaces";
import { useCompany } from "./useCompany";

const validationSchema = yup.object().shape({
  id: yup.string().required("Id is required"),

  name: yup
    .string()
    .min(NAME_MIN, `Name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Name must be at most ${NAME_MAX} characters`)
    .required("Name is required"),

  street: yup
    .string()
    .min(ADDRESS_MIN, `Street must be at least ${ADDRESS_MIN} characters`)
    .max(ADDRESS_MAX, `Street must be at most ${ADDRESS_MAX} characters`)
    .required("Street is required"),
  zipCode: yup
    .string()
    .min(ZIP_CODE_MIN, `Zip code must be at least ${ZIP_CODE_MIN} characters`)
    .max(ZIP_CODE_MAX, `Zip code must be at most ${ZIP_CODE_MAX} characters`)
    .required("Zip code is required"),

  website: yup
    .string()
    .test("is-valid-url", "Invalid URL", (value) => urlPattern.test(value || ""))
    .required("Website is required"),
  city_id: yup.string().required("City ID is required"),
  country_id: yup.string().required("Country ID is required"),
});

const useEditCompanyFormHandler = (defaultValues: DefaultValues<IEditCompanyFormInput>) => {
  const { editCompany } = useCompany();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IEditCompanyFormInput) => {
      await editCompany.mutateAsync(data);
    },
    validationSchema,
  });
  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: editCompany.isPending,
    isSuccess: editCompany.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useEditCompanyFormHandler;
