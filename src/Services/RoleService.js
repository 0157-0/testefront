import api from "./api";

const create = async (payload) => await api.post(`cargos/`, payload);

const update = async (id, payload) => await api.put(`cargos/${id}`, payload);

const getAll = async (query = "") => await api.get("cargos/" + query);

const getById = async (id) => await api.get("cargos/" + id);

const remove = async (id) => await api.delete(`cargos/${id}`);

export const roleServices = {
  create,
  update,
  getAll,
  remove,
  getById,
};
