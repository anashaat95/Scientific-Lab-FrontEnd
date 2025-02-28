import { IItemInSelect } from "@/interfaces";
import { TimeView } from "@mui/x-date-pickers/models";
import dayjs from "dayjs";

export const formatDate = (date: string | Date) => {
  if (!date) return "N/A";

  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (datetime: string) => {
  if (!datetime) return "N/A";

  const datetimeObj = new Date(datetime);
  return datetimeObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    minute: "2-digit",
    hour: "2-digit",
  });
};

export const getHoursStrFromDate = (date: string | Date) => {
  if (!date) return "N/A";
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const createDateFromTime = (timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const convertTimeInAMorPM = (time: string) => {
  let [hours, minutes] = time.split(":").map(Number);
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const convertEnumToItemSelectArray = (enumType: any) => {
  return Object.entries(enumType)
    .filter(([_, value]) => !isNaN(Number(value)))
    .map(
      ([key, value]): IItemInSelect => ({
        value: Number(value),
        label: key,
      })
    );
};

export function convertToValidTimeStr(timeString: string): string {
  const [time, modifier] = timeString.split(" ");

  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export const getIdFromDtoEntityUrl = (url: string | null | undefined): string => {
  return url?.split("/").at(-1) || "";
};

export const timeMinusNowInSeconds = (dateStr: string): number => {
  const providedTimestamp = new Date(dateStr).getTime();
  const nowTimestamp = new Date().getTime();
  return (providedTimestamp - nowTimestamp) / 1000;
};

export const convertdbTimeToDayjsTime = (dbTime: string): dayjs.Dayjs => {
  return dayjs(dbTime, "HH:mm");
};

// Check if the Day.js object is valid before passing it to the TimePicker
export const isValidDayjs = (value: any): boolean => {
  return dayjs.isDayjs(value) && value?.isValid();
};

export const enableTimeSelectionDuringLabOpening = (value: dayjs.Dayjs, view: TimeView, labOpeningTime: dayjs.Dayjs, labClosingTime: dayjs.Dayjs) => {
  const selectedHour = value.hour();
  return selectedHour < labOpeningTime.hour() || selectedHour > labClosingTime.hour();
};

export const disableFridays = (date: dayjs.Dayjs): boolean => {
  return date.day() === 5;
};

export const addDayIfFriday = (date: dayjs.Dayjs) => {
  return date.day() === 5 ? date.add(1, "day") : date;
};

export const getMinAndMaxDateForBookings = () => {
  const today = dayjs();
  const daysUntilFriday = 5 - today.day();
  const nextWeekFriday = today.add(daysUntilFriday > 0 ? daysUntilFriday : daysUntilFriday + 7, "day");

  const minDate = today;
  const maxDate = nextWeekFriday.add(6, "day");
  return { minDate, maxDate };
};
