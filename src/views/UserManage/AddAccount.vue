<template>
    <div class="add-account">
        <el-dialog title="新建用户" :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false"
                   width="40%">
            <el-form :model="account" :rules="rules" ref="accountForm">
                <el-form-item label="角色" prop="role">
                    <el-select @change="selectOption" label="请选择" v-model="account.role">
                        <el-option v-for="option in options" :label="option.role" :value="option.role"
                                   :key="option.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号" prop="username">
                    <el-input placeholder="请输入账号" v-model="account.username"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$emit('handleCancel')">取消</el-button>
                <el-button type="primary" @click="handleCreate('accountForm')">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Provide, Emit} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class AddAccount extends Vue {
        @Prop(Boolean) dialogVisible!: boolean;
        @Prop(Array) options!: any;
        @Provide() account: any = {
            role: '',
            username: '',
            key: '',
            des: ''
        };
        @Provide() rules: any = {
            role: [{required: true, message: '请选择身份', trigger: 'change'}],
            username: [{required: true, message: '请填写账号', trigger: 'blur'}]
        };

        selectOption(select: string) {
            this.options.map((option: any) => {
                if (option.role == select) {
                    (this as any).account.des = option.des;
                    (this as any).account.key = option.key;
                }
            })
        }

        @Emit('handleCancel')//在以下方法执行完成后通知父组件自动调用该注解的对应方法
        handleCreate(formName: string) {
            (this as any).$refs[formName].validate((valid: any) => {
                if (valid) {
                    (this as any).$axios.post(`/api/users/addUser`, this.account)
                        .then((res: any) => {
                            // console.log(res.data);
                            this.$emit('update');
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            })
                        })
                }
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>