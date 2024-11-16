
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { updateUser } from '../../redux/slides/userSlide.js'
import {
    CardContent,
    CardFooter,
} from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { ReloadIcon } from '@radix-ui/react-icons';
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState(user?.name)
    const [phone, setPhone] = useState(user?.phone)
    const [avatar, setAvatar] = useState(user?.avatar)
    const [birthday, setBirthDay] = useState(user?.birthday)
    const [address, setAddress] = useState(user?.address)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.access_token) {

            navigate('/signin')
        };

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
            birthday,
            address,
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
        <div className="min-h-screen  flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-5xl rounded-lg shadow-md flex">

                {/* Sidebar */}
                <div className="w-1/4 bg-gray-50 p-6">
                    <ul className="space-y-4">
                        <li className="text-lg font-semibold text-gray-700">Tài Khoản Của Tôi</li>
                        <li className="text-orange-500 font-semibold">Hồ Sơ</li>
                        <li>
                            <Link to={"/profile/history"} className="text-gray-600">Lịch sử khám</Link>
                        </li>
                        {user?.isDoctor && (
                            <>
                                <li>

                                    <Link to={"/profile/schedule"} className=" text-gray-600">Tạo lịch khám bệnh</Link>
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
                    <h2 className="text-2xl font-semibold mb-6">Hồ Sơ Của Tôi</h2>

                    <div className="w-full mt-8">

                        <CardContent>
                            <div>


                                <div>
                                    <div className="flex items-center justify-center">
                                        {avatar && (
                                            <>
                                                <label htmlFor="avatar" style={{ cursor: 'pointer' }}>
                                                    <img
                                                        src={avatar}
                                                        style={{
                                                            height: '150px',
                                                            width: '150px',
                                                            borderRadius: '50%',
                                                            border: '1px solid',
                                                            objectFit: 'cover'
                                                        }}
                                                        alt="avatar"
                                                    />
                                                </label>
                                                <input
                                                    className="hidden"
                                                    type="file"
                                                    id="avatar"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </>
                                        )}
                                    </div>



                                    <div>
                                        <Label htmlFor="email">Email</Label>
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

                                    <div className="my-2">
                                        <Label htmlFor="birthday">Ngày sinh</Label>
                                        <Input id="birthday" value={birthday} onChange={(e) => setBirthDay(e.target.value)} />
                                    </div>

                                    <div className="my-2">
                                        <Label htmlFor="address">Địa chỉ</Label>
                                        <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
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
                                <Button className="w-full" onClick={handleUpdate} disabled={!(name)}>Lưu</Button>
                            )}
                        </CardFooter>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
