<template>
  <div id="components">
   <ui-test1 :msg="msg" :visible="pShow" @outChange="handleOutChange" @update:showTab="handleShowTab"></ui-test1>
   <!-- <p> {{ name }}</p> -->
   <button @click="add">add</button>
  </div>
</template>

<script>
  import uiTest1 from '../components/ui/ui-test1'
  export default {
    name: 'Test7',
    components:{
      'ui-test1': uiTest1
    },
    data() {
      return {
          msg: "hhh",
          pShow: true
      }
    },

    mounted() {
     
              

    },

    methods: {
     add(){
       this.msg += 'ww'
     },

      handleOutChange(data){
        
        this.msg = data
      },

      handleShowTab(data){
        console.log('on-off', data)
        this.pShow = data
      }

    }
  }
</script>

<style lang="scss" scoped>
 

</style>