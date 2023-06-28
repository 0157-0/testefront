import * as React from "react";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState } from "react";
import { useCallback } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {  Link } from "react-router-dom";
import Masks from "utils/masks";
import { companyServices } from "Services/CompanyService";
import { notification } from "antd";

const INITIAL_DATA = {
  name: "",
  cnpj: "",
  endereco: "",
  phone: "",
};

export default function CreateCompany() {
  const [loading, setLoading] = useState();
  const [data, setData] = useState(INITIAL_DATA);

  const submitData = useCallback(() => {
    setLoading(true);

    companyServices
      .create({ ...data })
      .then(() => {
        notification.success({
          message: "Empresa cadastrado com sucesso",
        });      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Algo deu errado ao cadastrar o empresa" + err,
        });      })
      .finally(() => setLoading(false));
  }, [data]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput
              name="name"
              placeholder="Digite o nome"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              variant="outlined"
              fullWidth
              id="outlined-basic"
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              id="outlined-basic"
              variant="outlined"
              fullWidth
              name="phone"
              placeholder="Digite o celular"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: Masks.phone(e.target.value) })}
              //  onChange={handleChange}
              type="text"
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              id="outlined-basic"
              variant="outlined"
              fullWidth
              name="cnpj"
              placeholder="Digite o cnpj"
              value={data.cnpj}
              onChange={(e) => setData({ ...data, cnpj: Masks.cnpj(e.target.value) })}
              //  onChange={handleChange}
              type="text"
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              id="outlined-basic"
              variant="outlined"
              fullWidth
              name="endereco"
              placeholder="Digite o endereço"
              value={data.endereco}
              onChange={(e) => setData({ ...data, endereco: e.target.value })}
              //  onChange={handleChange}
              type="text"
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="success" onClick={submitData}>
              cadastrar
            </MDButton>
            <em>&nbsp; &nbsp;</em>
            <Link to="/empresas">
              <MDButton variant="gradient" color="info">
                voltar
              </MDButton>
            </Link>
          </MDBox>
        </MDBox>
        {/* </div> */}
      </Box>
      <Footer />
    </DashboardLayout>
  );
}
