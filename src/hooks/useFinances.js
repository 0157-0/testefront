import { financeServices } from "Services/FinanceService";
import { useSkeletonGetAll } from "./useSkeletonGetAll";

export const useFinances = (page, limit, filters) => {
  const { data, loading, total, fetchData } = useSkeletonGetAll(
    page,
    limit,
    filters,
    financeServices
  );

  return {
    finances: data,
    financesLoading: loading,
    financesRefresh: fetchData,
    financesTotal: total,
  };
};
