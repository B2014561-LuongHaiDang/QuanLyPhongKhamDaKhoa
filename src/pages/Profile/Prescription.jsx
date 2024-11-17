
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as ScheduleService from '../../services/ScheduleService'
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import moment from "moment";

const History = () => {
    const user = useSelector((state) => state.user)

    const [history, setHistory] = useState()

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalData, setModalData] = useState(false);

    const openModal = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (!user.access_token) {

            navigate('/signin')
        };

    }, [navigate, user])

    useEffect(() => {
        ScheduleService.getByUserId(user.id).then(res => {
            setHistory(res.data)
        })

    }, [user.id])


    return (
        <div className="min-h-screen  flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-7xl rounded-lg shadow-md flex">

                {/* Sidebar */}
                <div className="w-1/4 bg-gray-50 p-6">
                    <ul className="space-y-4">
                        <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>
                        <li>
                            <Link to={"/profile"} className="text-gray-600">Hồ Sơ</Link>
                        </li>
                        <li>
                            <Link to={"/profile/history"} className=" text-orange-500 font-semibold">Lịch sử khám</Link>
                        </li>
                        {user?.isDoctor && (
                            <>
                                <li>

                                    <Link to={"/profile/schedule"} className=" text-gray-600">Tạo lịch khám bệnh</Link>
                                </li>
                                <li>

                                    <Link to={"/profile/patient-list"} className=" text-gray-600">Danh sách bệnh nhân</Link>
                                </li>

                            </>
                        )}

                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-6">
                    <h2 className="text-2xl font-semibold mb-6">Lịch sử khám bệnh</h2>

                    <div className="w-full mt-8">

                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">Doctor Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Specialist</th>
                                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                                        <th className="border border-gray-300 px-4 py-2">Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                                        <th className="border border-gray-300 px-4 py-2">Xem chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history && history.map((item) => (
                                        <tr key={item._id}>
                                            <td className="border border-gray-300 px-4 py-2">{item.doctor.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.doctor.specialist}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.user.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">

                                                {item.status === false ? "Chưa khám" : "Đã khám"}

                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">

                                                <button
                                                    className=" text-black px-4 py-2 rounded flex justify-center items-center"
                                                    onClick={() => openModal(item)}
                                                >
                                                    <Eye />
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>

            {isModalOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 max-w-sm w-full">


                        <h2 className="text-lg font-bold mb-4">Chi tiết thông tin</h2>
                        <p><strong>Bác sĩ:</strong> {modalData?.doctor.name}</p>
                        <p><strong>Người dùng:</strong> {modalData?.user.name}</p>
                        <p><strong>Ngày sinh:</strong> {modalData?.birthday}</p>
                        <p><strong>Địa chỉ:</strong> {modalData?.address}</p>
                        <p><strong>Số điện thoại:</strong> {modalData?.phone}</p>
                        <p><strong>Ngày khám:</strong> {moment(modalData?.date).format('DD/MM/YYYY')}</p>

                        <p><strong>Giờ khám:</strong> {modalData?.time}</p>
                        <p className="mb-4"></p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>


                    </div>
                </div>
            }

        </div>
    );
};

export default History;
