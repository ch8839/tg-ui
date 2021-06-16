function dispatch(eventName, componentName, ...params){
    let parent = this.$parent || this.$root
    while(parent){
        let name = parent.$options.name
        if(name == componentName){
            parent.$emit.apply(parent, [eventName, ...params])
        }else {
            parent = parent.$parent
        }
    }
}


function debounce(fn, time){
    let timeout = null
    return function(){
        clearTimeout(timeout)
        let _this = this
        let args = arguments
        // console.log('_this', _this)
        // console.log('args', args)
        timeout = setTimeout(() =>{
            fn.apply(_this, args)
        }, time)
    }
}

export {
    debounce
}
