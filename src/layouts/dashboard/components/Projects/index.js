// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// @mui material components
import DataTable from "examples/Tables/DataTable";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { useServices } from "hooks/useServices";

function Projects() {
  // const { columns, rows } = data();
  const { services } = useServices();

  // filtrando pelo status
const servicesDone = services.filter(services => (services.status === "feito"));
const servicesWait = services.filter(services => (services.status === "aguardando"));
const servicesDoing = services.filter(services => (services.status === "fazendo"));
const servicesTodo = services.filter(services => (services.status === "a fazer"));


  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "companies", accessor: "companies", width: "45%", align: "left" },
    { Header: "numeros", accessor: "numeros", align: "center" },
    { Header: "andamento", accessor: "andamento", align: "center" },
  ];
  const rows = [
    {
      companies: <Company image={logoXD} name="Serviços em andamento" />,
      numeros: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {servicesDoing.length}
        </MDTypography>
      ),
      andamento: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress value={servicesDoing.length} color="info" variant="gradient" label={false} />
        </MDBox>
      ),
    },
    {
      companies: <Company image={logoAtlassian} name="Serviços a fazer" />,

      numeros: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
         {servicesTodo.length}
        </MDTypography>
      ),
      andamento: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress value={servicesTodo.length} color="info" variant="gradient" label={false} />
        </MDBox>
      ),
    },
    {
      companies: <Company image={logoSlack} name="Serviços aguardando" />,

      numeros: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {servicesWait.length}
        </MDTypography>
      ),
      andamento: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress value={servicesWait.length} color="success" variant="gradient" label={false} />
        </MDBox>
      ),
    },
    {
      companies: <Company image={logoSpotify} name="Serviços completos" />,

      numeros: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {servicesDone.length}
        </MDTypography>
      ),
      andamento: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress value={servicesDone.length} color="success" variant="gradient" label={false} />
        </MDBox>
      ),
    },
    {
      companies: <Company image={logoJira} name="Add the New Pricing Page" />,

      numeros: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          $500
        </MDTypography>
      ),
      andamento: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress value={25} color="info" variant="gradient" label={false} />
        </MDBox>
      ),
    },
    {
      companies: <Company image={logoInvesion} name="Redesign New Online Shop" />,

      numeros: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          $2,000
        </MDTypography>
      ),
      completion: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress value={40} color="info" variant="gradient" label={false} />
        </MDBox>
      ),
    },
  ];

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Projetos
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>Resumo geral dos status de serviços</strong>
            </MDTypography>
          </MDBox>
        </MDBox>
       
       
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
