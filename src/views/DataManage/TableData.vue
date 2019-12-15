<template>
    <div class="table-data">
        <div class="search-box">
            <el-input size="small" v-model="searchVal" placeholder="请输入课程名称检索"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="handleSerach">查找</el-button>
        </div>
        <el-table :data="tableData" border class="table-box" style="width: 100%;height: 100%;">
            <!--type=index的作用是自动的显示序号-->
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="title" label="课程名称"></el-table-column>
            <el-table-column prop="level" label="课程等级" width="120"></el-table-column>
            <el-table-column prop="type" label="技术栈" width="120"></el-table-column>
            <el-table-column prop="count" label="报名人数" width="120"></el-table-column>
            <el-table-column prop="date" label="上线日期" width="160"></el-table-column>
            <el-table-column v-if="getUser.key!='visitor'" label="操作" width="160">
                <!--以下的scope相当于this，$index就是数组的下标，row数组元素（一个对象）-->
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index,scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope.$index,scope.row)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages" ref="page-box">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[5,10,15,20]" :page-size="size" layout="total,sizes,prev,pager,next,jumper"
                           :total="total"></el-pagination>
        </div>
        <EditDialog @closeDialog="closeDialog" :dialogVisible="dialogVisible" :form="formData"></EditDialog>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Vue, Provide} from 'vue-property-decorator'
    import EditDialog from './EditDialog.vue'
    import {State, Action, Getter, Mutation} from 'vuex-class'

    @Component({
        components: {EditDialog}
    })
    export default class TableData extends Vue {
        @Getter("user") getUser: any;
        @Provide() searchVal: string = "";
        //以下一条的作用原本是想使table显示固定的高度，打印的值有出入
        //@Provide() tHeight:number=document.body.offsetHeight-270;
        @Provide() tableData: any = [];//表格数据
        @Provide() page: number = 1;//当前页面号
        @Provide() size: number = 5;//请求数据的个数
        @Provide() total: number = 0;//总数据条数
        @Provide() dialogVisible: Boolean = false;//是否展示编辑页面
        @Provide() formData: object = {
            title: "",
            type: "",
            level: "",
            count: "",
            date: ""
        };

        created() {
            //console.log(this.tHeight);
            this.loadData();
        }

        loadData() {
            (this as any).$axios(`/api/profiles/loadMore/${this.page}/${this.size}`)
                .then((res: any) => {
                    //console.log(res.data);
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                });
        }

        handleSerach() {
            this.page = 1;
            this.searchVal ? this.searchData() : this.loadData();
        }

        searchData() {
            //加载搜索数据
            (this as any).$axios(`/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`)
                .then((res: any) => {
                    console.log(res.data);
                    this.tableData = res.data.datas.list;
                    this.total = res.data.datas.total;
                })
        }

        handleSizeChange(val: number): void {
            this.size = val;
            // console.log(this.size);
            this.page = 1;

            //this.loadData();
            //以上一行代码更改为以下代码
            this.searchVal ? this.searchData() : this.loadData();
        }

        handleCurrentChange(val: number): void {
            this.page = val;
            // console.log(this.page);

            //this.loadData();
            //以上一行代码更改为以下代码
            this.searchVal ? this.searchData() : this.loadData();
        }

        handleEdit(index: number, row: any) {
            // console.log(index,row);
            this.formData = row;
            this.dialogVisible = true;
        }

        closeDialog() {
            this.dialogVisible = false;
        }

        handleDelete(index: number, row: any) {
            //console.log(row._id);
            this.$confirm('确定要删除该项吗？').then(_ => {
                (this as any).$axios.delete(`/api/profiles/delete/${row._id}`).then((res: any) => {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.tableData.splice(index, 1);
                });
            })
        }
    }
</script>
<style lang="scss" scoped>
    .table-data {
        height: 100%;
        .search-box {
            background-color: #fff;
            box-sizing: border-box;
            padding: 10px 10px;
            height: 55px;
            border-radius: 4px;
            .el-input {
                width: 200px;
                margin-right: 10px;
            }
        }
        .table-box {
            font-size: 14px;
        }
        .pages {
            background: #fff;
            margin-bottom: 10px;
            text-align: right;
            padding: 10px 10px;
            height: 55px;
            box-sizing: border-box;
        }
    }
</style>
