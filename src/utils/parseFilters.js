import moment from "moment";

export const parseFilters = (filters) => {

  let parsedFilters = "";
  if (!!filters) {
    let filterBy = "";
    let filterValue = "";
    let filterType = "";

    Object.entries(filters).forEach(([key, value]) => {

      if (!!value) {
        if (key === "created_at") {
          if (moment(value?.split("|")[0]).isValid()) {
            filterBy += filterBy.length > 0 ? "," + key : key;
            filterValue += filterValue.length > 0 ? "," + value : value;
            filterType += filterType.length > 0 ? ",like" : "like";
          }
        } else if (
          [
            "title",
            "name",
            "description",
            "scale.customer_id",
            "tag",
            "user.name",
            "traceable.customer_id",
          ].includes(key)
        ) {
          const keyValue = key;
          filterBy += filterBy.length > 0 ? "," + keyValue : keyValue;
          filterValue += filterValue.length > 0 ? "," + value : value;
          filterType += filterType.length > 0 ? ",like" : "like";
        } else {
          filterBy += filterBy.length > 0 ? "," + key : key;
          filterValue += filterValue.length > 0 ? "," + value : value;
          filterType +=
            (filterType.length > 0 ? "," : "") +
            (value?.includes("|") ? "in" : "eq");
        }
      }
    });

    parsedFilters = filters.device_model_id ? `&device_model_id=${filterValue}` : `&filterBy=${filterBy}&filterValue=${filterValue}&filterType=${filterType}`;
    if (!!filterValue && !filters.device_model_id) {
      parsedFilters = `&filterBy=${filterBy}&filterValue=${filterValue}&filterType=${filterType}`;
    }
  }

  return parsedFilters;
};
