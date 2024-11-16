import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Eye, NotebookPen, Trash2 } from "lucide-react";
import * as MedicineService from "../../services/MedicineService";
import moment from "moment";

const MedicineList = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [medicines, setMedicines] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [updateModalData, setUpdateModalData] = useState(null);
    const user = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchName, setSearchName] = useState("");
    const [searchIngredient, setSearchIngredient] = useState("");
    const [searchExpiryStart, setSearchExpiryStart] = useState("");
    const [searchExpiryEnd, setSearchExpiryEnd] = useState("");

    const filteredMedicines = medicines.filter((medicine) => {
        medicine.name.toLowerCase().includes(searchName.toLowerCase()) &&
            medicine.ingredient.toLowerCase().includes(searchIngredient.toLowerCase())
        const expiryDate = new Date(medicine.expiry); // Convert expiry to Date object
        const start = searchExpiryStart ? new Date(searchExpiryStart) : null;
        const end = searchExpiryEnd ? new Date(searchExpiryEnd) : null;

        // Kiểm tra tên thuốc, thành phần và ngày hết hạn
        return (
            medicine.name.toLowerCase().includes(searchName.toLowerCase()) &&
            medicine.ingredient.toLowerCase().includes(searchIngredient.toLowerCase()) &&
            (!start || expiryDate >= start) && // Kiểm tra nếu không có ngày bắt đầu, hoặc ngày hết hạn >= ngày bắt đầu
            (!end || expiryDate <= end) // Kiểm tra nếu không có ngày kết thúc, hoặc ngày hết hạn <= ngày kết thúc
        );
    }
    );
    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

    const nextImage = () => {
        if (modalData?.avatar?.length) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % modalData.avatar.length);
        }
    };

    const prevImage = () => {
        if (modalData?.avatar?.length) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + modalData.avatar.length) % modalData.avatar.length);
        }
    };

    const openModal = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    const openUpdateModal = (data) => {
        setUpdateModalData(data);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setUpdateModalData(null);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateModalData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await MedicineService.updateMedicine(updateModalData._id, {
                name: updateModalData.name,
                quantity: updateModalData.quantity,
                ingredient: updateModalData.ingredient,
                expiry: updateModalData.expiry,
            });
            closeUpdateModal();
            setMedicines((prevMedicines) =>
                prevMedicines.map((med) =>
                    med._id === updateModalData._id ? updateModalData : med
                )
            );
        } catch (error) {
            console.error("Error updating medicine:", error);
        }
    };

    const currentItems = filteredMedicines.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        MedicineService.getAllMedicines().then((res) => {
            setMedicines(res.data);
        });
    }, []);

    const handleDelete = (item) => {
        const isDelete = window.confirm('Bạn có chắc chắn xóa?')
        if (isDelete) {
            MedicineService.deleteMedicine(item._id).then(() => {
                setMedicines(prevMedicines => prevMedicines.filter(med => med._id !== item._id))
            }).catch(error => {
                console.error('Error deleting medicine:', error);
            })
        }
    }

    const formatDateWithDayOfWeek = (dateString) => {
        return moment(dateString).locale('vi').format('dddd, DD/MM/YYYY');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-5xl rounded-lg shadow-md flex">
                <div className="w-1/4 bg-gray-50 p-6">
                    <ul className="space-y-4">
                        <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>
                        <li>
                            <Link to={"/admin"} className="text-gray-600">Hồ Sơ</Link>
                        </li>
                        {user?.isAdmin && (
                            <>
                                <li>
                                    <Link to={"/admin/doctor-list"} className="text-gray-600">Danh sách bác sĩ</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/patient-list"} className="text-gray-600">Danh sách bệnh nhân</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/medicine-list"} className=" text-orange-500 font-semibold">Thuốc</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <div className="w-3/4 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>

                            <h2 className="text-2xl font-semibold mb-6">Danh sách thuốc</h2>

                            <Link to="/admin/create-medicine" className="bg-white-500 hover:bg-blue-400 text-black px-4 py-2 rounded shadow-md transition duration-200 ease-in-out">
                                Thêm thuốc
                            </Link>
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded mr-4"
                            />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo thành phần"
                                value={searchIngredient}
                                onChange={(e) => setSearchIngredient(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="date"
                                value={searchExpiryStart}
                                onChange={(e) => setSearchExpiryStart(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded"
                                placeholder="Từ ngày"
                            />
                            <input
                                type="date"
                                value={searchExpiryEnd}
                                onChange={(e) => setSearchExpiryEnd(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded"
                                placeholder="Đến ngày"
                            />
                        </div>
                    </div>

                    <div className="w-full mt-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">Tên thuốc</th>
                                        <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                                        <th className="border border-gray-300 px-4 py-2">Thành phần</th>
                                        <th className="border border-gray-300 px-4 py-2">Ngày hết hạn</th>
                                        <th className="border border-gray-300 px-4 py-2">Xem chi tiết</th>
                                        <th className="border border-gray-300 px-4 py-2">Cập nhật</th>
                                        <th className="border border-gray-300 px-4 py-2">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((item) => (

                                            <tr key={item._id}>
                                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.ingredient}</td>
                                                <td className="border border-gray-300 px-4 py-2">{formatDateWithDayOfWeek(item.expiry)}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <button className="text-black px-4 py-2 rounded flex justify-center items-center" onClick={() => openModal(item)}>
                                                        <Eye />
                                                    </button>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <button className="text-black px-4 py-2 rounded flex justify-center items-center" onClick={() => openUpdateModal(item)}>
                                                        <NotebookPen />
                                                    </button>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <button className="text-black px-4 py-2 rounded flex justify-center items-center" onClick={() => handleDelete(item)}>
                                                        <Trash2 />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center border border-gray-300 px-4 py-2">
                                                Không có thuốc nào phù hợp
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex justify-between mt-4">
                                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="px-4 py-2 bg-gray-200 rounded">
                                    Trang trước
                                </button>
                                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 bg-gray-200 rounded">
                                    Trang sau
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {/* Modal hiển thị chi tiết */}
            {isModalOpen && modalData && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Chi tiết thông tin</h2>
                        <p><strong>Tên thuốc:</strong> {modalData.name}</p>
                        <p><strong>Số lượng:</strong> {modalData.quantity}</p>
                        <p><strong>Thành phần:</strong> {modalData.ingredient}</p>
                        <p><strong>Ngày hết hạn:</strong> {modalData.expiry}</p>
                        <p><strong>Công dụng:</strong> {modalData.uses}</p>

                        <div className="relative">
                            {modalData.avatar?.length > 0 && (
                                <>
                                    <img src={modalData.avatar[currentImageIndex]} alt={`Hình ảnh thuốc ${currentImageIndex + 1}`} className="w-full h-48 object-contain mb-4" />
                                    <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2 bg-gray-200 rounded-full">{"<"}</button>
                                    <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 bg-gray-200 rounded-full">{">"}</button>
                                </>
                            )}
                        </div>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={closeModal}>Đóng</button>
                    </div>
                </div>
            )}

            {/* Modal cập nhật thông tin */}
            {isUpdateModalOpen && updateModalData && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Cập nhật thông tin thuốc</h2>
                        <input className="w-full px-4 py-2 border rounded mb-4" name="name" value={updateModalData.name} onChange={handleUpdateChange} placeholder="Tên thuốc" />
                        <input className="w-full px-4 py-2 border rounded mb-4" name="quantity" value={updateModalData.quantity} onChange={handleUpdateChange} placeholder="Số lượng" />
                        <input className="w-full px-4 py-2 border rounded mb-4" name="ingredient" value={updateModalData.ingredient} onChange={handleUpdateChange} placeholder="Thành phần" />
                        <input className="w-full px-4 py-2 border rounded mb-4" name="expiry" value={updateModalData.expiry} onChange={handleUpdateChange} placeholder="Ngày hết hạn" />
                        <input className="w-full px-4 py-2 border rounded mb-4" name="uses" value={updateModalData.uses} onChange={handleUpdateChange} placeholder="Công dụng" />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleUpdate}>Cập nhật</button>
                        <button className="mt-2 px-4 py-2 bg-gray-300 rounded" onClick={closeUpdateModal}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicineList;
