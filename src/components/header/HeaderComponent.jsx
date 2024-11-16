import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlide.js';
import { HeartPulse } from 'lucide-react';
import { Button } from "../ui/button";
import { ReloadIcon } from '@radix-ui/react-icons';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        if (loading) return;
        setLoading(true);
        await UserService.logoutUser();
        dispatch(resetUser());
        setLoading(false);
        navigate('/signin');
    };

    return (
        <header className="bg-sky-200 sticky top-0 min-h-[80px] flex items-center shadow-md z-10">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center font-bold text-xl text-blue-600 gap-2">
                    <HeartPulse className="w-6 h-6" />
                    <span>QUẢN LÍ BỆNH VIỆN</span>
                </Link>

                {/* Navigation Menu */}
                {!user?.isAdmin && (
                    <nav className="hidden md:flex space-x-4 text-gray-700 font-bold text-xl">
                        <Link to="/specialty" className="hover:text-blue-600">Chuyên khoa</Link>
                        <Link to="/doctor" className="hover:text-blue-600">Đặt lịch khám bệnh</Link>
                        <Link to="/medicine" className="hover:text-blue-600">Cửa hàng thuốc</Link>
                        <Link to="/bmi" className="hover:text-blue-600">Chỉ số BMI</Link>
                    </nav>
                )}

                {/* User Profile & Authentication */}
                <div className="flex items-center">
                    {user?.access_token ? (
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={user.avatar}
                                                alt="User Avatar"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <span className="font-semibold">
                                                {user.name || user.email}
                                            </span>
                                        </div>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <NavigationMenuLink>
                                            <div className="flex flex-col items-start p-2">
                                                {user.isAdmin ? (
                                                    <Button
                                                        variant="link"
                                                        onClick={() => navigate('/admin')}
                                                    >
                                                        Quản lí
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="link"
                                                        onClick={() => navigate('/profile')}
                                                    >
                                                        Thông tin người dùng
                                                    </Button>
                                                )}
                                                {loading ? (
                                                    <Button
                                                        disabled
                                                        variant="link"
                                                        className="flex items-center w-full"
                                                    >
                                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                                        Đang xử lý
                                                    </Button>
                                                ) : (
                                                    <Button variant="link" onClick={handleLogout}>
                                                        Đăng xuất
                                                    </Button>
                                                )}
                                            </div>
                                        </NavigationMenuLink>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    ) : (
                        <div className="bg-transparent p-4">
                            <div className="flex items-center justify-end gap-4">
                                <div className="flex gap-6">
                                    <Link to="/signin" className="border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 ">
                                        Đăng nhập
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
