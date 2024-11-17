import { useState } from 'react';
import * as SpecialtyService from '../../services/SpecialtyService';
import { ReloadIcon } from '@radix-ui/react-icons';
import Swal from 'sweetalert2'; // Import UserService
import { useNavigate } from 'react-router-dom';

const CreateSpecialty = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState('');
    const [status, setStatus] = useState('Hoạt động');
    // Thêm state cho bác sĩ trưởng khoa
    const [loading, setLoading] = useState(false); // State để lưu danh sách bác sĩ
    const navigate = useNavigate();
    // Fetch danh sách bác sĩ khi component mount


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result); // Lưu ảnh đã đọc vào state
            };
            reader.readAsDataURL(file);
        } else {
            setAvatar(''); // Nếu không có ảnh, đặt lại trạng thái avatar thành rỗng
        }
    };


    const handleCreateSpecialty = async () => {
        if (loading) return;
        setLoading(true);

        try {
            // Gửi thông tin để tạo chuyên khoa mới
            const res = await SpecialtyService.createSpecialty({
                name,
                description,
                status,

                avatar // Truyền bác sĩ trưởng khoa vào đây
            });

            setLoading(false);

            if (res && res.status === "OK") {
                Swal.fire({
                    title: 'Thành công',
                    text: 'Chuyên khoa đã được tạo thành công!',
                    icon: 'success',
                }).then(() => { navigate('/admin/specialty-list'); });
            } else if (res && res.status === "ERR") {
                Swal.fire({
                    title: "Thông báo",
                    text: "Chuyên khoa đã tồn tại",
                    icon: "error",
                });
            }
        } catch (error) {
            setLoading(false);
            Swal.fire({
                title: "Lỗi",
                text: `Đã xảy ra lỗi khi tạo chuyên khoa: ${error.message}`,
                icon: "error",
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-8">
                <h2 className="text-2xl font-semibold text-center mb-4">Nhập thông tin chuyên khoa</h2>
                <form>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên chuyên khoa</label>
                            <input
                                id="name"
                                type="text"
                                required
                                placeholder="Tên chuyên khoa"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả chuyên khoa</label>
                            <textarea
                                id="description"
                                required
                                placeholder="Mô tả chuyên khoa"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="Hoạt động">Hoạt động</option>
                                <option value="Tạm ngừng">Tạm ngừng</option>
                                <option value="Đóng cửa">Đóng cửa</option>
                            </select>
                        </div>



                        <div>
                            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
                            <div
                                onClick={() => document.getElementById('avatar').click()} // Kích hoạt file input khi người dùng click vào div này
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer flex items-center justify-center"
                            >
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt="avatar"
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <span className="text-gray-500">Chọn ảnh</span> // Hiển thị text "Chọn ảnh" khi chưa có ảnh
                                )}
                            </div>
                            {/* Input file vẫn được ẩn, người dùng sẽ không thấy nó */}
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden" // Ẩn input file
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
                            onClick={handleCreateSpecialty}
                            disabled={!(name && description && status)}
                            className={`w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ${!(name && description && status) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Đăng ký
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateSpecialty;
