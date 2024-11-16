import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { updateUser } from '../../redux/slides/userSlide.js'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { ReloadIcon } from '@radix-ui/react-icons';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user)
  const [name, setName] = useState(user?.name)
  const [phone, setPhone] = useState(user?.phone)
  const [avatar, setAvatar] = useState(user?.avatar)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.access_token) {
      Swal.fire({
        title: "Tuổi l",
        text: "m cook!",
        icon: "error",
      }).then(() => {
        navigate('/signin')
      });
    }
  }, [navigate, user])

  useEffect(() => {
    setName(user?.name)
    setAvatar(user?.avatar)

  }, [user])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleOnchangeAvatar = async ({ fileList }) => {
  //   const file = fileList[0]
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setAvatar(file.preview)
  // }

  const handleUpdate = async () => {
    if (loading) return
    setLoading(true)
    const res = await UserService.updateUser(user.id, {
      phone,
      name,
      avatar,
    }, user.access_token)
    setLoading(false)

    if (res.status === 'OK') {
      dispatch(updateUser({ ...res?.data, access_token: user.access_token }))
      Swal.fire({
        title: "Đăng nhập thành công!",
        text: "Vui lòng bấm OK!",
        icon: "success",
        timer: 2000
      })
    } else {
      alert(res.message)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <Card className="w-[350px] mt-8">
        <CardHeader>
          <CardTitle>Hồ sơ</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h1>Thông tin người dùng</h1>

            <div>
              <div>
                <Label htmlFor="email">email</Label>
                <Input disabled id="email" value={user.email} />
              </div>

              {user?.isDoctor && (
                <Button variant={'link'} onClick={() => navigate('/doctor')} span={4}>ĐẶT LỊCH KHÁM BỆNH</Button>
              )}

              <div className="my-2">
                <Label htmlFor="name">Tên</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="my-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="avatar">Ảnh</Label>
                <Input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {avatar && (
                  <img
                    src={avatar}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                    alt="avatar"
                  />
                )}
                {/* <Label htmlFor="avatar">Ảnh</Label>
                <Input
                  id="avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
                <Button>Upload</Button>
                {avatar && (
                  <img
                    src={avatar}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                    alt="avatar"
                  />
                )} */}

                {/* <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: '30px',
              width: 'fit-content',
              borderRadius: '4px',
              padding: '2px 6px 4px',
              marginLeft: '91px',
            }}
            textButton={'Cập Nhập'}
            styleTextButton={{ color: '#ADD8E6', fontsize: '15px', fontWeight: '700' }}
          ></ButtonComponent> */}
              </div>

            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {loading ? (
            <Button disabled className="w-full">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button className="w-full" onClick={handleUpdate} disabled={!(name && phone)}>Lưu</Button>
          )}
        </CardFooter>
      </Card>
    </div>


  );
}

export default ProfilePage;
