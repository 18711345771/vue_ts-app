<template>
    <el-dialog
            title="编辑课程"
            :visible.sync="dialogVisible"
            :show-close="false"
            :close-on-click-modal="false"
    >
        <el-form
                ref="ruleForm"
                :rules="rules"
                :model="form"
                label-width="100px"
                size="small"
                class="form-box"
        >
            <el-form-item label="课程名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="课程等级" prop="level">
                <el-select v-model="form.level" placeholder="请选择课程等级">
                    <el-option label="初级" value="初级"></el-option>
                    <el-option label="中级" value="中级"></el-option>
                    <el-option label="高级" value="高级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报名人数" prop="count">
                <el-input v-model="form.count" placeholder="请输入报名人数"></el-input>
            </el-form-item>
            <el-form-item label="上线时间" prop="date">
                <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.date"
                        value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="技术栈" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio label="vue" name="type"></el-radio>
                    <el-radio label="react" name="type"></el-radio>
                    <el-radio label="node" name="type"></el-radio>
                    <el-radio label="小程序" name="type"></el-radio>
                    <el-radio label="angular" name="type"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <!--注册事件 ：相当于在子组件中给要添加的事件占位，这个事件在父级中实现-->
            <el-button size="small" @click="$emit('closeDialog')">取 消</el-button>
            <el-button type="primary" size="small" @click="handleSubmit('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts">
    //Prop用来接收父级给我们传递过来的数据
    import {Component, Vue, Prop, Provide} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class EditDialog extends Vue {
        //以下定义的dialogVisible一定要与TableData.view中的绑定的属性（即:dialogVisible）一样;
        //!:表示强制解析成(boolean)类型数据，常用于@Prop
        @Prop(Boolean) dialogVisible!: boolean;
        @Prop(Object) form!: {
            title: string;
            type: string;
            level: string;
            count: string;
            date: string;
            _id: string;
        };

        @Provide() rules: any = {
            title: [{required: true, message: "请输入课程名称", trigger: "blur"}],
            level: [{required: true, message: "请选择课程等级", trigger: "change"}],
            count: [{required: true, message: "请输入报名人数", trigger: "blur"}],
            date: [
                {
                    type: "string",
                    required: true,
                    message: "请选择日期",
                    trigger: "change"
                }
            ],
            type: [
                {
                    required: true,
                    message: "请选择技术栈",
                    trigger: "change"
                }
            ]
        }

        created() {
            // console.log(this.dialogVisible,this.form);
        }

        handleSubmit(formName: any) {
            (this.$refs[formName] as any).validate((valid: any) => {
                if (valid) {
                    (this as any).$axios.post(`/api/profiles/edit/${this.form._id}`)
                        .then((res: any) => {
                            // console.log(res.data);
                            this.$emit('closeDialog');
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        })
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .form-box {
        .el-input,
        .el-select {
            width: 200px !important;
        }
    }
</style>
