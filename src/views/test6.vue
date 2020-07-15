<template>
  <div id="c1">
        <transition-group name="list" tag="div" class="list">
        <div v-for="(item, index) in ros_msg" :key="item.date" class="list-item">
          <span>{{index + 1}}</span>
          <span class="list-msg">{{item.msg}}</span>
          <span>{{item.date}}</span>
        </div>
    </transition-group>
  </div>
</template>

<script>

  export default {
    name: 'Test6',
    data() {
      return {
        ros_msg: []
        
      }
    },

    mounted() {
     setInterval(()=>{
       let vision_description = '哈哈'
        if (this.ros_msg.length < 10) {
            this.ros_msg.push({
              msg: vision_description,
              date: new Date
            })
          } else {
            this.ros_msg.shift()
            this.ros_msg.push({
              msg: vision_description,
              date: new Date
            })
          }
     }, 1500)
    
         

    },

    methods: {
     


    }
  }
</script>

<style lang="scss" scoped>
  .list {
        width: 100%;
        height: 80%;
      }

      .list-item {
        display: flex;
        width: 100%;
        height: 30px;
        transition: all 1s;;
        list-style: none;
        padding: 20px;
               
        span {
          flex: 1;
          text-align: center;
          color: #36a3f7;;
        }
        span.list-msg {
          flex: 2;
          text-align: center;
          color: #36a3f7;;
        }
        // &:nth-child(even) {
        //   background: #17265f;
        // }
      }

      .list-enter {
        opacity: 0;
        transform: translateY(10px);
      }
      .list-leave-active {
        position: absolute;
        transform: translateY(10px);
      }

</style>