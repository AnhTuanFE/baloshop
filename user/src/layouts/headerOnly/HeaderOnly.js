import Header from '../componentsLayout/Header';
function HeaderOnly({ children }) {
    return (
        <div className="min-h-[100vh] bg-[var(--content-color)]">
            <Header />
            <div className="max-sm:mx-2 max-sm:pt-[120px]  sm:mx-10 sm:pt-[140px]">{children}</div>
        </div>
    );
}

export default HeaderOnly;
