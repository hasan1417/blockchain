const ERC721Token = artifacts.require('ERC721Token');

contract('ERC721Token', accounts=>{
    var defaultAccount = accounts[0];
    var user1 = accounts[1];
    var user2 = accounts[2];
    var operator = accounts[3];

    beforeEach(async function(){
        this.contract = await ERC721Token.new({from: defaultAccount});
    })

    describe("can create a token", ()=>{

        let tokenId = 1;
        let tx;

        beforeEach(async function(){
            tx = await this.contract.mint(tokenId, {from: user1});
        })
        it("should return the token owner", async function(){
            let owner = await this.contract.ownerOf(tokenId);
            assert.equal(owner, user1);
        })

        it('balanceOf user1 is incremented by 1', async function(){
            let balance = await this.contract.balanceOf(user1);
            assert.equal(balance.toNumber(), 1);
        })

        it('emotsthe correct event during creation of a new token', async function(){   
            assert.equal(tx.logs[0].event, 'Transfer');
        })
    })

    
    describe('can transfer token', () => { 
        let tokenId = 1
        let tx 

        beforeEach(async function () { 
            await this.contract.mint(tokenId, {from: user1})

            tx = await this.contract.transferFrom(user1, user2, tokenId, {from: user1})
        })

        it('token has new owner', async function () { 
            assert.equal(await this.contract.ownerOf(tokenId), user2)
        })

        it('emits the correct event', async function () { 
            assert.equal(tx.logs[0].event, 'Transfer')
            assert.equal(tx.logs[0].args._tokenId, tokenId)
            assert.equal(tx.logs[0].args._to, user2)
            assert.equal(tx.logs[0].args._from, user1)
        })

    })
}); 