import { memo } from 'react';
import Header from '../componentsLayout/Header';
import Footer from '../componentsLayout/Footer';
function DefaulLayout({ children }) {
    return (
        <div className="Wrapper bg-[var(--content-color)]">
            <Header />
            <div className="pt-[170px]">{children}</div>
            <Footer />
        </div>
    );
}
export default memo(DefaulLayout);
