<template>
<div class="">
 <div class=" flex items-center ">
    <img class="w-52 cursor-pointer" src="https://static.coingecko.com/s/coingecko-logo-63f24b60e1d2d526c141fee733ad2a39fbce7dabedd187a0dba95220396ce9a0.png" alt=""> 
    </div>

     

    <div class="serach-result" ></div>

 <thead class=" w-full h-16 bg-gray-200">
        <tr class="text-left text-gray-600 text-sm">
          <th class=" w-1/4 p-4">Rank</th>
          <th class="w-1/4">Coin</th>
          <th class="w-1/4">Price</th>
        
        </tr>
      </thead>
  <tbody>
    <tr class=" text-left  items-center border-collapse " style="height: 50px ;" v-for="coin in crypto" :key="coin">
      <td class="p-4">{{ coin.market_cap_rank }}</td>
      <td>
        <div style="display: flex;">
          <img class=" w-5 h-5" :src="coin.image" >
          <a  class="coin-link font-bold" style="margin-left: 6px; text-transform: uppercase; " href="/">{{coin.symbol}}</a>

        </div>
      </td>
      <td>
        <span>${{coin.current_price}}</span>
      </td>
    </tr>
    <button  @click="addLimit()" class=" mt-2 border-emerald-400 rounded bg-slate-400 px-2 py-1 mb-2"> More Coins</button>
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
      // if(sliceLimit === 110){
      //   sliceLimit = 10
      // }

    }
    const getCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        coins.value = res.data;
      } catch (err) {
        console.log(err);
      }
    };
    getCoins()

        setInterval(() => {
      getCoins();
    }, 1000);

    //   const matchingNames = computed(() => {
    //   return coins.value.filter((name) => name.id.includes(search.value));
    // });

     const crypto = computed(() => {
      return  coins.value.slice(0, sliceLimit);
    });
    

    return {crypto,addLimit}
  }
  


}
</script>
<style>

.coin-block{
  display: flex;
  width: 100%;


  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.coin-block h1{
  font-size: 16px;
  color: black;
}
.coin-img{
  width: 50px;
  border-radius: 50%;
}
.coin-link{
  color:black;
  width: 3rem;
  text-decoration: none;
}
  
</style>