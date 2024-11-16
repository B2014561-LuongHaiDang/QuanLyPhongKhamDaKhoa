const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">

                {/* Thông tin công ty */}
                <div className="w-full md:w-1/3">
                    <h2 className="font-bold text-xl mb-4">Công ty Cổ phần Công nghệ BookingCare</h2>
                    <p className="mb-2">Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                    <p className="mb-2">ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
                    <p className="mb-2">Điện thoại: <a href="tel:024-7301-2468" className="text-blue-400 hover:underline">024-7301-2468</a> (7h30 - 18h)</p>
                    <p>Email: <a href="mailto:support@bookingcare.vn" className="text-blue-400 hover:underline">support@bookingcare.vn</a> (7h30 - 18h)</p>
                </div>

                {/* Liên kết và chính sách */}
                <div className="w-full md:w-1/3">
                    <h2 className="font-bold text-xl mb-4">Liên kết</h2>
                    <ul className="space-y-2">
                        <li><a href="/cooperate" className="text-blue-400 hover:underline">Liên hệ hợp tác</a></li>
                        <li><a href="/digital" className="text-blue-400 hover:underline">Chuyển đổi số</a></li>
                        <li><a href="/privacy" className="text-blue-400 hover:underline">Chính sách bảo mật</a></li>
                        <li><a href="/terms" className="text-blue-400 hover:underline">Quy chế hoạt động</a></li>
                        <li><a href="/faq" className="text-blue-400 hover:underline">Câu hỏi thường gặp</a></li>
                    </ul>
                </div>

                {/* Đối tác bảo trợ nội dung */}
                <div className="w-full md:w-1/3">
                    <h2 className="font-bold text-xl mb-4">Đối tác bảo trợ nội dung</h2>
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <img src="/assets/images/hellodoctorlogo.png" alt="Hello Doctor" className="h-12 mr-4" />
                            <p>Bảo trợ chuyên mục sức khỏe tinh thần</p>
                        </div>
                        <div className="flex items-center">
                            <img src="/assets/images/logo-bernard.png" alt="Bernard" className="h-12 mr-4" />
                            <p>Bảo trợ chuyên mục y khoa chuyên sâu</p>
                        </div>
                        <div className="flex items-center">
                            <img src="/assets/images/doctor-check-2.png" alt="Doctor Check" className="h-12 mr-4" />
                            <p>Bảo trợ chuyên mục sức khỏe tổng quát</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-center py-4 mt-8">
                <p>&copy; 2024 BookingCare. Tất cả quyền được bảo vệ.</p>
            </div>
        </footer>
    );
};

export default Footer;
