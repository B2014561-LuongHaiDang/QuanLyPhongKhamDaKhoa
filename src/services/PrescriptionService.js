import axios from "axios";

export const axiosJwt = axios.create();

// Tạo toa thuốc mới
export const createPrescription = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/prescription/create`, data);
    return res.data;
};

// Cập nhật toa thuốc
export const updatePrescription = async (id, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/prescription/update-status`, { id, ...data });
    return res.data;
};

// Lấy tất cả các toa thuốc
export const getAllPrescriptions = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/prescription`);
    return res.data;
};

// Lấy chi tiết toa thuốc
export const getDetailsPrescription = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/prescription/${id}`);
    return res.data;
};
