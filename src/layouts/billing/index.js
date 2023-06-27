// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
// Billing page components
import TransactionEntry from "./components/TransactionsEntry";
import { useFinances } from "hooks/useFinances";
import Masks from "utils/masks";
import { useAuth } from "hooks/useAuth";
import MDAlert from "components/MDAlert";

function Finances() {
  const { user } = useAuth();

  // nomeando o mês
  const date = new Date();
  // const month = date.toLocaleString("default", { month: "long" });

  const { finances } = useFinances();

  // filtrando só quem tem o status "entrada"
  const financeEntrada = finances.filter((finances) => finances.status === "entrada");

  // soma só quem tem o status "entrada"
  var sumaEntrada = 0;

  for (var i = 0; i < financeEntrada.length; i++) {
    sumaEntrada += financeEntrada[i].valor;
  }

  // filtrando só quem tem o status "saida"
  const financeSaida = finances.filter((finances) => finances.status === "saida");

  var sumaSaida = 0;

  for (var i = 0; i < financeSaida.length; i++) {
    sumaSaida += financeSaida[i].valor;
  }

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      Você não está autorizado{" "}
      {/* <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography> */}
      para acessar essa página.
    </MDTypography>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />

      {user.role !== "admin" && "financeiro" && (
        <MDBox mt={8}>
          <MDAlert color="error" dismissible>
            {alertContent("error")}
          </MDAlert>
        </MDBox>
      )}
      {user.role === "admin" && "fianceiro" && (
        <>
          <MDBox mt={8}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultInfoCard
                        // icon="account_balance"
                        icon="arrow_outward"
                        title="Entrada"
                        //  description={"Em " + month}
                        value={Masks.moneyTwo(sumaEntrada)}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultInfoCard
                        icon="call_received"
                        title="Saída"
                        // description={"Em " + month}
                        value={Masks.moneyTwo(sumaSaida)}
                        color="error"
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                   <PaymentMethod />
                 </Grid> */}
                  </Grid>
                </Grid>
                {/* <Grid item xs={12} lg={4}>
               <Invoices />
             </Grid> */}
              </Grid>
            </MDBox>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={10}>
                  {/* painel financeiro */}
                  <TransactionEntry />
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
          <Footer />
        </>
      )}
    </DashboardLayout>
  );
}

export default Finances;
