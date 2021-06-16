<template>
  <div class="home">
    <p>个人信息：</p>
    <!-- 将 user 作为 <slot> 元素的一个 attribute 绑定上去 -->
    <slot v-bind:user="user">{{ user.name }}</slot>
  </div>
</template>

<script>

export default {
  name: 'com1',
  data: function() {
    return {
        user: {
            name: 'Tom',
            age:12
        }
    }
  },
  methods: {

  },
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
