import { memo } from 'react';
import Footer from '../componentsLayout/Footer';
import Header from '../componentsLayout/Header';
function DefaultLayout({ children }) {
    return (
        <div className="Wrapper bg-[var(--content-color)]">
            <Header />
            <div className=" max-md:pt-[120px] md:pt-[140px]">{children}</div>
            <Footer />
        </div>
    );
}
export default memo(DefaultLayout);
