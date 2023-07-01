<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="200px" style="height: 100%;box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
        <el-menu
          text-color="#000"
          :default-openeds="['1', '3']"
          class="example"
          style="
            background-color: rgb(166, 208, 211) ;
            height: 100%;
            color: #fff;
            overflow-x: hidden;
            
          "
        >
        <div style="height: 60px; line-height: 60px; text-align: center">
          <b style="color: black">后台管理系统</b>
        </div>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>导航三</template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

        <el-container>
        <el-header  style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
          <!-- <div style="flex: 1; font-size: 20px">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
          </div> -->
          <el-dropdown style="width: 70px; cursor: pointer;">
            <span>小帅崔</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">个人信息</el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>

        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
 
          <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"></el-input>
            <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml"></el-input>
            <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" class="ml"></el-input>
            <el-button class="ml" type="primary" @click="load">搜索</el-button>
          </div>

          <div style="margin: 10px 0">
            <el-button type="primary">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
            <!-- <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>
            <el-button type="primary">导出 <i class="el-icon-top"></i></el-button> -->
          </div>

          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
            <el-table-column prop="userId" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="gender" label="性别">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="电话">
            </el-table-column>
            <el-table-column label="操作"  width="300" align="center">
              <template slot-scope="{}">
                <el-button type="success">编辑 <i class="el-icon-edit"></i></el-button>
                <el-button type="danger">删除 <i class="el-icon-remove-outline"></i></el-button>
              </template>
            
            </el-table-column>
          </el-table>
          
          <div style="padding: 10px 0">
            <el-pagination
              @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>
        </el-main> 

      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-menu-item,
.el-menu-item-group,
.el-menu {
  color: rgb(255, 255, 255);
  background-color: rgb(166, 208, 211);
}
.example::-webkit-scrollbar {
  display: none;
}
.headerBg {
  background: rgb(240, 240, 210)!important;
}
.ml{
  margin-left: 5px;
}
</style>

<script>
import request from "@/utils/request";
import {getTestData2} from "@/api/graphApis.js";
import {getTestData1} from "@/api/graphApis.js";

export default { 
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 2,
      userName: "",
      email: "",
      // collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200,
      logoTextShow: true,
      
      personQuery:{
        pageNum: 1,
        pageSize: 2,
        username: "",
      },

      headerBg: 'headerBg'
    };
  },
  created() {
    // 请求分页查询数据
    this.load()
  },
  methods: {
    load() {
      
          getTestData2(this.personQuery).then((res) => {
          console.log(res)
          this.tableData = res.data.records
          this.total = res.data.total
        })
        // getTestData1().then(res => {
        //   console.log(res)
        //   this.tableData = res
        //   this.total = res.length
        // })
      },
    handleSizeChange(pageSize) {
        console.log(pageSize)
        this.pageSize = pageSize
        this.load()
      },
    handleCurrentChange(pageNum) {
        console.log(pageNum)
        this.pageNum = pageNum
        this.load()
    } 
  }
}
</script>