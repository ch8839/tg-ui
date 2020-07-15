<template>
  <div class="hello">
    <button @click="click1">点击</button>
    <p>{{ count }}</p>
  </div>
</template>

<script>
export default {
	name: 'test12_component1',
	data() {
		return {
			count: 0
		}
	},

    // 如果父组件没有添加keep-alive，那么当切换组件时就会触发销毁组件
    // 如果设置了keep-alive,那么在页面已经跳转后依然不销毁组件,保存组件对应的实例在内存中,当此页面再次需要渲染的时候就可以利用已经缓存的组件实例了
    // 
    beforeDestroy() {
		console.log('component1-beforeDestroy')
	},
	destroyed() {
		console.log('component1-destroyed')
    },
    
    // 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行
    activated(){
        console.log('component1-activated')
    },

    deactivated(){
        console.log('component1-deactivated')
    },

	methods: {
		click1() {
			this.count++
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
	color: red;
}
</style>
