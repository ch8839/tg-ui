const Koa = require('koa')
const router = require('./routers/index')
const cors = require('koa-cors')

const app = new Koa()

app.use(cors())

app.use(router.routes())

app.listen(3030, ()=>{
  console.log('koa is on 3030')
})
