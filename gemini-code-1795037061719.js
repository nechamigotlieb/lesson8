import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import indexRoutes from './routes/index.route.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.use(express.json());

// הפיכת תיקיית public לסטטית
app.use(express.static(path.resolve('public')));

// ניתובים ראשיים
app.use('/api', indexRoutes);

// טיפול בניתוב לא נמצא (404)
app.use(notFoundHandler);

// טיפול כללי בשגיאות (תמיד אחרון)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`השרת מאזין לפורט ${PORT}`);
});