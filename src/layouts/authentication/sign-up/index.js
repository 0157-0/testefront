// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useState } from "react";
import UserService from "Services/UserService";
import { notification } from "antd";

const userService = new UserService();

function Cover() {
  const [loading, setLoading] = useState();
  const [form, setForm] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await userService.cadastrar({
        name: form.name,
        celular: form.celular,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      if (data) {
        const responseLogin = await userService.login({
          email: form.email,
          password: form.password,
        });
        if (responseLogin === true) {
          notification.success({
            message: "Usuário cadastrado com sucesso",
          });
          navigate("/dashboard");
        }
      }
      setLoading(false);
    } catch (err) {
      notification.error({
        message: "Algo deu errado com o Cadastro" + err,
      });
     
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sistema Softview
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Digite seus dados para cadastrar
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                name="name"
                placeholder="Digite o seu nome"
                onChange={handleChange}
                type="text"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                variant="standard"
                fullWidth
                name="email"
                placeholder="Digite o seu e-mail"
                onChange={handleChange}
                type="email"
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                variant="standard"
                fullWidth
                name="celular"
                placeholder="Digite o seu celular"
                onChange={handleChange}
                type="number"
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                variant="standard"
                fullWidth
                name="role"
                placeholder="Digite o seu cargo"
                onChange={handleChange}
                type="text"
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="password"
                placeholder="Digite a sua senha"
                onChange={handleChange}
                type="password"
                variant="standard"
                fullWidth
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                cadastrar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Já tem uma conta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Entrar
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
