<template>
    <el-container class="layout-content">
        <!--左侧的菜单-->
        <el-aside>
            <!--防止导航树组建的插槽-->
            <slot name="left"></slot>
        </el-aside>
        <!--右侧的主页面-->
        <el-main>
            <!--放置面包屑组件-->
            <div class="top">
                <i class="fa fa-reorder"></i>
                <el-breadcrumb class="breadcrumb" separator="/">
                    <el-breadcrumb-item v-for="(item,index) in breadCrumbItems" :key="index" :to="{path:item.path}">
                        {{item.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!--页面内容-->
            <div class="content">
                <slot name="content"></slot>
            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Vue, Provide, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class Content extends Vue {
        @Provide() breadCrumbItems: any;//面包屑的数组

        @Watch("$route") handleRouteChange(to: any): any {
            this.initBreadCrumbItems(to)
        }

        created() {
            this.initBreadCrumbItems(this.$route);
        }

        initBreadCrumbItems(router: any) {
            // console.log(router);
            //根路由title
            let breadCrumbItems: any = [{path: '/', title: '后台管理系统'}];

            //遍历父级到当前子路由的页面的title和path 存储到数组里 以下index是matched数组下标
            for (const index in router.matched) {
                if (router.matched[index].meta && router.matched[index].meta.title) {
                    breadCrumbItems.push({
                        // path:router.matched[index].path?router.matched[index].path:'/',
                        path: router.matched[index].path,
                        title: router.matched[index].meta.title
                    })
                }
            }

            this.breadCrumbItems = breadCrumbItems;

            console.log(this.breadCrumbItems);
        }
    }
</script>
<style lang="scss" scoped>
    .layout-content {
        width: 100%;
        height: 100%;
        background: #fff;
        position: absolute;
        .el-main {
            padding: 0px;
            .top {
                background: #fff;
                height: 54px;
                border-right: none;
                border-bottom: 1px solid #e6e6e6;
                display: flex;
                align-items: center;
                i {
                    font-size: 20px;
                    cursor: pointer;
                    padding-left: 16px;
                }
                .breadcrumb {
                    padding-left: 16px;
                }
            }
        }
    }
</style>
