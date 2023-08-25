import Header from '../componentsLayout/Header';
function HeaderOnly({ children }) {
    return (
        <div className="min-h-[100vh] bg-[var(--content-color)]">
            <Header />
            <div className="mx-20  pt-[170px]">{children}</div>
        </div>
    );
}

export default HeaderOnly;
