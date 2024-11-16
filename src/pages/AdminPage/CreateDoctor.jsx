import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import * as UserService from "../../services/UserService";

const PatientList = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthday: '',
        address: '',
        phone: ''
    });

    useEffect(() => {
        if (!user.access_token) {
            navigate('/signin');
        }
    }, [navigate, user]);

    useEffect(() => {
        UserService.getAllUser().then(res => {
            setUsers(res.data);
        });
    }, []);

    const [users, setUsers] = useState([]);

    const openModal = (data) => {
        setModalData(data);
        setFormData({
            name: data.name || '',
            email: data.email || '',
            birthday: data.birthday || '',
            address: data.address || '',
            phone: data.phone || ''
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        UserService.updateUser(modalData._id, formData)
            .then(() => {
                // Refresh user list or update UI accordingly
                setUsers(users.map(user => user._id === modalData._id ? { ...user, ...formData } : user));
                closeModal();
            })
            .catch(err => {
                console.error('Error updating user:', err);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-5xl rounded-lg shadow-md flex">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-50 p-6">
                    <ul className="space-y-4">
                        <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>
                        <li><Link to={"/admin"} className="text-gray-600">Hồ Sơ</Link></li>
                        {user?.isAdmin && (
                            <>
                                <li><Link to={"/admin/doctor-list"} className="text-gray-600">Danh sách bác sĩ</Link></li>
                                <li><Link to={"/admin/patient-list"} className="text-orange-500 font-semibold">Danh sách bệnh nhân</Link></li>
                                <li><Link to={"/admin/medicine-list"} className="text-gray-600">Thuốc</Link></li>
                            </>
                        )}
                        <li className="text-gray-600">Địa Chỉ</li>
                        <li className="text-gray-600">Đổi Mật Khẩu</li>
                        <li className="text-gray-600">Cài Đặt Thông Báo</li>
                        <li className="text-gray-600">Những Thiết Lập Riêng Tư</li>
                        <li className="text-gray-600">Đơn Mua</li>
                        <li className="text-gray-600">Thông Báo</li>
                        <li className="text-gray-600">Kho Voucher</li>
                        <li className="text-gray-600">Shopee Xu</li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-6">
                    <h2 className="text-2xl font-semibold mb-6">Danh sách Bệnh nhân</h2>
                    <div className="w-full mt-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="px-6 py-3 text-left font-semibold">Email</th>
                                        <th className="px-6 py-3 text-left font-semibold">Xem Chi Tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((item) => (
                                            <tr key={item._id} className="hover:bg-gray-50">
                                                <td className="border-t px-6 py-4">{item.email}</td>
                                                <td className="border-t px-6 py-4">
                                                    <button
                                                        className="text-blue-500 hover:underline"
                                                        onClick={() => openModal(item)}
                                                    >
                                                        <Eye className="inline" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="text-center p-6 text-gray-500">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Chỉnh sửa thông tin</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded"
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Ngày sinh</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded"
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Lưu thay đổi
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                                onClick={closeModal}
                            >
                                Hủy
                            </button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default PatientList;
