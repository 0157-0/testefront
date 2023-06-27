import { Link } from "react-router-dom";
import { React, useCallback } from "react";

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
import { useProduct } from "hooks/useProduct";
import { productServices } from "Services/ProductService";

function Product() {
  const { product } = useProduct();

  const handleDelete = useCallback(async (id) => {
    try {
      await productServices.remove(id);
      notification.success({
        message: "Produto deletado com sucesso",
      });
    } catch (_error) {
      notification.error({
        message: "Erro ao deletar o produto",
      });
    }
  }, []);

  const columns = [
    {
      title: "Lote",
      dataIndex: "lote",
      key: "lote",
    },
    {
      title: "N° Prod",
      dataIndex: "num_prod",
      key: "num_prod",
    },
    {
      title: "Nome",
      dataIndex: "produto",
      key: "produto",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Empresa",
      dataIndex: "company",
      key: "company",
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
            <Link to={`/editar-produto/${data?._id}`}>
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={1}>
        <MDButton
          variant="gradient"
          color="info"
          type="submit"
          text="Entrar!"
          component={Link}
          to="/cadastrar-produto"
        >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          Cadastrar
        </MDButton>
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
                  Produtos
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Table dataSource={product} columns={columns} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Product;
