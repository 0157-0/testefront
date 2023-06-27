// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import { useFinances } from "hooks/useFinances";
import { useProduct } from "hooks/useProduct";
import { useCompany } from "hooks/useCompany";
import { useServices } from "hooks/useServices";


function Dashboard() {
  const { finances } = useFinances();

  const { services } = useServices();
  const { product } = useProduct();
  const { company } = useCompany();

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

  var total = sumaEntrada - sumaSaida;

  



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="factory"
                title="Empresas"
                count={company.length}
                percentage={{
                  color: "success",
                  // amount: "+55%",
                  label: "Empresas cadastradas",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title={sumaEntrada > sumaSaida ? "Saldo Positivo" : "Saldo Negativo"}
                count={total.toFixed(2)}
                percentage={{
                  color: "success",
                  // amount: "Positivo",
                  label: "Média do mês",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Serviços"
                count={services.length}
                percentage={{
                  // color: "success",
                  // amount: "+1%",
                  label: "Número total de serviços",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="category"
                title="Produtos"
                count={product.length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Número total de produtos",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Editando"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
