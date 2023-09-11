import moment from 'moment';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import {
    BookmarkAddedSharp,
    CancelSharp,
    LibraryAddCheckSharp,
    LocalShippingSharp,
    AssuredWorkload,
    LocalAtmSharp,
    ContactMailSharp,
} from '@mui/icons-material';
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        // backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        backgroundColor: '#e85d97',

        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        // backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        backgroundColor: '#e85d97',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className, iconNumber } = props;

    const icons = {
        1: <BookmarkAddedSharp />,
        2: <LocalAtmSharp />,
        3: <AssuredWorkload />,
        4: <LocalShippingSharp />,
        5: <ContactMailSharp />,
        6: <LibraryAddCheckSharp />,
        7: <CancelSharp />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ active, completed }} className={className}>
            {icons[String(iconNumber)]}
        </ColorlibStepIconRoot>
    );
}
export default function CustomizedSteppersPayOnline({ order }) {
    const { statusHistory } = order;
    const [actiStep, setActiStep] = useState(0);

    const handleConfigContent = (status, date, description) => {
        if (status == 'placed') {
            return {
                iconNumber: 1,
                content: 'Đã đặt hàng',
                label: 'Đã đặt hàng',
                createdAt: date,
                description: description,
            };
        }
        if (status == 'paid') {
            return {
                iconNumber: 2,
                content: 'Đã thanh toán',
                label: 'Thanh toán',
                createdAt: date,
                description: description,
            };
        }
        if (status == 'confirm') {
            return {
                iconNumber: 3,
                content: 'Xác nhận đơn hàng',
                label: 'Chờ xác nhận',
                createdAt: date,
                description: description,
            };
        }
        if (status == 'delivering') {
            return {
                iconNumber: 4,
                content: 'Đang giao',
                label: 'Giao hàng',
                createdAt: date,
                description: description,
            };
        }
        // if (status == 'delivered') {
        //     return {
        //         iconNumber: 4,
        //         content: 'Đã giao',
        //         label: 'Giao hàng',
        //         createdAt: date,
        //     };
        // }
        if (status == 'completed') {
            return {
                iconNumber: 6,
                content: 'Đã hoàn thành',
                label: 'Hoàn thành',
                createdAt: date,
                description: description,
            };
        }
        if (status == 'cancelled') {
            return {
                iconNumber: 7,
                content: 'Đơn hàng đã bị hủy',
                label: 'Hủy',
                createdAt: date,
                description: description,
            };
        }
        // else return null;
    };
    const arrayStatusHistory = [];
    statusHistory.map((item) => {
        arrayStatusHistory.push(handleConfigContent(item.status, item.createdAt));
    });

    /*
    placed
    confirm
    delivering
    paid
    delivered
    completed
    cancelled
    */
    useEffect(() => {
        if (order) {
            if (order?.status) {
                // if (order?.status == 'placed') {
                //     setActiStep(0);
                // }
                // if (order?.status == 'paid') {
                //     setActiStep(1);
                // }
                // if (order?.status == 'confirm') {
                //     setActiStep(2);
                // }
                // if (order?.status == 'delivering') {
                //     setActiStep(3);
                // }
                // if (order?.status == 'delivered') {
                //     setActiStep(4);
                // }
                // if (order?.status == 'completed') {
                //     setActiStep(5);
                // }
                // if (order?.status == 'cancelled') {
                //     setActiStep(Number(arrayStatusHistory.length) - 1);
                // }
                setActiStep(Number(arrayStatusHistory.length) - 1);
            } else {
                setActiStep(0);
            }
        }
    }, []);

    return (
        <div className="bg-white">
            <Stack
                sx={{ width: '100%', marginBottom: '16px', bgcolor: '#ffff', padding: '12px 0px', borderRadius: '4px' }}
                spacing={4}
            >
                <Box sx={{ width: '100%' }}>
                    <Stepper alternativeLabel activeStep={actiStep} connector={<ColorlibConnector />}>
                        {arrayStatusHistory?.map((item, index) => {
                            if (item) {
                                return (
                                    <Step key={index}>
                                        <div>
                                            <StepLabel
                                                StepIconComponent={(props) => (
                                                    <ColorlibStepIcon {...props} iconNumber={item.iconNumber} />
                                                )}
                                            >
                                                <div>
                                                    {item.content}
                                                    <div className="text-sm font-semibold text-red-500">
                                                        {moment(item.createdAt).hours()}
                                                        {':'}
                                                        {moment(item.createdAt).minutes() < 10
                                                            ? `0${moment(item.createdAt).minutes()}`
                                                            : moment(item.createdAt).minutes()}{' '}
                                                        {moment(item.createdAt).format('DD/MM/YYYY')}{' '}
                                                    </div>
                                                    {item.content == 'Đơn hàng đã bị hủy' && (
                                                        <div className="text-sm font-semibold text-red-600">
                                                            <b>{item.description}</b>
                                                        </div>
                                                    )}
                                                </div>
                                            </StepLabel>
                                        </div>
                                    </Step>
                                );
                            }
                        })}
                        {/* <Step key={1}>
                            <div>
                                <StepLabel
                                    StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={1} />}
                                >
                                    Đã đặt hàng
                                </StepLabel>
                            </div>
                        </Step>
                        <Step key={2}>
                            <div>
                                <StepLabel
                                    StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={3} />}
                                >
                                    Xác nhận đơn hàng
                                </StepLabel>
                            </div>
                        </Step>
                        <Step key={3}>
                            <div>
                                <StepLabel
                                    StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={4} />}
                                >
                                    Đang giao
                                </StepLabel>
                            </div>
                        </Step>
                        <Step key={4}>
                            <div>
                                <StepLabel
                                    StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={2} />}
                                >
                                    Đã giao và thanh toán
                                </StepLabel>
                            </div>
                        </Step>
                        <Step key={5}>
                            <div>
                                <StepLabel
                                    StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={6} />}
                                >
                                    Hoàn tất
                                </StepLabel>
                            </div>
                        </Step> */}
                    </Stepper>
                </Box>
            </Stack>
        </div>
    );
}
