import api from "./api";

const create = async (payload) => await api.post(`services/`, payload);

const update = async (id, payload) => await api.put(`services/${id}`, payload);

const getAll = async (query = "") => await api.get("services/" + query);

const getById = async (id) => await api.get("services/" + id);

const remove = async (id) => await api.delete(`services/${id}`);

export const serviceServices = {
  create,
  update,
  getAll,
  remove,
  getById,
};
