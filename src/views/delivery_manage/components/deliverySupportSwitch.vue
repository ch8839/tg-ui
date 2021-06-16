<template>
  <div class="home">
    <h2>deliverySupportSwitch</h2>
    
    <div v-if="isSupport">support</div>
    <div v-else>Not support</div>

    <button @click="toggle">切换</button>
  </div>
</template>

<script>
export default {
  name: 'deliverySupportSwitch',
  props: {
    value: {
      type: Boolean,
    },
  },
  data: function () {
    return {
      // isSupport: this.value
    }
  },
  computed: {
    isSupport:{
      get(){
        return this.value
      },
      set(newValue){
        console.log('>>newValue', newValue)
        this.$emit('change', newValue)
      }
    }
  },
  methods: {
    toggle(){
      this.isSupport = !this.isSupport
      // this.$emit('change', this.isSupport)
    }
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
</style>
