import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { ReloadIcon } from '@radix-ui/react-icons'
import Swal from 'sweetalert2'

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (loading) return; // Kiểm tra nếu đang tải
    setLoading(true); // Đặt trạng thái loading thành true

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
      setLoading(false); // Dừng loading nếu mật khẩu không khớp
      Swal.fire({
        title: "Lỗi",
        text: "Mật khẩu xác nhận không khớp!!",
        icon: "error",
      });
      return; // Dừng tiếp tục nếu mật khẩu không khớp
    }

    try {
      // Gọi API đăng ký người dùng
      const res = await UserService.signupUser({
        email,
        password,
        confirmPassword,
      });

      setLoading(false); // Đặt trạng thái loading thành false

      // Kiểm tra kết quả từ API
      if (res && res.status === "OK") {
        // Đăng ký thành công, chuyển hướng tới trang đăng nhập
        navigate('/signin');
      } else if (res && res.status === "ERR") {
        // Nếu có lỗi từ API (như email đã tồn tại)
        Swal.fire({
          title: "Thông báo",
          text: "Email đã tồn tại, vui lòng sử dụng email khác",
          icon: "error",
        });
      } else {
        // Xử lý trường hợp không nhận được phản hồi hợp lệ
        Swal.fire({
          title: "Lỗi",
          text: "Có lỗi xảy ra, vui lòng thử lại sau",
          icon: "error",
        });
      }
    } catch {
      // Xử lý lỗi khi gọi API (ví dụ lỗi mạng, lỗi server)
      setLoading(false);
      Swal.fire({
        title: "Lỗi",
        text: "Không thể kết nối đến server, vui lòng thử lại sau",
        icon: "error",
      });
    }
  };


  return (
    <div className='flex justify-center items-center'>
      <Card className="w-[400px] mt-8 shadow-lg bg-blue-200 rounded-lg border border-gray-200">
        <CardHeader className="flex flex-col items-center">
          <img src="/assets/images/logo-benh-vien.jpg" alt="Hospital Logo" className="w-full h-full mb-2" />
          <CardTitle className="text-lg font-semibold text-blue-700">Đăng Nhập</CardTitle>
          <p className="text-gray-500 text-sm">Chào mừng bạn đến với hệ thống quản lý bệnh viện</p>
        </CardHeader>
        <CardContent>
          <>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input id="name" type="email" required={true} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="pass">Mật khẩu</Label>
                  <Input id="pass" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirm">Xác nhận mật khẩu</Label>
                  <Input id="confirm" type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </div>
            </form>
            <div> Bạn có tài khoản?
              <Button variant={'link'} asChild>
                <Link to={'/signin'} >Đăng nhập</Link>
              </Button>
            </div>
          </>
        </CardContent>
        <CardFooter className="flex justify-between">
          {loading ? (
            <Button disabled className="w-full">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button className="w-full" onClick={handleSignUp} disabled={!(email && password && confirmPassword)} >Đăng ký</Button>
          )}
        </CardFooter>
      </Card>
    </div >

  )
}

export default SignUpPage