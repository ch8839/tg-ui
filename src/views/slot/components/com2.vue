<script>
export default {
    name: 'com2',
    data: function () {
        return {
            message: 'hhhhhh nb'
        }
    },
    methods: {},
    render(h) {
        // 访问被插槽分发的内容 例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到
        // 每个插槽都是一个 VNode 数组
        let header = this.$slots.header
        let footer = this.$slots.footer
        let body = this.$slots.default
        return h('div', [
            // 相当于<header><slot name='header'></slot></header>
            h('header', header),
            //<div><slot :text="message"></slot></div>
            this.$scopedSlots.default({
                text: this.message,
            }),
            h('footer', footer),
        ])
    },
}
</script>

<style lang="scss" scoped>
//重用代码块：使用 @mixin进行代码块的定义，使用@include进行已定义的代码块的调用；
button {
    border: none;
    color: #ffffff;
    font-weight: 200;
    background: #2cc7a5;
    padding: 10px;
    display: block;
    margin-bottom: 10px;
}
</style>
