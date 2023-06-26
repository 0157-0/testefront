import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import UserService from "Services/UserService";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { notification } from "antd";
import { useSession } from "hooks/useSession";

const userService = new UserService();

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const [loading, setLoading] = useState();
  const [form, setForm] = useState([]);
  const navigate = useNavigate();
  const [fetchSession, loading] = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [saveAccess, setSaveAccess] = useState(false);
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     setLoading(true);
  //     const response = await userService.login(form);
  //     console.log("response do Login", response);
  //     if (response === true) {
  //       notification.success({
  //         message: "Login feito com sucesso",
  //       });
  //       navigate("/dashboard");
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     notification.error({
  //       message: "Erro ao tentar entrar" + err,
  //     });
  //   }
  // };

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
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sistema Softview
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            {/* <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid> */}
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            {/* <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form"             onSubmit={(e) => {
              e.preventDefault();
              fetchSession(email, password, saveAccess);
            }}
            autoComplete="off">
            <MDBox mb={2}>
              <MDInput
                name="email"
                placeholder="Digite o seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="password"
                placeholder="Digite a sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              
            <Switch onChange={(e) => setSaveAccess(e.target.checked)} checked={saveAccess} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={saveAccess}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Salvar senha
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                type="submit"
                text="Entrar!"
            //    onClick={handleSubmit}
                fullWidth
              >
                entrar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Não tem uma conta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Fale com a gêrencia
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
