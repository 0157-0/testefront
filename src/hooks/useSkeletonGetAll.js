import { useState, useEffect } from "react";
import { parseFilters } from "utils/parseFilters";

export const useSkeletonGetAll = (
  page = 1,
  limit = 100,
  filters,
  service,
  orderers = ""
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    const query = `?per_page=${limit}&page=${page}${parseFilters(
      filters
    )}${orderers}`;
    setLoading(true);
    service
      .getAll(query)
      .then((res) => (setData(res.data.data), setTotal(res.data.total)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  return { data, loading, total, fetchData };
};
