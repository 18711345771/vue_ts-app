<template>
    <div class="login_page">
        <div class="page_center">
            <div class="img_title">
                <div class="info">
                    <img src="@/assets/logo.png" alt="">
                    <span>Logo</span>
                </div>
                <div class="details">
                    学习新知识新技能使我快乐！我爱学习！
                </div>
            </div>
            <!--插槽-->
            <div class="container">
                <slot name="container"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Vue} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class LayoutHeader extends Vue {

    }
</script>
<style lang="scss" scoped>
    .login_page {
        height: 100%;
        width: 100%;
        .page_center {
            position: absolute;
            width: 400px;
            height: 840px;
            margin: auto;
            top: 60px;
            right: 0;
            left: 0;
            .img_title {
                text-align: center;
                height: 150px;
                margin-bottom: 20px;
                .info {
                    display: flex; //弹性布局
                    justify-content: center; //元素在主轴（页面）上居中排列
                    align-items: center;
                    img {
                        width: 150px;
                    }
                    span {
                        font-size: 20px;
                        font-weight: bolder;
                        color: black;
                    }
                }
                .details {
                    text-align: center;
                    font-weight: lighter;
                    font-size: 14px;
                    color: lightslategray;
                }
            }
            .container {
                border-radius: 5px;
                box-shadow: 0 0 25px #cac6c6;
                padding: 35px 35px 15px 35px;
            }
        }
    }
</style>
