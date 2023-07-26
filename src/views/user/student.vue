<template>
    <div>
        <editStudent ref="editStudent"></editStudent>
        <el-table
            :data="studentData.filter(data => !search || data.userId.toString().includes(search) || data.userName.toLowerCase().includes(search.toLowerCase()))"
            @row-click="selectStudent">
            <el-table-column prop="userId" label="学生id">
            </el-table-column>
            <el-table-column prop="userName" label="用户名">
            </el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-input class="header-input" size="small" v-model="search"  placeholder="输入关键词搜索" />
                </template>
                <template slot-scope="scope" v-if="isTeacher">
                    <!-- <el-button size="mini" type="primary" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                    <el-button size="mini" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">删 除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import editStudent from './editStudent.vue'
import { getClassStudentId,deleteClassStudent } from '@/api/classApis'
import {getUserArrayInfo} from '@/api/userApis.js'
export default {
    components:{
        editStudent,
    },
    data() {
        return {
            classId: 0,
            // "studentData": [
            //     {
            //         "age": 0,
            //         "avatar": "",
            //         "birth": "",
            //         "email": "",
            //         "gender": "",
            //         "idCard": "",
            //         "name": "",
            //         "password": "",
            //         "phoneNumber": "",
            //         "politics": "",
            //         "profession": "",
            //         "school": "",
            //         "synopsis": "",
            //         "userId": 0,
            //         "userName": ""
            //     }
            // ],
            studentData: [], //学生表格数据
            temStudent: {   //编辑时暂存学生信息
                age: 0,
                avatar: "",
                birth: "",
                email: "",
                gender: "",
                idCard: "",
                name: "",
                password: "",
                phoneNumber: "",
                politics: "",
                profession: "",
                school: "",
                synopsis: "",
                userId: 0,
                userName: ""
            },
            search: '', //搜索框
            isTeacher: false,
        }
    },
    methods: {
        //编辑按钮
        handleEdit(index, row) {
            this.$nextTick(() => {
                this.$refs.editStudent.dialogVisible();
            })
            this.deepCopyTotem(row);
            this.$nextTick(() => {
                this.$refs.editStudent.upDateForm(this.temStudent);
            })
        },
        //删除按钮
        handleDelete(index, row) {
            this.deleteLine(index, row);
        },
        //获取表格数据
        getData() {
            getClassStudentId(this.classId,1)
            .then((res1) => {
                let userId = [];
                res1.forEach((item) => {
                    userId.push(item.userId)
                });
                if(userId !== undefined&&userId.length>0){
                    getUserArrayInfo(userId)
                    .then((res2) => {
                        res2.data.forEach((item) => {
                            this.studentData.push(item)
                        });
                    })
                }
            });
        },
        //删除当前行数据
        deleteLine(index, row) {
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                let deleteId = [];
                deleteId.push(row.userId)
                deleteClassStudent(this.classId,deleteId)
                .then((res) => {
                    if (res.code == 200) {
                        this.$delete(this.studentData,index);
                        this.$message.success("删除成功！");
                    } else {
                        this.$message.error("删除失败！");
                    }
                });
            })
        },

        //row->temCouse深拷贝
        deepCopyTotem(row) {
            this.temStudent.age = row.age;
            this.temStudent.avatar = row.avatar;
            this.temStudent.birth = row.birth;
            this.temStudent.email = row.email;
            this.temStudent.gender = row.gender;
            this.temStudent.idCard = row.idCard;
            this.temStudent.name = row.name;
            this.temStudent.password = row.password;
            this.temStudent.phoneNumber = row.phoneNumber;
            this.temStudent.politics = row.politics;
            this.temStudent.profession = row.profession;
            this.temStudent.school = row.school;
            this.temStudent.synopsis = row.synopsis;
            this.temStudent.userId = row.userId;
            this.temStudent.userName = row.userName;
        },
        selectStudent(row,column,event){
          if(JSON.parse(localStorage.getItem("userInfo")).roleId === 2){
            this.$router.push({
              name: 'classStudentStatics',
              query: {
                studentId: row.userId,
              }
            })
          }
        }
    },
    created() {
        this.classId = JSON.parse(window.sessionStorage.getItem("classInfo")).classId
        if(JSON.parse(localStorage.getItem("userInfo")).roleId == 2){
            this.isTeacher = true;
        }
    },
    mounted() {
        this.getData();
    }
}
</script>

<style scoped>
.el-table{
    margin-left: 0;
    width: 80%;
    margin: auto;
    height: 100vh;
    background-color: rgb(255, 255, 255,0);
}
.header-input{
    width: 60%;
}
/* ::v-deep .el-table__row{
background-color: rgb(255, 255, 255,0);
}
::v-deep .el-table--border th.el-table__cell {
background-color: rgb(255, 255, 255,0);
}
::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
} */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent;
}
</style>