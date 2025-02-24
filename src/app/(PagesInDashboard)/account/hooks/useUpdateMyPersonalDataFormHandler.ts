import { NAME_MAX, NAME_MIN, urlPattern } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IUpdateMyPersonalDataForm } from "../accountInterfaces";
import { useAccount } from "./useAccount";

const validationSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(NAME_MIN, `First name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `First name must be at most ${NAME_MAX} characters`)
    .required("First name is required"),

  last_name: yup
    .string()
    .min(NAME_MIN, `Last name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Last name must be at most ${NAME_MAX} characters`)
    .required("Last name is required"),

  image_url: yup
    .string()
    .nullable()
    .test("is-valid-url-or-empty", "Invalid URL", (value) => !value || urlPattern.test(value))
    .notRequired(),

  google_scholar_url: yup
    .string()
    .nullable()
    .test("is-valid-url-or-empty", "Invalid URL", (value) => !value || urlPattern.test(value))
    .test("contains-google-scholar", "URL must contain 'scholar.google.com'", (value) => !value || value.includes("scholar.google.com"))
    .notRequired(),

  academia_url: yup
    .string()
    .nullable()
    .test("is-valid-url-or-empty", "Invalid URL", (value) => !value || urlPattern.test(value))
    .test("contains-academia", "URL must contain 'academia.com'", (value) => !value || value.includes("academia.edu"))
    .notRequired(),

  scopus_url: yup
    .string()
    .nullable()
    .test("is-valid-url-or-empty", "Invalid URL", (value) => !value || urlPattern.test(value))
    .test("contains-scopus", "URL must contain 'scopus.com'", (value) => !value || value.includes("scopus.com"))
    .notRequired(),

  researcher_gate_url: yup
    .string()
    .nullable()
    .test("is-valid-url-or-empty", "Invalid URL", (value) => !value || urlPattern.test(value))
    .test("contains-researchergate", "URL must contain 'researchgate.net'", (value) => !value || value.includes("researchgate.net"))
    .notRequired(),

  expertise_area: yup
    .string()
    .min(NAME_MIN, `Expertise area must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Expertise area must be at most ${NAME_MAX} characters`)
    .optional(),
});

const useUpdateMyPersonalDataFormHandler = (defaultValues: DefaultValues<IUpdateMyPersonalDataForm>) => {
  const { updateMyPersonalData } = useAccount();
  const { controlAndErrors, submit, errorMessage, isValid, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data) => await updateMyPersonalData.mutateAsync(data),
    validationSchema,
  });

  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: updateMyPersonalData.isPending,
    isSuccess: updateMyPersonalData.isSuccess,
    isValid,
    reset,
  };
};

export default useUpdateMyPersonalDataFormHandler;
