const starNotary = artifacts.require("StarNotary");

contract('StarNotary', accounts => {
    let defaultAccount = accounts[0];
    let instantiateContract

    beforeEach(async ()=>{

        instantiateContract = await starNotary.new({from: defaultAccount});
    })

    describe('can create a star', () => {
        it('can create a star and get its name', async () => {
            assert.equal(await instantiateContract.starName(), 'Awesome Udacity Star');
        })

        it('can create a star and claim it', async () => {
            assert.equal(await instantiateContract.starOwner(), 0);
            await instantiateContract.claimStar({from: defaultAccount});
            assert.equal(await instantiateContract.starOwner(), defaultAccount);
        }
    )})

    describe('Star can change owners', () =>{
        beforeEach(async ()=>{
            assert.equal(await instantiateContract.starOwner(), 0);
            await instantiateContract.claimStar({from: defaultAccount});
        })

        it('can change owner', async () => {
            await instantiateContract.claimStar({from: accounts[1]});
            assert.equal(await instantiateContract.starOwner(), accounts[1]);
        })
    })
})