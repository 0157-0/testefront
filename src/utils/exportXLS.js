import * as XLSX from "xlsx/xlsx.mjs";
import convertDateForExcel from "./convertDataForExcel";
import MDButton from "components/MDButton";

export const ExportXLS = ({ dataSheet = [], sheetName = "sheet", page = "1" }) => {
  const formattedData = dataSheet.map((item) => {
    const createdAtTreated = convertDateForExcel(item.createdAt);

    return {
      ...item,
      createdAt: createdAtTreated,
    };
  });

  const handleExport = () => {
    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(formattedData);

    XLSX.utils.book_append_sheet(wb, ws, "Pág " + page);

    XLSX.writeFile(wb, sheetName + ".xlsx");
  };

  return (
    <MDButton
      variant="gradient"
      color="secondary"
      onClick={handleExport}
      type="secondary"
      disabled={dataSheet?.length < 1}
    >
      Exportar XLSX
    </MDButton>
  );
};
