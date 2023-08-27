import moment from 'moment';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import LocalShippingSharpIcon from '@mui/icons-material/LocalShippingSharp';
import LocalAtmSharpIcon from '@mui/icons-material/LocalAtmSharp';
import LibraryAddCheckSharpIcon from '@mui/icons-material/LibraryAddCheckSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

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
        backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className, iconNumber } = props;

    const icons = {
        1: <AssuredWorkloadIcon />,
        2: <LocalShippingSharpIcon />,
        3: <LocalAtmSharpIcon />,
        4: <LibraryAddCheckSharpIcon />,
        5: <CancelSharpIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ active, completed }} className={className}>
            {icons[String(iconNumber)]}
        </ColorlibStepIconRoot>
    );
}

export default function CustomizedSteppersPaypal({ order }) {
    const [actiStep, setActiStep] = useState(0);
    useEffect(() => {
        if (order) {
            if (order.waitConfirmation) {
                setActiStep(1);
            }
            if (order.isPaid) {
                setActiStep(2);
            }
            if (order.delivered) {
                setActiStep(3);
            }
            // if (order.completeAdmin && order.completeUser) {
            //     setActiStep(3);
            // }
        } else {
            return <div>không có đơn hàng nào</div>;
        }
    }, []);

    return (
        <Stack
            sx={{ width: '100%', marginBottom: '16px', bgcolor: '#ffff', padding: '12px 0px', borderRadius: '4px' }}
            spacing={4}
        >
            <Box sx={{ width: '100%' }}>
                {order.cancel == 0 ? (
                    <Stepper alternativeLabel activeStep={actiStep} connector={<ColorlibConnector />}>
                        {order.waitConfirmation ? (
                            <Step key={1}>
                                <div className="">
                                    <StepLabel
                                        StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={1} />}
                                    >
                                        Đã xác nhận
                                    </StepLabel>
                                    <span className=" mt-2 flex justify-center text-sm font-semibold text-[red]">
                                        {moment(order?.waitConfirmationAt).hours()}
                                        {':'}
                                        {moment(order?.waitConfirmationAt).minutes() < 10
                                            ? `0${moment(order?.waitConfirmationAt).minutes()}`
                                            : moment(order?.waitConfirmationAt).minutes()}{' '}
                                        {moment(order?.waitConfirmationAt).format('DD/MM/YYYY')}{' '}
                                    </span>
                                </div>
                            </Step>
                        ) : (
                            <Step key={1}>
                                <StepLabel
                                    StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={1} />}
                                >
                                    Chờ xác nhận
                                </StepLabel>
                            </Step>
                        )}
                        {order.isPaid ? (
                            <Step key={2}>
                                <div>
                                    <StepLabel
                                        StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={3} />}
                                    >
                                        Đã thanh toán
                                    </StepLabel>
                                    <span className=" mt-2 flex justify-center text-sm font-semibold text-[red]">
                                        {moment(order?.paidAt).hours()}
                                        {':'}
                                        {moment(order?.paidAt).minutes() < 10
                                            ? `0${moment(order?.paidAt).minutes()}`
                                            : moment(order?.paidAt).minutes()}{' '}
                                        {moment(order?.paidAt).format('DD/MM/YYYY')}{' '}
                                    </span>
                                </div>
                            </Step>
                        ) : (
                            <Step key={2}>
                                <StepLabel icon={<LocalAtmSharpIcon fontSize="large" />}>Chờ thanh toán</StepLabel>
                            </Step>
                        )}
                        {order.isDelivered ? (
                            <Step key={3}>
                                <div>
                                    <StepLabel
                                        StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={2} />}
                                    >
                                        Đã giao
                                    </StepLabel>
                                    <span className=" mt-2 flex justify-center text-sm font-semibold text-[red]">
                                        {moment(order?.deliveredAt).hours()}
                                        {':'}
                                        {moment(order?.deliveredAt).minutes() < 10
                                            ? `0${moment(order?.deliveredAt).minutes()}`
                                            : moment(order?.deliveredAt).minutes()}{' '}
                                        {moment(order?.deliveredAt).format('DD/MM/YYYY')}{' '}
                                    </span>
                                </div>
                            </Step>
                        ) : (
                            <Step key={3}>
                                {/* icon={<LocalShippingSharpIcon fontSize="large" />} */}
                                <StepLabel
                                    StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={2} />}
                                >
                                    Đang giao
                                </StepLabel>
                            </Step>
                        )}
                        {order.completeAdmin || order.completeUser ? (
                            <Step key={4}>
                                <div>
                                    <StepLabel
                                        StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={4} />}
                                    >
                                        Đã Hoàn tất
                                    </StepLabel>
                                    <span className=" mt-2 flex justify-center text-sm font-semibold text-[red]">
                                        {moment(order?.completeAdminAt).hours()}
                                        {':'}
                                        {moment(order?.completeAdminAt).minutes() < 10
                                            ? `0${moment(order?.completeAdminAt).minutes()}`
                                            : moment(order?.completeAdminAt).minutes()}{' '}
                                        {moment(order?.completeAdminAt).format('DD/MM/YYYY')}{' '}
                                    </span>
                                </div>
                            </Step>
                        ) : (
                            <Step key={4}>
                                <StepLabel
                                    StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={4} />}
                                >
                                    Khách hàng xác nhận hoàn tất
                                </StepLabel>
                            </Step>
                        )}
                    </Stepper>
                ) : (
                    <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
                        <Step key={1}>
                            <StepLabel StepIconComponent={(props) => <ColorlibStepIcon {...props} iconNumber={5} />}>
                                Đơn hàng đã bị hủy
                            </StepLabel>
                        </Step>
                    </Stepper>
                )}
            </Box>
        </Stack>
    );
}
