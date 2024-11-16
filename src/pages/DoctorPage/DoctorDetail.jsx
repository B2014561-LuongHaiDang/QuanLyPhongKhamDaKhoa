import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from 'react-router-dom';
import { getDetailsDoctor } from "../../services/DoctorService";
import { createSchedule } from "../../services/ScheduleService";
import Swal from 'sweetalert2';
import moment from "moment";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const DoctorDetail = () => {
    const user = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        birthday: user?.birthday || '',
        address: user?.address || '',
    });
    const navigate = useNavigate();
    const params = useParams();
    const query = useQuery();
    const [doctor, setDoctor] = useState(null);
    const time = query.get('time');
    const date = query.get('date');

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            const res = await getDetailsDoctor(params.id);
            setDoctor(res.data);
        };
        fetchDoctorDetails();
    }, [params.id]);

    useEffect(() => {
        if (!user.access_token) {
            Swal.fire({
                title: "Vui lòng đăng nhập",
                icon: "error",
            }).then(() => {
                navigate('/signin');
            });
        }
    }, [navigate, user]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const formatDateWithDayOfWeek = (dateString) => {
        return moment(dateString).locale('vi').format('dddd, DD/MM/YYYY');
    };

    const handleUpdate = async () => {
        const res = await createSchedule({
            userId: user.id,
            doctorId: params.id,
            date,
            time,
            ...formData
        });
        const message = res.status === "OK"
            ? { title: "Đăng ký khám thành công", icon: "success" }
            : { title: "Vui lòng nhập đầy đủ thông tin", icon: "error" };

        Swal.fire(message);
    };

    return (
        // <div className="bg-gradient-to-r from-green-200 via-blue-200 to-white min-h-screen">

        <div className="max-w-6xl mx-auto py-4 flex justify-center items-center ">
            <div className="flex flex-col items-center">
                {doctor && (
                    <>
                        <img
                            src={doctor.avatar}
                            alt="avatar"
                            className="h-48 w-48 rounded-full object-cover"
                        />
                        <p className="text-2xl font-bold">{doctor.name}</p>
                        <p className="text-lg font-bold">{doctor.specialist}</p>
                        <p className="mt-2 text-lg">Ngày đã chọn: {formatDateWithDayOfWeek(date)} vào lúc {time}</p>
                    </>
                )}
            </div>

            <div className="mt-3 space-y-6 p-6 rounded-lg shadow-lg bg-white w-[600px] mx-auto">
                <h2 className="flex justify-center items-center mt-3 text-lg font-semibold">Nhập thông tin bệnh nhân</h2>
                {['name', 'phone', 'birthday', 'address'].map((field) => (
                    <div className="my-4" key={field}>
                        <Label htmlFor={field} className="block text-sm font-medium text-gray-700">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Label>
                        <Input
                            id={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}

                <button
                    onClick={handleUpdate}
                    className="w-full py-3 px-6 mt-4 rounded-md bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
                >
                    Đặt lịch khám
                </button>
            </div>
            {/* </div> */}
        </div>

    );
};

export default DoctorDetail;
