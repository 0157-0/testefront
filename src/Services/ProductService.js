import api from "./api";

const create = async (payload) => await api.post(`produto/`, payload);

const update = async (id, payload) => await api.put(`produto/${id}`, payload);

const getAll = async (query = "") => await api.get("produto/" + query);

const getById = async (id) => await api.get("produto/" + id);

const remove = async (id) => await api.delete(`produto/${id}`);

export const productServices = {
  create,
  update,
  getAll,
  remove,
  getById,
};
