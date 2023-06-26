import moment from "moment";
import { StatusService } from "utils/statusService";

export const columnsPDF = [
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
        title: "Descrição",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Produto",
        dataIndex: "produto",
        key: "produto",
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
];
