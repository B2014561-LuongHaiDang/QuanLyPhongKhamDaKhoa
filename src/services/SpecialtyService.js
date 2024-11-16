import axios from "axios";

// Tạo axios instance
export const axiosJwt = axios.create();

// API tạo mới chuyên khoa
export const createSpecialty = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/specialty`, data);
    return res.data;
}

// API cập nhật chuyên khoa theo ID
export const updateSpecialty = async (id, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/specialty/${id}`, data);
    return res.data;
};

// API lấy tất cả chuyên khoa
export const getAllSpecialties = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/specialty`);
    return res.data;
}

// API lấy chi tiết chuyên khoa theo ID
export const getDetailsSpecialty = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/specialty/${id}`);
    return res.data;
}

// API xóa chuyên khoa theo ID
export const deleteSpecialty = async (id) => {
    const res = await axiosJwt.delete(`${import.meta.env.VITE_API_URL}/specialty/${id}`);
    return res.data;
};
