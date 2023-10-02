const truncateString = (str, number) => {
    if (str.length > number) {
        return str.substring(0, number) + '...';
    }
    return str;
};

export { truncateString };
