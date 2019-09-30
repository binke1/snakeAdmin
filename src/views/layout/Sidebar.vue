<template>
  <div class="el_menu_container">
    <el-menu :collapse-transition="true" class="el-menu-vertical-demo" :collapse="!$store.getters.sidebar.opened" mode="vertical" theme="dark" background-color="#fff" :default-active="$route.path" text-color="#464646"
             active-text-color="#fff">
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  }
}
</script>

<style lang="scss">
  .el_menu_container{
    .el-menu-item.is-active{
      background-color: #409EFF !important;
    }
  }
  .menu-indent{
    .el-menu-item.is-active{
      background-color: #409EFF !important;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 260px;
  min-height: 100%;
}
</style>
