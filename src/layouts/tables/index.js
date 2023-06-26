import { BrowserRouter as Router, Link, useLocation, useSearchParams } from "react-router-dom";
import { React, useCallback, useEffect, useState } from "react";

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
// import { columns } from "layouts/tables/data/columns";
import { getServiceList } from "Services/getList";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "../../hooks/query";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { StatusService } from "utils/statusService";
import moment from "moment";
import { useServices } from "hooks/useServices";
import { serviceServices } from "Services/serviceService";
import { ExportXLS } from "utils/exportXLS";
import { useAuth } from "hooks/useAuth";
function Tables({}) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { services, servicesLoading } = useServices();
  const { user, userData } = useAuth();
// console.log(user);
// console.log("userData", userData);
  const handleDelete = useCallback(async (id) => {
    try {
      await serviceServices.remove(id);
      notification.success({
        message: "Serviço deletado com sucesso",
      });
    } catch (_error) {
      notification.error({
        message: "Erro ao deletar o serviço",
      });
    }
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };


  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusService status={status} />,
    },
    {
      title: "Titulo",
      dataIndex: "title",
      key: "title",
      
    },    
    {
      title: "Produto",
      dataIndex: "produto",
      key: "produto",
    },
    {
      title: "Empresa",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Criado em",
      dataIndex: "createdAt",
      key: "createdAt",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Ações",
      align: "center",
      key: "id",
      render: (data) => {
        return (
          <div className="uk-flex uk-flex-center">
            {/* <Link to={`/editar-service/${data?._id}`}> */}
            <Link to={`/visualizar-service/${data?._id}`}>
            <LaunchIcon />

            </Link>
            <Popconfirm
              okText="Sim"
              cancelText="Não"
              placement="topRight"
              onConfirm={() => handleDelete(data?._id)}
              title="Tem certeza que gostaria de deletar este grupo de alertas?"
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={1}>
        <MDButton
          sx={{ mr: 1 }}
          variant="gradient"
          color="info"
          type="submit"
          text="Entrar!"
          component={Link}
          to="/cadastrar-servico"
        >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          Cadastrar
        </MDButton>
        <ExportXLS dataSheet={services} page={page} sheetName="Relatório de serviços" />
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
                  Serviços
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Table
                  dataSource={services}
                  columns={columns}
                  pagination={{
                    pageSize: 10,
                    current: page,
                    //    total: brandsTotal,
                    onChange: (page) => setPage(page),
                    showSizeChanger: false,
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
