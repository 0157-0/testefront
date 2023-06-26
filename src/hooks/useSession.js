import moment from "moment";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { Cookies } from "infra/cookies";
import { sessionService } from "Services/session.service";
import { useNavigate } from "react-router-dom";



export const useSession = () => {
    const navigate = useNavigate();

  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  let session = {};

  useEffect(() => {
    session = Cookies.get("ST$S");
  }, []);

  const continueSession = async () => {
    const session = await Cookies.get("ST$S");
   
    if (!!session) {
      setLoading(true);
      user.dispatch({
        type: "HANDLE_USER",
        payload: session,
      });
      notification.success({
        message: "Bem vindo de volta!",
      });
       return navigate("/dashboard");
    }
  };

  const fetchSession = (email, password, saveAccess) => {
    if (loading) return;

    setLoading(true);
    sessionService
      .login(email, password)
      .then((res) => {
        if (!!saveAccess) {
          Cookies.set(
            "ST$L",
            {
              email,
              password,
            },
            { expires: 1 }
          );
        } else {
          Cookies.remove("ST$L");
        }
        let user = res.data.user;

        
        delete user?.tokens
        Cookies.set(
          "ST$S",
          {
            token: res.data.token,
            ...user,
            logged: true,
            validate: moment(new Date())
              .add("30", "days")
              .format("DD/MM/YYYY HH:mm:ss"),
          },
          { expires: 30 }
        );
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
        if (err && err?.response?.data) {
          notification.error({
            message: "E-mail ou senha inválidos",
          });
        } else {
          notification.error({
            message: "Alguma coisa deu errado no hora de logar",
          });
        }
      });
  };

  useEffect(() => {
    continueSession();
  }, []);

  return [fetchSession, loading];
};
