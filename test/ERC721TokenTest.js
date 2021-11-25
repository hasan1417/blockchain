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

        it('ONly permissoned users can transfer token', async function(){
            let stealer = accounts[4]
            await expectThrow(this.contract.transferFrom(user1, stealer, tokenId, {from:stealer}))
        })
    })

    describe('approve token', ()=>{
        let tokenId = 1;
        let tx;

        beforeEach(async function(){
            await this.contract.mint(tokenId, {from: user1});
            tx = await this.contract.approve(user2, tokenId, {from: user1});
        })

        it('approve', async function (){
            assert.equal(await this.contract.getApproved(tokenId), user2);
        })
        
        it('Transform', async function(){
            await this.contract.transferFrom(user1, operator, tokenId, {from: user2})
            assert.equal(await this.contract.ownerOf(tokenId), operator)
        })

        it('emits the correct event', async function(){
            assert.equal(tx.logs[0].event, 'Approval');
            assert.equal(tx.logs[0].args._owner, user1);
            assert.equal(tx.logs[0].args._approved, user2);
            assert.equal(tx.logs[0].args._tokenId, tokenId);
        })
    })

    describe('set an operator', ()=>{
        let tokenId = 1;

        let tx;

        beforeEach(async function(){
            await this.contract.mint(tokenId, {from:user1})

            await this.contract.setApprovalForAll(operator, true, {from:user1})
        })

        it('operator to set and approval', async function(){
            // await this.contract.transferFrom(user1, user2, tokenId, {from:operator})
            assert.equal(await this.contract.isApprovedForAll(user1, operator), true)
        })
    })

}); 

var expectThrow = async function (promise){
    try {
        await promise
    }
    catch(error) {
        assert.exists(error)
        return
    }
    assert.fail('Expected an error but didnot see one')
}

