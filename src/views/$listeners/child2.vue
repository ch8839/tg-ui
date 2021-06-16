<template>
  <div>
      <button @click="handleClick">点击</button>
  </div>
</template>

<script>
export default {

    methods: {
        handleClick() {
            console.log('child2 click')
            this.$emit('click', 'hahha')
            this.$emit('click2', 'hahha')
        }
    }
}
</script>

<style>

</style>