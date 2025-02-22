import { useSearchParams } from "next/navigation";

export const useUserIdAndTokenSearchParams = () => {
  const searchParams = useSearchParams();

  const user_id = searchParams.get("user_id");
  const token = searchParams.get("token");

  return { user_id, token };
};
