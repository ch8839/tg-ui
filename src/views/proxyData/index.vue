<template>
    <div class="proxyData-conatiner">
        <button @click="handleClick">click</button>
        <button @click="handleClick2">click2</button>
    </div>
</template>

<script>
let business = {
    name: 'Tom',
    age: 12,
    getAge() {
        console.log('age')
        return this.age
    }
}
function proxyData(target, source) {
    for (let key in source) {
        if (!(source[key] instanceof Function)) {
            console.log('key', key)
            Object.defineProperty(target, key, {
                configurable: true,
                enumerable: true,
                get() {
                    console.log('get')
                    return source[key]
                },
                set(val) {
                    console.log('val', val)
                    source[key] = val
                },
            })
        }
    }
}
export default {
    data() {
        // 页面数据
        const coreData = {
            // 页面环境参数
            pageReady: false,
            pageError: false, // 页面加载失败（初始化失败时触发）
            envInfo: {},
        }
        proxyData(coreData, business) // 代理数据
        return coreData
    },
    methods: {
        handleClick() {
            let age = this.age
            console.log('age', age)
        },
         handleClick2() {
            this.age = 19
            this.name = 'Jerry'
            console.log('business', business)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>