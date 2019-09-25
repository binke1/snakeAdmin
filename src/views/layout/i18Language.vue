<template>
  <div>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{selectLanguage}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item size="mini" :command="item.lcid" :disabled="item.lcid == disabledLanguage" v-for="item in languageList" :key="item.lcid">{{item.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {
    setCookie,
    getCookie
  } from './../../utils/auth'
  import bus from '@/utils/eventBus'
  export default {
    data() {
      const languageList = [
        // {
        //   lcid: 1028,
        //   name: '繁体中文',
        // },
        {
          lcid: 2052,
          name: '简体中文'
        },
        {
          lcid: 1033,
          name: 'English'
        }
      ]
      return {
        languageValue: '', // 用户选择的语言
        languageList: languageList,
        selectLanguage: '简体中文',
        defaultClid: 2052,
        disabledLanguage:''
      }
    },
    created() {
      this.disabledLanguage = Number(getCookie('lcidCode'))
      if (getCookie('lcidCode') === undefined || getCookie('lcidCode') === '') {
        setCookie('lcidCode', this.defaultClid)
      } else {
        if (getCookie('lcidCode') == 2052) {
          // this.$i18n.locale = 'zh'
          this.selectLanguage = '简体中文'
        } else if (getCookie('lcidCode') == 1033) {
          // this.$i18n.locale = 'en'
          this.selectLanguage = 'English'
        }

      }
    },
    methods: {
      handleCommand(command) {
        setCookie('lcidCode', command)
        if (command == 2052) {
          this.selectLanguage = '简体中文'
        } else if (command == 1033) {
          this.selectLanguage = 'English'
        }
        if (getCookie('lcidCode') == 2052) {
          this.$i18n.locale = 'zh'
        } else {
          this.$i18n.locale = 'en'
        }
        this.disabledLanguage = getCookie('lcidCode', command)
      }
    },
    watch:{
      selectLanguage(val,oldVal){
        bus.$emit('i18n',this.$i18n.locale)
      }
    }
  }

</script>
