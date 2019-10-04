module.exports.double = n => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isNaN(n)) {
                return reject(new Error("not a number"));
            }
            resolve(n * 2);
        }, 1000);
    });
};
