import { useSkeletonGetById } from "./useSkeletonGetById";
import { productServices } from "Services/ProductService";

export const useProductId = (id) => {
  const { data, loading, fetchData } = useSkeletonGetById(id, productServices);

  return { product: data, productLoading: loading, productRefresh: fetchData };
};