<template>
  <div class="home">
    <h2>ShopSelector</h2>
    <select v-model="selectShop">
        <!-- <option disabled value="">请选择</option> -->
        <option value="1">店1</option>
        <option value="2">店2</option>
        <option value="3">店3</option>
  </select>
  </div>
</template>

<script>
export default {
  name: 'ShopSelector',
  props: {
    value: {
      type: String,
    },
  },
  data: function () {
    return {
       
    }
  },
  computed: {
      selectShop: {
          get(){
              return this.value
          },
          set(newValue){
              this.$emit('change', newValue)
          }
      }
  },
  methods: {

  },

}
</script>

<style lang="scss" scoped>
//重用代码块：使用 @mixin进行代码块的定义，使用@include进行已定义的代码块的调用；
.home {
  border: 1px solid #2cc7a5;
  padding: 10px;
  display: block;
  margin-bottom: 10px;
}

select {
    width: 100px;
}
</style>
