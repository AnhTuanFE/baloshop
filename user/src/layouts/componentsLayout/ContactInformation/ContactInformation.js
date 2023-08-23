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
                <Box sx={{ color: 'var(--white-color)' }}>Đường dây nóng: 034765889</Box>

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
                            Theo dõi chúng tôi
                        </Box>
                        <LocalPostOfficeSharp />
                        <FacebookSharp />
                        <Instagram />
                        <YouTube />
                        <Pinterest />
                        <LinkedIn />
                    </Box>
                </ThemeProvider>
            </Box>
        </Box>
    );
}

export default ContactInformation;
