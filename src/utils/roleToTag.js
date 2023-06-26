import React from "react";
import { Tag } from "antd";

export const RoleToTag = ({ role }) => {
  switch (role) {
    case "admin":
      return <Tag color="purple">Admin</Tag>;
    case "franchise":
      return <Tag color="blue">Franquia</Tag>;
    case "client":
      return <Tag color="green">Cliente</Tag>;
    case "technical":
      return <Tag color="gray">Técnico</Tag>;
    default:
      return "";
  }
};
