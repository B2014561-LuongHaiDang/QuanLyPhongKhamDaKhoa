import { Col, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { getAllUser } from '../../services/UserService';

const UserList = () => {
    useEffect(() => {
        getAllUser().then(res => {
            setUsers(res.data)
        })
    }, [])

    const [users, setUsers] = useState([]);

    const items = [
        getItem('Lịch khám bệnh', 'sub1', <UserOutlined />, [
            getItem(<Link to="/admin">Danh sách</Link>),
        ]),
        getItem('Bác sĩ', 'sub2', <AppstoreOutlined />, [
            getItem(<Link to="/admin/doctor">Thêm</Link>),
            getItem(<Link to="/admin/doctor/list">Danh sách</Link>),
        ]),
        getItem('Thông tin người dùng', 'sub3', <AppstoreOutlined />, [
            getItem(<Link to="#">Danh sách</Link>),
        ]),
    ];

    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    const [openKeys, setOpenKeys] = useState(['sub3']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Row>
            <Col span={5}>
                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    style={{ width: 256 }}
                    items={items}
                />
            </Col>

            <Col span={19}>
                <div>
                    {users && users.map(user => (
                        <Row key={user.id} gutter={[16, 16]} style={{ borderBottom: "1px solid #ccc", paddingTop: "10px" }}>
                            <Col span={6}>
                                <img src={user.avatar} alt="avatar" style={{ height: '50px', width: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                            </Col>
                            <Col span={9}>
                                <p style={{ marginTop: "22px"}}>Tên người dùng: {user.name}</p>
                            </Col>
                            <Col span={9}>
                                <p style={{ marginTop: "22px"}}>CCCD: {user.cccd}</p>
                            </Col>
                        </Row>
                    ))}
                </div>
            </Col>
        </Row>
    );
}

export default UserList;
