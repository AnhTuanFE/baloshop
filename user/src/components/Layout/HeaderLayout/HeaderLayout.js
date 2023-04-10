import Header from '../componenLayout/Header';
function HeaderLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
}

export default HeaderLayout;
