import Joi from 'joi';

export const createBookSchema = Joi.object({
    code: Joi.number().integer().positive().required().messages({
        'number.base': 'קוד הספר חייב להיות מספר',
        'number.integer': 'קוד הספר חייב להיות מספר שלם',
        'number.positive': 'קוד הספר חייב להיות חיובי',
        'any.required': 'קוד הספר הוא שדה חובה'
    }),
    name: Joi.string().trim().min(2).max(120).required().messages({
        'string.empty': 'שם הספר אינו יכול להיות ריק',
        'string.min': 'שם הספר חייב להכיל לפחות 2 תווים',
        'any.required': 'שם הספר הוא שדה חובה'
    }),
    category: Joi.string().trim().min(2).max(60).required().messages({
        'string.min': 'קטגוריה חייבת להכיל לפחות 2 תווים',
        'any.required': 'קטגוריה היא שדה חובה'
    }),
    price: Joi.number().min(0).max(5000).required().messages({
        'number.base': 'המחיר חייב להיות מספר',
        'number.min': 'המחיר אינו יכול להיות שלילי',
        'any.required': 'מחיר הספר הוא שדה חובה'
    })
});

export const updateBookSchema = Joi.object({
    name: Joi.string().trim().min(2).max(120),
    category: Joi.string().trim().min(2).max(60),
    price: Joi.number().min(0).max(5000)
}).min(1).messages({
    'object.min': 'יש לספק לפחות שדה אחד לעדכון'
});

export const userSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    fullName: Joi.string().trim().min(2).max(80).required(),
    email: Joi.string().email().required().messages({
        'string.email': 'כתובת האימייל אינה תקינה'
    }),
    role: Joi.string().valid('member', 'librarian').default('member')
});