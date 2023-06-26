import { roleServices } from "Services/RoleService";
import { useSkeletonGetAll } from "./useSkeletonGetAll";

export const useRole = (page, limit, filters) => {
  const { data, loading, total, fetchData } = useSkeletonGetAll(
    page,
    limit,
    filters,
    roleServices
  );

  return {
    role: data,
    roleLoading: loading,
    roleRefresh: fetchData,
    roleTotal: total,
  };
};
