import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/vi';  // Để định dạng ngày bằng tiếng Việt
import { updateDoctor } from "../../services/DoctorService";

const Schedule = () => {
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([{ date: '', timeSlots: [''] }]); // Mảng chứa các ngày và thời gian
    const [saved, setSaved] = useState(false);  // State để theo dõi việc lưu dữ liệu

    // Hàm định dạng ngày sử dụng moment
    const formatDateWithDayOfWeek = (dateString) => {
        return moment(dateString).locale('vi').format('dddd, DD/MM/YYYY');
    };

    // Xử lý thay đổi ngày tại chỉ số cụ thể
    const handleDateChange = (index, value) => {
        const newSchedule = [...schedule];
        newSchedule[index].date = value;
        setSchedule(newSchedule);
    };

    // Xử lý thay đổi thời gian tại chỉ số ngày và chỉ số thời gian cụ thể
    const handleTimeChange = (dayIndex, timeIndex, value) => {
        const newSchedule = [...schedule];
        newSchedule[dayIndex].timeSlots[timeIndex] = value;
        setSchedule(newSchedule);
    };

    // Thêm input cho thời gian tại ngày cụ thể
    const handleAddTimeSlot = (dayIndex) => {
        const newSchedule = [...schedule];
        newSchedule[dayIndex].timeSlots.push('');
        setSchedule(newSchedule);
    };

    // Thêm một ngày mới
    const handleAddDay = () => {
        setSchedule([...schedule, { date: '', timeSlots: [''] }]);
    };

    // Xử lý sự kiện nhấn "Lưu"
    const handleSave = () => {

        updateDoctor(user.doctor._id, schedule.map(i => ({ date: i.date, slots: i.timeSlots }))).then(() => {
            Swal.fire({
                title: "Thêm thành công!",
                text: "Vui lòng bấm OK!",
                icon: "success",
            })
        })

        setSaved(true);  // Cập nhật trạng thái lưu thành công
    };

    // Kiểm tra nếu người dùng chưa đăng nhập
    useEffect(() => {
        if (!user.access_token) {

            navigate('/signin')
        };

    }, [navigate, user])

    return (
        <div className="min-h-screen  flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-7xl rounded-lg shadow-md flex">

                {/* Sidebar */}
                <div className="w-1/4 bg-gray-50 p-6">
                    <ul className="space-y-4">
                        <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>



                        <li>
                            <Link to={"/profile"} className="text-gray-600">Hồ sơ</Link>
                        </li>
                        {!user?.isDoctor && (
                            <li>
                                <Link to={"/profile/history"} className="text-gray-600">Lịch sử khám</Link>
                            </li>
                        )}
                        {user?.isDoctor && (
                            <>
                                <li>

                                    <Link to={"/profile/schedule"} className=" text-orange-500 font-semibold">Tạo lịch khám bệnh</Link>
                                </li>
                                <li>

                                    <Link to={"/profile/patient-list"} className=" text-gray-600">Danh sách bệnh nhân</Link>
                                </li>

                            </>
                        )}

                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-6">
                    <h2 className="text-2xl font-semibold mb-6">Tạo lịch khám bệnh</h2>

                    {/* Nhập nhiều ngày và thời gian */}
                    {schedule.map((day, dayIndex) => (
                        <div key={dayIndex} className="mb-6">
                            {/* Nhập ngày */}
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 text-sm font-semibold text-gray-700">Chọn ngày {dayIndex + 1}</label>
                                <input
                                    type="date"
                                    value={day.date}
                                    onChange={(e) => handleDateChange(dayIndex, e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="mt-2">Ngày đã chọn: {formatDateWithDayOfWeek(day.date)}</p>
                            </div>

                            {/* Nhập thời gian */}
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 text-sm font-semibold text-gray-700">Thời gian khám</label>
                                {day.timeSlots.map((timeSlot, timeIndex) => (
                                    <div key={timeIndex} className="flex items-center mb-2">
                                        <input
                                            type="time"
                                            value={timeSlot}
                                            onChange={(e) => handleTimeChange(dayIndex, timeIndex, e.target.value)}
                                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddTimeSlot(dayIndex)}
                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                >
                                    Thêm thời gian
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Nút thêm ngày */}
                    <button
                        type="button"
                        onClick={handleAddDay}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                        Thêm ngày
                    </button>

                    {/* Nút lưu */}
                    <button
                        className="bg-orange-500 text-white font-bold py-2 px-4 rounded mt-6"
                        onClick={handleSave}
                    >
                        Lưu
                    </button>

                    {/* Hiển thị lịch khám đã lưu */}
                    {saved && (
                        <div className="mt-6 p-4 bg-green-100 rounded">
                            <h3 className="text-lg font-semibold">Lịch khám đã chọn:</h3>
                            {schedule.map((day, dayIndex) => (
                                <div key={dayIndex} className="mb-4">
                                    <p><strong>Ngày {dayIndex + 1}:</strong> {formatDateWithDayOfWeek(day.date)}</p>
                                    <p><strong>Thời gian:</strong></p>
                                    <ul>
                                        {day.timeSlots.map((timeSlot, timeIndex) => (
                                            <li key={timeIndex}>{timeSlot}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Schedule;
