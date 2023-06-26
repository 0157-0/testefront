import { usersManage } from "Services/user.service";
import { useSkeletonGetAll } from "./useSkeletonGetAll";

export const useUser = (page, limit, filters) => {
  const { data, loading, total, fetchData } = useSkeletonGetAll(
    page,
    limit,
    filters,
    usersManage
  );

  return {
    user: data,
    userLoading: loading,
    userRefresh: fetchData,
    userTotal: total,
  };
};
