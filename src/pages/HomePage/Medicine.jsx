import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as MedicineService from '../../services/MedicineService'; // Import service


const Medicine = () => {
    const [medicines, setMedicines] = useState([]); // State để lưu các chuyên khoa
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu
    const user = useSelector(state => state.user); // Lấy thông tin user từ Redux (hoặc từ localStorage)

    useEffect(() => {
        // Lấy danh sách các chuyên khoa từ backend
        const fetchMedicines = async () => {
            try {
                const res = await MedicineService.getAllMedicines(); // Gọi service để lấy dữ liệu
                setMedicines(res.data);
            } catch (error) {
                console.error("Failed to fetch medicines:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedicines()


    }, []);

    return (
        <div className="container mx-auto mt-8 pb-10">


            {/* Hiển thị chuyên khoa cho người dùng không phải admin */}
            {!user?.isAdmin && (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Thuốc</h2>
                    </div>

                    {loading ? (
                        <div className="text-center">Đang tải...</div>
                    ) : (
                        <div className="grid grid-cols-5 gap-6">
                            {medicines.length > 0 ? (
                                medicines.map((medicine) => (
                                    <div key={medicine._id} className="p-4 hover:scale-[1.1] transition-all bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
                                        {/* <Link to={`/medicine-detail?medicineId=${medicine._id}`} className="hover:no-underline flex flex-col items-center"> */}
                                        <img
                                            src={medicine.avatar}  // Sử dụng avatar của chuyên khoa, nếu không có thì dùng ảnh mặc định
                                            alt={medicine.name}
                                            className="w-24 h-24 object-cover mb-3"
                                        />
                                        <h3 className="text-xl text-gray-800 font-semibold">
                                            {medicine.name}
                                        </h3>
                                        <p className=" text-gray-800 font-semibold">
                                            {medicine?.uses}
                                        </p>
                                        {/* </Link> */}
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

export default Medicine;
