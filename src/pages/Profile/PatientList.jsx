import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as ScheduleService from '../../services/ScheduleService';
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { NotebookPen } from "lucide-react";

const PatientList = () => {
    const user = useSelector((state) => state.user);
    const [history, setHistory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    // Thêm các state cho status, diagnosis và evaluate
    const [newStatus, setNewStatus] = useState(false);
    const [newDiagnosis, setNewDiagnosis] = useState("");
    const [newEvaluate, setNewEvaluate] = useState("");

    const navigate = useNavigate();

    const openModal = (data) => {
        setModalData(data);
        setNewStatus(data.status);
        setNewDiagnosis(data.diagnosis || ""); // Hiển thị thông tin diagnosis hiện tại nếu có
        setNewEvaluate(data.evaluate || ""); // Hiển thị thông tin evaluate hiện tại nếu có
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdateSchedule = async (id) => {
        try {
            // Nếu là người dùng bình thường, không thể chỉnh sửa trạng thái hoặc diagnosis
            if (!user.isDoctor) {
                // Người dùng bình thường chỉ có thể chỉnh sửa đánh giá khi trạng thái là "Đã khám"
                if (newStatus === true && !newEvaluate) {
                    Swal.fire({
                        text: "Bạn cần nhập đánh giá khi trạng thái là 'Đã khám'.",
                        icon: "warning",
                    });
                    return;
                }
                // Nếu trạng thái đã được chọn là "Đã khám", cho phép chỉnh sửa đánh giá
                if (newStatus === true && newEvaluate) {
                    const response = await ScheduleService.updateSchedule(id, newStatus, null, newEvaluate);
                    if (response.status === 'SUCCESS') {
                        Swal.fire({
                            text: "Cập nhật đánh giá thành công",
                            icon: "success",
                        });
                        setHistory((prevHistory) =>
                            prevHistory.map((item) =>
                                item._id === id ? { ...item, evaluate: newEvaluate } : item
                            )
                        );
                        closeModal();
                    }
                }
                return;
            }

            // Nếu là bác sĩ, có quyền chỉnh sửa trạng thái, chẩn đoán và đánh giá
            const response = await ScheduleService.updateSchedule(id, newStatus, newDiagnosis, newEvaluate);
            if (response.status === 'SUCCESS') {
                Swal.fire({
                    text: "Cập nhật thành công",
                    icon: "success",
                });
                setHistory((prevHistory) =>
                    prevHistory.map((item) =>
                        item._id === id ? { ...item, status: newStatus, diagnosis: newDiagnosis, evaluate: newEvaluate } : item
                    )
                );
                closeModal();
            }
        } catch (error) {
            console.error("Error updating schedule:", error);
        }
    };

    useEffect(() => {
        if (!user.access_token) {
            navigate('/signin');
        }
    }, [navigate, user]);

    useEffect(() => {
        ScheduleService.getByDoctorId(user.doctor._id).then((res) => {
            setHistory(res.data);
        });
    }, [user]);

    const formatDateWithDayOfWeek = (dateString) => {
        return moment(dateString).locale('vi').format('dddd, DD/MM/YYYY');
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-5xl rounded-lg shadow-md flex">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-50 p-6">
                    <ul className="space-y-4">
                        <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>
                        <li>
                            <Link to={"/profile"} className="text-gray-600">Hồ Sơ</Link>
                        </li>
                        <li>
                            <Link to={"/profile/history"} className=" text-gray-600">Lịch sử khám</Link>
                        </li>
                        {user?.isDoctor && (
                            <>
                                <li>
                                    <Link to={"/profile/schedule"} className=" text-gray-600">Tạo lịch khám bệnh</Link>
                                </li>
                                <li>
                                    <Link to={"/profile/patient-list"} className=" text-orange-500 font-semibold">Danh sách bệnh nhân</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-6">
                    <h2 className="text-2xl font-semibold mb-6">Danh sách bệnh nhân</h2>

                    <div className="w-full mt-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">Ngày khám</th>
                                        <th className="border border-gray-300 px-4 py-2">Giờ khám</th>
                                        <th className="border border-gray-300 px-4 py-2">Ngày sinh</th>
                                        <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                                        <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên bệnh nhân</th>
                                        <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                                        <th className="border border-gray-300 px-4 py-2">Chi tiết, Cập nhật</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history && history.map((item) => (
                                        <tr key={item._id}>
                                            <td className="border border-gray-300 px-4 py-2">{formatDateWithDayOfWeek(item.date)}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.time}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.birthday}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.address}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
                                            <td className="border border-gray-300 px-4 py-2">{item.user.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.status === false ? "Chưa khám" : "Đã khám"}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <button
                                                    className="text-black px-4 py-2 rounded"
                                                    onClick={() => openModal(item)}
                                                >
                                                    <NotebookPen />
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

            {/* Modal chi tiết */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Cập nhật thông tin</h2>
                        <p><strong>Bác sĩ:</strong> {modalData?.doctor.name}</p>
                        <p><strong>Người dùng:</strong> {modalData?.user.name}</p>
                        <p><strong>Ngày sinh:</strong> {modalData?.birthday}</p>
                        <p><strong>Địa chỉ:</strong> {modalData?.address}</p>
                        <p><strong>Số điện thoại:</strong> {modalData?.phone}</p>

                        <div className="mt-4">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái:</label>
                            <select
                                id="status"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value === 'true')}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                disabled={!user.isDoctor} // Disable nếu không phải bác sĩ
                            >
                                <option value="false">Chưa khám</option>
                                <option value="true">Đã khám</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">Chẩn đoán:</label>
                            <textarea
                                id="diagnosis"
                                value={newDiagnosis}
                                onChange={(e) => setNewDiagnosis(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                disabled={!user.isDoctor || newStatus === false} // Disable nếu không phải bác sĩ
                            ></textarea>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="evaluate" className="block text-sm font-medium text-gray-700">Đánh giá:</label>
                            <textarea
                                id="evaluate"
                                value={newEvaluate}
                                onChange={(e) => setNewEvaluate(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                disabled={user.isDoctor} // Chỉ cho phép chỉnh sửa đánh giá khi đã khám
                            ></textarea>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={closeModal}
                            >
                                Đóng
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => handleUpdateSchedule(modalData?._id)}
                            >
                                Cập nhật thông tin
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientList;
