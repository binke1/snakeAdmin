<template>
  <div class="currency_change">
    <el-dropdown trigger="click" @command="currency_change">
      <span class="el-dropdown-link">
        {{currencyShow}}&nbsp;{{currency_nameShow}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item size="mini" :command="item.currency" :disabled="item.currency == disabledMoney" v-for="item in get_Currencys" :key="item.currency">{{item.currency}} {{item.currency_name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {
    setCookie,
    getCookie,
    delCookie
  } from '@/utils/auth'
  import bus from '@/utils/eventBus'
  var _this = {}

  export default {
    data() {
      return {
        get_Currencys: 1,
        currencyShow: 'C$',
        currency_nameShow: '加币',
        homeCurrencyRate: '',
        disabledMoney: 'C$'
      }
    },

    mounted() {
      _this = this
      if (!unescape(unescape(getCookie('currency_rate')))){
        setCookie('currency', escape('C$'))
        setCookie('currency_name', escape('加币'))
        setCookie('currency_rate',escape(1))//存储汇率
        bus.$emit('changeCurrency',true)
      } else {
        this.currencyShow = unescape(unescape(getCookie('currency')))
        this.disabledMoney = this.currencyShow
        this.currency_nameShow = unescape(unescape(getCookie('currency_name')))
      }
      // 保险API
      this.insuranceRateCurrencyApi('CAD/CNY')
    },
    methods: {
      currency_change(currency) {
        let currency_name = ''
        this.disabledMoney = currency
        this.get_Currencys.map(item => {
          if (item.currency === currency) {
            currency_name = item.currency_name
          }
        })
      },

      insuranceRateCurrencyApi(moneyRate){
      },
    }
  }

</script>

<style>
  .currency_change{
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
</style>
