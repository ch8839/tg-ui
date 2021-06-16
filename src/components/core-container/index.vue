<template>
  <div>
      <slot :$core="core"></slot>
  </div>
</template>

<script>
export default {
    data() {
        return {
            core: {
            //     componentsList: ['testComponent',
            // 'testComponent1',
            // 'testComponent2']
            }
        }
    },
    created() {
        this.core.componentsList = [
            'testComponent',
            'testComponent1',
            'testComponent2'
        ]
    }
}
</script>

<style>

</style>