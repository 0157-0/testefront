import axios from "axios";

export default class UserServices {
  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:3001",
    });
  }

  async login(dados) {
    const { data } = await this.axios.post("/auth/authenticate", dados);

    if (data) {
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("token", data.token.token);

      return true;
    }

    return;
  }

  async cadastrar(dados) {
    return this.axios.post("/auth/register", dados);
  }

  usuarioAutenticado() {
    return localStorage.getItem("token") != undefined ? true : false;
    // return typeof localStorage.getItem("token")
  }

  //Desafio ---> implemente um botão que chama essa função dentro da página Home
  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  }
}
