import React from "react";
import { Tag } from "antd";

export const StatusFinance = ({ status }) => {
  switch (status) {
    case "entrada":
      return <Tag color="green">Entrada</Tag>;
    case "saida":
      return <Tag color="red">Saída</Tag>;
    case "saída":
      return <Tag color="red">Saída</Tag>;
    default:
      return "";
  }
};
