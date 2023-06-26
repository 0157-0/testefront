import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Masks from "utils/masks";
import { useCallback } from "react";
import { notification } from "antd";
import { usersManage } from "Services/user.service";

export const columns = (fetchData, router) => {



  return [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",      
    },
    {
      title: "Contato",
      dataIndex: "celular",
      key: "celular",

    },
    {
      title: "Criado em",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => moment(created_at).format("DD/MM/YYYY"),
    },
    {
      title: "Ações",
      dataIndex: "id",
      render: (id) => {
        return (
          <div className="uk-flex">
            {/* <Link href={`/admin/motoristas/editar?id=${id}&customer_id=${router.query.customer_id}`}> */}
              <EditIcon />
            {/* </Link> */}
            <DeleteForeverIcon id={id} fetchData={fetchData} />
          </div>
        );
      },
    },
  ];
};
