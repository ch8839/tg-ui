<template>
  <div id="image-load">
    <h2>keep-alive</h2>
    <div class="container">
      <div @click="switchComponent('component1')">component1</div>
      <div @click="switchComponent('component2')">component2</div>
    </div>
    <div class="content">
		<keep-alive>
			<component :is="select_component"></component>
		</keep-alive>
    </div>
  </div>
</template>

<script>
import component1 from '@/components/test12_components/component1'
import component2 from '@/components/test12_components/component2'
export default {
	name: 'Test12',
	components: {
		'component1': component1,
		'component2': component2
	},
	data() {
		return {
			select_component: 'component1'
		}
	},

	mounted() {



	},

	methods: {
		switchComponent(name) {
			console.log('switchComponent', name)
			this.select_component = name
		}

	},
	computed: {

	},
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	div {
		padding: 10px;
		background: #42cf7d;
		width: 120px;
	}
}

.content {
	border: 1px solid red;
}
</style>