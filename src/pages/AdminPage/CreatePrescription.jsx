import { useState, useEffect } from 'react';
import * as PrescriptionService from '../../services/PrescriptionService';
import * as MedicineService from '../../services/MedicineService';
import * as UserService from '../../services/UserService';  // Giả sử bạn có service này để lấy thông tin người dùng
import * as DoctorService from '../../services/DoctorService';  // Giả sử bạn có service này để lấy thông tin bác sĩ
import { ReloadIcon } from '@radix-ui/react-icons';
import Swal from 'sweetalert2';

const CreatePrescription = () => {
    const [medicines, setMedicines] = useState([]); // Danh sách thuốc
    const [doctors, setDoctors] = useState([]); // Danh sách bác sĩ
    const [users, setUsers] = useState([]); // Danh sách bệnh nhân
    const [selectedMedicines, setSelectedMedicines] = useState([]); // Danh sách thuốc được chọn
    const [doctorId, setDoctorId] = useState(''); // Bác sĩ được chọn
    const [userId, setUserId] = useState(''); // Bệnh nhân được chọn
    const [loading, setLoading] = useState(false);

    // Lấy danh sách bác sĩ và bệnh nhân từ server
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const res = await MedicineService.getAllMedicines();
                setMedicines(res.data); // Lưu danh sách thuốc
            } catch (error) {
                console.error("Error fetching medicines:", error);
                Swal.fire({
                    title: "Lỗi",
                    text: "Không thể tải danh sách thuốc.",
                    icon: "error",
                });
            }
        };

        const fetchDoctors = async () => {
            try {
                const res = await DoctorService.getAllDoctor();  // Giả sử bạn có API này
                setDoctors(res.data); // Lưu danh sách bác sĩ
            } catch (error) {
                console.error("Error fetching doctors:", error);
                Swal.fire({
                    title: "Lỗi",
                    text: "Không thể tải danh sách bác sĩ.",
                    icon: "error",
                });
            }
        };

        const fetchUsers = async () => {
            try {
                const res = await UserService.getAllUser();  // Giả sử bạn có API này
                setUsers(res.data); // Lưu danh sách bệnh nhân
            } catch (error) {
                console.error("Error fetching users:", error);
                Swal.fire({
                    title: "Lỗi",
                    text: "Không thể tải danh sách bệnh nhân.",
                    icon: "error",
                });
            }
        };

        fetchMedicines();
        fetchDoctors();
        fetchUsers();
    }, []);

    // Xử lý khi tạo đơn thuốc
    const handleCreatePrescription = async () => {
        if (loading) return;
        setLoading(true);

        // Chuyển đổi dữ liệu thuốc và số lượng thành mảng
        const medicineDetails = selectedMedicines.map((medicine) => ({
            medicineId: medicine._id,
            quantity: medicine.quantity,
        }));

        try {
            const response = await PrescriptionService.createPrescription({
                doctorId,
                userId,
                medicineDetails,
            });

            // Kiểm tra kết quả trả về
            if (response.status === "OK") {
                Swal.fire({
                    title: "Thành công",
                    text: "Đơn thuốc đã được tạo thành công.",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Lỗi",
                    text: response.message,
                    icon: "error",
                });
            }

            setLoading(false);
        } catch {
            setLoading(false);
            Swal.fire({
                title: "Lỗi",
                text: "Đã xảy ra lỗi khi tạo đơn thuốc.",
                icon: "error",
            });
        }
    };

    // Thêm thuốc vào đơn thuốc
    const handleAddMedicine = (medicine) => {
        setSelectedMedicines((prevMedicines) => {
            // Kiểm tra thuốc đã được thêm vào chưa
            if (!prevMedicines.find((item) => item._id === medicine._id)) {
                return [...prevMedicines, { ...medicine, quantity: 1 }];
            }
            return prevMedicines;
        });
    };

    // Xử lý thay đổi số lượng thuốc
    const handleQuantityChange = (medicineId, newQuantity) => {
        setSelectedMedicines((prevMedicines) =>
            prevMedicines.map((medicine) =>
                medicine._id === medicineId ? { ...medicine, quantity: Math.max(1, newQuantity) } : medicine
            )
        );
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-8">
                <h2 className="text-2xl font-semibold text-center mb-4">Tạo đơn thuốc</h2>
                <form>
                    <div className="space-y-4">
                        {/* Chọn bác sĩ */}
                        <div>
                            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">Chọn bác sĩ</label>
                            <select
                                id="doctorId"
                                value={doctorId}
                                onChange={(e) => setDoctorId(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full"
                            >
                                <option value="">Chọn bác sĩ</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Chọn bệnh nhân */}
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">Chọn bệnh nhân</label>
                            <select
                                id="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full"
                            >
                                <option value="">Chọn bệnh nhân</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>{user.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Chọn thuốc */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Chọn thuốc</label>
                            <select
                                onChange={(e) => handleAddMedicine(medicines.find(m => m._id === e.target.value))}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full"
                            >
                                <option value="">Chọn thuốc</option>
                                {medicines.map((medicine) => (
                                    <option key={medicine._id} value={medicine._id}>{medicine.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Hiển thị thuốc đã chọn */}
                        <div className="space-y-2 mt-4">
                            {selectedMedicines.map((medicine) => (
                                <div key={medicine._id} className="flex items-center justify-between">
                                    <span>{medicine.name}</span>
                                    <input
                                        type="number"
                                        value={medicine.quantity}
                                        min="1"
                                        max={medicine.stock} // Giới hạn số lượng thuốc không vượt quá số lượng trong kho
                                        onChange={(e) => handleQuantityChange(medicine._id, e.target.value)}
                                        className="w-16 p-1 border rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
                <div className="mt-6">
                    {loading ? (
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg flex justify-center items-center" disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Đang tạo đơn thuốc...
                        </button>
                    ) : (
                        <button
                            onClick={handleCreatePrescription}
                            disabled={!doctorId || !userId || selectedMedicines.length === 0}
                            className={`w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ${!(doctorId && userId && selectedMedicines.length > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Tạo đơn thuốc
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePrescription;
