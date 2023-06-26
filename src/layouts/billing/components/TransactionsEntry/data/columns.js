import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Masks from "utils/masks";
import { useLocation, Link } from "react-router-dom";
import { StatusFinance } from "utils/statusFinance";
// adicionar filtro
export const columns = (fetchData, router) => {
  return [
    {
      title: "Titulo",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusFinance status={status} />,

    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
      render: (valor) => Masks.moneyTwo(valor),
    },  
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },  
    {
      title: "Criado em",
      dataIndex: "createdAt",
      key: "createdAt",
      sortDirections: ['descend'],

      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },    
  ];
};
