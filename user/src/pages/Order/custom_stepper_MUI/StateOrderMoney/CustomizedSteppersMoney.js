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
            // backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            backgroundColor: '[var(--green-color)]',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            // backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            backgroundColor: '[var(--green-color)]',
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
// export default function CustomizedSteppersMomo({ order }) {
export default function CustomizedSteppersMomo() {
    const [actiStep, setActiStep] = useState(0);

    const order = {
        _id: '64ecb0ea4cd4bcea0d2cd497',
        status: 'placed',
        // 'paid',
        historyStatus: ['placed', 'confirm', 'delivering', 'delivered', 'completed'],
        paymentMethod: 'pay-with-momo',
        shippingPrice: 22000,
        totalProductPrice: 299000,
        totalPrice: 321000,
        waitConfirmation: false,
        isPaid: false,
        completeUser: false,
        completeAdmin: false,
        cancel: 0,
        isDelivered: false,
        phone: '012345678',
        name: 'Anh Tuấn7',
        payment: '64ecb0ea4cd4bcea0d2cd499',
        createdAt: '2023-08-28T14:36:27.368Z',
        updatedAt: '2023-08-28T14:36:27.368Z',
        __v: 0,
    };

    // xóa phần tử item = "delivering"
    const historyStatus = ['placed', 'confirm', 'delivering', 'delivered', 'paid', 'completed'];

    const filteredStatusHistory = historyStatus.filter((status) => status !== 'delivering');
    // xóa phần tử item đứng sau "cancelled"
    const indexOfCancelled = filteredStatusHistory.indexOf('cancelled');
    if (indexOfCancelled !== -1) {
        filteredStatusHistory.splice(indexOfCancelled + 1);
    }

    const handleConfigContent = (status) => {
        if (status == 'placed') {
            return {
                iconNumber: 1,
                content: 'Đã đặt hàng',
                label: 'Đã đặt hàng',
            };
        }
        if (status == 'paid') {
            return {
                iconNumber: 2,
                content: 'Đã thanh toán',
                label: 'Chờ thanh toán',
            };
        }
        if (status == 'confirm') {
            return {
                iconNumber: 3,
                content: 'Đã xác nhận',
                label: 'Chờ xác nhận',
            };
        }
        if (status == 'delivered') {
            return {
                iconNumber: 4,
                content: 'Đã giao',
                label: 'Giao hàng',
            };
        }
        if (status == 'completed') {
            return {
                iconNumber: 6,
                content: 'Đã hoàn thành',
                label: 'Hoàn thành',
            };
        }
        if (status == 'cancelled') {
            return {
                iconNumber: 7,
                content: 'Đã hủy',
                label: 'Hủy',
            };
        } else return null;
    };
    // thêm các icon, label, content tương ứng với các trạng thái của lịch sử trạng thái đơn hàng
    const configStatusHistory = filteredStatusHistory.map((status) => {
        return {
            status,
            ...handleConfigContent(status),
        };
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
                    let lenghtArrStatus = filteredStatusHistory.length - 1;
                    setActiStep(lenghtArrStatus);
                }
            } else {
                setActiStep(0);
                return <div>không có đơn hàng nào</div>;
            }
        }
    }, []);

    return (
        <div className="bg-white">
            {order?.isPaid == false ? (
                ' '
            ) : (
                <div className="mr-10 flex justify-end py-2">
                    <p className="mr-10 text-xl font-semibold text-red-600">Đơn hàng chưa thanh toán</p>
                    <div>
                        <button className="w-full rounded bg-[var(--main-color)] px-2 py-1 font-medium text-white hover:bg-[var(--main-color-hover)]">
                            Thanh toán ngay
                        </button>
                    </div>
                </div>
            )}
            <Stack
                sx={{ width: '100%', marginBottom: '16px', bgcolor: '#ffff', padding: '12px 0px', borderRadius: '4px' }}
                spacing={4}
            >
                <Box sx={{ width: '100%' }}>
                    <Stepper alternativeLabel activeStep={actiStep} connector={<ColorlibConnector />}>
                        {configStatusHistory.map((item, index) => {
                            return (
                                <Step key={index}>
                                    <div>
                                        <StepLabel
                                            StepIconComponent={(props) => (
                                                <ColorlibStepIcon {...props} iconNumber={item.iconNumber} />
                                            )}
                                        >
                                            {actiStep >= index ? `${item.content}` : `${item.label}`}
                                        </StepLabel>
                                    </div>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
            </Stack>
        </div>
    );
}
