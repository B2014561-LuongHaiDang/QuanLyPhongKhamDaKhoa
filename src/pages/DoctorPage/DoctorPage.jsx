import { useEffect, useState } from 'react';
import { getAllDoctor } from '../../services/DoctorService';
import { Link, useLocation } from 'react-router-dom';

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyTerm, setSpecialtyTerm] = useState('');

  // Lấy search params từ URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const specialtyFromURL = queryParams.get('specialty');  // Lấy thông tin chuyên khoa từ URL

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctor();
        setDoctors(res.data || []);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Nếu có chuyên khoa từ URL, gán vào state specialtyTerm
  useEffect(() => {
    if (specialtyFromURL) {
      setSpecialtyTerm(specialtyFromURL);
    }
  }, [specialtyFromURL]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    doctor.specialist.toLowerCase().includes(specialtyTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center py-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Danh sách Bác sĩ</h1>

      <div className="mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Tìm bác sĩ theo tên..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Tìm bác sĩ theo chuyên khoa..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={specialtyTerm}
          onChange={(e) => setSpecialtyTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {filteredDoctors.map(doctor => (
          <div key={doctor._id} className="hover:scale-[1.1] transition-all flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl ">
            <Link to={`/doctor/${doctor._id}`} className="text-center">
              <img
                src={doctor.avatar}
                className="h-48 w-48 rounded-full object-cover mb-2 border-4 border-blue-200"
              />
              <p className="font-semibold text-lg">{doctor.name}</p>
              <p className="text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis" style={{ maxWidth: '192px' }}>
                {doctor.specialist}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPage;
