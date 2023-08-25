import Box from '@mui/material/Box';
import { LocalPostOfficeSharp, FacebookSharp, Instagram, YouTube, Pinterest, LinkedIn } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const them = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'var(--white-color)',
                    margin: '0px 4px',
                },
            },
        },
    },
});
function ContactInformation() {
    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    '& > :not(style)': {
                        m: 1,
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 32px',
                    bgcolor: 'var(--color-layout)',
                }}
            >
                <Box sx={{ color: 'var(--white-color)' }}>
                    <div>
                        <span className="text-sm">Hotline:</span>{' '}
                        <span className="text-sm font-medium">033.555.999</span>
                        <span className="mr-6 text-sm font-thin"> (8-22h) miễn phí</span>
                        <span className="text-sm font-thin">|</span>
                        <span className=" ml-6 text-sm font-thin">Hệ thống siêu thị</span>
                    </div>
                </Box>

                <ThemeProvider theme={them}>
                    <Box
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <Box
                            sx={{
                                marginRight: '32px',
                                color: 'white',
                            }}
                        >
                            <span className=" ml-6 text-sm font-thin">Theo dõi chúng tôi</span>
                        </Box>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[30px] w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-gmail-30-722694.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[30px] w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-logo-2019-1597680-1350125.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[30px] w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-1868978-1583142.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[30px] w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-youtube-268-721990.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[30px] w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-pinterest-46-189745.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[30px] w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-linkedin-162-498418.png"
                            />
                        </div>
                    </Box>
                </ThemeProvider>
            </Box>
        </Box>
    );
}

export default ContactInformation;
