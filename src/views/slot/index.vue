<template>
  <div class="home">
    <button @click="handler">点击1</button>
    <!-- 在父级的插槽内容中使用子组件的数据 -->
    <com1-1>
      <template v-slot:default="slotProps">
        {{ slotProps.user.name }}
      </template>
    </com1-1>

    <!-- 独占默认插槽的缩写 和 解构插槽 Prop 写法 -->
    <com1-2 v-slot="{user}">
        {{ handlerName(user.name)}}
    </com1-2>

    <com2>
      <template v-slot:header>
        header
      </template>
      <template v-slot:default="{text}">
        content: {{text}}
      </template>
      <template v-slot:footer>
        footer
      </template>
    </com2>

    <!-- 
      <div><child v-slot="props"><span>{{ props.text }}</span></child></div>
      
      ==>

      render: function (createElement) {
        return createElement('div', [
          createElement('child', {
            // 在数据对象中传递 `scopedSlots`
            // 格式为 { name: props => VNode | Array<VNode> }
            scopedSlots: {
              default: function (props) {
                return createElement('span', props.text)
              }
            }
          })
        ])
      }
     -->
  </div>
</template>

<script>
import com from './components/com1'
import com2 from './components/com2'
export default {
  name: 'mySlot',
  components: { 
    'com1-1': com,
    'com1-2': com,
    'com2': com2
   },
  data: function() {
    return {
      
    }
  },
  methods: {
      handler(){
          console.log('slotProps', this.name)

      },

      handlerName(name){
          console.log('name', name)
          this.name = name
          return '被父组件处理的name:' + this.name
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
