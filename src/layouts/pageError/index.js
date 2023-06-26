import { Button, Result } from "antd";
import { useLocation, Link } from "react-router-dom";

function PageError() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Desculpe, algo deu errado."
      extra={
        <Link to="/authentication/sign-up">
        <Button  type="primary">
          Login
        </Button>
        </Link>
      }
    />
  );
}
export default PageError;
