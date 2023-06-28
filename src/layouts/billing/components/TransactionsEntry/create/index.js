import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import MenuItem from "@mui/material/MenuItem";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {  Link } from "react-router-dom";
import Masks from "utils/masks";
import { financeServices } from "Services/FinanceService";
// import { useEffect } from "react";
import { notification } from "antd";

const INITIAL_DATA = {
  valor: "",
  title: "",
  status: "",
  description: "",
};

export default function CreateFinance() {
  const [loading, setLoading] = useState();
  // const [form, setForm] = useState(INITIAL_DATA);
  // const navigate = useNavigate();
  // const [data, setData] = useState(INITIAL_DATA);
  const [data, setData] = useState(INITIAL_DATA);

  const submitData = useCallback(() => {
    setLoading(true);

    const valorFormatted = data.valor.replace("R$", "").replace(".", "").replace(",", ".");

    financeServices
      .create({ ...data, valor: valorFormatted })
      .then(() => {
        notification.success({
          message: "Finança cadastrado com sucesso",
        });
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Algo deu errado ao cadastrar a finança" + err,
        });
      })
      .finally(() => setLoading(false));
  }, [data]);

  // const handleChange = (event) => {
  //   const element = event.target;
  //   const attributeName = element.getAttribute("name");

  //   setForm({ ...form, [attributeName]: event.target.value });
  // };

  const status = [
    {
      value: "entrada",
      label: "Entrada",
    },
    {
      value: "saida",
      label: "Saída",
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
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
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
              name="valor"
              placeholder="Digite o valor"
              value={data.valor}
              onChange={(e) => setData({ ...data, valor: Masks.money(e.target.value) })}
              //  onChange={handleChange}
              type="text"
            />
          </MDBox>
          <MDBox mb={2}>
            <TextField
              id="outlined-select-currency-native"
              select
              name="status"
              value={data.status}
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
            <MDInput
              name="description"
              placeholder="Digite a descrição"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              type="text"
              variant="outlined"
              fullWidth
              id="outlined-basic"
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="success" onClick={submitData}>
              cadastrar
            </MDButton>
            <em>&nbsp; &nbsp;</em>
            <Link to="/finances">
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
