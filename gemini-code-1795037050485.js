export const getBookByCode = (req, res, next) => {
    const code = Number(req.params.code);
    const book = books.find(b => b.code === code);

    if (!book) {
        const err = new Error('הספר המבוקש לא נמצא');
        err.statusCode = 404;
        return next(err);
    }

    res.json(book);
};

export const addBook = (req, res, next) => {
    const { code, name, category, price } = req.body;
    const exists = books.some(b => b.code === Number(code));

    if (exists) {
        const err = new Error('ספר עם קוד זה כבר קיים במערכת');
        err.statusCode = 409;
        return next(err);
    }

    const newBook = {
        code: Number(code),
        name,
        category,
        price: Number(price),
        isBorrowed: false,
        borrowedBy: null,
        image: req.file ? `/uploads/${req.file.filename}` : null
    };

    books.push(newBook);
    res.status(201).json(newBook);
};

export const updateBook = (req, res, next) => {
    const code = Number(req.params.code);
    const book = books.find(b => b.code === code);

    if (!book) {
        const err = new Error('לא ניתן לעדכן – הספר לא נמצא');
        err.statusCode = 404;
        return next(err);
    }

    Object.assign(book, req.body);
    res.json(book);
};

export const deleteBook = (req, res, next) => {
    const code = Number(req.params.code);
    const index = books.findIndex(b => b.code === code);

    if (index === -1) {
        const err = new Error('לא ניתן למחוק – הספר לא נמצא');
        err.statusCode = 404;
        return next(err);
    }

    const [deleted] = books.splice(index, 1);
    res.json({ message: 'הספר נמחק בהצלחה', deleted });
};