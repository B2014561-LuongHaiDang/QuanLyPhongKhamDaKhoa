import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as SpecialtyService from '../../services/SpecialtyService';
import * as UserService from '../../services/UserService'; // Service để lấy thông tin người dùng
import * as DoctorService from '../../services/DoctorService';
import * as MedicineService from '../../services/MedicineService';
import * as ScheduleService from '../../services/ScheduleService'; // Service để lấy thông tin bác sĩ
import ImageSlider from './ImageSlider ';

const HomePage = () => {

  const [userCount, setUserCount] = useState(0); // Số lượng người dùng
  const [doctorCount, setDoctorCount] = useState(0);
  const [scheduleCount, setScheduleCount] = useState(0);
  const [medicineCount, setMedicineCount] = useState(0);
  const [specialties, setSpecialties] = useState([]); // State để lưu các chuyên khoa
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user); // Lấy thông tin user từ Redux (hoặc từ localStorage)

  useEffect(() => {
    // Lấy danh sách các chuyên khoa từ backend


    // Lấy thống kê số lượng người dùng và bác sĩ nếu là admin
    const fetchCounts = async () => {
      if (user?.isAdmin) {
        try {
          const userRes = await UserService.getAllUser(); // Gọi API lấy danh sách users
          const doctorRes = await DoctorService.getAllDoctor();
          const scheduleRes = await ScheduleService.getAllSchedule();
          const medicineRes = await MedicineService.getAllMedicines(); // Gọi API lấy danh sách bác sĩ
          setUserCount(userRes.data.length); // Số lượng người dùng
          setDoctorCount(doctorRes.data.length);
          setScheduleCount(scheduleRes.data.length);
          setMedicineCount(medicineRes.data.length);
        } catch (error) {
          console.error("Failed to fetch user/doctor counts:", error);
        }
      }
    };


    fetchCounts();
  }, [user]);

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


  });// Khi user thay đổi (đặc biệt là khi đăng nhập là admin)


  const articles = [
    {
      category: "Viêm dạ dày",
      title: "Triệu chứng viêm loét dạ dày là gì? Khi nào nguy hiểm?",
      image: "https://cdn.hellobacsi.com/wp-content/uploads/2024/01/Trieu-chung-viem-loet-da-day.jpg?w=1920&q=75", // Thay ảnh thật ở đây
    },
    {
      category: "Vấn đề tâm lý – tâm thần khác",
      title: "Toxic Productivity là gì? Khi làm việc năng suất trở nên độc hại",
      image: "https://cdn.hellobacsi.com/wp-content/uploads/2024/01/Toxic-Productivity_1051056248.jpg?w=1920&q=75",
    },
    {
      category: "Chăm sóc móng",
      title: "Cắn móng tay bị gì? 6 tác hại của việc cắn móng tay ít ai ngờ",
      image: "https://cdn.hellobacsi.com/wp-content/uploads/2024/01/can-mong-tay-bi-gi_2294694413.jpg?w=1920&q=75",
    },
    {
      category: "Đau cơ xương khớp",
      title: "Đau vai gáy lan xuống cánh tay là bệnh gì? Nguyên nhân và cách điều trị",
      image: "https://cdn.hellobacsi.com/wp-content/uploads/2023/09/dau-vai-gay-lan-xuong-canh-tay-2.jpg?w=1920&q=75",
    },
  ];
  return (
    <div className=" mx-auto mt-6 pb-10">
      <ImageSlider />

      <div className="grid grid-cols-4 gap-4 my-6 ">
        <Link
          to="/specialty"
          className="hover:scale-[1.05] transition-all flex items-center justify-center bg-white p-4 rounded-lg shadow hover:shadow-md  border border-gray-200"
        >
          <img
            src="https://hhg-common.hellobacsi.com/common/nav-icons/discover.svg"
            alt="Chuyên mục"
            className="w-10 h-10 mr-2" // Thêm khoảng cách giữa icon và chữ
          />
          <span className="text-gray-700 text-xl font-bold">Chuyên khoa</span>
        </Link>


        <Link
          to="/doctor"
          className="hover:scale-[1.05] transition-all flex items-center justify-center bg-white p-4 rounded-lg shadow hover:shadow-md  border border-gray-200"
        >
          <img
            src="https://hhg-common.hellobacsi.com/common/nav-icons/care.svg"
            alt="Chuyên mục"
            className="w-10 h-10 mr-2" // Thêm khoảng cách giữa icon và chữ
          />
          <span className="text-gray-700 text-xl font-bold">Đặt lịch khám bệnh</span>
        </Link>

        <Link
          to="/medicine"
          className="hover:scale-[1.05] transition-all flex items-center justify-center bg-white p-4 rounded-lg shadow hover:shadow-md  border border-gray-200"
        >
          <img
            src="https://hhg-common.hellobacsi.com/common/nav-icons/shop.svg"
            alt="Chuyên mục"
            className="w-10 h-10 mr-2" // Thêm khoảng cách giữa icon và chữ
          />
          <span className="text-gray-700 text-xl font-bold">Cửa hàng thuốc</span>
        </Link>

        <Link
          to="/bmi"
          className="hover:scale-[1.05] transition-all flex items-center justify-center bg-white p-4 rounded-lg shadow hover:shadow-md  border border-gray-200"
        >
          <img
            src="https://hhg-common.hellobacsi.com/common/nav-icons/health-tools.svg"
            alt="Chuyên mục"
            className="w-10 h-10 mr-2" // Thêm khoảng cách giữa icon và chữ
          />
          <span className="text-gray-700 text-xl font-bold">Chỉ số BMI</span>
        </Link>

      </div>

      <div className="mt-8">
        {/* Tab chọn bài viết nổi bật hoặc mới nhất */}
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-100 text-blue-600 font-semibold rounded-full hover:bg-blue-200">
            Bài viết nổi bật
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 font-semibold rounded-full hover:bg-gray-200">
            Bài viết mới nhất
          </button>
        </div>

        {/* Nội dung bài viết */}
        <div className="mt-6 grid grid-cols-5 gap-4">
          {/* Bài viết bên trái (60%) */}
          <div className="col-span-3  rounded-lg overflow-hidden shadow-md">
            <img
              src="https://cdn.hellobacsi.com/wp-content/uploads/2024/01/rau-diep-ca-tri-mo-mau.jpg?w=1920&q=75"
              alt="Cây thuốc"
              className="w-full h-100 object-cover"
            />
            <h3 className="text-blue-600 font-semibold text-lg">Cholesterol</h3>
            <Link to="#" className="text-2xl font-bold text-gray-800 hover:underline block mt-1">
              Cách dùng rau diếp cá trị mỡ máu và những lưu ý quan trọng
            </Link>
          </div>

          {/* Bài viết bên phải (40%) */}
          <div className="col-span-2 rounded-lg overflow-hidden shadow-md mb-8">
            <img
              src="https://cdn.hellobacsi.com/wp-content/uploads/2024/01/siro-ho-cho-nguoi-lon.jpg?w=1920&q=75"
              alt="Cây thuốc"
              className="w-full h-80 object-cover"
            />
            <h3 className="text-blue-600 font-semibold text-lg">Các vấn đề hô hấp khác</h3>
            <Link to="#" className="text-xl font-bold text-gray-800 hover:underline block mt-1">
              10 siro ho cho người lớn thông dụng, hiệu quả cao
            </Link>

            {/* Đường gạch đứt */}
            <div className="border-t-2 border-dashed border-gray-400 my-6"></div>

            <div className="mt-7 grid grid-cols-5 gap-4">
              {/* Bài viết bên trái (60%) */}
              <div className="col-span-3 bg-gray-100 rounded-lg overflow-hidden shadow-md border-r border-gray-300">
                <h3 className="text-blue-600 font-semibold text-sm">Ung thư phổi</h3>
                <Link to="#" className="text-xl font-bold text-gray-800 hover:underline block mt-1">
                  Tầm soát ung thư phổi và những điều bạn nên biết
                </Link>

                <Link
                  to="/specialty"
                  className="flex items-center justify-center p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <img
                    src="https://hhg-common.hellobacsi.com/common/nav-icons/discover.svg"
                    alt="Chuyên mục"
                    className="w-7 h-7 mr-2"
                  />
                  <span className="text-gray-700 text-sm font-bold">
                    Tham vấn y khoa: Bác sĩ Trần Kiến Bình
                  </span>
                </Link>
              </div>

              {/* Bài viết bên phải (40%) */}
              <div className="col-span-2 rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://cdn.hellobacsi.com/wp-content/uploads/2024/08/tam-soat-ung-thu-phoi-nhu-the-nao.jpg?w=1920&q=75"
                  alt="Cây thuốc"
                  className="w-full h-50 object-cover"
                />
              </div>
            </div>
          </div>



        </div>

        {/* Đường gạch đứt */}
        <div className="border-t-2 border-dashed border-gray-400 my-6"></div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm text-blue-600 font-semibold">
                    {article.category}
                  </h3>
                  <h2 className="text-lg font-bold mt-2 hover:text-blue-500">
                    {article.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                    <div key={specialty._id} className="hover:scale-[1.05] transition-all p-4 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
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

      {/* Hiển thị thống kê khi user là admin */}
      {user?.isAdmin && (
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 mb-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thống kê tổng quan</h2>
          <div className="flex space-x-6">
            {/* Card - Số lượng người dùng */}
            <Link to={"/admin/patient-list"} className="hover:underline">
              <div className="flex-1 bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-medium text-gray-700">Số lượng người dùng</h3>
                <p className="text-4xl font-bold text-blue-600">{userCount}</p>
              </div>
            </Link>
            {/* Card - Số lượng bác sĩ */}
            <div className="flex-1 bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-medium text-gray-700">Số lượng bác sĩ</h3>
              <p className="text-4xl font-bold text-green-600">{doctorCount}</p>
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-medium text-gray-700">Số lượng lịch khám</h3>
              <p className="text-4xl font-bold text-green-600">{scheduleCount}</p>
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-medium text-gray-700">Số lượng thuốc</h3>
              <p className="text-4xl font-bold text-green-600">{medicineCount}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hiển thị chuyên khoa cho người dùng không phải admin */}

    </div>
  );
}

export default HomePage;
