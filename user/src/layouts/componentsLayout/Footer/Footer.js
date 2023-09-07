import { memo } from 'react';
import { faPhone, faLocationDot, faEnvelope, faMailBulk, faMailForward } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const arrayInfo = [
    {
        image: 'https://cdn-icons-png.flaticon.com/128/1161/1161388.png',
        label: 'Bảo hành trọn đời',
        content: 'Trên toàn hệ thống',
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/9183/9183512.png',
        label: 'Đổi trả trong 365 ngày',
        content: 'Nếu không hài lòng',
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/5511/5511413.png',
        label: 'Hàng chính hãng 100%',
        content: 'Hoàn tiền nếu phát hiện hàng giả',
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/10840/10840897.png',
        label: 'Hoàn tiền 100%',
        content: 'Nếu sản phẩm gặp lỗi',
    },
];

function Footer() {
    return (
        <div className="">
            <div className="bg-white">
                <hr />
                {/* flex  flex-wrap justify-around */}
                <div className=" row col-lg-12 col-md-12 mx-3">
                    {arrayInfo.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="col-lg-3 col-md-6 flex items-center max-md:w-full max-md:py-4 md:py-5"
                            >
                                <div className=" flex w-[30%] justify-center">
                                    <img className=" max-md:h-[50px] md:h-[80px]" src={item.image} />
                                </div>
                                <div className="mt-3 max-md:ml-0 md:ml-2">
                                    <p className="text-xl font-medium">{item.label}</p>
                                    <p className="text-base font-extralight text-slate-500">{item.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <hr />
            </div>
            <div className="row col-lg-12 col-md-12 bg-[#f5f5f5] max-md:py-10 md:py-14">
                <div className=" col-lg-3 col-md-6 px-6 pr-4 text-left font-sans max-md:hidden md:block ">
                    <h3 className="pb-3 text-lg font-medium">Lịch sử phát triển BALOSHOP</h3>
                    <p className="pb-3 pl-2 text-sm">
                        Thành lập từ 2022, sau đó mở rộng thêm 3 chi nhánh tại TP HCM vào 2023.
                    </p>
                    <p className="pb-1 pl-2 text-sm">
                        Hiện tại BALOSHOP là chuỗi bán lẻ hành lý với hơn 25+ cửa hàng. BALOSHOP còn được biết đến là
                        thương hiệu bán VALI được yêu thích nhất tại thành phố Hồ Chí Minh.
                    </p>
                </div>
                <div className="col-lg-3 col-md-6 px-2 text-left font-sans max-md:hidden md:block ">
                    <h3 className="pb-3 text-lg font-medium">Chính sách bán hàng</h3>
                    <div className="">
                        <p className="cursor-pointer pb-2 text-sm">Chính sách bảo hành</p>
                        <p className="cursor-pointer pb-2 text-sm">Chính sách bảo mật</p>
                        <p className="cursor-pointer pb-2 text-sm">Chính sách đổi trả</p>
                        <p className="cursor-pointer pb-2 text-sm">Chính sách khách hàng thân thiết</p>
                        <p className="cursor-pointer pb-2 text-sm">Chính sách vận chuyển</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-0 text-left font-sans max-md:px-6 md:mt-5 md:px-6 lg:px-2">
                    <h3 className="pb-3 text-lg font-medium">Thông tin liên hệ</h3>
                    <div className="flex pb-2">
                        <img className="h-[22px]" src="https://cdn-icons-png.flaticon.com/128/3687/3687004.png" />
                        <p className="pb-1 pl-2 text-sm">
                            <span className="font-medium">Điện thoại:</span> 0123456789
                        </p>
                    </div>
                    <div className="flex pb-2">
                        <img className="h-[22px]" src="https://cdn-icons-png.flaticon.com/128/11523/11523254.png" />
                        <p className="pb-1 pl-2 text-sm">
                            <span className="font-medium">Email:</span> balostore.owner@gmail.com{' '}
                        </p>
                    </div>
                    <div className="flex pb-2">
                        <img className="h-[22px]" src="	https://cdn-icons-png.flaticon.com/128/535/535137.png" />
                        <p className="pb-1 pl-2 text-sm">
                            <span className="font-medium">Địa chỉ:</span> 1050 - Quang Trung -
                            <div> Phường 3 - Gò Vấp - TP.HCM</div>
                        </p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 lg: mt-0 text-left font-sans max-md:mt-2 max-md:px-6 max-md:pb-10 md:mt-5">
                    <h3 className="pb-3 text-lg font-medium">Đăng ký nhận tin</h3>
                    <p className="pb-3 text-sm">
                        Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác.
                    </p>
                    <div className="flex pb-1 pl-2">
                        <div
                            className="bg-white"
                            style={{
                                border: '1px solid #d2d2d2',
                            }}
                        >
                            <FontAwesomeIcon className=" px-2 text-xl text-blue-500" icon={faEnvelope} />
                            <input placeholder="Nhập email của bạn" className="w-[150px] py-1  text-black" />
                        </div>
                        <button className=" rounded bg-[var(--main-color)] px-2 py-0 text-xs uppercase text-white hover:bg-[var(--main-color-hover)]">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Footer);
