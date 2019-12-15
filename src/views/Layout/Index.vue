<template>
    <div class="layout">
        <!--头部-->
        <LayoutHeader/>
        <!--内容部分-->
        <Content>
            <Siderbar slot="left"></Siderbar>
            <router-view slot="content"></router-view>
        </Content>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Vue} from 'vue-property-decorator'
    import LayoutHeader from './LayoutHeader.vue'
    import Content from './Content.vue'
    import Siderbar from './Siderbar.vue'

    @Component({
        components: {
            LayoutHeader,
            Content,
            Siderbar
        }
    })
    export default class Layout extends Vue {

    }
</script>

<style lang="scss" scoped>
    .layout {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #f5f7f9;
        /*下面一条重要，不能省略*/
        position: absolute;
    }
</style>
