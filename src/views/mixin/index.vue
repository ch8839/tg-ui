<template>
    <div>
        <h2>mixin</h2>
        <mixinButton @click="handler">点击</mixinButton>

        <ButtonHoc @click="handler">HOC点击</ButtonHoc>
        <HOCElButton @click="handler">HOC点击2</HOCElButton>
    </div>
</template>

<script>
import mixin1 from './mixin1.js'
import mixin2 from './mixin2.vue'
import mixinButton from './button-mixin.js'
import ButtonHoc from '../HOC/el-button.js'
import HOC from '../HOC/index'

let HOCElButton = HOC(ButtonHoc)
export default {
    // 既可以混入js也可以混入vue, 如果删除index的template，那么展示的就是mixin2.vue的template
    mixins: [mixin1, mixin2],
    components: {
        mixinButton,
        ButtonHoc,
        HOCElButton
    },
    data(){
        return {
            mixin1Data: 'hahhaha'
        }
    },
    mounted(){
        console.log('mixin index')
        console.log('this.mixin1Data', this.mixin1Data) // hahhaha
        console.log('this.mixin2Data', this.mixin2Data) // I am mixin2
    },
    methods: {
        handler(){
            console.log('click')
        }
    }
}
</script>

<style>

</style>