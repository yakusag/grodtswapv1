// @@@ RealTime Event Plugins
/*
description : Uniswap MATIC GRODT Swaps
topic : Swap(address,uint256,uint256,uint256,uint256,address)
ABI: {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount0In",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount1In",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount0Out",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount1Out",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    }
  ],
  "name": "Swap",
  "type": "event"
}
address : 0xdc27caf8d17cc36bbcce63e0e7e33625c3f599fa
tableName : MaticGrodtSwaps
https://polygonscan.com/address/0xdc27caf8d17cc36bbcce63e0e7e33625c3f599fa#events
*/

// @@@ Paste this code into the Moralis Cloud Functions section on the server @@@
Moralis.Cloud.afterSave("MaticGrodtSwaps", async function (request) {
    // sum the total volume in the last hour
    const query = new Moralis.Query("MaticGrodtSwaps");
    const end = new Date();
    const start = new Date(end.valueOf() - 3600000); // 1 hour ago
    const pipeline = [
      {match: {block_timestamp: {\$gt: start}}},
      // convert text values into numbers so they can be summed
      {addFields:{
        nAmount0In: {\$toDouble: "\$amount0In"},
        nAmount1In: {\$toDouble: "\$amount1In"},
        nAmount0Out: {\$toDouble: "\$amount0Out"},
        nAmount1Out: {\$toDouble: "\$amount1Out"},
      }},
      {
        group: {
          objectId: null,
          totalAmount0In: {\$sum: "\$nAmount0In"},
          totalAmount1In: {\$sum: "\$nAmount1In"},
          totalAmount0Out: {\$sum: "\$nAmount0Out"},
          totalAmount1Out: {\$sum: "\$nAmount1Out"},
        }
      },


      //..

// Search for a token functionality
function filterFunction() {
  //...
}

// Select token functionality
function selectToken(address) {
  // Get token
  trade[selection] = tokens[address];

  // Render selected token on the interface
  renderInterface();
}

// Render selected token on the interface
function renderInterface() {
  // Render selected token on the interface
  if (trade.from) {
    document.getElementById("from-token-img").src = trade.from.logoURI;
    document.getElementById("from-token-text").innerHTML = trade.from.symbol;
    document.getElementById("token-default-img").style.display = "none";
  }

  // Render selected token on the interface
  if (trade.to) {
    document.getElementById("to-token-img").src = trade.to.logoURI;
    document.getElementById("to-token-text").innerHTML = trade.to.symbol;
    document.getElementById("select-token-text").innerHTML = "";
  }
}

// Select side
document.getElementById("from-token-selected").onclick = () => {
  selection = "from";
};
document.getElementById("to-token-selected").onclick = () => {
  selection = "to";
};

//...


      // convert matic into Wmatic
      {project: {
        dTotalAmount0In: {\$divide: ["\$totalAmount0In", 1e18]},
        dTotalAmount1In: {\$divide: ["\$totalAmount1In", 1e18]},
        dTotalAmount0Out: {\$divide: ["\$totalAmount0Out", 1e18]},
        dTotalAmount1Out: {\$divide: ["\$totalAmount1Out", 1e18]},
      }},
    ];
    const results = await query.aggregate(pipeline, {useMasterKey: true});
    const data = results[0];
  
    // save results to separate collection
    const MaticGrodtSwapVolume60 = Moralis.Object.extend("MaticGrodtSwapVolume60");
    const vol = new DaiWethSwapVolume60();
    vol.set("date_time", end);
    vol.set("amount0In", data.dTotalAmount0In);
    vol.set("amount1In", data.dTotalAmount1In);
    vol.set("amount0Out", data.dTotalAmount0Out);
    vol.set("amount1Out", data.dTotalAmount1Out);
    
    return vol.save();
  
    // lastAverageUpdate = end;
  
  });