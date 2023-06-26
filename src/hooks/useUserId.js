import { usersManage } from "Services/user.service";
import { useSkeletonGetById } from "./useSkeletonGetById";

export const useUserId = (id) => {
  const { data, loading, fetchData } = useSkeletonGetById(id, usersManage);

  return { user: data, userLoading: loading, userRefresh: fetchData };
};