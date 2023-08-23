import Header from '../componentsLayout/Header';
function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="pt-[170px]">{children}</div>
        </div>
    );
}

export default HeaderOnly;
