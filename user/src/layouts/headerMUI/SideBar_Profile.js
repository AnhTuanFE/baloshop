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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Avatar
                    sx={{ width: 112, height: 112, margin: '0px 12px' }}
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
                    <Typography variant="h5">Nguyễn Anh Tuấn</Typography>
                    <Typography variant="subtitle1">
                        Ngày tham gia: {moment(userInfo.createdAt).format('DD/MM/YYYY')}
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
                            <ListItemButton>
                                <ListItemIcon>
                                    <ManageAccounts fontSize="large" color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="Hồ sơ cá nhân" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FactCheckRounded fontSize="large" color="secondary" />
                                </ListItemIcon>
                                <Link to="/purchasehistory">
                                    <ListItemText primary="Danh sách mua hàng" />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        </>
    );
}

export default SideBar_Profile;
