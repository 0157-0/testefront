import { useState, useEffect } from "react";

export const useSkeletonGetById = (id, service) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);

    service
      .getById(id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, loading, fetchData };
};
