import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.resolve('public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const bookCode = req.body.code || req.params.code || 'book';
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${bookCode}-${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        const err = new Error('ניתן להעלות קובצי תמונה בלבד');
        err.statusCode = 400;
        cb(err, false);
    }
};

export const uploadBookImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1 * 1024 * 1024 // עד 1 מגה-בייט
    }
});