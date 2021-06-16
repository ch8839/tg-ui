
import { debounce } from '@/utils/index'
import Vue from 'vue'
function _handleClick(evt){
    this.$emit('click', evt); 
}
// console.log('Vue.options.components', Vue.options.components)
export default {
    mixins: [Vue.options.components.ElButton],
    methods: {
        // handleClick(evt){
        //     debounce(_handleClick.bind(this, evt), 500)
        // },
        handleClick: debounce(_handleClick, 500)
    }
}
