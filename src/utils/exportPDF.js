import { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "antd";
import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from "@react-pdf/renderer";

export const ExportPDF = ({ 
  fileName = "Relatório PDF", 
  data = {}, 
  columns }) => {
  const [rows, setRows] = useState();

  const styles = StyleSheet.create({
    page: { backgroundColor: "white", padding: "30px" },
    title: {
      fontSize: "18px",
      width: "100%",
      textAlign: "center",
      marginBottom: "15px",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#e5e4e2",
      fontWeight: "bold",
      width: "100%",
    },
    row: { display: "flex", flexDirection: "row", fontWeight: "normal" },
    text: {
      textAlign: "center",
      width: (1 / columns.length) * 100 + "%",
      fontSize: "10px",
      borderRight: "1px solid gray",
      borderBottom: "1px solid gray",
      padding: "5px",
    },
  });

  //   console.log("data", data)
  //   const formattedData = data?.service.map((item) => {
  //     const createdAtTreated = moment(item.createdAt).format("DD/MM/YYYY");

  //     return {
  //       ...item,
  //       createdAt: createdAtTreated,
  //     };
  //   });
  // console.log("a", formattedData)
  // console.log("a",rows)

  var vetor = [
  {... data}
  ].map(item => [item.company,item.status,item.title, item.description, item.produto, item.createdAt])
  
  console.log(vetor)

  useEffect(() => {
    if (data?.length > 0) {
      const result = data.map((line, index) => {
        console.log("aqui", line)
        let newLine = { ...line };
        newLine.createdAt = moment(line.createdAt).format("DD/MM/YYYY");
        return (
          <View style={styles.row} key={index}>
            {columns.map((column, index) => (
              <Text style={styles.text} key={index}>
                {newLine[column.dataIndex]}
              </Text>
            ))}
          </View>
        );
      });

      setRows(result);
    }
    const result = vetor?.map((line, index) => {
      console.log("line", line)
      let newLine = { ...line };
      newLine.createdAt = moment(line.created_at).format("DD/MM/YYYY");
      newLine.company = line?.[0];
      newLine.status = line?.[1];
      newLine.title = line?.[2];
      newLine.description = line?.[3];
      newLine.produto = line?.[4];
      
      return (
        <View style={styles.row} key={index}>
          {columns.map((column, index) => (
            <Text style={styles.text} key={index}>
              {newLine[column.dataIndex]}
            </Text>
          ))}
        </View>
      );
    });

    setRows(result);
  }, [data]);

  console.log("dataPDF", data)
  console.log("rows", rows)

  const File = () => {
    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>{fileName}</Text>
          <View style={styles.header}>
            {columns.map((column, index) => (
              <Text style={styles.text} key={index}>
                {column.title}
              </Text>
            ))}
          </View>
          {rows}
        </Page>
      </Document>
    );
  };

  return (
    <div>
      <PDFDownloadLink document={<File />} fileName={fileName}>
        {({ loading }) =>
          loading ? (
            <Button type="primary" disabled={true}>
              Carregando documento...
            </Button>
          ) : (
            <Button type="primary" disabled={data?.length < 1}>
              Exportar PDF
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};
