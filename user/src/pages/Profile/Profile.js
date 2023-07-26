import { Box, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Detail_infor_account from './profileComponent/detail_infor_account/Detail_infor_account';
import Change_password from './profileComponent/change_password/Change_password';
import Crop_image_avatar from './profileComponent/crop_image_avatar/Crop_image_avatar';
import SideBar_Profile from './profileComponent/sideBar_profile/SideBar_Profile';
import { Tabs } from 'antd';

import styles from './Profile.module.css';
import './Profile.css';
const { TabPane } = Tabs;

const them = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'white',
                    margin: '0px 4px',
                },
            },
        },
    },
});
const themTest = createTheme({
    components: {
        styleOverrides: {
            root: {
                border: 'none',
                margin: '12px',
            },
        },
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Typography>
    );
}

export default function Profile() {
    const theme = useTheme();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user, success: successDetail } = userDetails;

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
    return (
        <div className="mx-auto my-auto max-w-screen-2xl">
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
                                    <TabPane tab={item.label} key={item.key} className={clsx(styles.head_swipe_view)}>
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
    );
}
