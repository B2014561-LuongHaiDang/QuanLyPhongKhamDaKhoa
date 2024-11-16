import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import * as ScheduleService from "../../services/ScheduleService"; // Thêm service để lấy lịch khám
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [chartDataUsers, setChartDataUsers] = useState({
    labels: ['Bác sĩ', 'Bệnh nhân'],
    datasets: [{
      data: [0, 0], // Mặc định là 0 cho bác sĩ và bệnh nhân
      backgroundColor: ['#FF6384', '#36A2EB'], // Màu sắc cho mỗi phần của biểu đồ
      hoverOffset: 4
    }]
  });
  const [chartDataSchedules, setChartDataSchedules] = useState({
    labels: ['Đã khám', 'Chưa khám'],
    datasets: [{
      data: [0, 0], // Mặc định là 0 cho Chưa khám và Đã khám
      backgroundColor: ['#FFCD56', '#FF9F40'], // Màu sắc cho từng phần
      hoverOffset: 4
    }]
  });

  // Kiểm tra quyền truy cập
  useEffect(() => {
    if (!user.access_token) {
      navigate('/signin');
    }
  }, [navigate, user]);

  // Lấy dữ liệu người dùng và tính toán số lượng bác sĩ và bệnh nhân
  useEffect(() => {
    UserService.getAllUser().then(res => {
      setUsers(res.data);

      // Tính toán số lượng bác sĩ và bệnh nhân
      const doctorsCount = res.data.filter(item => item.isDoctor).length;
      const patientsCount = res.data.length - doctorsCount;

      setChartDataUsers({
        ...chartDataUsers,
        datasets: [{
          ...chartDataUsers.datasets[0],
          data: [doctorsCount, patientsCount]
        }]
      });
    });
  }, []);

  // Lấy dữ liệu lịch khám và tính toán số lượng lịch "Chưa khám" và "Đã khám"
  useEffect(() => {
    ScheduleService.getAllSchedule().then(res => {
      setSchedules(res.data);

      // Tính toán số lượng lịch chưa khám và đã khám
      const pendingSchedules = res.data.filter(schedule => schedule.status === false).length;
      const completedSchedules = res.data.filter(schedule => schedule.status === true).length;

      setChartDataSchedules({
        ...chartDataSchedules,
        datasets: [{
          ...chartDataSchedules.datasets[0],
          data: [pendingSchedules, completedSchedules]
        }]
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-md flex">

        {/* Sidebar */}
        <div className="w-1/4 bg-gray-50 p-6">
          <ul className="space-y-4">
            <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>
            <li>
              <Link to={"/admin"} className="text-orange-500 font-semibold">Hồ Sơ</Link>
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
                  <Link to={"/admin/medicine-list"} className="text-gray-600">Thuốc</Link>
                </li>
                <li>
                  <Link to={"/admin/create-doctor"} className="text-gray-600">Thêm thông tin</Link>
                </li>

                <li>
                  <Link to={"/admin/specialty-list"} className="text-gray-600">Chuyên khoa</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-6">

          <div className="w-full mt-8 flex justify-center">
            {/* Biểu đồ tròn cho Bác sĩ và Bệnh nhân */}
            <div className="w-1/2">
              <Pie data={chartDataUsers} />
            </div>
            {/* Biểu đồ tròn cho Lịch khám */}
            <div className="w-1/2">
              <Pie data={chartDataSchedules} />
            </div>
          </div>






        </div>
      </div>
    </div>
  );
};

export default AdminPage;
