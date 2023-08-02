const Message = ({ variant, children }) => {
    return <div className={`alert ${variant} text-center text-red-600`}>{children}</div>;
    // className="text-red-600"
};

Message.defaultProps = {
    variant: 'alert-info',
};

export default Message;
