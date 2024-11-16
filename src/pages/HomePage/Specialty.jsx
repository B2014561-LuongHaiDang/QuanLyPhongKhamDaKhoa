import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as SpecialtyService from '../../services/SpecialtyService'; // Import service


const Specialty = () => {
    const [specialties, setSpecialties] = useState([]); // State để lưu các chuyên khoa
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu
    const user = useSelector(state => state.user); // Lấy thông tin user từ Redux (hoặc từ localStorage)

    useEffect(() => {
        // Lấy danh sách các chuyên khoa từ backend
        const fetchSpecialties = async () => {
            try {
                const res = await SpecialtyService.getAllSpecialties(); // Gọi service để lấy dữ liệu
                setSpecialties(res);
            } catch (error) {
                console.error("Failed to fetch specialties:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpecialties()


    }, []);

    return (
        <div className="container mx-auto mt-8 pb-10">


            {/* Hiển thị chuyên khoa cho người dùng không phải admin */}
            {!user?.isAdmin && (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Chuyên khoa</h2>
                    </div>

                    {loading ? (
                        <div className="text-center">Đang tải...</div>
                    ) : (
                        <div className="grid grid-cols-5 gap-6">
                            {specialties.length > 0 ? (
                                specialties.map((specialty) => (
                                    <div key={specialty._id} className="p-4 hover:scale-[1.1] transition-all bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
                                        <Link to={`/specialty-detail?specialtyId=${specialty._id}`} className="hover:no-underline flex flex-col items-center">
                                            <img
                                                src={specialty.avatar}  // Sử dụng avatar của chuyên khoa, nếu không có thì dùng ảnh mặc định
                                                alt={specialty.name}
                                                className="w-30 h-30 object-cover mb-3"
                                            />
                                            <h3 className="text-xl text-gray-800 font-semibold">
                                                {specialty.name}
                                            </h3>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center">Không có chuyên khoa nào</div>
                            )}
                        </div>
                    )}



                </>
            )}
        </div>
    );
}

export default Specialty;
