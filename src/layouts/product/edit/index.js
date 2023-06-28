import * as React from "react";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {  useParams } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import { useCompany } from "hooks/useCompany";
import { useProductId } from "hooks/useProductId";
import { productServices } from "Services/ProductService";

export default function EditProduct() {
  const [loading, setLoading] = useState();
  const [data, setData] = useState({});
  const router = useRouter();

  const { id } = useParams();

  const { product } = useProductId(id);
  const { company } = useCompany();


  const handleEdit = useCallback(() => {
    setLoading(true);
    productServices
      .update(product?._id, data)
      .then(() => notification.success({ message: "Produto editado com sucesso" }))
      .catch((err) =>
        notification.error({
          message: "Erro ao editar o produto",
          description: err.message,
        })
      )
    //  .finally(() => router.back());
  }, [data]);

  useEffect(() => {
    if (product) {
      setData(product);
    }
  }, [product._id]);

  

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
            <MDButton variant="gradient" color="success" onClick={handleEdit}>
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
      </Box>
      <Footer />
    </DashboardLayout>
  );
}
