<template>
  <div>
      12121
      <child1 @click="handleClick" @click2="handleClick2"></child1>
  </div>
</template>

<script>
import child1 from './child1'
export default {
    components: {
        child1
    },
    methods: {
        handleClick(msg) {
            console.log('index', msg)
        },

        handleClick2(msg) {
            console.log('index2', msg)
        }
    }
}
</script>

<style>

</style>