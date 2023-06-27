// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import { Link } from "react-router-dom";
import {  useState } from "react";
import { useFinances } from "hooks/useFinances";
import { Table } from "antd";
import { columns } from "./data/columns";
import { ExportXLS } from "utils/exportXLS";

function TransactionEntry() {
  const [page, setPage] = useState(1);

  const { finances } = useFinances();

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Painel de controle financeiro
          <Icon sx={{ color: ({ palette: { success } }) => success.main }}>expand_less</Icon>
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
        <ExportXLS dataSheet={finances} page={page} sheetName="Relatório de finanças" />

          <MDButton  sx={{ ml: 2 }} variant="gradient" color="dark" component={Link} to="/cadastrar-financa">
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;nova entrada
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            recentes
          </MDTypography>
        </MDBox>

        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Table
            rowKey="id"
            size="small"
            dataSource={finances}
            // loading={list}
            columns={columns(finances)}
            pagination={{
              pageSize: 10,
              current: page,
              total: finances,
              showSizeChanger: false,
              onChange: (page) => setPage(page),
            }}
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default TransactionEntry;
