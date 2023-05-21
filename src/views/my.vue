<template>
    <div>
      <el-container direction="horizontal">
        <el-aside width="25%">
          <asidenav></asidenav>
          <!-- <router-link to="/my/myclass" @click.native="myClick">sdnsnnfjewni</router-link> -->
        </el-aside>
        <el-main>
          <div :class="{'colordisplay':display}">
            <!-- <el-empty description="描述文字" :image-size="250"></el-empty> -->
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
</template>

  <script>
    import asidenav from '../views/asidenav.vue';
    import userInfo from './userInfo.vue';
    export default {
      components:{
        asidenav,
        userInfo
      },
      data() {
        return {
          display: false
        }
      },
      methods: {
        myClick(){
          this.display = true;
          console.log("cnsicnsjk");
        }
      },
    }
  </script>

<style scoped >
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    min-width: 125px;
    max-width: 250px;
    height: calc(100vh - 60px);
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center; */
    /* text-align: center; */
    padding: 0;
    height: calc(100vh - 60px);
}
.colordisplay{
  display: none;
}
</style>