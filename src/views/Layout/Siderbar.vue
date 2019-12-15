<template>
    <el-scrollbar class="el-scrollbar">
        <!--1.以下的router属性的作用是根据index绑定的path进行路由跳转，去掉router属性便不能进行动态路由;2.绑定default-active属性值是为了浏览器刷新后，仍然可以定位到之前选中的路由。-->
        <el-menu class="el-menu-slide" router :default-active="$router.currentRoute.path">
            <!--<el-menu-item index="1">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">首页</span>-->
            <!--</el-menu-item>-->
            <!--以上item元素内容更改为以下内容，时间2019-11-19-->
            <template v-for="item in getRouters" v-if="item.show&&item.children&&item.children.length>0">
                <el-menu-item v-if="item.children.length==1" :index="item.children[0].path"
                              :key="item.children[0].name">
                    <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
                    <span slot="title">{{item.children[0].meta.title}}</span>
                </el-menu-item>
                <el-submenu v-else :index="item.children[0].path" :key="item.name">
                    <template slot="title">
                        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                        <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name">
                        <i v-if="child.meta.icon" :class="child.meta.icon"></i>
                        <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {State, Getter, Mutation, Action} from 'vuex-class'

    @Component({
        components: {}
    })
    export default class Siderbar extends Vue {
        @Getter("routers") getRouters: any;

        created() {
            // console.log(this.getRouters);
        }
    }
</script>
<style lang="scss" scoped>
    .el-scrollbar {
        height: 100%;
        border-right: 1px solid #e6e6e6;
        background: #e6e6e6;
        .el-menu-slide {
            border-right: none;
            i {
                margin-right: 5px;
                width: 24px;
                text-align: center;
                font-size: 18px;
            }
        }
    }
</style>