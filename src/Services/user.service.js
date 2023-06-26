import api from "./api";


const single = async (id) => await api.get(`usuarios/${id}`);

const update = async (id, payload) => await api.put(`usuarios/${id}`, payload);

const getAll = async (query = "") => await api.get("/usuarios" + query);

const getById = async (id) => await api.get("usuarios/" + id);

const remove = async (id) => await api.delete(`usuarios/${id}`);

export const usersManage = {
  single,
  update,
  getAll,
  remove,
  getById,
};
