import api from "./api";

const create = async (payload) => await api.post(`finances/`, payload);

const update = async (id, payload) => await api.put(`finances/${id}`, payload);

const getAll = async (query = "") => await api.get("finances/" + query);

const getById = async (id) => await api.get("finances/" + id);

const remove = async (id) => await api.delete(`finances/${id}`);

export const financeServices = {
  create,
  update,
  getAll,
  remove,
  getById,
};
