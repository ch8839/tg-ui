const Router = require('koa-router')
const router = new Router()

const test1 = require('./test1')

router.use(test1.routes()) //koa-router中 test1的router需先.routes()才能挂载到router上

module.exports = router