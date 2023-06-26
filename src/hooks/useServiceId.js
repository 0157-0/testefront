import { serviceServices } from "Services/serviceService";
import { useSkeletonGetById } from "./useSkeletonGetById";

export const useServiceId = (id) => {
  const { data, loading, fetchData } = useSkeletonGetById(id, serviceServices);

  return { service: data, serviceLoading: loading, serviceRefresh: fetchData };
};