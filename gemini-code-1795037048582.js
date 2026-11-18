export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const isDev = process.env.NODE_ENV === 'development';

    const response = {
        error: {
            message: err.message || 'שגיאת שרת כללית',
            type: err.type || 'server error',
            ...(err.details && { details: err.details }),
            ...(isDev && { stack: err.stack })
        }
    };

    res.status(statusCode).json(response);
};