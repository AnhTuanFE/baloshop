import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Detail_infor_account from './profileComponent/detail_infor_account/Detail_infor_account';
import Change_password from './profileComponent/change_password/Change_password';
import Crop_image_avatar from './profileComponent/crop_image_avatar/Crop_image_avatar';
import SideBar_Profile from './profileComponent/sideBar_profile/SideBar_Profile';
import { Tabs, Spin, notification } from 'antd';
import styles from './Profile.module.css';
import './Profile.css';
import Loading from '~/components/HomeComponent/LoadingError/Loading';
import Message from '~/components/HomeComponent/LoadingError/Error';
import { useEffect } from 'react';
const { TabPane } = Tabs;
export default function Profile() {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user, success } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const items = [
        {
            label: <span className={clsx(styles.head_swipe_view_label)}>Thông tin</span>,
            key: '1',
            children: <Detail_infor_account user={user} />,
        },
        {
            label: <span className={clsx(styles.head_swipe_view_label)}>Đổi mật khẩu</span>,
            key: '2',
            children: <Change_password user={user} />,
        },
    ];
    // openNotification('top', 'Cập nhập thông tin thành công', 'success');
    return (
        <div className="mx-auto my-auto max-w-screen-2xl">
            {contextHolder}
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <div>
                    <Box
                        sx={{
                            '& > :not(style)': {
                                m: 5,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <SideBar_Profile userInfo={userInfo} />
                            <Box
                                sx={{
                                    flex: '2',
                                    alignItems: 'center',
                                }}
                            >
                                <div className="ml-12 mr-12">
                                    <Tabs defaultActiveKey="1" items={items} className={clsx(styles.head_swipe)}>
                                        {items.map((item) => (
                                            <TabPane
                                                tab={item.label}
                                                key={item.key}
                                                className={clsx(styles.head_swipe_view)}
                                            >
                                                {item.children}
                                            </TabPane>
                                        ))}
                                    </Tabs>
                                </div>
                            </Box>
                            <Box
                                sx={{
                                    flex: '1',
                                }}
                            >
                                <Crop_image_avatar user={user} />
                            </Box>
                        </Box>
                    </Box>
                </div>
            )}
        </div>
    );
}
