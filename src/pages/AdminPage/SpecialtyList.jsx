import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NotebookPen, Trash2 } from "lucide-react";
import * as SpecialtyService from "../../services/SpecialtyService";

const SpecialtyList = () => {
    const [specialties, setSpecialties] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateModalData, setUpdateModalData] = useState(null);
    const user = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchName, setSearchName] = useState("");

    // Hiển thị danh sách chuyên khoa đã được lọc theo tên
    const filteredSpecialties = specialties.filter((specialty) =>
        specialty.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSpecialties.length / itemsPerPage);

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
            await SpecialtyService.updateSpecialty(updateModalData._id, {
                name: updateModalData.name,
                description: updateModalData.description,
                status: updateModalData.status,
            });
            closeUpdateModal();
            setSpecialties((prevSpecialties) =>
                prevSpecialties.map((med) =>
                    med._id === updateModalData._id ? updateModalData : med
                )
            );
        } catch (error) {
            console.error("Error updating specialty:", error);
        }
    };

    const currentItems = filteredSpecialties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Fetch specialties khi component mount hoặc searchName thay đổi
    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const res = await SpecialtyService.getAllSpecialties();
                setSpecialties(res.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }));

            } catch (error) {
                console.error("Failed to fetch specialties:", error);
            }
        };

        fetchSpecialties();
    }, []); // Thêm [] để chỉ gọi API một lần khi component mount

    useEffect(() => {
        // Nếu `searchName` thay đổi, chúng ta chỉ cần lọc lại specialties
        setCurrentPage(1); // Reset lại trang khi thay đổi tìm kiếm
    }, [searchName]);

    const handleDelete = (item) => {
        const isDelete = window.confirm("Bạn có chắc chắn xóa?");
        if (isDelete) {
            SpecialtyService.deleteSpecialty(item._id)
                .then(() => {
                    setSpecialties((prevSpecialties) =>
                        prevSpecialties.filter((med) => med._id !== item._id)
                    );
                })
                .catch((error) => {
                    console.error("Error deleting specialty:", error);
                });
        }
    };

    return (
        <div className="  flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-7xl rounded-lg shadow-md flex">
                <div className="w-1/5 bg-gray-50 p-6">
                    <ul className="space-y-4">
                        <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>
                        {user?.isAdmin && (
                            <>
                                <li>
                                    <Link to={"/admin"} className="text-gray-600">
                                        Hồ Sơ
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/admin/doctor-list"} className="text-gray-600">
                                        Danh sách bác sĩ
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/admin/patient-list"} className="text-gray-600">
                                        Danh sách bệnh nhân
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/admin/medicine-list"} className="text-gray-600 ">
                                        Thuốc
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/admin/specialty-list"} className=" text-orange-500 font-semibold">Chuyên khoa</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <div className="w-4/5 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Danh sách chuyên khoa</h2>

                            <Link
                                to="/admin/create-specialty"
                                className="bg-white-500 hover:bg-blue-400 text-black px-4 py-2 rounded shadow-md transition duration-200 ease-in-out"
                            >
                                Thêm chuyên khoa
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
                        </div>
                    </div>

                    <div className="w-full mt-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">Tên</th>
                                        <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                                        <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                                        <th className="border border-gray-300 px-4 py-2">Ảnh</th>
                                        <th className="border border-gray-300 px-4 py-2">Cập nhật</th>
                                        <th className="border border-gray-300 px-4 py-2">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((item) => (
                                            <tr key={item._id}>
                                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                                                <td className="border border-gray-300 px-4 py-2 ">{item.status}</td>
                                                <td className="border border-gray-300 px-4 py-2 min-w-32">
                                                    <div className="flex justify-center">
                                                        <img
                                                            src={item.avatar}
                                                            alt=""
                                                            className="h-16 w-16 object-cover rounded text-center"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <button
                                                        className="text-black px-4 py-2 rounded flex justify-center items-center"
                                                        onClick={() => openUpdateModal(item)}
                                                    >
                                                        <NotebookPen />
                                                    </button>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <button
                                                        className="text-black px-4 py-2 rounded flex justify-center items-center"
                                                        onClick={() => handleDelete(item)}
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center border border-gray-300 px-4 py-2"
                                            >
                                                Không có chuyên khoa nào phù hợp
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex justify-between mt-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="px-4 py-2 bg-gray-200 rounded"
                                >
                                    Trang trước
                                </button>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="px-4 py-2 bg-gray-200 rounded"
                                >
                                    Trang sau
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal cập nhật thông tin */}
            {isUpdateModalOpen && updateModalData && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Cập nhật thông tin chuyên khoa</h2>
                        <input
                            className="w-full px-4 py-2 border rounded mb-4"
                            name="name"
                            value={updateModalData.name}
                            onChange={handleUpdateChange}
                            placeholder="Tên"
                        />
                        <textarea
                            className="w-full px-4 py-2 border rounded mb-4"
                            name="description"
                            value={updateModalData.description}
                            onChange={handleUpdateChange}
                            placeholder="Mô tả"
                        />
                        <input
                            className="w-full px-4 py-2 border rounded mb-4"
                            name="status"
                            value={updateModalData.status}
                            onChange={handleUpdateChange}
                            placeholder="Trạng thái"
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={handleUpdate}
                        >
                            Cập nhật
                        </button>
                        <button
                            className="mt-2 px-4 py-2 bg-gray-300 rounded"
                            onClick={closeUpdateModal}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpecialtyList;
