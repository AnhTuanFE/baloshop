import { Box, IconButton, Typography, Avatar, TextField, MenuItem, Select, Autocomplete } from '@mui/material';
import { Search, LocalMall } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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
            },
        },
    },
});

const UINotLogin = () => {
    return (
        <Box
            sx={{
                flex: '1',
                display: 'flex',
            }}
        >
            <Typography
                align="center"
                sx={{
                    margin: '0px 8px',
                    fontSize: '18px',
                    verticalAlign: 'center',
                    fontWeight: 'bold',
                    padding: '4px 0px',
                    margin: 'auto',
                }}
            >
                Đăng nhập
            </Typography>
            <Typography
                align="center"
                sx={{
                    margin: '0px 8px',
                    fontSize: '18px',
                    verticalAlign: 'center',
                    fontWeight: 'bold',
                    padding: '4px 0px',
                    margin: 'auto',
                }}
            >
                Đăng ký
            </Typography>
        </Box>
    );
};
const UILogined = () => {
    return (
        <Box
            sx={{
                flex: '1',
                display: 'flex',
            }}
        >
            <Avatar
                alt="Remy Sharp"
                src="https://res.cloudinary.com/dt0iazjvh/image/upload/v1685325635/baloshopAvatar/bdvi7rllxxix656jcytq.jpg"
                sx={{ width: 48, height: 48 }}
            />
            <Select
                sx={{
                    width: '200px',
                }}
                value={10}
                variant="standard"
            >
                <MenuItem
                    value={10}
                    sx={{
                        display: 'none',
                    }}
                >
                    Tuấn đẹp zai
                </MenuItem>
                <MenuItem value={20}>Tài khoản của tôi</MenuItem>
                <MenuItem value={30}>Đăng xuất</MenuItem>
            </Select>
            <IconButton aria-label="delete" size="medium">
                <LocalMall
                    fontSize="inherit"
                    sx={{
                        color: 'black',
                    }}
                />
                <Box
                    sx={{
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        fontSize: '14px',
                        padding: '0px 4px',
                        color: 'var(--white-color)',
                    }}
                >
                    1
                </Box>
            </IconButton>
        </Box>
    );
};
export default function Header2() {
    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    '& > :not(style)': {
                        m: 4,
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'var(--content-color)',
                    marginTop: '20px',
                }}
            >
                <Box
                    sx={{
                        flex: '1',
                    }}
                >
                    <img
                        alt="Logo"
                        src="https://res.cloudinary.com/tlsbaloshop/image/upload/v1684744391/baloshopDefaulLogo/logo2_iac27f.png"
                        style={{ width: '124px' }}
                    />
                </Box>
                <Box
                    sx={{
                        flex: '3',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={[
                            {
                                label: 'hello',
                            },
                            {
                                label: 'hello',
                            },
                        ]}
                        sx={{ width: '70%', borderRadius: '6px' }}
                        renderInput={(params) => (
                            <TextField
                                sx={{
                                    backgroundColor: 'white',
                                }}
                                {...params}
                                label="Tìm kiếm"
                            />
                        )}
                    />
                    <IconButton
                        aria-label="search"
                        size="large"
                        sx={{
                            bgcolor: 'var(--main-color)',
                            borderRadius: '4px 8px 8px 4px',
                            padding: '-4px 14px',
                        }}
                    >
                        <Search
                            fontSize="inherit"
                            sx={{
                                color: 'var(--white-color)',
                            }}
                        />
                    </IconButton>
                </Box>

                {UILogined()}
            </Box>
        </Box>
    );
}
