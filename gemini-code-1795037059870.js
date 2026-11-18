import { Router } from 'express';
import {
    getAllBooks,
    getBookByCode,
    addBook,
    updateBook,
    deleteBook
} from '../controllers/book.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { createBookSchema, updateBookSchema } from '../schemas/validation.schemas.js';
import { uploadBookImage } from '../middlewares/upload.middleware.js';

const router = Router();

router.get('/', getAllBooks);
router.get('/:code', getBookByCode);

router.post(
    '/',
    uploadBookImage.single('image'),
    validateBody(createBookSchema),
    addBook
);

router.put(
    '/:code',
    validateBody(updateBookSchema),
    updateBook
);

router.delete('/:code', deleteBook);

export default router;