import Footer from '../componentsLayout/Footer/Footer';
function FooterOnly({ children }) {
    return (
        <div>
            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default FooterOnly;
