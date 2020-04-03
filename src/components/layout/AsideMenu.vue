<template>
  <div class="aside_menu">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      :collapse="propCollapse"
      :default-active="path"
      router
    >
      <el-submenu
        v-for="menu of propMenus"
        :key="menu.id"
        :index="menu.path"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ menu.authName }}</span>
        </template>

        <el-menu-item
          v-for="menuItem of menu.children"
          :data-authname="`${menu.authName},${menuItem.authName}`"
          :key="menuItem.id"
          :index="menuItem.path"
          @click="toggleSelect"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ menuItem.authName }}</span>
          </template>
        </el-menu-item>

      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {Ls} from "@/utils/ls"
export default {
  name: "AsideMenu",
  computed: {
    path() {
      return this.$route.path;
    }
  },
  props: {
    propMenus: Array,
    propCollapse: Boolean
  },
  methods: {
    // 侧边栏切换时，把当前面包屑位置记录到缓存，防止刷新时丢失
    toggleSelect(e) {
      let {authname} = e.$el.dataset
      Ls.set("breadcrumb",authname.split(','))
      this.$emit("selectPath")
    }
  }
};
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>