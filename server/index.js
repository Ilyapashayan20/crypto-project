const PORT = 3000
const express = require('express')
const socketIO = require('socket.io')
const https  = require('https')
const { log } = require('console')
const server = express().listen(PORT,()=>{
console.log(`Listening to ${PORT}`);
})
const io = socketIO(server)
io.on('connection',(socket)=>{
    console.log('cLIENT cONNECTED');
    socket.emit('crypto','message hello crypto')
    socket.on('disconnect',()=>{
        console.log('claint disconnected');
    });
})
const options ={
    hostname: 'api.coingecko.com',
    port: 443,
    path: '/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    method: 'GET'
}
setInterval(()=>{
    https.request(options, (res)=>{
        let str = ''
        res.on('data', (chunk)=>(str += chunk))
        res.on('end',()=>{
           const prices = JSON.parse(str).map((item)=>{
            return{
                id: item.id,
                name: item.symbol,
                price: item.current_price,
                image: item.image,
                rank: item.market_cap_rank,
                high_24h: item.high_24h,
                low_24h: item.low_24h
            }
           })
           console.log(prices);
            io.emit('crypto', prices)
        })
    }).end()
},5000)

