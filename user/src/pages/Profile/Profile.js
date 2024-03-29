import { useSelector } from 'react-redux';
import Detail_infor_account from './profileComponent/detail_infor_account/Detail_infor_account';
import Change_password from './profileComponent/change_password/Change_password';
import Crop_image_avatar from './profileComponent/crop_image_avatar/Crop_image_avatar';
import SideBar_Profile from './profileComponent/sideBar_profile/SideBar_Profile';
import { Tabs, notification } from 'antd';
import './Profile.css';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';

const { TabPane } = Tabs;
export default function Profile() {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };

    // const userDetails = useSelector((state) => state.userDetails);
    // const { loading, error, user, success } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const items = [
        {
            label: <span className="flex items-center text-lg font-semibold">Thông tin</span>,
            key: '1',
            children: <Detail_infor_account user={userInfo} />,
        },
        {
            label: <span className="flex items-center text-lg font-semibold">Đổi mật khẩu</span>,
            key: '2',
            children: <Change_password />,
        },
    ];
    // openNotification('top', 'Cập nhập thông tin thành công', 'success');
    return (
        <div className="mx-auto my-auto max-w-screen-2xl">
            {contextHolder}
            {/* {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                
            )} */}
            <div className="bg-white pb-10 max-sm:pt-4 sm:pt-10">
                <div>
                    <div className="row col-lg-12">
                        <div className="col-lg-3">
                            <SideBar_Profile userInfo={userInfo} />
                        </div>
                        <div className="col-lg-7 items-center pb-2">
                            <div className="">
                                <Tabs
                                    defaultActiveKey="1"
                                    items={items}
                                    className=" pb-5 pt-2 shadow-custom-shadow max-sm:px-2 sm:px-10"
                                >
                                    {items.map((item) => (
                                        <TabPane tab={item.label} key={item.key} className="">
                                            {item.children}
                                        </TabPane>
                                    ))}
                                </Tabs>
                            </div>
                        </div>
                        <div className="col-lg-2 flex justify-center">
                            <Crop_image_avatar user={userInfo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
