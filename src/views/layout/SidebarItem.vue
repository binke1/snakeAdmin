<template>
  <div class="slider_item_container">
    <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
      <!--<el-radio-button :label="false">展开</el-radio-button>-->
      <!--<el-radio-button :label="true">收起</el-radio-button>-->
    <!--</el-radio-group>-->
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :class="item.className?item.className:''" :index="item.path+'/'+item.children[0].path">
          <!--<icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}-->
          <i v-if="item.icon" :class="'iconfont ' + item.icon"></i>
          <span v-else class="user_place"></span>
          <span v-show="$store.getters.sidebar.opened">{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu :class="$store.getters.sidebar.opened?'':'shrink'" :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <!-- 大标题-->
          <i v-if="item.icon" :class="'iconfont ' + item.icon"></i>
          <span v-else-if="item.className" class="change-padding"></span>
          <span v-else class="user_place"></span>
          <span v-show="($store.getters.sidebar.opened && item.icon) || !item.icon" slot="title">{{showTitle(item)}}</span>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <span v-if="child.smallSpace" class="small-title-space"></span>
              <!-- 小标题 -->
              {{showTitle(child)}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  data(){
    return {
      isCollapse: true
    }
  }
}
</script>

<style lang="scss">
  .slider_item_container{
    .el-menu-item{
      padding-left: 53px !important;
    }
    .el-menu-item.first_item{
      padding-left: 20px!important;
    }
    i.iconfont~.el-submenu__icon-arrow.el-icon-arrow-right{
      display: none;
    }
    .shrink.is-active>div{
      background-color: rgb(204,204,204) !important;
    }
  }
  .change-padding{
    display: inline-block;
    margin-left: -11px;
  }
  .small-title-space{
    display: inline-block;
    width: 15px!important;
  }
  .el-menu-item{
    padding-left: 33px !important;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .user_place{
    width: 8px;
    display: inline-block;
  }
.svg-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent{
  display: block;
  text-indent: 10px;
}
  i{
    margin-right: 10px;
    font-size: 16px;
    color: #464646;
    display: inline-block;
    width: 20px;
    text-align: center;
  }
  .iconchanpinyuyue,.icongongyingshang{
    font-size: 15px;
  }
  .iconyibiaopan-copy,.iconpingtaishouquan{
    font-size: 18px;
  }
  .icongongjuxiang{
    font-size: 20px;
  }
  .icondaoyou{
    font-size: 22px;
  }
  .icontongji1,.iconcaozuorizhi,.iconneirongguanli,.iconweibiaoti106,.iconjiudian,.iconyonghuguanli,.icontianchongxing-{
    font-size: 17px;
  }
</style>

