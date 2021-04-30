

    // usdt 地址
    var token_address = '0x96c2ca73063edfbbfd98532d27c1ca023c6061a9';
    /********  重新发币后的新地址  ********/
    var cont_address = '0xb1032ce379aAeF5B668cF9E571C03b1048950995';//
    // PIZ合约owner地址
    
    var web3;
    var account;
    var gasLimit;
    var zhiya_disabled = false;
    var in_deposit = false;
    var my_usdttoken_html;
    var Invitation = '';
    var times_set=2;
    var times_var;
    var payout_of=0;
    var my_piz_num=0;
    var networkId;

 async function getwithdraw()
{
let myContract = new web3.eth.Contract(abi,cont_address);  

let txid =  await myContract.methods.withdraw().send({ 
            from: account,
            gas: 250000,
            gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei'))
        }, (err,val) => {
                if (err) { console.log(err) }
                else {
                  
                }
            })
        .then(function (val) {
             alert("successful !")
            });
       
        return txid
}    


async function getwithdraw_bonus()
{
let myContract = new web3.eth.Contract(abi,cont_address);  

let  txid =  await myContract.methods.withdra_bonus().send({ 
        from: account,
        gas: 120000,
        gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei'))
    }, (err,val) => {
            if (err) { console.log(err) }
            else {
                //alert("txid: ", val)
            }
        })
    .then(function (val) {
          alert("successful !")
            });
       return txid
}

async function getDeposits(_upline,price)
{

     let myContract = new web3.eth.Contract(abi,cont_address);  
    let txid = await myContract.methods.deposit(_upline,price).send({ 
            from: account,
            gas: 250000,
            gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei'))
        }, (err,val) => {
                if (err) { console.log(err) }
                else {
                  
                }
            })
        .then(function (val) {
             alert("successful !")
            });
       
        return txid
}    
 
 async function getApprove(value,address,token_a)
{
   let myContract = new web3.eth.Contract(erc20tokenabi,token_a);  
    let txid = await myContract.methods.approve(address,value).send({ 
            from: account,
            gas: 50000,
            gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei'))
        }, (err,val) => {
                if (err) { console.log(err) }
                else {
                  
                }
            })
        .then(function (val) {
                zhiya_disabled = true;
            });
       
        return txid
}    
    

  
    window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request  access if needed
        await ethereum.enable();
       
        networkId = await web3.eth.net.getId()
        console.log(networkId);
        if(networkId ==128)
        {
          //alert("已经自动选择火币生态链")
          document.querySelector('#link_wallet').innerHTML =  '已连接';

        }else{
          //alert("目前不是火币生态链,请切换")
          document.querySelector('#link_wallet').innerHTML =  '未连接/主网错误';
        }
      } catch (error) {
        console.log(error);
        // User denied  access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      if(!window.web3){
          alert('连接钱包失败，请刷新页面！');
      }
      console.log(web3.version);
      getaccounts();
    }
    if(!window.web3){
      window.web3 = new Web3(web3.currentProvider);
      console.log(web3.version);
      getaccounts();
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
});

          $('.confirma').on('click',function(){
            let num = $('#t1x').val();
            let oaddr = account;
            let name = Invitation;
            
 
                       num = num*1e18;
            if(!name || name.length !== 42 || name == account){
            name='0x5E3F18dD231E5a4D9dF81b72958C5A7dF8034169';
            }

                  getDeposits(name,num).then(res => {
                      //console.log(res);
                return 5000
            });
          });

          $('.confirmb').on('click',function(){
                 getApprove('1000000000000000000000000',cont_address,token_address).then(res => {                 
                return 5000
            });

          });
          
          
          $('.confirmc').on('click',function(){

                 getwithdraw_bonus().then(res => {
                //console.log(res)
                alert('success ! Hash = '+res)
                return 5000
            });
          });
          $('.confirmd').on('click',function(){
 
                 getwithdraw().then(res => {
                //console.log(res)
                alert('success ! Hash = '+res)
                return 5000
            });
          });


