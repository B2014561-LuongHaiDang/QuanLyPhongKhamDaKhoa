import axios from "axios"

export const axiosJwt = axios.create()

export const createDoctor = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/doctor`, data)
    return res.data
}

export const updateDoctor = async (id, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/doctor/${id}`, data)
    return res.data
}

export const getAllDoctor = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctor`)
    return res.data
}

export const getDetailsDoctor = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/${id}`)
    return res.data
}