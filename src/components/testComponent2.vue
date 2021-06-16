<template>
  <div>
      <h2>testComponent2</h2>
      <input v-model="userInfo.name" />
      <p>子组件的userInfo: {{ userInfo.name }}</p>
      <p>{{ userInfo.age }}</p>
      <button @click="handleClick"></button>
  </div>
</template>

<script>
export default {
    name: 'testComponent2',
    props: {
        userInfo: {
            type:Object
        }
    },
    mounted() {
        this.$watch('userInfo.name', (newValue, oldValue) =>{
            console.log('>>newValue', newValue)
        },
        {
            // deep: true
        })
    },
    methods: {
        handleClick() {
            this.$emit('goShop', '666')
        }
    }
}
</script>

<style>

</style>