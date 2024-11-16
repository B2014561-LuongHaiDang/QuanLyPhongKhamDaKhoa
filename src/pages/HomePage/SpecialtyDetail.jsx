import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as SpecialtyService from '../../services/SpecialtyService';

function SpecialtyDetail() {
    const location = useLocation();
    const navigate = useNavigate();  // Dùng để chuyển hướng đến trang khác
    const [specialty, setSpecialty] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const specialtyId = queryParams.get('specialtyId');

    useEffect(() => {
        if (specialtyId) {
            const fetchSpecialty = async () => {
                try {
                    const response = await SpecialtyService.getDetailsSpecialty(specialtyId);
                    setSpecialty(response);
                } catch (error) {
                    console.error('Failed to fetch specialty details:', error);
                }
            };
            fetchSpecialty();
        }
    }, [specialtyId]);

    const handleGoToDoctorPage = () => {
        // Chuyển đến trang bác sĩ, truyền chuyên khoa qua URL
        navigate(`/doctor?specialty=${specialty.name}`);
    };

    if (!specialty) {
        return <div className="text-center">Đang tải...</div>;
    }

    return (
        <div className=" flex items-center justify-center pb-10">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl my-20">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-4 rounded-full -mt-10 mb-4 flex items-center space-x-4 border border-blue-300">
                        <img
                            src={specialty.avatar || 'default-image.jpg'}
                            alt={specialty.name}
                            className="w-24 h-24 object-cover bg-transparent"
                        />
                        <h1 className="text-4xl font-bold text-gray-800">{specialty.name}</h1>
                    </div>

                    <p className="text-xl text-gray-600 text-center mt-4">{specialty.description}</p>
                    <p className="text-xl text-gray-600 text-center mt-4">Nếu bạn muốn đặt lịch khám bệnh, vui lòng chọn Đặt lịch khám bệnh bên dưới và chọn Bác sĩ</p>
                    {/* Nút "Khám bệnh" */}

                    <button
                        onClick={handleGoToDoctorPage}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition"
                    >
                        Đặt lịch khám bệnh
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SpecialtyDetail;
