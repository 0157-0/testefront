import {
  Link,
} from "react-router-dom";
import { React, useCallback, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import { Popconfirm, Table, notification } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import { serviceServices } from "Services/serviceService";
import { useCompany } from "hooks/useCompany";
import { ExportXLS } from "utils/exportXLS";
// import MDAlert from "components/MDAlert";
import { useAuth } from "hooks/useAuth";

function Company() {
  const [page] = useState(1);
  const { user } = useAuth();

  const { company } = useCompany();

  const handleDelete = useCallback(async (id) => {
    try {
      await serviceServices.remove(id);
      notification.success({
        message: "Empresa deletada com sucesso",
      });
    } catch (_error) {
      notification.error({
        message: "Erro ao deletar a empresa",
      });
    }
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
    },
    {
      title: "Contato",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Cadastrado em",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Ações",
      align: "center",
      key: "id",
      render: (data) => {
        return (
          <div className="uk-flex uk-flex-center">
            <Link to={`/editar-empresa/${data?._id}`}>
              <EditIcon />
            </Link>
            <Popconfirm
              okText="Sim"
              cancelText="Não"
              placement="topRight"
              onConfirm={() => handleDelete(data?._id)}
              title="Tem certeza que gostaria de deletar essa empresa?"
            >
              <>
                <DeleteForeverIcon />
              </>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // const alertContent = (name) => (
  //   <MDTypography variant="body2" color="white">
  //     Você não está autorizado{" "}
  //     para acessar essa página.
  //   </MDTypography>
  // );

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {/* {user.role === "admin" && ( */}
        <>
          <MDBox mt={4} mb={1}>
            <MDButton
              sx={{ mr: 1 }}
              variant="gradient"
              color="info"
              type="submit"
              text="Entrar!"
              component={Link}
              to="/cadastrar-empresa"
            >
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              Cadastrar
            </MDButton>
            <ExportXLS dataSheet={company} page={page} sheetName="Relatório de empresas" />
          </MDBox>

          <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      Empresas
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <Table dataSource={company} columns={columns} />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
          <Footer />
        </>
      {/* )} */}
      {/* {user.role !== "admin" && "financeiro" && (
        <MDBox mt={8}>
          <MDAlert color="error" dismissible>
            {alertContent("error")}
          </MDAlert>
        </MDBox>
      )} */}
    </DashboardLayout>
  );
}

export default Company;
