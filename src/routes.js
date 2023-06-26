// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Finances from "layouts/billing";
// import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Usuarios from "layouts/usersList";
import Company from "layouts/company";
import Product from "layouts/product";
import PageError from "layouts/pageError";
import Princing from "layouts/pricing";

// @mui icons
import Icon from "@mui/material/Icon";

//rotas de cadastro e editar
import CreateService from "layouts/tables/create";
import CreateFinance from "layouts/billing/components/TransactionsEntry/create";
import CreateCompany from "layouts/company/create";
import CreateProduct from "layouts/product/create";
import ProtectedRoutes from "ProtectedRoutes";
import EditCompany from "layouts/company/edit";
import EditService from "layouts/tables/edit";
import EditProduct from "layouts/product/edit";
import EditUser from "layouts/usersList/edit";

//rotas de single
import SingleService from "layouts/tables/single";
import EditMyUser from "layouts/profile/edit";




const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <ProtectedRoutes><Dashboard /> </ProtectedRoutes>,
    visible: true,

  },
  {
    type: "collapse",
    name: "Serviços",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/services",
    component:<ProtectedRoutes> <Tables /> </ProtectedRoutes> ,
    visible: true,

  },
  {
    type: "collapse",
    name: "Empresas",
    key: "company",
    icon: <Icon fontSize="small">factory</Icon>,
    route: "/empresas",
    component: <ProtectedRoutes><Company /></ProtectedRoutes>,
    visible: true,

  },
  {
    type: "collapse",
    name: "Produtos",
    key: "product",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/produtos",
    component:<ProtectedRoutes> <Product /> </ProtectedRoutes>,
    visible: true,
  },
  {
    type: "collapse",
    name: "Finanças",
    key: "finances",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/finances",
    component:<ProtectedRoutes> <Finances /> </ProtectedRoutes>,
    visible: true,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "Usuários",
    key: "users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/usuarios",
    component: <ProtectedRoutes> <Usuarios /> </ProtectedRoutes>,
    visible: true,

  },
  {
    type: "collapse",
    name: "Precificação",
    key: "precificacao",
    icon: <Icon fontSize="small">calculate</Icon>,
    route: "/precificacao",
    component: <ProtectedRoutes> <Princing /> </ProtectedRoutes>,
    visible: true,

  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <ProtectedRoutes> <Notifications /> </ProtectedRoutes>,
    visible: true,

  },
  {
    type: "collapse",
    name: "Perfil",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/perfil",
    component:<ProtectedRoutes> <Profile /> </ProtectedRoutes> ,
    visible: true,

  },
  {
    type: "collapse",
    name: "Single service",
    key: "Single service",
    icon: <Icon fontSize="small">single service</Icon>,
    route: "/visualizar-service/:id",
    component:<ProtectedRoutes> <SingleService /> </ProtectedRoutes> ,
  },
  {
    type: "collapse",
    name: "Edit Company",
    key: "Edit Company",
    icon: <Icon fontSize="small">editar empresa</Icon>,
    route: "/editar-empresa/:id",
    component:<ProtectedRoutes> <EditCompany /> </ProtectedRoutes> ,
  },
  {
    type: "collapse",
    name: "Edit Service",
    key: "Edit Service",
    icon: <Icon fontSize="small">editar serviço</Icon>,
    route: "/editar-service/:id",
    component:<ProtectedRoutes> <EditService /> </ProtectedRoutes> ,
  },
  {
    type: "collapse",
    name: "Edit Product",
    key: "Edit Product",
    icon: <Icon fontSize="small">editar produto</Icon>,
    route: "/editar-produto/:id",
    component:<ProtectedRoutes> <EditProduct /> </ProtectedRoutes> ,
  },
  {
    type: "collapse",
    name: "Edit User",
    key: "Edit User",
    icon: <Icon fontSize="small">editar usuário</Icon>,
    route: "/editar-usuario/:id",
    component:<ProtectedRoutes> <EditUser /> </ProtectedRoutes> ,
  },
  {
    type: "collapse",
    name: "Edit My User",
    key: "Edit My User",
    icon: <Icon fontSize="small">editar meu usuário</Icon>,
    route: "/editar-meu-usuario/:id",
    component:<ProtectedRoutes> <EditMyUser /> </ProtectedRoutes> ,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "new company",
    key: "new-company",
    icon: <Icon fontSize="small">Cadastrar Empresa</Icon>,
    route: "/cadastrar-empresa",
    component: <ProtectedRoutes> <CreateCompany /> </ProtectedRoutes>,
  },
  {
    type: "collapse",
    name: "new service",
    key: "new-service",
    icon: <Icon fontSize="small">Cadastrar Serviço</Icon>,
    route: "/cadastrar-servico",
    component: <ProtectedRoutes> <CreateService /> </ProtectedRoutes>,
  },
  {
    type: "collapse",
    name: "new product",
    key: "new-product",
    icon: <Icon fontSize="small">Cadastrar produto</Icon>,
    route: "/cadastrar-produto",
    component: <ProtectedRoutes> <CreateProduct /> </ProtectedRoutes>,
  },
  {
    type: "collapse",
    name: "new finance",
    key: "new-finance",
    icon: <Icon fontSize="small">Cadastrar Finanças</Icon>,
    route: "/cadastrar-financa",
    component: <ProtectedRoutes> <CreateFinance /> </ProtectedRoutes>,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Error",
    key: "error",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/error",
    component: <PageError />,
  },
];

export default routes;

