import {
    Box,
    Typography,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { ManageAccounts, FactCheckRounded } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { imageDefaul } from '~/utils/data';

function SideBar_Profile({ userInfo }) {
    return (
        <>
            <div className=" mr-3 px-2">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Avatar
                        sx={{ width: 60, height: 60, margin: '0px 12px' }}
                        src={
                            userInfo?.image?.urlImageCloudinary !== undefined
                                ? userInfo?.image?.urlImageCloudinary
                                : imageDefaul
                        }
                    />
                    <Box
                        sx={{
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h7" className="font-semibold">
                            Nguyễn Anh Tuấn
                        </Typography>
                        <Typography variant="subtitle1">
                            Ngày đăng ký: {moment(userInfo.createdAt).format('DD/MM/YYYY')}
                        </Typography>
                    </Box>
                </Box>
                <Divider
                    sx={{
                        margin: '0px 24px',
                    }}
                />
                <Box>
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <Link to={'/profile'} className="w-full">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ManageAccounts fontSize="medium" color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Hồ sơ cá nhân" />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding>
                                <Link to="/purchasehistory" className="w-full">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <FactCheckRounded fontSize="medium" color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Danh sách mua hàng" />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </div>
        </>
    );
}

export default SideBar_Profile;
