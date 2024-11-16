import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import * as MedicineService from '../../services/MedicineService';
import { ReloadIcon } from '@radix-ui/react-icons';
import Swal from 'sweetalert2';

const CreateMedicine = () => {
    // const navigate = useNavigate();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [expiry, setExpiry] = useState('');
    // const [status, setStatus] = useState('');
    const [uses, setUses] = useState('');


    const [loading, setLoading] = useState(false);

    const handleCreateMedicine = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await MedicineService.createMedicine({
                name,
                quantity,
                ingredient,
                expiry,
                uses,
            });

            setLoading(false);

            if (res && res.status === "OK") {
                // navigate('/medicine-list'); // Điều hướng tới trang danh sách thuốc sau khi tạo thành công
            } else if (res && res.status === "ERR") {
                Swal.fire({
                    title: "Thông báo",
                    text: "Thuốc đã tồn tại",
                    icon: "error",
                });
            }
        } catch {
            setLoading(false);
            Swal.fire({
                title: "Lỗi",
                text: "Đã xảy ra lỗi khi tạo thuốc",
                icon: "error",
            });
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-8">
                <h2 className="text-2xl font-semibold text-center mb-4">Nhập thông tin thuốc</h2>
                <form>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên thuốc</label>
                            <input
                                id="name"
                                type="text"
                                required
                                placeholder="Tên thuốc"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Số lượng</label>
                            <input
                                id="quantity"
                                type="number"
                                required
                                placeholder="Số lượng"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700">Thành phần</label>
                            <input
                                id="ingredient"
                                type="text"
                                required
                                placeholder="Thành phần"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Ngày hết hạn</label>
                            <input
                                id="expiry"
                                type="date"
                                required
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="uses" className="block text-sm font-medium text-gray-700">Công dụng</label>
                            <input
                                id="uses"
                                type="text"
                                required
                                value={uses}
                                onChange={(e) => setUses(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                    </div>
                </form>
                <div className="mt-6">
                    {loading ? (
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg flex justify-center items-center" disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Đang đăng ký...
                        </button>
                    ) : (
                        <button
                            onClick={handleCreateMedicine}
                            disabled={!(name && quantity && ingredient && expiry)}
                            className={`w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ${!(name && quantity && ingredient && expiry) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Đăng ký
                        </button>
                    )}
                </div>
            </div>
        </div>

    );
};

export default CreateMedicine;
