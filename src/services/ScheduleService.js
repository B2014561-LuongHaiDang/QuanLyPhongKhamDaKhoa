import axios from "axios"

export const axiosJwt = axios.create()

export const createSchedule = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/schedule`, data)
    return res.data
}

// ScheduleService.js (Frontend)
export const updateSchedule = async (id, status, diagnosis, evaluate) => {
    const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/schedule/${id}`,
        { status, diagnosis, evaluate } // Gửi tất cả các trường cần cập nhật
    );
    return res.data;
};


export const getAllSchedule = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/schedule`)
    return res.data
}

export const getDetailsSchedule = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/schedule/${id}`)
    return res.data
}

export const getByUserId = async (userId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/schedule/user/${userId}`)
    return res.data
}

export const getByDoctorId = async (doctorId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/schedule/doctor/${doctorId}`)
    return res.data
}