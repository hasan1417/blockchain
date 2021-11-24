import web3 from 'web3';
import web3modal from 'web3modal';
import { Transaction } from '@ethereumjs/tx'
import WalletConnectProvider from "@walletconnect/web3-provider";

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider, // required
//     options: {
//       infuraId: "0f3d9f30356e48c7b048c0b6a6c8ceae" // required
//     }
//   }
// };

// const provider = await web3Modal.connect();

// console.log(provider)
// // Subscribe to accounts change
// provider.on("accountsChanged", () => {
//     console.log(accounts);
//   });
  
//   // Subscribe to chainId change
//   provider.on("chainChanged", (chainId) => {
//     console.log(chainId);
//   });
  
//   // Subscribe to provider connection
//   provider.on("connect", (info) => {
//     console.log(info);
//   });
  
//   // Subscribe to provider disconnection
//   provider.on("disconnect", (error) => {
//     console.log(error);
//   });

// // Instantiate and set Ganache as your provider
// web3 = new Web3(new Web3.providers.HttpProvider("https://rinkseby.infura.io/v3/0f3d9f30356e48c7b048c0b6a6c8ceae"));
// // The default (top) wallet account from a list of test accounts 
// web3.eth.defaultAccount = web3.eth.accounts[0];
// // The interface definition for your smart contract (the ABI) 
// var starNotary = new web3.eth.Contract(
//     [
//         {
//             "inputs": [],
//             "stateMutability": "nonpayable",
//             "type": "constructor"
//         },
//         {
//             "inputs": [],
//             "name": "starName",
//             "outputs": [
//                 {
//                     "internalType": "string",
//                     "name": "",
//                     "type": "string"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function",
//             "constant": true
//         },
//         {
//             "inputs": [],
//             "name": "starOwner",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function",
//             "constant": true
//         },
//         {
//             "inputs": [],
//             "name": "claimStar",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         }
//     ], '0x444C514e0AE9dA12Db399A2d30124ADbB96f8EC4'
// );
// // Grab the contract at specified deployed address with the interface defined by the ABI
// // console.log(starNotary)
// // Get and display star name
// // console.log(starNotary.methods.starName().call((err,result)=> console.log(result)))
// // Get and display star owner
// // starNotary.starOwner(function (error, result) {
// //     if (!error) {
// //         document.getElementById('star-owner').innerText = result
// //     } else {
// //         console.log(error);
// //     }
// // });
// // // Enable claim button being clicked
// // function claimButtonClicked() {
// //     starNotary.claimStar(function (error, result) {
// //         if (!error) {
// //             location.reload();
// //         } else {
// //             console.log(error);
// //         }
// //     });
// // }
// const claimButtonClicked = () => {
//     //         var datalol = starNotary.methods.claimStar().call()
//     //         var pr = new Buffer('238ac0d1df6546ace3f62cfc8022caf1305d28bd7a474b67f085f4eedb9ff2d0','hex')
//     //         var transaction = web3.eth.signTransaction({
//     //     from: "0x20f2E66DA9315D447b22059F154ed1E016d41369",
//     //     gasPrice: "20000000000",
//     //     gas: "21000",
//     //     to: '0x9b1B39881355869821f83096eB1a2B9B4DF15286',
//     //     value: "0",
//     //     data: ""
//     // },pr).then(console.log);
//     // console.log(transaction)
// }
