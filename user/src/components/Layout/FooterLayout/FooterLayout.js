import Footer from '../componenLayout/Footer';
function FooterLayout({ children }) {
    return (
        <div>
            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default FooterLayout;
