<template>
    <div>
        <div class="map-container"></div>
    </div>
</template>

<script>
    const path = require('path')
    const files = require.context('../views', false, /\.vue$/)
    console.log('files', files.keys())
    let modules = {}
    files.keys().forEach(key => {
        const name = path.basename(key, '.vue')
        modules[name] = files(key).default || files(key)
    })
    console.log('modules', modules)
    export default {
        name: 'Test4',
        data() {
            return {}
        },

        mounted() {


        },

        methods: {}
    }
</script>

<style lang="scss" scoped>
    .map-container {
        height: 800px;
        width: 800px
    }
</style>
