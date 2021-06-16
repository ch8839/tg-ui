<template>
  <div class="test2-container">
    <div>
      <p> {{ name }} </p>
      <p> {{ age }} </p>
    </div>
    <test-component1 :test2_msg="test2_msg"></test-component1>
    <test-component2 :userInfo="userInfo"></test-component2>
    <p>父组件中的userInfo: {{ userInfo.name }}</p>
    <button @click="fun1">修改</button>
    <button @click="fun2">test</button>

  </div>
</template>

<script>
let timer = null
let obj  = {
  name: 'Tom',
  age: 12,
  test2_msg: '我是传过去的test2_msg',
  userInfo: {
    name: 'Tom',
    age: 12
  }
}
// Object.freeze(obj) //使用 Object.freeze()，会阻止修改现有的属性，也意味着响应系统无法再追踪变化。
import testComponent1 from '../components/testComponent1.vue'
import testComponent2 from '../components/testComponent2.vue'

export default {
  name: 'Test2',
  components:{
    'test-component1': testComponent1,
    'test-component2': testComponent2
  },
  data: function() {
    return obj
  },
  // beforeCreate() {
  //   console.log(this.msg1) //此时不执行computed
  //   console.log('beforeCreate', '即将创建')
  // },
  
  // created() {
  //   console.log(this.msg1) //computed只执行一次，且在访问时执行，最早能在created阶段执行computed，此时能打印computed阶段，
  //   console.log('created','实例创建完成，可访问到this.data')
  // },
  // beforeMount() {
  //   console.log('beforeMount', '将编译完成的HTML挂载到对应虚拟dom，this.$el有值，但{{data}}还未渲染')
  // },
  // mounted() {
  //   console.log('mounted','挂载完毕阶段,数据已被成功渲染出来')
  // },
  // beforeUpdate() {
  //   console.log('beforeUpdate','监控数据变换,要修改数据的时候，更新渲染视图之前就会触发钩子beforeUpdate,打印视图上的值，结果依然为原来的值')
  // },
  // updated() {
  //   console.log('updated', '更新渲染视图之后,再读取视图上的内容，已经是最新的内容')
  // },
  // beforeDestroy() {
  //   console.log('beforeDestroy', '销毁当前组件之前')
  // },
  // destroyed() {
  //   console.log('destroyed', '销毁之后，此时该实例与其他实例的关联已经被清除，它与视图之间也被解绑。')
  // },

  methods: {  
    fun1(){
      this.age = 15
    },
    fun2(){
      // console.log(this.msg1)
    }
  },

  computed: {
    // msg1(){
    //   console.log('data', this.name)//此时data已能打印
    //   console.log('computed阶段')
    //   return 'haha'
    // }
  },
   
}
</script>

<style lang="scss" scoped>

</style>
