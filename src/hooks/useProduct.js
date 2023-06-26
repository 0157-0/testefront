import { productServices } from "Services/ProductService";
import { useSkeletonGetAll } from "./useSkeletonGetAll";

export const useProduct = (page, limit, filters) => {
  const { data, loading, total, fetchData } = useSkeletonGetAll(
    page,
    limit,
    filters,
    productServices
  );

  return {
    product: data,
    productLoading: loading,
    productRefresh: fetchData,
    productTotal: total,
  };
};
