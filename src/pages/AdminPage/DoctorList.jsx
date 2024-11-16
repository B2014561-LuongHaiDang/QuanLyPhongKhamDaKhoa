import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import * as UserService from "../../services/UserService";

const DoctorList = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchSpecialist, setSearchSpecialist] = useState("");

    useEffect(() => {
        // Kiểm tra quyền truy cập
        if (!user.access_token) {
            Swal.fire({
                title: "Thông báo",
                text: "Bạn cần đăng nhập để tiếp tục!",
                icon: "error",
            }).then(() => {
                navigate("/signin");
            });
        }
    }, [navigate, user]);

    useEffect(() => {
        // Lấy danh sách người dùng và lọc ra bác sĩ
        const fetchDoctors = async () => {
            try {
                const res = await UserService.getAllUser();
                const doctorList = res.data.filter((user) => user?.isDoctor);
                setDoctors(doctorList);
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    // Lọc bác sĩ dựa trên tên và chuyên ngành
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchName.toLowerCase()) &&
        doctor.doctor?.specialist.toLowerCase().includes(searchSpecialist.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-5xl rounded-lg shadow-md flex">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-50 p-6">
                    <ul className="space-y-4">
                        <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>
                        <li>
                            <Link to={"/admin"} className="text-gray-600">Hồ Sơ</Link>
                        </li>
                        {user?.isAdmin && (
                            <>
                                <li>
                                    <Link to={"/admin/doctor-list"} className="text-orange-500 font-semibold">Danh sách bác sĩ</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/patient-list"} className="text-gray-600">Danh sách bệnh nhân</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/medicine-list"} className="text-gray-600">Thuốc</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-6">
                    <h2 className="text-2xl font-semibold mb-6">Danh sách Bác sĩ</h2>

                    {/* Thanh tìm kiếm */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded mr-4"
                        />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo chuyên ngành"
                            value={searchSpecialist}
                            onChange={(e) => setSearchSpecialist(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Bảng danh sách bác sĩ */}
                    <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Danh sách bác sĩ</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">Email</th>
                                        <th className="border px-4 py-2 text-left">Tên</th>
                                        <th className="border px-4 py-2 text-left">Chuyên ngành</th>
                                        <th className="border px-4 py-2 text-left">Chi tiết</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDoctors.length > 0 ? (
                                        filteredDoctors.map((doctor) => (
                                            <tr key={doctor._id}>
                                                <td className="border px-4 py-2">{doctor.email}</td>
                                                <td className="border px-4 py-2">{doctor.name}</td>
                                                <td className="border px-4 py-2">{doctor.doctor?.specialist}</td>
                                                <td className="border px-4 py-2">
                                                    <Link to={`/doctor/${doctor.doctor._id}`} className="text-blue-500 hover:underline">
                                                        <Eye />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center border border-gray-300 px-4 py-2">
                                                Không có bác sĩ nào phù hợp
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorList;
