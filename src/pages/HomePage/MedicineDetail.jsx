import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as MedicineService from '../../services/MedicineService';

function MedicineDetail() {
    const location = useLocation();
    // const navigate = useNavigate();  // Dùng để chuyển hướng đến trang khác
    const [medicine, setMedicine] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const medicineId = queryParams.get('medicineId');

    useEffect(() => {
        if (medicineId) {
            const fetchMedicine = async () => {
                try {
                    const response = await MedicineService.getDetailsMedicine(medicineId);
                    setMedicine(response);
                } catch (error) {
                    console.error('Failed to fetch medicine details:', error);
                }
            };
            fetchMedicine();
        }
    }, [medicineId]);

    // const handleGoToDoctorPage = () => {
    //     // Chuyển đến trang bác sĩ, truyền chuyên khoa qua URL
    //     navigate(`/doctor?medicine=${medicine.name}`);
    // };

    if (!medicine) {
        return <div className="text-center">Đang tải...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center pb-10">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl my-20">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-4 rounded-full -mt-10 mb-4 flex items-center space-x-4 border border-blue-300">

                        <h1 className="text-4xl font-bold text-gray-800">{medicine.name}</h1>
                    </div>

                    <p className="text-xl text-gray-600 text-center mt-4">Công dụng: {medicine.uses}</p>
                    <p className="text-xl text-gray-600 text-center mt-4">Thành phần: {medicine.ingredient}</p>
                    {/* Nút "Khám bệnh" */}

                    {/* <button
                        onClick={handleGoToDoctorPage}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition"
                    >
                        Đặt lịch khám bệnh
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default MedicineDetail;
