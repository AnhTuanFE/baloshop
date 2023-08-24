import { memo } from 'react';
import { faPhone, faLocationDot, faEnvelope, faMailBulk, faMailForward } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Footer() {
    return (
        <div className="">
            <div className="bg-white">
                <hr />
                <div className="flex justify-around">
                    <div className="flex py-5">
                        <div>
                            <img className="h-[80px]" src="https://cdn-icons-png.flaticon.com/128/1161/1161388.png" />
                        </div>
                        <div className="ml-2 mt-3">
                            <p className="text-xl font-medium">Bảo hành trọn đời</p>
                            <p className="text-base font-extralight text-slate-500">Trên toàn hệ thống</p>
                        </div>
                    </div>
                    <div className="flex py-5">
                        <div>
                            <img className="h-[80px]" src="https://cdn-icons-png.flaticon.com/128/9183/9183512.png" />
                        </div>
                        <div className="ml-2 mt-3">
                            <p className="text-xl font-medium">Đổi trả trong 365 ngày</p>
                            <p className="text-base font-extralight text-slate-500">Nếu không hài lòng</p>
                        </div>
                    </div>
                    <div className="flex py-5">
                        <div>
                            <img className="h-[80px]" src="https://cdn-icons-png.flaticon.com/128/5511/5511413.png" />
                        </div>
                        <div className="ml-2 mt-3">
                            <p className="text-xl font-medium">Hàng chính hãng 100%</p>
                            <p className="text-base font-extralight text-slate-500">Hoàn tiền nếu phát hiện hàng giả</p>
                        </div>
                    </div>
                    <div className="flex py-5">
                        <div>
                            <img className="h-[80px]" src="https://cdn-icons-png.flaticon.com/128/10840/10840897.png" />
                        </div>
                        <div className="ml-2 mt-3">
                            <p className="text-xl font-medium">Hoàn tiền 100%</p>
                            <p className="text-base font-extralight text-slate-500">Nếu sản phẩm gặp lỗi</p>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className="flex bg-[#f5f5f5] px-4 py-20">
                <div className="flex-1 pr-4 text-left font-sans">
                    <h3 className="pb-4 text-lg font-medium">Lịch sử phát triển BALOSHOP</h3>
                    <p className="pb-3 pl-2 text-sm">
                        Thành lập từ 2022, sau đó mở rộng thêm 3 chi nhánh tại TP HCM vào 2023.
                    </p>
                    <p className="pb-1 pl-2 text-sm">
                        Hiện tại BALOSHOP là chuỗi bán lẻ hành lý với hơn 25+ cửa hàng. BALOSHOP còn được biết đến là
                        thương hiệu bán VALI được yêu thích nhất tại thành phố Hồ Chí Minh.
                    </p>
                </div>
                <div className="flex-1 pr-4 text-left font-sans">
                    <h3 className="pb-4 text-lg font-medium">Chính sách bán hàng</h3>
                    <div className="">
                        <p className="cursor-pointer pb-2 text-sm">Chính sách bảo hành</p>
                        <p className="cursor-pointer pb-2 text-sm">Chính sách bảo mật</p>
                        <p className="cursor-pointer pb-2 text-sm">Chính sách đổi trả</p>
                        <p className="cursor-pointer pb-2 text-sm">Chính sách khách hàng thân thiết</p>
                        <p className="cursor-pointer pb-2 text-sm">Chính sách vận chuyển</p>
                        <p className="cursor-pointer pb-2 text-sm">Phương thức thanh toán Tuyển dụng</p>
                    </div>
                </div>
                <div className="flex-1 pr-4 text-left font-sans">
                    <h3 className="pb-4 text-lg font-medium">Thông tin liên hệ</h3>
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
                            <span className="font-medium">Địa chỉ:</span> 1050 - Quang Trung - Phường 3 - Gò Vấp -
                            TP.HCM
                        </p>
                    </div>
                </div>
                <div className="flex-1 pr-4 text-left font-sans">
                    <h3 className="pb-4 text-lg font-medium">Đăng ký nhận tin</h3>
                    <p className="pb-3 pl-2 text-sm">
                        Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác.
                    </p>
                    <div className="flex pb-1 pl-2">
                        <div
                            className="bg-white"
                            style={{
                                border: '1px solid #000',
                            }}
                        >
                            <FontAwesomeIcon className=" px-2 text-xl text-blue-500" icon={faEnvelope} />
                            <input placeholder="Nhập email của bạn" className=" py-1  text-black" />
                        </div>
                        <button className=" rounded bg-[var(--main-color)] px-2 py-1 uppercase text-white hover:bg-[var(--main-color-hover)]">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Footer);
