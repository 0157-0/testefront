import { companyServices } from "Services/CompanyService";
import { useSkeletonGetById } from "./useSkeletonGetById";

export const useCompanyId = (id) => {
  const { data, loading, fetchData } = useSkeletonGetById(id, companyServices);

  return { company: data, companyLoading: loading, companyRefresh: fetchData };
};