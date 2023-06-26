export const RoleService = ({ role }) => {
  switch (role) {
    case "financeiro":
      return "Financeiro";
    case "client":
      return "Cliente";
    case "admin":
      return "Admin";
    case "producao":
      return "Produção";
    case "aux-producao":
      return "Auxiliar de produção";
    case "comercial":
      return "Comercial";
    case "technical":
      return "Técnico";
    case "franchise":
      return "Franquia";
    default:
      return "Usuário";
  }
};

