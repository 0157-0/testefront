import * as React from "react";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useLocation, Link } from "react-router-dom";
import Masks from "utils/masks";
import { useEffect } from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import { usersManage } from "Services/user.service";
import { useUserId } from "hooks/useUserId";
import { useRole } from "hooks/useRole";

export default function EditUser() {
  const [loading, setLoading] = useState();
  const [data, setData] = useState({});
  const router = useRouter();

  const { id } = useParams();

  const { role, roleLoading } = useRole();
  const { user, userLoading } = useUserId(id);


  const handleEdit = useCallback(() => {
    setLoading(true);
    usersManage
      .update(user?._id, data)
      .then(() => notification.success({ message: "Usuário editado com sucesso" }))
      .catch((err) =>
        notification.error({
          message: "Erro ao editar o usuário",
          description: err.message,
        })
      )
      .finally(() => router.back());
  }, [data]);

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user._id]);

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
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              variant="outlined"
              fullWidth
              id="outlined-basic"
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              name="celular"
              placeholder="Digite o celular"
              value={data?.celular}
              onChange={(e) => setData({ ...data, celular: Masks.phone(e.target.value) })}
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
              name="role"
              value={data?.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
            >
              <option> Selecione um cargo</option>
              {role.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.role}
                </option>
              ))}
            </TextField>
          </MDBox>

          <MDBox mb={2}>
            <TextField
              id="outlined-multiline-static"
              value={data?.email}
              multiline
              rows={4}
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="success" onClick={handleEdit}>
              cadastrar
            </MDButton>
            <em>&nbsp; &nbsp;</em>
            <Link to="/usuarios">
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