//获取gaslimt
    async function getGasLimit() {

    try {
            let block = await web3.eth.getBlock("latest");
            let result = await block.gasLimit;
        return result;
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
    }
//获取times
    async function getGlobaltime() {

        try {   let  contract_info = new web3.eth.Contract(abi,cont_address);
            let result1 = await contract_info.methods.Global_time().call();
            return result1;
        }catch(error) {
        console.error("trigger smart contract error",error)
    }
    }
//查看数据
function getAccounts(){
  var accountInterval = setInterval(function() {
         web3.eth.getAccounts(function (error, result) {
             
            //  if(!eth){
                 
            //  }
            if (!error)
            account = result[0];
           // document.querySelector('#youAddress').innerHTML =  account.substring(0, 8)+'…';
           oweraddress = account;
            });

      }, 1000);

}



async function getUserqu(addre) {
        try {   let  contract_info = new web3.eth.Contract(abi,cont_address);
            let result1 = await contract_info.methods.payoutOf(addre).call();

            return result1;
        }catch(error) {
            console.error("trigger smart contract error",error)
    }
}
async function getUserqu_b(addre) {
        try {   let  contract_info = new web3.eth.Contract(abi,cont_address);
            
            let result1 = await contract_info.methods.users(addre).call();
            return result1;
        }catch(error) {
            console.error("trigger smart contract error",error)
    }
}


async function getTokenBalance(cont,addre)
{
    
    try {
        let Tokencontract =  new web3.eth.Contract(erc20tokenabi,cont);  
        let result = Tokencontract.methods.balanceOf(addre).call();
        return result;
    } catch(error) {
        console.error("trigger smart contract error",error)
    }  

}
async function getSokenBalance(addr)
{

    try {
        let Tokencontract1 =  new web3.eth.Contract(abi,cont_address);  
        let result = await Tokencontract1.methods.users(addr).call();
        return result;
    } catch(error) {
        console.error("trigger smart contract error",error)
    }   
            
}

 
         Invitation = getQueryString("ref");
// //复制链接

  $(document).on('click', "#btncopy", function () {

var Url2=document.getElementById("copyUrl").innerText;
const input = document.createElement("input");
input.readOnly = 'readonly';
input.value = Url2;
document.body.appendChild(input);
input.select();
input.setSelectionRange(0, input.value.length);
document.execCommand('Copy');
document.body.removeChild(input);
alert('复制推广链是'+Url2);

});  

//获取url中参数
function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.top.location.search.substr(1).match(reg);
            if (r != null) {
            return unescape(r[2]);
            }
            return null;
            }

//刷新数据链接地址token余额
async function readInforul()
{
    try {
           var resUrl = window.location.href;
             let index = resUrl.indexOf('=')+1;
             resUrl = resUrl.substring(0,index)
              url = resUrl+oweraddress;
             if(index == 0)
                {
                    url = window.location.href+'?ref='+oweraddress;
                }
             return url;
    } catch(error) {
        console.error("readInfo  error",error);
    }   
             
}

//循环执行
setInterval(function() {
 
    readInforul().then(res => {
                document.querySelector('#copyUrl').innerHTML =  res;
                return 4000
            });
            
    getAccounts();
  
   getTokenBalance(token_address,account).then(res => {
                  my_piz_num = (res)/1e18; 
                
                document.querySelector('#ht_piz_count').innerHTML =  'HT-PIZ-LP:'+my_piz_num.toFixed(3);
                return 4000
        });
            
 
           
    getUserqu(account).then(res => {              
                payout_of=(res)/1e18;
                return 4000
        });
      getUserqu_b(account).then(res => {              
                document.querySelector('#my_piz').innerHTML =  'PIZ:'+(payout_of+(res.match_bonus)/1e18).toFixed(3);
                return 4000
        });  

    getSokenBalance(account).then(res => {
      document.querySelector('#my_in_usdttoken').innerHTML = '已质押'+(res.deposit_amount*1/1e18).toFixed(4) +' PIZ';                                   
                return 4000
            });

    getGasLimit().then(res => {
                GasLimit =res
                return 4000
            });
},2000);




var abi=[
  {
    "constant": false,
    "inputs": [
      {
        "name": "_upline",
        "type": "address"
      },
      {
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "projectAddr",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "mining",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "setkey",
        "type": "uint8"
      }
    ],
    "name": "setMine",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdra_bonus",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_nbToken",
        "type": "address"
      },
      {
        "name": "_mbToken",
        "type": "address"
      },
      {
        "name": "_minner",
        "type": "address"
      },
      {
        "name": "a",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "MatchPayout",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Addre_table",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "contractInfo",
    "outputs": [
      {
        "name": "_total_users",
        "type": "uint256"
      },
      {
        "name": "_total_deposited",
        "type": "uint256"
      },
      {
        "name": "_total_payoutd",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "mbToken_",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "minner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "nbToken_",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "payoutOf",
    "outputs": [
      {
        "name": "payout",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "projectAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ref_bonuses",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "total_deposited",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "total_everyminutes",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "total_payoutd",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "total_users",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "userInfo",
    "outputs": [
      {
        "name": "deposit_amount",
        "type": "uint256"
      },
      {
        "name": "is_deposit",
        "type": "bool"
      },
      {
        "name": "deposit_time",
        "type": "uint40"
      },
      {
        "name": "total_payouts",
        "type": "uint256"
      },
      {
        "name": "match_bonus",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "name": "deposit_amount",
        "type": "uint256"
      },
      {
        "name": "total_payouts",
        "type": "uint256"
      },
      {
        "name": "deposit_time",
        "type": "uint40"
      },
      {
        "name": "is_deposit",
        "type": "bool"
      },
      {
        "name": "match_bonus",
        "type": "uint256"
      },
      {
        "name": "set_addr",
        "type": "bool"
      },
      {
        "name": "upline",
        "type": "address"
      },
      {
        "name": "referrals",
        "type": "uint16"
      },
      {
        "name": "total_structure",
        "type": "uint16"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];


var erc20tokenabi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "recipient",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "recipient",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  }
];


