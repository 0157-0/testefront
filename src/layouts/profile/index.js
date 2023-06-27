// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header";

import { useEffect, useState } from "react";
import { Button, Descriptions, Radio } from "antd";
import { useAuth } from "hooks/useAuth";
import moment from "moment";
import { Link } from "react-router-dom";
import api from "Services/api";

function Overview() {
  const { user } = useAuth();
const [userId, setUser] = useState();

useEffect(() => {
  api
    .get(`/usuarios/${user?._id}`)
    .then((response) => setUser(response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
}, [user?._id]);

  const [size, setSize] = useState("default");
  const onChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            {/* <PlatformSettings /> */}

            <div>
              <Radio.Group onChange={onChange} value={size}>
                <Radio value="default">normal</Radio>
                <Radio value="small">pequeno</Radio>
              </Radio.Group>
              <br />
              <br />
              <Descriptions
                bordered
                title="Informações"
                size={size}
                extra={
                <Link to={`/editar-meu-usuario/${user?._id}`}> <Button type="primary">Editar</Button> </Link>}
              >
                <Descriptions.Item label="Nome">{user?.name}</Descriptions.Item>
                <Descriptions.Item label="Cargo">{user?.role}</Descriptions.Item>
                <Descriptions.Item label="E-mail">{user?.email}</Descriptions.Item>
                <Descriptions.Item label="Celular">{userId?.celular}</Descriptions.Item>
                <Descriptions.Item label="Cadastrado em:">
                  {moment(user?.createdAt).format("DD/MM/YYYY")}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </Descriptions.Item> */}
              </Descriptions>
              <br />
              <br />
              <Descriptions size={size}></Descriptions>
            </div>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
