<template>
  <div class="hello">
    <button @click="click1">点击</button>
    <p>{{ count }}</p>
  </div>
</template>

<script>
export default {
	name: 'test12_component2',
	data() {
		return {
			count: 0
		}
	},

	beforeDestroy() {
		console.log('component1-beforeDestroy')
	},
	destroyed() {
		console.log('component1-destroyed')
	},

	activated(){
        console.log('component2-activated')
    },

    deactivated(){
        console.log('component2-deactivated')
    },

	methods: {
		click1() {
			this.count += 10
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
	color: blue;
}
</style>
