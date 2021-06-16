<template>
  <div>
      <child2 v-on="$listeners"></child2>
  </div>
</template>

<script>
import child2 from './child2.vue'
export default {
    components: {
        child2
    },
    mounted() {
        console.log('listeners', this.$listeners)
    },
    methods: {
       
    }
}
</script>

<style>

</style>