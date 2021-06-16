<template>
  <el-button type="text" @click="deleteDeliveryRange" v-if="scope.$index!==0">删除</el-button>
</template>

<script>
export default {
  props: ['scope', 'list'],
  methods: {
    deleteDeliveryRange() {
      this.list.splice(this.scope.$index, 1)
    }
  }
}
</script>

<style>

</style>
