<template>
  <div class="sass-container">
   <p>第一段文字</p>

   <div class="mydiv1">哈哈</div>
   <div class="mydiv2">哈哈2</div>

   <button id="btn1">按钮1</button>
   <button id="btn2">按钮2</button>
   <button id="btn3">按钮3</button>
  </div>
</template>

<script>
export default {
  name: 'Sass',
  data: function() {
    return {
      age: 12
    }
  },
  methods: {}

}
</script>

<style lang="scss" scoped>
  $color1 : #eeeeee; //变量定义
  $color2 : red;

//重用代码块：使用 @mixin进行代码块的定义，使用@include进行已定义的代码块的调用；
  @mixin button {
    border: none;
    color: #ffffff;
    font-weight: 200;
    background: #2cc7a5;
    padding: 10px;
    display: block;
    margin-bottom: 10px
  }

   @mixin button-custom($size:20px) {
    border: none;
    color: #ffffff;
    font-weight: 200;
    background: #2cc7a5;
    padding: 10px;
    display: block;
    margin-bottom: 10px;
    font-size: $size
  }
  .sass-container {
    p {
      color: $color2
    } //标签嵌套

    .mydiv1 {
      border: {
        style:solid;
        color: $color1;
        bottom: 5px solid #000000
      }; //)属性嵌套
      margin-bottom: 20px;
      &:hover {
        text-decoration: underline
      } //使用&来引用父级
    }

    .mydiv2 {
      @extend .mydiv1;
      background: #2cc7a5
    } //使用 @extend 可实现继承

    #btn1 {
      @include button
    }

     #btn2 {
      @include button;
      border: 1px solid #4846e6
    }

     #btn3 {
      @include button-custom(50px);
      
    } //在代码块的定义中，也可以传入参数和默认值：

  }
  
</style>
