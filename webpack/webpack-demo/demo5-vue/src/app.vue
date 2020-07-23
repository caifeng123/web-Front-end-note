<!--
 * @Author: cc123nice
 * @Date: 2020-07-23 16:37:36
 * @LastEditTime: 2020-07-23 17:24:46
 * @Description: my progamme description
 * @FilePath: \webpack\demo5-vue\src\app.vue
--> 
<template>
  <div class="contain">
    hello vue111111111111111
    <div class="first">{{first}}</div>
    <div class="second" v-html="second"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first: "哈哈",
      second: "<div>nono</div>",
    };
  },
};
</script>

<style lang="less">
  .contain{
    font-size: 20px;
    .first{
      color: red;
    }
    .second{
      color: brown;
    }
  }
</style>