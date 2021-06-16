export default function hocComponent(WrappedComponent){
    return {
        name: 'HOC-component',
        mounted(){
            console.log('mounted')
        },
        props: WrappedComponent.props,
        render(h) {
            const slots = Object.keys(this.$slots).reduce((arr, key) =>{
                return arr.concat(this.$slots[key])
            }, [])
            // 手动设置一下 slot 中 VNode 的 context 值为高阶组件实例
            // 通过访问子组件的 this.$vnode 来获取这段父组件中引用子组件所对应的 VNode
            // 子组件中打印 this.$vnode，标注中的 context 引用着 VNode 被创建时所在的组件实例
            // 直接在父组件中使用子组件时，this.$vnode 中引用的VNode 对象是在父组件中被创建的，所以vnode 中的 context 引用着父实例
            // 由于高阶组件的引入，在原本的父组件与子组件之间插入了一个组件(也就是高阶组件)，
            // 这导致在子组件中访问的 this.$vnode 已经不是原来的父组件中的 VNode 片段了，而是高阶组件的 VNode 片段
            .map(vnode => {
                console.log('vnode', vnode)
                console.log('this._self', this._self)
                vnode.context = this._self // _self 属性访问当前实例本身，而不是直接使用 this，因为 this 是一个代理对象
                return vnode
            })

            console.log('>>>slots', slots)
            console.log('>>>this.$listeners', this.$listeners)
            console.log('>>>this.$attrs', this.$attrs)
            console.log('>>>this.$props', this.$props)
            return h(WrappedComponent, {
                on: this.$listeners,
                attrs: this.$attrs,
                props: this.$props,
                // 透传 scopedSlots
                scopedSlots: this.$scopedSlots,
            }, slots)
        }
    }
}