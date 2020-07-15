<template>
  <div class="hello">
    <button @click="click1">点击</button>
  </div>
</template>

<script>
export default {
  name: 'myCompents',
  props: {
    fun1: Function
  },

  methods: {
    click1() {
      this.fun1('Tom', 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
