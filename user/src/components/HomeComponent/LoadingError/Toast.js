import React from 'react';
import { notification } from 'antd';

const Toast = ({ childrent }) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };
    return (
        <div>
            {contextHolder}
            {childrent}
        </div>
    );
};

export default Toast;
