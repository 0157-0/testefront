import * as React from "react";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import {  useParams } from "react-router-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import {  Link } from "react-router-dom";
import { useServiceId } from "hooks/useServiceId";
import TextField from "@mui/material/TextField";
import { ExportPDF } from "utils/exportPDF";
import { columnsPDF } from "./columnsPDF";

export default function SingleService() {


  const { id } = useParams();

  const { service } = useServiceId(id);

  const data = { ...service } ?? [];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <ExportPDF data={service} columns={columnsPDF} fileName="Relatório de serviços" />

        <TextField
          name="status"
          label="Status"
          value={data?.status}
          type="text"
          fullWidth
          variant="filled"
          id="filled-read-only-input"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          name="title"
          label="Titulo"
          value={data?.title}
          type="text"
          fullWidth
          variant="filled"
          id="filled-read-only-input"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          name="produto"
          value={data?.produto}
          id="filled-read-only-input"
          InputProps={{
            readOnly: true,
          }}
          label="Produto"
          variant="filled"
        />
        <TextField
          label="Empresa"
          value={data?.company}
          name="company"
          variant="filled"
          id="filled-read-only-input"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="filled-multiline-static"
          label="Descrição"
          multiline
          value={data?.description}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        <MDBox mt={4} mb={1}>
          <Link to={`/editar-service/${data?._id}`}>
            <MDButton variant="gradient" color="success">
              editar
            </MDButton>
          </Link>
          <em>&nbsp; &nbsp;</em>
          <Link to="/services">
            <MDButton variant="gradient" color="info">
              voltar
            </MDButton>
          </Link>
        </MDBox>
      </Box>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}
