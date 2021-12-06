const starNotary = artifacts.require('starNotary');

contract('starNotary', accounts => {

    beforeEach(async function () {

        this.contract = await starNotary.new({ from: accounts[0] });
    })

    describe('can create a star', () => {

        it('can create a star and get its name', async function () {
            
            await this.contract.createStar('Shooting Star',1, {from: accounts[0]});
            assert.equal(await this.contract.tokenIdToStarInfo(1), 'Shooting Star')
    })
})

    describe('buying and selling stars', ()=>{

    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 2;
    let starPrice = web3.utils.toWei('0.01', 'ether');

        beforeEach(async function () {
            await this.contract.createStar('Fallen Star',starId, {from:user1})
        })
        describe('user1 can sell a star', () => { 
        it('user1 star for sale', async function(){
            await this.contract.putStarUpForSale(starId,starPrice,{from:user1})
            assert.equal(await this.contract.starsForSale(starId), starPrice)
        })

        it('user1 get money', async function(){
            let starPrice = web3.utils.toWei('0.05', 'ether');
            await this.contract.putStarUpForSale(starId, starPrice, {from:user1})

            let user1Balance = await web3.eth.getBalance(user1)

            await this.contract.buyStar(starId, {from:user2, value:starPrice, gasPrice:0})
            let user1BalanceA = await web3.eth.getBalance(user1)
            let add = parseInt(user1Balance) + parseInt(starPrice)
            assert.equal(add.toString(), user1BalanceA)
        })
        
    })
        describe('user2 buy a star', ()=>{
            beforeEach(async function(){
                await this.contract.putStarUpForSale(starId, starPrice, {from:user1})
            })
    
            it('user2 is rich', async function(){
                await this.contract.buyStar(starId,{from:user2, value:starPrice})
    
                assert.equal(await this.contract.ownerOf(starId), user2)
            })

            it('user2 correctly', async function(){
                let money = web3.utils.toWei('0.05', 'ether')
                let before = await web3.eth.getBalance(user2)
                await this.contract.buyStar(starId, {from:user2 , value:money, gasPrice:0})
                let after = await web3.eth.getBalance(user2)
                let dif = parseInt(before) - parseInt(after)
                assert.equal(dif.toString(), starPrice)
            })
        })
    })

})

// const StarNotary = artifacts.require('StarNotary')

// contract('StarNotary', accounts => { 

//     beforeEach(async function() { 
//         this.contract = await StarNotary.new({from: accounts[0]})
//     })

//     describe('can create a star', () => { 
//         it('can create a star and get its name', async function () { 
//             let tokenId = 1

//             await this.contract.createStar('Awesome Star!', tokenId, {from: accounts[0]})

//             assert.equal(await this.contract.tokenIdToStarInfo(tokenId), 'Awesome Star!')
//         })
//     })

//     describe('buying and selling stars', () => { 

//         let user1 = accounts[1]
//         let user2 = accounts[2]

//         let starId = 1
//         let starPrice = web3.utils.toWei('.01', "ether")

//         beforeEach(async function () {
//             await this.contract.createStar('awesome star', starId, {from: user1})
//         })

//         describe('user1 can sell a star', () => { 
//             it('user1 can put up their star for sale', async function () { 
//                 await this.contract.putStarUpForSale(starId, starPrice, {from: user1})

//                 assert.equal(await this.contract.starsForSale(starId), starPrice)
//             })

//         })

//         describe('user2 can buy a star that was put up for sale', () => { 
//             beforeEach(async function () { 
//                 await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
//             })

//             it('user2 is the owner of the star after they buy it', async function () { 
//                 await this.contract.buyStar(starId, {from: user2, value: starPrice})

//                 assert.equal(await this.contract.ownerOf(starId), user2)
//             })
            
//             it('user2 correctly has their balance changed', async function () { 
//                 let overpaidAmount = web3.utils.toWei('.05', 'ether')

//                 const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2)
//                 await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice:0})
//                 const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2)
//                 console.log(balanceOfUser2BeforeTransaction)
//                 console.log(balanceAfterUser2BuysStar)
//                 assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice)
//             })

//         })
//     })
// })