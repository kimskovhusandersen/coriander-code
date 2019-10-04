module.exports.increase = num => {
    if (isNaN(num) || num <= 0) {
        return "error";
    }
    while (num < 1000000) {
        num *= 10;
    }
    return num;
};
