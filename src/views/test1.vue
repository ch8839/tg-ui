<template>
  <div class="test1-container">
    <p>test1</p>
    <p>{{nameIntro}}</p>
    <button @click="request1">get请求1</button>
    <button @click="request2">post请求1</button>
    <button @click="fn1">change1</button>
    <button @click="fn2">change2</button>
    <div class="content">content</div>
    <div
      class="toHead"
      @click="toHead"
      v-if="isShow"
    >回到顶部</div>
  </div>
</template>

<script>
let timer = null
export default {
  name: 'Test1',
  data: function() {
    return {
      name: 'Tom',
      age: 12,
      isShow: false
    }
  },
  computed: {
    nameIntro(){
      let a = this
      console.log('name', a.name)
      return 'this is :' + a.name 
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
  },
  methods: {
    fn1(){
      this.age = 'hhh'
    },
    fn2() {
      this.name = 'Jerry'
    },
    async request1() {
      let res = await this.$request.get('http://localhost:3030/test1')
      // let res = await this.$request.get('http://localhost:8081/dev_api/test1')
      console.log(res)
    },

    async request2() {
      // let res = await this.$request.post('http://localhost:3030/test2',{
      //   name: 'Tom',
      //   age: undefined
      // })
      let like = 'run+jump+song  hhaa'
      like = encodeURIComponent(like)
      let res = await this.$request({
        url: 'http://localhost:3030/test2',
        method: 'post',
        data: {
          name: 'Tom',
          age: undefined,
          like
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      // let res = await this.$request.get('http://localhost:8081/dev_api/test1')
      console.log(res)
    },

    scrollToTop() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      // console.log('scrollTop', scrollTop)
      let browserHeight = window.outerHeight //浏览器高度
      if (scrollTop > browserHeight/2) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },

    toHead(e) {
      timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        let ispeed = Math.floor(-osTop / 5)
        
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        console.log('scrollTop', document.documentElement.scrollTop)
        // this.isTop = true
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 30)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 2900px;
  border: 1px solid red;
}
.toHead {
  position: fixed;
  bottom: 50px;
  right: 50px;
  padding: 10px;
  border-radius: 10%;
  // width: 80px;
  // height: 80px;
  background: #2f89f0;
  cursor: pointer;
}
</style>
