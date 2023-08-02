const Message = ({ variant, children }) => {
    return <div className={`alert ${variant} text-center`}>{children}</div>;
};

Message.defaultProps = {
    variant: 'alert-info',
};

export default Message;
