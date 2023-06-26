// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { useCallback, useEffect, useState } from "react";
import { getList } from "Services/getList";
import { Popconfirm, Table, notification } from "antd";

import { usersManage } from "Services/user.service";
import { Link } from "react-router-dom";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ExportXLS } from "utils/exportXLS";
import Role from "utils/Role";
import { RoleService } from "utils/Role";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { useAuth } from "hooks/useAuth";
import MDAlert from "components/MDAlert";

function UsersList() {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const { user, userData } = useAuth();

  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setList(items);
      }
    });
    return () => (mounted = false);
  }, []);

  console.log(list);

  const handleDelete = useCallback(async (id) => {
    try {
      await usersManage.remove(id);
      notification.success({
        message: "Usuário deletado com sucesso",
      });
    } catch (_error) {
      notification.error({
        message: "Erro ao deletar o Usuário",
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
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contato",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Cargo",
      dataIndex: "role",
      key: "role",
      render: (role) => <RoleService role={role} />,
    },
    {
      title: "Criado em",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => moment(created_at).format("DD/MM/YYYY"),
    },
    {
      title: "Ações",
      align: "center",
      key: "id",
      render: (data) => {
        return (
          <div className="uk-flex uk-flex-center">
            <Link to={`/editar-usuario/${data?._id}`}>
              <EditIcon />
            </Link>
            <Popconfirm
              okText="Sim"
              cancelText="Não"
              placement="topRight"
              onConfirm={() => handleDelete(data?._id)}
              title="Tem certeza que gostaria de deletar esse produto?"
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

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      Você não está autorizado{" "}
      {/* <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography> */}
      para acessar essa página.
    </MDTypography>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {user.role === "admin" && (
        <>
          <ExportXLS dataSheet={list} page={page} sheetName="Relatório de usuários" />
          <MDButton
            sx={{ ml: 2 }}
            variant="gradient"
            color="dark"
            component={Link}
            to="/authentication/sign-up"
          >
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;Novo usuário
          </MDButton>
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
                      Usuários
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <Table dataSource={list} columns={columns} />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
          <Footer />
        </>
      )}

      {user.role !== "admin" && (
        <MDBox mt={8}>
          <MDAlert color="error" dismissible>
            {alertContent("error")}
          </MDAlert>
        </MDBox>
      )}
    </DashboardLayout>
  );
}

export default UsersList;
