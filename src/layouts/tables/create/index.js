import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState } from "react";
import { useCallback } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {  Link } from "react-router-dom";
import { serviceServices } from "Services/serviceService";
import { useCompany } from "hooks/useCompany";
import { useProduct } from "hooks/useProduct";
import { notification } from "antd";
import { useRouter } from "next/router";

const INITIAL_DATA = {
  title: "",
  company: "",
  status: "",
  description: "",
  produto: "",
};

export default function CreateService() {
  const [ setLoading] = useState();
  const [form, setForm] = useState(INITIAL_DATA);
  // const [data, setData] = useState(INITIAL_DATA);
  const router = useRouter();
  const submitData = useCallback(() => {
    setLoading(true);

    serviceServices
      .create(form)
      .then(() => {
        notification.success({
          message: "Serviço cadastrado com sucesso",
        });
        router.push("/services");
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Erro ao cadastrar" + err,
        });
      })
      .finally(() => setLoading(false));
  }, [form]);

  const handleChange = (event) => {
    const element = event.target;
    const attributeName = element.getAttribute("name");

    setForm({ ...form, [attributeName]: event.target.value });
  };


  const { company, companyLoading } = useCompany();
  const { product, productLoading } = useProduct();

  const status = [
    {
      value: "a fazer",
      label: "A fazer",
    },
    {
      value: "fazendo",
      label: "Fazendo",
    },
    {
      value: "feito",
      label: "Feito",
    },
    {
      value: "aguardando",
      label: "Aguardando",
    },
  ];

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
              name="title"
              placeholder="Digite o titulo"
              onChange={handleChange}
              type="text"
              variant="outlined"
              fullWidth
              id="outlined-basic"
            />
          </MDBox>
          <MDBox mb={2}>
          <TextField
              id="outlined-select-currency-native"
              select
              label="Produto"
              name="produto"
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
            >
              <option> Selecione um produto</option>
              {product.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.produto}
                </option>
              ))}
            </TextField>
          </MDBox>
          <MDBox mb={2}>
          <TextField
              id="outlined-select-currency-native"
              select
              label="Empresa"
              name="company"
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
            >
              <option> Selecione uma empresa</option>
              {company.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </TextField>
          </MDBox>
          <MDBox mb={2}>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Status"
              name="status"
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
            >
              <option> Escolha um status</option>
              {status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </MDBox>
          <MDBox mb={2}>
            <TextField
              id="outlined-multiline-static"
              label="Descrição"
              multiline
              rows={4}
              name="description"
              onChange={handleChange}
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="success" onClick={submitData}>
              cadastrar
            </MDButton>
            <em>&nbsp; &nbsp;</em>
            <Link to="/services">
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
