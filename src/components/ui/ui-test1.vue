<template>
  <div class="hello">
    {{msg2}}
    <button @click="change">change</button>
    <p v-if="visible"> can you see</p>
    <button @click="isShow">on-off</button>
  </div>
</template>

<script>
export default {
  name: 'Ui-test1',
  props: {
    msg: String,
    visible: Boolean
  },
  data() {
    return {
      msg2: this.msg //相当于msg的副本
    }
  },
  methods: {
    change(){
      this.msg2 +='ddd'
    },

    isShow(){
      this.$emit('update:showTab', !this.visible)
    }
  },

  watch: {
    msg(val){
      this.msg2 = val
    },

    msg2(val){
      this.$emit('outChange', val)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
