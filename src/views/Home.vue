<template>
  <div class="home_continer">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside :width="asideMenuWidth">
          <div
            class="collspace"
            @click="toggleCollspace"
          >
            <template v-if="collapse">
              <i class="el-icon-d-arrow-right"></i>
            </template>
            <template v-else>
              <i class="el-icon-d-arrow-left"></i>
            </template>

          </div>
          <!-- 侧边栏菜单-->
          <aside-menu
            :prop-menus="menus"
            :prop-collapse="collapse"
            @selectPath="togglePage"
          ></aside-menu>
        </el-aside>
        <el-main>

          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <template v-if="breadcrumb.length > 1">
                 <el-breadcrumb-item v-for="(item , index) of breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
          <!-- 面包屑导航 end -->

          <!-- 主体，随路由切换 -->
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from "@/components/layout/AsideMenu";
import { HomeModel } from "@/models/HomeModel";
import { Ls } from "@/utils/ls";
export default {
  data() {
    return {
      menus: [],
      collapse: false,
      breadcrumb: []
    };
  },
  async created() {
    // 获取侧边栏的数据
    const menus = await HomeModel.getMenus();
    this.menus = menus;

    // 刷新时获取原来的面包屑导航数据
    this.togglePage()
  },
  computed: {
    // 侧边栏切换显隐时的宽度
    asideMenuWidth() {
      return this.collapse ? "64px" : "200px";
    }
  },
  methods: {
    // 切换侧边栏菜单显隐
    toggleCollspace() {
      this.collapse = !this.collapse;
    },

    // 切换导航时，显示新的面包屑
    togglePage(e) {
      const breadcrumb = Ls.get("breadcrumb");
      if(breadcrumb) this.breadcrumb = breadcrumb
    }
  },
  components: {
    AsideMenu
  }
};
</script>

<style scoped lang="scss">
.home_continer,
.el-container {
  height: 100%;
}
.home_continer {
  min-width: 1366px;
}
.el-header {
  background-color: #373d41;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.collspace {
  cursor: pointer;
  color: #fff;
  line-height: 30px;
  padding-left: 20px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  i {
    margin-right: 10px;
  }
}
</style>