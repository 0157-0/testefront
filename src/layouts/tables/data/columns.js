import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Masks from "utils/masks";
import { useLocation, Link } from "react-router-dom";
import { StatusService } from "utils/statusService";
import { useRouter } from "next/router";
import axios from "axios";

export const columns = (fetchData, router) => {

  return [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusService status={status} />,
    },
    {
      title: "Titulo",
      dataIndex: "title",
      key: "title",

    },
    {
      title: "Produto",
      dataIndex: "produto",
      key: "produto",

    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Empresa",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Criado em",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Ações",
      dataIndex: "id",
      render: (id) => {
        return (
          <div className="uk-flex">
            <Link href={`/services/id=${id}`}>
            <EditIcon />
            </Link>
            <DeleteForeverIcon id={id} fetchData={fetchData} />
          </div>
        );
      },
    },
  ];
};
