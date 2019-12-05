const router = require('express').Router();

const userRouter = require('./users/userRouter');
const colorRouter = require('./colors/colorRouter');

router.use('/user', userRouter);
router.use('/colors', colorRouter);

module.exports = router;