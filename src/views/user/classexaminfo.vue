<template>
  <div class="container">
    <div class="nav" @click="goBackRouter"><-试卷</div>
    <el-table
        :data="studentData.filter(data => !search || data.userId.toString().includes(search) || data.userName.toLowerCase().includes(search.toLowerCase()))">
      <el-table-column prop="userId" label="学生id">
      </el-table-column>
      <el-table-column prop="userName" label="用户名">
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input class="header-input" size="small" v-model="search"  placeholder="输入关键词搜索" />
        </template>
        <template slot-scope="scope" v-if="isTeacher">
          <el-button size="mini" type="primary" @click.stop="handleCheck(scope.$index, scope.row)">查 看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getUserArrayInfo} from '@/api/userApis.js'
import { getStudentPaper } from "@/api/studentPaperPageApis";

export default {
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
    handleCheck(index, row) {
      let routeData = this.$router.resolve({
        path: '/checkExam',
        query: {
          paperId: this.$route.query.paperId,
          examId: this.$route.query.examId,
          examTitle: this.$route.query.examTitle,
          studentId: row.userId,
        }
      })
      window.open(routeData.href, '_blank');
    },
    getData() {
      getStudentPaper({
        examId: this.$route.query.examId,
        pageNum: 1,
        pageSize: 100,
      }).then((res1) => {
            let userId = [];
            res1.data.records.forEach((item) => {
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
    goBackRouter(){
      this.$router.go(-1)
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
.container{
  width: 80%;
  margin: auto;
}
.nav{
  margin:20px 0;
  cursor: default;
  font-size: 1.2rem;
}
.nav:hover{
  color: #13a8e8;
}
.el-table{
  width: 100%;
  margin: auto;
  height: 100vh;
  background-color: rgb(255, 255, 255,0);
}
.header-input{
  width: 60%;
}
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent;
}
</style>