<template >
  <div class="flex w-full">
    <CoinGeckoVue />
    <MessariApi />
    
  </div>
</template>
<script>
import CoinGeckoVue from '@/components/CoinGecko.vue'
import MessariApi from '@/components/MessariApi.vue'
export default {
  components:{CoinGeckoVue,MessariApi}
}
</script>
<style lang="">
  
</style>