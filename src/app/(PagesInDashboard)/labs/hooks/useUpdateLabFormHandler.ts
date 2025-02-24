import { createDateFromTime } from "@/app/helpers";
import { NAME_MAX, NAME_MIN } from "@/consts";
import useFormHandler from "@/hooks/useFormHandler";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import { IUpdateLabFormInput } from "../labsInterfaces";
import { useLab } from "./useLab";

const validationSchema = yup
  .object()
  .shape({
    id: yup.string().required("Id is required"),
    name: yup
      .string()
      .min(NAME_MIN, `Name must be at least ${NAME_MIN} characters`)
      .max(NAME_MAX, `Name must be at most ${NAME_MAX} characters`)
      .required("Name is required"),

    capacity: yup.number().typeError("Must be a number").min(1, "Value must be at least 1").required("Capacity is required"),

    opening_time: yup.string().required("Opening time is required."),
    closing_time: yup
      .string()
      .required("Closing time is required.")
      .test("closingTimeAfterOpening", "Closing time must be after opening time.", function (value) {
        const { opening_time } = this.parent;
        if (!opening_time || !value) return true;
        return createDateFromTime(value) > createDateFromTime(opening_time);
      }),

    supervisor_id: yup.string().required("Supervisor ID is required").required("Supervisor is required"),

    department_id: yup.string().required("Department ID is required").required("Department is required"),
  })
  .test("closingTimeAfterOpening", "The lab's closing time must be after its opening time.", (value) => {
    if (value.opening_time && value.closing_time) {
      return createDateFromTime(value.closing_time) > createDateFromTime(value.opening_time);
    }
    return true;
  });

const useUpdateLabFormHandler = (defaultValues: DefaultValues<IUpdateLabFormInput>) => {
  const { updateLab } = useLab();
  const { controlAndErrors, submit, errorMessage, isValid, router, reset } = useFormHandler({
    defaultValues,
    onSubmit: async (data: IUpdateLabFormInput) => {
      await updateLab.mutateAsync(data);
    },
    validationSchema,
  });
  return {
    controlAndErrors,
    submit,
    errorMessage,
    isPending: updateLab.isPending,
    isSuccess: updateLab.isSuccess,
    isValid,
    router,
    reset,
  };
};

export default useUpdateLabFormHandler;
