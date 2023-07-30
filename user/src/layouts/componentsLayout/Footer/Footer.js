import { memo } from 'react';
import { faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Footer() {
    return (
        <div className="">
            <div className="flex bg-[var(--color-layout)] p-4 text-fuchsia-50">
                <div className="flex-1 text-left">
                    <h3 className="pb-2 text-lg font-semibold">Người phát triển</h3>
                    <p className="pb-1 pl-2 text-sm">Nguyễn Anh tuấn</p>
                </div>
                <div className="flex-1 text-left">
                    <h3 className="pb-2 text-lg font-semibold">Theo dõi chúng tôi</h3>
                    <div className="flex">
                        <FontAwesomeIcon icon={faFacebook} />
                        <p className="pb-1 pl-2 text-sm">Facebook</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faInstagramSquare} />
                        <p className="pb-1 pl-2 text-sm">Instagram</p>
                    </div>
                </div>
                <div className="flex-1 text-left">
                    <h3 className="pb-2 text-lg font-semibold">Liên hệ</h3>
                    <div className="flex">
                        <FontAwesomeIcon icon={faPhone} />
                        <p className="pb-1 pl-2 text-sm">Điện thoại: 0123456789</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <p className="pb-1 pl-2 text-sm">Email: balostore.owner@gmail.com </p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p className="pb-1 pl-2 text-sm">
                            Địa chỉ: 566/191 - Nguyễn Thái Sơn - Phường 5 - Gò Vấp - TP.HCM
                        </p>
                    </div>
                </div>
                <div className="flex-1 text-left">
                    <h3 className="pb-2 text-lg font-semibold">Chăm sóc khách hàng</h3>
                    <p className="pb-1 pl-2 text-sm">Trung tâm trợ giúp</p>
                    <p className="pb-1 pl-2 text-sm">Hướng dẫn khách hàng</p>
                </div>
            </div>
        </div>
    );
}

export default memo(Footer);
