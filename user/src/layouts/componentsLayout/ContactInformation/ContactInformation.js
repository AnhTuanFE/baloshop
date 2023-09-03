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
            <div className="flex justify-between bg-[var(--color-layout)] px-8 py-1">
                <Box sx={{ color: 'var(--white-color)' }}>
                    <div className="flex">
                        <div className="flex pt-1">
                            <span className="text-sm">Hotline:</span>{' '}
                            <span className="text-sm font-medium">033.555.999</span>
                            <span className="mr-2 hidden text-sm font-thin sm:block"> (8-22h) miễn phí</span>
                        </div>
                        <div className="hidden md:block">
                            <span className="text-sm font-thin">|</span>
                            <span className=" ml-2 text-sm font-thin">Hệ thống siêu thị</span>
                        </div>
                    </div>
                </Box>

                <ThemeProvider theme={them}>
                    <Box
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <div className="mr-8 hidden text-white sm:mr-2 md:block">
                            <span className="text-sm font-thin ">Theo dõi chúng tôi</span>
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-gmail-30-722694.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-logo-2019-1597680-1350125.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-1868978-1583142.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-youtube-268-721990.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-pinterest-46-189745.png"
                            />
                        </div>
                        <div className="mr-2 cursor-pointer">
                            <img
                                className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-linkedin-162-498418.png"
                            />
                        </div>
                    </Box>
                </ThemeProvider>
            </div>
        </Box>
    );
}

export default ContactInformation;
