<template>
  <div class="container">
    <div class="login_card">
      <div class="title">{{ title }}</div>
      <el-form :model="loginRegisterInfo" :rules="tableState == 1 ? rules1 : rules2" ref="loginRegisterInfo"
        label-width="80px" class="loginForm">
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="loginRegisterInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="loginRegisterInfo.password" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="rePassword" v-if="rePasswordVisible">
          <el-input v-model="loginRegisterInfo.rePassword"></el-input>
        </el-form-item>
        <el-form-item label="用户名:" prop="userName" v-if="userNameVisible">
          <el-input v-model="loginRegisterInfo.userName" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="职业:" prop="role" v-if="roleVisible">
          <el-select v-model="selectValue" placeholder="请选择" @change="afterSelect" style="width: 100%;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验证码:" prop="code" v-if="codeVisible">
          <el-input v-model="loginRegisterInfo.code">
            <el-button slot="append" @click="userGetCode" :loading="isGetCode">获取验证码</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="login_card_footer">
        <el-button class="submitButton" type="primary" @click="submitForm('loginRegisterInfo')" :loading="isLoading">{{ submitButton
        }}</el-button>
        <el-button class="stateBuntton" type="text" @click="stateChange('loginRegisterInfo')">{{ stateBuntton
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/userApis.js'
import { getEmailCode, userRegister } from '@/api/loginRegisterApis.js'
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    var validateRePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('重复密码不能为空'));
      } else if (value != this.loginRegisterInfo.password) {
        return callback(new Error('确认密码与密码不一致'));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else if (regEmail.test(value)) {
        return callback();
      } else {
        callback(new Error('请输入合法邮箱'));
      }
    };
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      } else {
        callback();
      }
    };
    return {
      //标题 登录 注册按钮显示文字
      title: "登 录",
      submitButton: "登 录",
      stateBuntton: "注 册",

      //表格信息
      loginRegisterInfo: {
        password: "",
        userName: "",
        rePassword: "",
        role: 1,
        email: "",
        code: "",
      },
      //选择器选项
      options: [{
        value: '1',
        label: '学生'
      }, {
        value: '2',
        label: '教师'
      }],
      //选择器选中值
      selectValue: '1',
      //表格状态 1为登录 2为忘记密码 3为注册
      tableState: 1,
      //重复密码、角色选择框、邮箱和验证码是否可见
      rePasswordVisible: false,
      roleVisible: false,
      userNameVisible: false,
      codeVisible: false,
      //登录验证规则
      rules1: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
      },
      //注册验证规则
      rules2: {
        userName: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        rePassword: [
          { validator: validateRePass, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ],
      },
      isLoading: false,
      isGetCode: false,
    };
  },
  methods: {
    //右侧按钮改变状态
    stateChange(formName) {
      if (this.tableState == 1) {
        this.tableState = 3;
        this.title = "注 册";
        this.submitButton = "注 册";
        this.stateBuntton = "登 录";
      } else if (this.tableState == 3) {
        this.tableState = 1;
        this.title = "登 录";
        this.submitButton = "登 录";
        this.stateBuntton = "注 册";
      }
      this.resetForm(formName);
      this.changeVisible();
      this.$nextTick(() => {
        this.resetForm(formName);
      })
      
    },
    //提交按钮--根据状态做不同操作
    submitForm(formName) {
      if (this.tableState == 1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loginInfo = {
              email: this.loginRegisterInfo.email,
              password: this.loginRegisterInfo.password,
            }
            this.pressLogin(loginInfo);
          }
        });
      } else if (this.tableState == 3) {
        let userRegisterDTO = {
          email: this.loginRegisterInfo.email,
          password: this.loginRegisterInfo.password,
          userName: this.loginRegisterInfo.userName,
          code: this.loginRegisterInfo.code,
        }
        this.pressRegister(userRegisterDTO);
      }
    },
    //用户登录
    pressLogin(loginInfo) {
      this.isLoading = true;
      userLogin(loginInfo)
        .then((res) => {
          if (res.code == 200) {
            // "userInfo": {
            //   "roleId": 1,
            //   "avatar": null,
            //   "userName": "123",
            //   "userId": 8,
            //   "token": "eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjE4OTMwMDY0NTYxIiwibmFtZSI6bnVsbCwiZXhwIjoxNjg4NTI4Mjk2LCJ1c2VySWQiOjgsImlhdCI6MTY4ODUyNTcwNCwianRpIjoidG9rZW5JZCIsInVzZXJuYW1lIjoiMTIzIn0.T-VVOfv3ZnMg-v49_bCJ7BlGMlaoblOS1lviDqBUXu4"
            // }
            let userInfo = res.data
            window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
            window.sessionStorage.setItem("token", JSON.stringify(userInfo.token))
            this.$message.success(res.msg);
            if(userInfo.roleId == 1||userInfo.roleId == 2){
              this.$router.push({
                path: '/index_content'
              })
            }else {
              this.$router.push({
                path: '/ManagePage'
              })
            }
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.$message.error(res.msg);
          }
        });
    },
    //用户注册
    pressRegister(userRegisterDTO) {
      this.isLoading = true;
      userRegister(userRegisterDTO)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            let loginInfo = {
              email: userRegisterDTO.email,
              password: userRegisterDTO.password,
            }
            this.pressLogin(loginInfo);
            this.isLoading = false;
          }else {
            this.isLoading = false;
            this.$message.error(res.msg);
          }
        })
    },
    //选择职业后处理
    afterSelect() {
      this.loginRegisterInfo.role = this.selectValue - 0;
    },
    //用户获取验证码
    userGetCode() {
      this.isGetCode = true;
      let userRegisterDTO = {
        email: this.loginRegisterInfo.email,
      }
      getEmailCode(userRegisterDTO)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.isGetCode = false;
          }
        })
    },
    //重置表格
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //根据表格状态改变表格视图
    changeVisible() {
      if (this.tableState == 1) {
        this.rePasswordVisible = false;
        this.roleVisible = false;
        this.userNameVisible = false;
        this.codeVisible = false;
      } else if (this.tableState == 2) {
        this.rePasswordVisible = true;
        this.roleVisible = false;
        this.userNameVisible = false;
        this.codeVisible = false;
      } else {
        this.rePasswordVisible = true;
        this.roleVisible = true;
        this.userNameVisible = true;
        this.codeVisible = true;
      }
    },
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_card {
  width: 400px;
  border-radius: 15px;
  box-shadow: 0 5px 10px -2px rgba(0, 0, 0, .3);
  padding: 40px;
}

.title {
  font-size: 1.7rem;
  margin-bottom: 20px;
  text-align: center;
}

.el-form-item {
  margin-bottom: 30px;
}

.login_card_footer {
  position: relative;
  height: 40px;
}

.submitButton {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.stateBuntton {
  position: absolute;
  right: 0;
}
</style>