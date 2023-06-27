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
import { productServices } from "Services/ProductService";
import { useCompany } from "hooks/useCompany";
import { notification } from "antd";

const INITIAL_DATA = {
  produto: "",
  company: "",
  descricao: "",
  lote: "",
  num_prod: "",
};

export default function CreateProduct() {
  const [setLoading] = useState();
  const [data, setData] = useState(INITIAL_DATA);

  const submitData = useCallback(() => {
    setLoading(true);

    productServices
      .create({ ...data })
      .then(() => {
        notification.success({
          message: "Produto cadastrado com sucesso",
        });
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Algo deu errado ao cadastrar o produto" + err,
        });
      })
      .finally(() => setLoading(false));
  }, [data, setLoading]);


  const { company } = useCompany();
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
              name="lote"
              placeholder="Digite o lote"
              value={data.lote}
              onChange={(e) => setData({ ...data, lote: e.target.value })}
              type="text"
              variant="outlined"
              fullWidth
              id="outlined-basic"
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              name="num_prod"
              placeholder="Digite o número do produto"
              value={data.num_prod}
              onChange={(e) => setData({ ...data, num_prod: e.target.value })}
              type="number"
              variant="outlined"
              fullWidth
              id="outlined-basic"
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              name="produto"
              placeholder="Digite o nome"
              value={data.produto}
              onChange={(e) => setData({ ...data, produto: e.target.value })}
              type="text"
              variant="outlined"
              fullWidth
              id="outlined-basic"
            />
          </MDBox>
          <MDBox mb={2}></MDBox>
          <MDBox mb={2}>
            <TextField
              id="outlined-select-currency-native"
              select
              name="company"
              value={data.company}
              onChange={(e) => setData({ ...data, company: e.target.value })}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
            >
              {company.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </TextField>
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              id="outlined-basic"
              variant="outlined"
              fullWidth
              name="descricao"
              placeholder="Descrição do produto"
              value={data.descricao}
              onChange={(e) => setData({ ...data, descricao: e.target.value })}
              //  onChange={handleChange}
              type="text"
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="success" onClick={submitData}>
              cadastrar
            </MDButton>
            <em>&nbsp; &nbsp;</em>
            <Link to="/produtos">
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
