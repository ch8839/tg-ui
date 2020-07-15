<template>
  <div class="test2-container">
    {{ test2_msg }}
    {{test2_msg2}}
  </div>
</template>

<script>
export default {
  name: 'testComponent1',
  props:{
    test2_msg: String
  },
  data: function() {
    return {
      name: 'Tom',
      age: 12,
      test2_msg2: this.test2_msg + '我是子组件data中测试是否有props中的数据'
    }
  },
  beforeCreate() {
    console.log(this.msg1) //此时不执行computed
    console.log('beforeCreate', '实例初始化之后，此时的数据观察和事件配置都没准备好')
  },
  
  created() {
    console.log(this.msg1) //computed只执行一次，且在访问时执行，最早能在created阶段执行computed，此时能打印computed阶段，
    console.log('created','实例创建完成，可访问到this.data')
  },
  beforeMount() {
    console.log('beforeMount', '将编译完成的HTML挂载到对应虚拟dom，this.$el有值，但{{data}}还未渲染')
  },
  mounted() {
    console.log('test2_msg2', this.test2_msg2)
    console.log('mounted','挂载完毕阶段,数据已被成功渲染出来')
  },
  beforeUpdate() {
    console.log('beforeUpdate','监控数据变换,要修改数据的时候，更新渲染视图之前就会触发钩子beforeUpdate,打印视图上的值，结果依然为原来的值')
  },
  updated() {
    console.log('updated', '更新渲染视图之后,再读取视图上的内容，已经是最新的内容')
  },
  beforeDestroy() {
    console.log('beforeDestroy', '销毁当前组件之前')
  },
  destroyed() {
    console.log('destroyed', '销毁之后，此时该实例与其他实例的关联已经被清除，它与视图之间也被解绑。')
  },

  methods: {  
    fun1(){
      this.age = 15
    },
    fun2(){
      console.log(this.msg1)
    }
  },

  computed: {
    msg1(){
      console.log('data', this.name)//此时data已能打印
      console.log('test2_msg', this.test2_msg) //props中内容也能打印
      // 同时data中能打印props里的值
      //可以得出vue中props、data、computed的加载顺序为 props>data>computed
      console.log('test2_msg2', this.test2_msg2) 
      console.log('computed阶段')
      return 'haha'
    }
  },
   
}
</script>

<style lang="scss" scoped>

</style>
