import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";

const PatientList = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");

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
        // Lấy danh sách bệnh nhân
        const fetchUsers = async () => {
            try {
                const res = await UserService.getAllUser();
                const doctors = res.data.filter(user => !user.isDoctor);
                setUsers(doctors);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Lọc bệnh nhân dựa trên tên và email
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    return (
        <div className="  flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-7xl rounded-lg shadow-md flex">
                {/* Sidebar */}
                <div className="w-1/5 bg-gray-50 p-6">
                    <ul className="space-y-4">
                        <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>
                        {user?.isAdmin && (
                            <>
                                <li>
                                    <Link to={"/admin"} className="text-gray-600">Hồ Sơ</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/doctor-list"} className="text-gray-600">Danh sách bác sĩ</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/patient-list"} className="text-orange-500 font-semibold">Danh sách bệnh nhân</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/medicine-list"} className="text-gray-600">Thuốc</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/specialty-list"} className="text-gray-600">Chuyên khoa</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-4/5 p-6">
                    <h2 className="text-2xl font-semibold mb-6">Danh sách Bệnh nhân</h2>

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
                            placeholder="Tìm kiếm theo email"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Bảng danh sách bệnh nhân */}
                    <div className="w-full mt-8">
                        <div className="overflow-x-auto flex items-center justify-center">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">Email</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên</th>
                                        <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                                        <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                                        <th className="border border-gray-300 px-4 py-2">Ngày sinh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                                                <td className="border border-gray-300 px-4 py-2">{user.address}</td>
                                                <td className="border border-gray-300 px-4 py-2">{user.birthday}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center border border-gray-300 px-4 py-2">
                                                Không có bệnh nhân nào phù hợp
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal hiển thị thông tin chi tiết */}

        </div>
    );
};

export default PatientList;
