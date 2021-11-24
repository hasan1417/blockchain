var myToken = artifacts.require("./contracts/starNotary.sol");
module.exports = function(deployer) {
deployer.deploy(myToken);
}; 