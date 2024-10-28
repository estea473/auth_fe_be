const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message || 'Internal Server Error';
    const stack = err.stack;
    res.status(statusCode).json({
        message,
        stack
    });
};

module.exports = { notFound, errorHandler};