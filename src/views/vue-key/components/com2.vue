<template>
  <div>
      <p>222</p>
      <input :value="value" @input="handleInput"/>
      <p>333</p>
  </div>
</template>

<script>
export default {
    props: {
        value: {
            default: ''
        }
    },
    methods: {
        handleInput(val){
            this.$emit('input', val)
        }
    }

}
</script>

<style>

</style>