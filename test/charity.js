const Charity = artifacts.require('Charity')
const CharityFactory = artifacts.require('CharityFactory')

contract('CharityFactory', () => {
    let charityFactory;
    before(async () => {
        charityFactory = await CharityFactory.deployed();
    })

    it('Should create a charity factory', async () => {
        const accounts = await web3.eth.getAccounts();
        await charityFactory.createCharity('ABC', 10000);
        const result = await charityFactory.charityList(accounts[0], 0);
        assert(result !== '')
    })

    it('Should update charityCount when new charity is created', async () => {
        const result = await charityFactory.charityCount();
        assert(result.toNumber() === 1)
    })

    it('Should update the values of Charity contract', async () => {
        const accounts = await web3.eth.getAccounts();
        const charityAddress = await charityFactory.charityList(accounts[0], 0);

        const charity = await Charity.at(charityAddress);
        const name = await charity.name();
        const targetAmount = await charity.targetAmount();
        const owner = await charity.owner();

        assert(name === "ABC" && targetAmount.toNumber() === 10000 && owner === accounts[0])

    })
})