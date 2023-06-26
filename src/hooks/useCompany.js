import { companyServices } from "Services/CompanyService";
import { useSkeletonGetAll } from "./useSkeletonGetAll";

export const useCompany = (page, limit, filters) => {
  const { data, loading, total, fetchData } = useSkeletonGetAll(
    page,
    limit,
    filters,
    companyServices
  );

  return {
    company: data,
    companyLoading: loading,
    companyRefresh: fetchData,
    companyTotal: total,
  };
};
