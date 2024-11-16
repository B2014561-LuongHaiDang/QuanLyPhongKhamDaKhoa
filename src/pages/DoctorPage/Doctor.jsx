import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { getDetailsDoctor } from "../../services/DoctorService";
import { getByDoctorId } from "../../services/ScheduleService";  // Lấy lịch khám bác sĩ
import moment from "moment";

const Doctor = () => {
    const [doctor, setDoctor] = useState(null);
    const [schedules, setSchedules] = useState([]);  // State lưu lịch khám của bác sĩ
    const params = useParams();

    // Lấy thông tin bác sĩ
    useEffect(() => {
        const fetchDoctorDetails = async () => {
            const res = await getDetailsDoctor(params.id);
            setDoctor(res.data);
        };
        fetchDoctorDetails();
    }, [params.id]);

    // Lấy lịch khám của bác sĩ và lọc các lịch khám chưa qua hạn
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const res = await getByDoctorId(params.id);  // Lấy lịch khám bác sĩ
                // Lọc các lịch khám chưa qua hạn
                const validSchedules = res.data.filter(schedule => {
                    const scheduleDate = moment(schedule.date);
                    return scheduleDate.isSameOrAfter(moment(), 'day'); // Chỉ lấy các lịch khám ngày hiện tại trở đi
                });
                setSchedules(validSchedules);  // Cập nhật state với lịch khám hợp lệ
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };
        fetchSchedules();
    }, [params.id]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const formatDateWithDayOfWeek = (dateString) => {
        return moment(dateString).locale("vi").format("dddd, DD/MM/YYYY");
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    return (
        <div className="max-w-4xl bg-white mx-auto py-8 px-4 mt-4">
            {/* Thông tin bác sĩ */}
            <div className="flex items-start space-x-8 border-b pb-6 mb-6">
                <div>
                    {doctor && (
                        <img
                            src={doctor.avatar}
                            alt="avatar"
                            className="h-48 w-48 rounded-full object-cover mb-4 shadow-lg"
                        />
                    )}
                </div>
                <div className="flex-1">
                    {doctor && (
                        <>
                            <h1 className="text-3xl font-bold text-gray-800">{doctor.title} {doctor.name}</h1>
                            <p className="text-gray-600 text-lg mb-2">Hơn {doctor.experience} năm kinh nghiệm trong lĩnh vực {doctor.specialist}</p>
                            <p className="text-gray-600 text-lg mb-2">Hiện đang là {doctor.position}, {doctor.hospital}</p>
                            <p className="text-gray-600 text-lg mb-2">Bác sĩ nhận khám từ {doctor.age_limit} tuổi trở lên</p>
                        </>
                    )}
                </div>
            </div>

            {/* Lịch khám */}
            <div className="mt-8">
                <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Chọn lịch khám bệnh</h1>

                    {/* Hiển thị các ngày */}
                    <div className="flex space-x-4 mb-6">
                        {doctor && doctor.availability.map((slot) => (
                            <button
                                key={slot._id}
                                className={`px-4 py-2 rounded-lg shadow-md transition duration-200 ${selectedDate === slot.date ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50"}`}
                                onClick={() => handleDateSelect(slot.date)}
                            >
                                {formatDateWithDayOfWeek(slot.date)}
                            </button>
                        ))}
                    </div>

                    {/* Hiển thị các giờ nếu ngày đã được chọn */}
                    {selectedDate && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Chọn thời gian cho ngày: {formatDateWithDayOfWeek(selectedDate)}</h2>
                            <div className="flex space-x-4">
                                {doctor && doctor.availability
                                    .find((slot) => slot.date === selectedDate)
                                    ?.slots.map((time, index) => (
                                        <button
                                            key={index}
                                            className={`px-4 py-2 rounded-lg shadow-md transition duration-200 ${selectedTime === time ? "bg-green-500 text-white" : "bg-white text-green-500 border border-green-500 hover:bg-green-50"}`}
                                            onClick={() => handleTimeSelect(time)}
                                        >
                                            <Link to={`/doctor-schedule/${params.id}?date=${selectedDate}&time=${time}`}>{time}</Link>
                                        </button>
                                    ))}
                            </div>

                            {selectedTime && (
                                <p className="mt-4 text-lg font-semibold">
                                    Bạn đã chọn: {selectedTime} vào {formatDateWithDayOfWeek(selectedDate)}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <p className="mt-2 text-gray-500">Chọn và đặt (Phí đặt lịch 0đ)</p>
            </div>

            {/* Địa chỉ khám & Giá khám */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold text-gray-800">ĐỊA CHỈ KHÁM</h3>
                    <p className="text-gray-600">3 Đường Số 17A, Bình Trị Đông B, Bình Tân, Thành phố Hồ Chí Minh</p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">GIÁ KHÁM</h3>
                    <p className="text-gray-600">400.000đ <Link to="#" className="text-blue-500 hover:underline">Xem chi tiết</Link></p>
                    <p className="font-semibold mt-4">LOẠI BẢO HIỂM ÁP DỤNG</p>
                    <Link to="#" className="text-blue-500 hover:underline">Xem chi tiết</Link>
                </div>
            </div>

            {/* Đánh giá của bác sĩ từ lịch khám */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Đánh giá của người dùng</h2>
                {schedules.length === 0 ? (
                    <p className="text-gray-600">Chưa có đánh giá nào</p>
                ) : (
                    <div className="space-y-4">
                        {schedules.map((schedule) => (
                            schedule.evaluate && (
                                <div key={schedule._id} className="border p-4 rounded-lg shadow-md">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold">{schedule.user.name}</span>
                                        <span className="text-sm text-gray-500">- {moment(schedule.date).format("DD/MM/YYYY")}</span>
                                    </div>
                                    <p className="mt-2">{schedule.evaluate}</p>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Doctor;
