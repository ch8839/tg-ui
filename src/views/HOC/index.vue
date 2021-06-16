<template>
    <div>
        <h2>HOC</h2>
        <!-- <tg-select v-model="selectValue" @change="handlerChange" :options="options" >
            请选择你爱吃的
        </tg-select> -->
        
        <HOC-Select id="select1" v-model="selectValue" @change="handlerChange" :options="options">
            请选择你爱吃的
        </HOC-Select>

    </div>
</template>

<script>
import tgSelect from '@/components/select/index.vue'
import HOC from '../HOC/index'

let HOC_select = HOC(tgSelect)
export default {
    name: 'HOC',
    components: {
        'tg-select': tgSelect,
        'HOC-Select': HOC_select
    },
    data(){
        return {
            options: [
                {
                    value: '0',
                    label: 'apple'
                },
                {
                    value: '1',
                    label: 'banbana'
                },
                {
                    value: '2',
                    label: 'orange'
                }
            ],
            selectValue: '0'
        }
    },
    mounted(){
        console.log('HOC start')
    },
    methods: {
        handlerChange(value){
            console.log('handlerChange', value)
        }
    }
}
</script>

<style>

</style>