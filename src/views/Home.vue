<template>
  <div class="home">
    <div>111</div>
    <button @click="request1">点击1<svg-icon icon-class="eye" /></button>
    <my-component1 :fun1="fun1"></my-component1>
    <button @click="goSass">跳转Sass</button>
    <button  v-for="(item, index) in test_page" :key="index" @click="goTest(index+1)" >跳转test{{index+1}}</button>
    <!-- <button @click="goTest2">跳转test2</button> -->
  </div>
</template>

<script>
import myComponent1 from '../components/myComponent1'
import { test_page } from '../router'
export default {
  name: 'home',
  components: { myComponent1 },
  data: function() {
    return {
      age: 12,
      test_page: test_page
    }
  },
  methods: {
    async request1() {
      let res = await this.$request.get(
        'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json'
      )
      console.log(res)
      console.log(this)
    },

    fun1(name, sex) {
      console.log('11', this.age)
      console.log('name', name)
      console.log('sex', sex)
    },

    goSass(){
      this.$router.push({path:'/sass'})
    },
    goTest(page_id){
      this.$router.push({path:`/test${page_id}`})
    }
  },

  beforeMount() {
    console.log(process.env)
  }
}
</script>

<style lang="scss" scoped>

//重用代码块：使用 @mixin进行代码块的定义，使用@include进行已定义的代码块的调用；
  button {
    border: none;
    color: #ffffff;
    font-weight: 200;
    background: #2cc7a5;
    padding: 10px;
    display: block;
    margin-bottom: 10px
  }

</style>
