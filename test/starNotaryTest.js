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
})})