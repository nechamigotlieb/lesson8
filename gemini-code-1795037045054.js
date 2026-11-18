export const notFoundHandler = (req, res, next) => {
    const err = new Error(`הנתיב ${req.originalUrl} לא נמצא בשרת`);
    err.statusCode = 404;
    next(err);
};