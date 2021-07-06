const Router = require('express');
const router = new Router;

const userRouter = require('./userRouter');
const basketRouter = require('./basketRouter');
const productRouter = require('./productRouter');
const orderingRouter = require('./orderingRouter');

router.use('/user', userRouter);
router.use('/basket', basketRouter);
router.use('/product', productRouter);
router.use('/ordering', orderingRouter);

router.use('*', (req, res) => {
  res.send('.            |_("_")_/ ==> "DA BLJA!!!"')
})

module.exports = router;