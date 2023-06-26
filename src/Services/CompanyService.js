import api from "./api";

const create = async (payload) => await api.post(`empresa/`, payload);

const update = async (id, payload) => await api.put(`empresa/${id}`, payload);

const getAll = async (query = "") => await api.get("empresa/" + query);

const getById = async (id) => await api.get("empresa/" + id);

const remove = async (id) => await api.delete(`empresa/${id}`);

export const companyServices = {
  create,
  update,
  getAll,
  remove,
  getById,
};
