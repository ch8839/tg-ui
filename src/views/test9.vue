<template>
  <div id="image-load">
    <h2>图片懒加载</h2>
    <div class="container">
      <div class="content" v-for="(item, index) in list" :key="index"> 
        <img src="../assets/logo.png" class="image-cell" alt="icons">
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Test9',
 
    data() {
      return {
         
      }
    },

    mounted() {
      console.log(this.list)
              

    },

    methods: {
    

    },
    computed: {
      list(){
        return new Array(150).fill(1)
      }
    },
  }
</script>

<style lang="scss" scoped>
 .container {
   display: flex;
   flex-wrap: wrap;
   width: 100%;
   height: 550px;
   border: 1px border #eeeeee;
   position: relative;
   left: 50%;
   transform: translateX(-50%);
    .content {
      padding: 10px;
      img {
        width: 100px;
        height: 150px;
      }
    }
 }

</style>