import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as MedicineService from '../../services/MedicineService'; // Import service
import { Link } from 'react-router-dom';

const Medicine = () => {
    const [medicines, setMedicines] = useState([]); // State để lưu các chuyên khoa
    const [filteredMedicines, setFilteredMedicines] = useState([]); // State lưu danh sách đã lọc
    const [searchTerm, setSearchTerm] = useState(''); // State lưu giá trị tìm kiếm
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu
    const user = useSelector(state => state.user); // Lấy thông tin user từ Redux (hoặc từ localStorage)

    useEffect(() => {
        // Lấy danh sách các thuốc từ backend
        const fetchMedicines = async () => {
            try {
                const res = await MedicineService.getAllMedicines(); // Gọi service để lấy dữ liệu
                setMedicines(res.data);
                setFilteredMedicines(res.data); // Cập nhật danh sách thuốc đã tải
            } catch (error) {
                console.error("Failed to fetch medicines:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedicines();
    }, []);

    // Hàm xử lý tìm kiếm theo tên và công dụng
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);

        // Lọc danh sách thuốc theo tên và công dụng
        const filtered = medicines.filter(medicine =>
            medicine.name.toLowerCase().includes(query) ||
            medicine.uses.toLowerCase().includes(query)
        );
        setFilteredMedicines(filtered);
    };

    return (
        <div className=" min-h-screen container mx-auto mt-8 pb-10">
            {/* Hiển thị chuyên khoa cho người dùng không phải admin */}
            {!user?.isAdmin && (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Thuốc</h2>
                    </div>
                    <div className="mb-4">
                        {/* Thanh tìm kiếm */}
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc công dụng..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {loading ? (
                        <div className="text-center">Đang tải...</div>
                    ) : (
                        <div className="grid grid-cols-5 gap-6">
                            {filteredMedicines.length > 0 ? (
                                filteredMedicines.map((medicine) => (
                                    <div key={medicine._id} className="p-4 hover:scale-[1.1] transition-all bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
                                        <Link to={`/medicine-detail?medicineId=${medicine._id}`} className="hover:no-underline flex flex-col items-center">
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
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center">Không có thuốc nào phù hợp với tìm kiếm</div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Medicine;
