<template>
    <div class="">
        
        <van-stepper :value="value" async-change @change="onChange" />
    </div>
</template>

<script>
import Vue from 'vue'
import { Stepper } from 'vant';

Vue.use(Stepper);
export default {
    name: 'component_vant',
    data() {
        return {
            value: 3,
            
        }
    },
    methods: {
        onChange(val) {
            console.log('val', val)
            if(val > 5) {
                let temp = this.value
                this.val = temp
            }else {
                this.value = val
            }
        }   
    }
}
</script>