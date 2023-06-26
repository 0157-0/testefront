import { usersManage } from "Services/user.service";
import { useSkeletonGetAll } from "./useSkeletonGetAll";

export const useUsers = (page = 1, limit = 100, filters) => {
  const { data, loading, total, fetchData } = useSkeletonGetAll(
    page,
    limit,
    filters,
    usersManage
  );

  return {
    users: data,
    usersLoading: loading,
    usersRefresh: fetchData,
    usersTotal: total,
  };
};
