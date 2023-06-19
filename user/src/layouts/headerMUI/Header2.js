import { Box, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './Header2.module.css';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector } from 'react-redux';
// =============================================
import Detail_infor_account from './Detail_infor_account';
import Change_password from './Change_password';
import Crop_image_avatar from './Crop_image_avatar';
import SideBar_Profile from './SideBar_Profile';

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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

export default function Header2() {
    const theme = useTheme();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user, success: successDetail } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // ================ để đấy đã ===============
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    // ================ để đấy ===============

    return (
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
                <Box
                    sx={{
                        flex: '1',
                    }}
                >
                    <SideBar_Profile userInfo={userInfo} />
                </Box>

                <Box
                    sx={{
                        flex: '2',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            minHeight: 200,
                            position: 'relative',
                            margin: '0px 20px',
                        }}
                    >
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="action tabs example"
                            >
                                <Tab label="Thông tin" {...a11yProps(0)} />
                                <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                            className={clsx(styles.table_swich)}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <Detail_infor_account user={user} />
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <Change_password user={user} />
                            </TabPanel>
                        </SwipeableViews>
                    </Box>
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
    );
}
