<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(tables, index) in paramInfo.sizes" :key="index" class="info-size">
      <tr v-for="(tr, indey) in tables" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>

    <table>
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
<!--        {{info}}-->
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type:Object,
      default() {
        return {}
      }
    }
  },
}
</script>

<style scoped>

</style>
