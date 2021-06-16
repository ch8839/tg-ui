<template>
  <div class="safe-area-conatiner">
      <div>11</div>
      <div>22</div>
      <div>33</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .safe-area-conatiner {
        display: flex;
        justify-content: space-between;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: gainsboro;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        & > div {
            padding: 5px;
            line-height: 50px;
        }
    }
</style>