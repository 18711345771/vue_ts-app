<template>
    <div class="form-data">
        <el-form
                :model="form"
                label-width="100px"
                label-position="left"
                :rules="rules"
                ref="ruleForm"
        >
            <el-form-item label="课程名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入课程名称" size="small"></el-input>
            </el-form-item>
            <el-form-item label="课程等级" prop="level">
                <el-select v-model="form.level" placeholder="请输入课程等级" size="small">
                    <el-option value="初级" label="初级"></el-option>
                    <el-option value="中级" label="中级"></el-option>
                    <el-option value="高级" label="高级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报名人数" prop="count">
                <el-input v-model="form.count" placeholder="请输入报名人数" size="small"></el-input>
            </el-form-item>
            <el-form-item label="上线时间" size="small" prop="date">
                <el-date-picker v-model="form.date"
                                value="2019-11-30"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                >
                </el-date-picker>
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
            <el-form-item>
                <el-button type="primary" size="small" @click="handleSubmit('ruleForm')">提交</el-button>
                <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Vue, Provide} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class FormData extends Vue {
        @Provide() form: {
            title: String;
            type: String;
            level: String;
            count: String;
            date: String;
        } = {
            title: "",
            type: "",
            level: "",
            count: "",
            date: ""
        };
        @Provide() rules: any = {
            title: [{required: true, message: '请输入课程名称', trigger: 'blur'}],
            level: [{required: true, message: '请选择课程等级', trigger: 'change'}],
            count: [{required: true, message: '请输入报名人数', trigger: 'blur'}],
            date: [{type: 'string', required: true, message: '请选择时间', trigger: 'change'}],
            type: [{required: true, message: '请选择技术栈', trigger: 'change'}]
        }

        handleSubmit(ruleForm: string) {
            (this as any).$refs[ruleForm].validate((valid: any) => {
                if (valid) {
                    (this as any).$axios.post(`api/profiles/add`, this.form)
                        .then((res: any) => {
                            console.log(res.data);
                            this.$message({
                                message: res.data.msg,
                                type: "success"
                            });
                            this.resetForm(ruleForm);
                        })
                }
            })
        }

        resetForm(ruleForm: string) {
            this.$nextTick(() => {
                (this as any).$refs[ruleForm].resetFields();
            })
        }
    }
</script>
<style lang="scss" scoped>
    .form-data {
        /**-webkit-border-radius和-moz-border-radius
        *这两个都是处理圆角效果的，但不是w3标准的。
        *w3标准的是border-radius，
        *-webkit-border-radius 是为了兼容 chrome 或 safari，
        *-moz-border-radius 是为了兼容火狐，
        *而现在火狐支持标准的border-radius，所以-moz-border-radius 是个无用的属性。
        *background-clip属性的通俗作用就是指定元素背景所在的区域,有四种取值
        *1、border-box 2、padding-box 3、content-context 4、text
        *border-box是默认值，表示元素的背景从border区域（包括border）以内开始保留背景。
        */
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        padding: 35px;
        background: #fff;
        border: 1px solid #dcdfe6;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

        .el-input,
        .el-select {
            width: 200px !important;
        }
        .division {
            margin: 0 10px;
            color: #606266;
        }
    }
</style>