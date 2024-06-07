import api from "../api-settings";

export const create = (payload) => api.post(`/projects/create`, payload)
export const getByName = (name) => api.get(`/projects/get/name/${name}`)

const projectsRoutes = {
    create,
    getByName,
}

export default projectsRoutes