import moment from "moment";

export default function convertDateForExcel(originalValue) {
  const typesNotValue = [null, undefined, ""];

  return (
    typesNotValue.includes(originalValue)
    ?
    "Data não cadastrada"
    :
    moment(originalValue).format("DD/MM/YYYY")
  )
};