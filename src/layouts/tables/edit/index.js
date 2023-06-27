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
import {  Link } from "react-router-dom";
import { useEffect } from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import { serviceServices } from "Services/serviceService";
import { useServiceId } from "hooks/useServiceId";
import TextField from "@mui/material/TextField";
import { useCompany } from "hooks/useCompany";
import { useProduct } from "hooks/useProduct";

export default function EditService() {
  const [ setLoading] = useState();
  const [data, setData] = useState({});
  const router = useRouter();

  const { id } = useParams();

  const { service } = useServiceId(id);
  const { company } = useCompany();
  const { product } = useProduct();
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

  const handleEdit = useCallback(() => {
    setLoading(true);
    serviceServices
      .update(service?._id, data)
      .then(() => notification.success({ message: "Empresa editado com sucesso" }))
      .catch((err) =>
        notification.error({
          message: "Erro ao editar empresa",
          description: err.message,
        })
      )
      .finally(() => router.back());
  }, [data]);

  useEffect(() => {
    if (service) {
      setData(service);
    }
  }, [service._id]);

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
              value={data?.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
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
              name="produto"
              value={data?.produto}
              onChange={(e) => setData({ ...data, produto: e.target.value })}
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
              value={data?.company}
              name="company"
              onChange={(e) => setData({ ...data, company: e.target.value })}
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
              value={data?.status}
              name="status"
              onChange={(e) => setData({ ...data, status: e.target.value })}
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
              value={data?.description}
              multiline
              rows={4}
              name="description"
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="success" onClick={handleEdit}>
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
      </Box>
      <Footer />
    </DashboardLayout>
  );
}
