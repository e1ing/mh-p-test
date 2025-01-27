import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileRequest } from '../../redux/reducers/profileReducer';
import { AppRootStateType } from '../../redux/store';
import { logout } from '../../redux/reducers/authReducer';
import { Button, Card, List, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { deleteCookie } from '../../utils/cookiseUtil';
import './Profile.scss';
import { Navigate, useNavigate } from 'react-router-dom';

export const Profile = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state: AppRootStateType) => state.profile);
    const navigate = useNavigate();

    const handleLogout = () => {
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        dispatch(logout());
    };

    useEffect(() => {
        dispatch(profileRequest());
    }, [dispatch]);

    return (
        <>
            {profile && <Card
                title={
                    <Title level={3} style={{ marginBottom: 0 }}>
                        Профиль пользователя
                    </Title>
                }
                className={"profile-wrapper"}
                actions={[
                    <Button type="primary" danger onClick={handleLogout}>
                        Выйти
                    </Button>,
                    <Button type="link" onClick={() => navigate("/posts/:page?")}>
                        Посты
                    </Button>,
                ]}
            >
                <List itemLayout="horizontal">
                    <List.Item>
                        <List.Item.Meta
                            avatar={<UserOutlined />}
                            title="Имя"
                            description={profile.name}
                        />
                    </List.Item>

                    <List.Item>
                        <List.Item.Meta
                            avatar={<MailOutlined />}
                            title="Email"
                            description={profile.email}
                        />
                    </List.Item>

                    <List.Item>
                        <List.Item.Meta
                            avatar={<PhoneOutlined />}
                            title="Телефон"
                            description={profile.phone || 'Не указан'}
                        />
                    </List.Item>

                    <List.Item>
                        <List.Item.Meta
                            avatar={<UserOutlined />}
                            title="Роли"
                            description={
                                <div>
                                    {profile.roles.map((role) => (
                                        <Tag key={role.role} color="blue">
                                            {role.name}
                                        </Tag>
                                    ))}
                                </div>
                            }
                        />
                    </List.Item>

                    <List.Item>
                        <List.Item.Meta
                            avatar={<Tag color={profile.isActive ? 'green' : 'red'}>Статус</Tag>}
                            title="Статус"
                            description={
                                <Text type={profile.isActive ? 'success' : 'danger'}>
                                    {profile.status.name}
                                </Text>
                            }
                        />
                    </List.Item>

                    <List.Item>
                        <List.Item.Meta
                            avatar={<ClockCircleOutlined />}
                            title="Дата создания"
                            description={new Date(profile.createdAt).toLocaleString()}
                        />
                    </List.Item>

                    <List.Item>
                        <List.Item.Meta
                            avatar={<ClockCircleOutlined />}
                            title="Дата обновления"
                            description={new Date(profile.updatedAt).toLocaleString()}
                        />
                    </List.Item>
                </List>
            </Card>}
        </>
    );
};


