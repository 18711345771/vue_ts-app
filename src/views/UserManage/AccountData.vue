<template>
    <div class="account-data">
        <el-button type="primary" style="margin: 5px 0 5px 5px" @click="addAccount">新建账户</el-button>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="角色">
                <template slot-scope="scope">
                    <el-select @change="handleChange(scope.row)" v-if="scope.row.edit" v-model="scope.row.role">
                        <el-option v-for="option in options" :label="option.role" :value="option.role"
                                   :key="option.key"></el-option>
                    </el-select>
                    <span v-else>{{scope.row.role}}</span>
                </template>
            </el-table-column>
            <el-table-column label="账号">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.edit" v-model="scope.row.username"></el-input>
                    <span v-else>{{scope.row.username}}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述">
                <template slot-scope="scope">
                    <span>{{scope.row.des}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope" v-if="scope.row.username!= 'admin'">
                    <el-button v-if="!scope.row.edit" size="small" @click="handelEitor(scope.row)">编辑</el-button>
                    <el-button v-else type="success" size="small" @click="handelSave(scope.row)">完成</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <AddAccount :dialogVisible="dialogVisible" :options="options" @handleCancel="handleCancel"
                    @update="getData"></AddAccount>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Vue, Provide} from 'vue-property-decorator'
    import AddAccount from './AddAccount.vue'

    @Component({
        components: {AddAccount}
    })
    export default class AccountData extends Vue {
        @Provide() tableData: any = [];
        @Provide() dialogVisible: boolean = false;
        @Provide() options: any = [
            {
                key: 'admin',
                role: '管理员',
                des: "Super Administrator. Have access to view all pages."
            },
            {
                key: "editor",
                role: "客服",
                des: "Normal Editor. Can see all pages except permission page"
            },
            {
                key: "visitor",
                role: "游客",
                des: "Just a visitor. Can only see the home page and the document page"
            }
        ]

        created() {
            this.getData();
        }

        getData() {
            (this as any).$axios(`/api/users/allUsers`)
                .then((res: any) => {
                    // console.log(res.data);
                    // 设置编辑状态 将后台返回来的数据再进行处理即增加一个字段和对应的字段值(editor:false)
                    res.data.datas.forEach((item: any) => {
                        item.edit = false;
                    });
                    this.tableData = res.data.datas;
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                })
        }

        addAccount() {
            this.dialogVisible = true;
        }

        handleCancel() {
            this.dialogVisible = false;
        }

        handelEitor(row: any) {
            this.$confirm('确定要编辑吗？').then(() => {
                row.edit = true;
            })
        }

        handelSave(row: any) {
            row.edit = false;
            (this as any).$axios.post(`/api/users/editUser/${row._id}`, row).then((res: any) => {
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                });
            })
        }

        handleChange(row: any) {
            this.options.map((option: any) => {
                if (option.role == row.role) {
                    row.des = option.des;
                    row.key = option.key;
                }
            })
        }

        handleDelete(index: number, row: any) {
            this.$confirm('确定要删除此项吗？').then(() => {
                (this as any).$axios.delete(`/api/users/deleteUser/${row._id}`).then((res: any) => {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.tableData.splice(index, 1);
                })
            })
        }
    }
</script>
