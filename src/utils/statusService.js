import React from "react";
import { Tag } from "antd";

export const StatusService = ({ status }) => {
  switch (status) {
    case "a fazer":
      return <Tag color="red">A fazer</Tag>;
    case "aguardando":
      return <Tag color="purple">Aguardando</Tag>;
    case "feito":
      return <Tag color="green">Feito</Tag>;
    case "fazendo":
      return <Tag color="orange">Fazendo</Tag>;
    default:
      return "";
  }
};
