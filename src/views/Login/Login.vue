<template>
    <div class="login">
        <LoginHeader>
            <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-position="left" label-width="0px"
                     slot="container">
                <div class="title">
                    <h3>账号密码登录</h3>
                </div>
                <el-form-item prop="username">
                    <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"><i
                            slot="prefix" class="fa fa-user"></i></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码"><i
                            slot="prefix" class="fa fa-lock"></i></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="isLogin" @click.native.prevent="handleSubmit" type="primary"
                               style="width: 100%;">登录
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">七天七天内自动登录</el-checkbox>
                    <el-button @click="$router.push('/password')" type="text" class="forget">忘记密码?</el-button>
                </el-form-item>
            </el-form>
        </LoginHeader>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Provide} from "vue-property-decorator"
    import LoginHeader from './LoginHeader.vue'
    import {State, Getter, Mutation, Action} from 'vuex-class'

    @Component({
        components: {LoginHeader}
    })
    export default class Login extends Vue {
        //存储用户信息
        @Action("setUser") setUser: any;

        @Provide() isLogin: boolean = false;
        //装饰器是一个方法,后面接一个自定义的属性,这里我定义了一个对象属性
        @Provide() ruleForm: {
            username: String;
            pwd: String;
            autoLogin: boolean;
        } = {
            username: "",
            pwd: "",
            autoLogin: true,//是否自动登录
        };

        @Provide() rules = {
            username: [
                {required: true, message: '请输入账号', trigger: 'blur'},
            ],
            pwd: [
                {required: true, message: '请输入密码', trigger: 'blur'},
            ]
        };

        handleSubmit(): void {
            (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
                if (valid) {
                    this.isLogin = true;
                    // console.log("校验通过")
                    //网络请求
                    (this as any).$axios.post("/api/users/login", this.ruleForm)
                        .then((res: any) => {
                            console.log(res.data);
                            //存储token
                            localStorage.setItem("tsToken", res.data.token);
                            //存储到vuex中
                            this.setUser(res.data.token);
                            this.isLogin = false;
                            this.$router.push("/");
                        })
                        .catch(() => {
                            this.isLogin = false;
                        });
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #505458;
    }

    i {
        font-size: 14px;
        margin-left: 8px;
    }

    .forget {
        float: right;
    }
</style>