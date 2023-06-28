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
import Masks from "utils/masks";
import { useEffect } from "react";
import { companyServices } from "Services/CompanyService";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useCompanyId } from "hooks/useCompnayId";

export default function EditCompany() {
  const [loading, setLoading] = useState();
  const [data, setData] = useState({});
  const router = useRouter();

  const { id } = useParams();

  const { company } = useCompanyId(id);


  const handleEdit = useCallback(() => {
    setLoading(true);
    companyServices
      .update(company?._id, data)
      .then(() => notification.success({ message: "Empresa editado com sucesso" }))
      .catch((err) =>
        notification.error({
          message: "Erro ao editar empresa",
          description: err.message,
        })
      )
    //  .finally(() => router.back());
  }, [data]);

  useEffect(() => {
    if (company) {
      setData(company);
    }
  }, [company._id]);

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
              type="text"
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="success" onClick={handleEdit}>
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
      </Box>
      <Footer />
    </DashboardLayout>
  );
}
