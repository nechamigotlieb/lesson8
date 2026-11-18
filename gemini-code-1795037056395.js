export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errorsList = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            const err = new Error('שגיאת תקינות בנתונים שנשלחו');
            err.statusCode = 400;
            err.type = 'validation error';
            err.details = errorsList;
            return next(err);
        }

        req.body = value;
        next();
    };
};