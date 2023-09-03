import Header from '../componentsLayout/Header';
function HeaderOnly({ children }) {
    return (
        <div className="min-h-[100vh] bg-[var(--content-color)]">
            <Header />
            <div className=" max-md:mx-4 max-md:pt-[120px]  md:mx-20 md:pt-[140px]">{children}</div>
        </div>
    );
}

export default HeaderOnly;
