<template>
    <div class="items-center "> 
        <div class="flex h-14 items-center">
            <img src="https://messari.io/images/Messari_icon_36x36.svg" alt="" />
            <h1 class=" ml-4 font-semibold text-black text-3xl">Messari.io</h1>
        </div>
         <thead class=" h-16 w-full bg-gray-200">
        <tr class="text-left text-gray-600 text-sm">
      
          <th class="w-1/4">Coin</th>
          <th class="w-1/4">Price</th>
        
        </tr>
      </thead>

        <tbody>
    <tr class=" text-left  items-center border-collapse " style="height: 50px ;" v-for="coin in crypto.data " :key="coin">
     
      <td>
        <div style="display: flex;">
          
          <a  class="coin-link font-bold" style="margin-left: 6px; text-transform: uppercase; " href="/">{{coin.symbol}}</a>

        </div>
      </td>
      <td>
        <span>${{ Math.round( coin.metrics.market_data.price_usd * 100 ) / 100}}</span>
      </td>
    </tr>
   
  </tbody>
      
        
      
    </div>
</template>
<script>
import axios from "axios";
import {computed,  ref } from "vue";
export default {
    setup(){
         const coins = ref([]);
            let sliceLimit = 10
    const addLimit = () =>{
      sliceLimit = sliceLimit + 10
    }
         const getCoins = async () => {
      try {
        const res = await axios.get(
          "https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd"
        );
        coins.value = res.data;
      } catch (err) {
        console.log(err);
      }
    };
    getCoins()

        setInterval(() => {
      getCoins();
    }, 3000);

      const crypto = computed(() => {
      return  coins.value;

       
    });

    console.log(crypto)

    return {crypto,addLimit,getCoins}
    }

    
    
}
</script>
<style>
    
</style>

