<template>
  <div>
    <button @click="handleClick">click</button>
    <div>
      <com1
        value="0"
      ></com1>
      <com1
        v-if="visible==1"
        @hook:created="handleCom1BeforeCreated1"
        @hook:beforeDestroy="handleCom1BeforeDestroy1"
        value="1"
      ></com1>
      <com1
        @hook:created="handleCom1BeforeCreated2"
        @hook:beforeDestroy="handleCom1BeforeDestroy2"
        value="2"
      ></com1>
    </div>
  </div>
</template>

<script>
import com1 from './components/com1'
export default {
    components: {
        com1,
    },
    data() {
        return {
            input1: '1',
            input2: '5',
            visible: 1,
        }
    },
    methods: {
        handleClick() {
            this.visible = this.visible == 1 ? 0 : 1
        },
        handleCom1BeforeCreated1() {
            console.log('Com1BeforeCreated1')
        },
        handleCom1BeforeDestroy1() {
            console.log('Com1BeforeDestroy1')
        },
        handleCom1BeforeCreated2() {
            console.log('Com1BeforeCreated2')
        },
        handleCom1BeforeDestroy2() {
            console.log('Com1BeforeDestroy2')
        },
    },

    mounted() {
        // this.input2 = 9
    },
}
</script>

<style>
</style>