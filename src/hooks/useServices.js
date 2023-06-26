import { serviceServices } from "Services/serviceService";
import { useSkeletonGetAll } from "./useSkeletonGetAll";

export const useServices = (page, limit, filters) => {
  const { data, loading, total, fetchData } = useSkeletonGetAll(
    page,
    limit,
    filters,
    serviceServices
  );

  return {
    services: data,
    servicesLoading: loading,
    servicesRefresh: fetchData,
    servicesTotal: total,
  };
};
