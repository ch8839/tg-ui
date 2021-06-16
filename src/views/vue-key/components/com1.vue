<template>
  <div>
      <p>111</p>
      <input :value="value" @input="handleInput"/>
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