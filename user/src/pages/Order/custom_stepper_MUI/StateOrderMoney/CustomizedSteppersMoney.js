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

/*
    'placed';
    'confirm';
    'delivering';
    'delivered';
    'cancelled';
    'completed';

    - Trước tiên thì cần có một khung của trạng thái, dựa vào history status
    - đầu tiên cần xử lý các trạng thái đơn hàng
    - Dựa vào trạng thái hiện tại rồi đánh dấu trạng thái đơn hàng
    - nếu trạng thái hiện tại là place thì set cái trạng thái trước đó của nó là content (làm đậm) 
       và cái đằng sau cho nó hiển thị label (làm mờ)
    - Nếu đơn hàng bị hủy thì sau đó sẽ ẩn những cái đằng sau đi vẫn làm đậm cái trước
    */
export default function CustomizedSteppersMoney({ order }) {
    const { statusHistory } = order;
    const [actiStep, setActiStep] = useState(0);

    const handleConfigContent = (status, date, description) => {
        if (status == 'placed') {
            return {
                iconNumber: 1,
                content: 'Đã đặt hàng',
                label: 'Chờ đặt hàng',
                createdAt: date,
                description: description,
            };
        }
        if (status == 'confirm') {
            return {
                iconNumber: 3,
                content: 'Đã xác nhận đơn hàng',
                label: 'Chờ xác nhận đơn hàng',
                createdAt: date,
                description: description,
            };
        }
        if (status == 'delivered') {
            return {
                iconNumber: 4,
                content: 'Đang giao',
                label: 'Chờ giao hàng',
                createdAt: date,
                description: description,
            };
        }
        if (status == 'paid') {
            return {
                iconNumber: 2,
                content: 'Đã giao và thanh toán',
                label: 'Chờ nhận hàng và thanh toán',
                createdAt: date,
                description: description,
            };
        }
        if (status == 'completed') {
            return {
                iconNumber: 6,
                content: 'Đã hoàn thành',
                label: 'Xác nhận hoàn thành đơn hàng',
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
        arrayStatusHistory.push(handleConfigContent(item.status, item.updatedAt, item.description));
    });

    useEffect(() => {
        if (order) {
            if (order?.status) {
                if (order?.status == 'placed') {
                    setActiStep(0);
                }
                if (order?.status == 'confirm') {
                    setActiStep(1);
                }
                if (order?.status == 'delivered') {
                    setActiStep(2);
                }
                if (order?.status == 'paid') {
                    setActiStep(3);
                }
                if (order?.status == 'completed') {
                    setActiStep(4);
                }
                if (order?.status == 'cancelled') {
                    setActiStep(Number(arrayStatusHistory.length) - 1);
                }
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
                                                {index <= actiStep ? (
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
                                                ) : (
                                                    item.label
                                                )}
                                            </StepLabel>
                                        </div>
                                    </Step>
                                );
                            }
                        })}
                    </Stepper>
                </Box>
            </Stack>
        </div>
    );
}
