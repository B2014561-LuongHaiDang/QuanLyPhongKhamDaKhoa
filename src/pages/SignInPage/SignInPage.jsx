import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide.js'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { ReloadIcon } from '@radix-ui/react-icons';
import Swal from 'sweetalert2'

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (loading) return
    setLoading(true)
    const res = await UserService.loginUser({
      email,
      password,
    })
    setLoading(false)
    if (res.status === 'OK') {
      dispatch(updateUser({ ...res?.user, access_token: res.access_token, doctor: res.doctors }))
      Swal.fire({
        title: "Đăng nhập thành công!",
        text: "Vui lòng bấm OK!",
        icon: "success",
      }).then(() => {
        navigate('/')
      });
    } else {
      Swal.fire({
        title: "Lỗi",
        text: res.message,
        icon: "error",
      })
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <Card className="w-[400px] mt-8 shadow-lg bg-blue-200 rounded-lg border border-gray-200">
        <CardHeader className="flex flex-col items-center">
          <img src="/assets/images/logo-benh-vien.jpg" alt="Hospital Logo" className="w-full h-full mb-2" />
          <CardTitle className="text-lg font-semibold text-blue-700">Đăng Nhập</CardTitle>
          <p className="text-gray-500 text-sm">Chào mừng bạn đến với hệ thống quản lý phòng khám</p>
        </CardHeader>

        <CardContent>
          <>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="pass">Mật khẩu</Label>
                  <Input id="pass" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
            </form>
            <div> Bạn chưa có tài khoản?
              <Button variant={'link'} asChild>
                <Link to={'/signup'} >Đăng ký</Link>
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
            <Button className="w-full" onClick={handleSignIn} disabled={!(email && password)} >Đăng nhập</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignInPage