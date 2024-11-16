import axios from "axios"

export const axiosJwt = axios.create()

export const createMedicine = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/medicine`, data,)
    return res.data
}

export const updateMedicine = async (id, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/medicine/${id}`, data);
    return res.data;
};

export const getAllMedicines = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/medicine`)
    return res.data
}

export const getDetailsMedicine = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/medicine/${id}`)
    return res.data
}

export const deleteMedicine = async (id) => {
    const res = await axiosJwt.delete(`${import.meta.env.VITE_API_URL}/medicine/${id}`);
    return res.data;
};