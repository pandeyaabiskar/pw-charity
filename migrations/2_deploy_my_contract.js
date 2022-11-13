const CharityFactory = artifacts.require("CharityFactory");

module.exports = function (deployer) {
  deployer.deploy(CharityFactory);
};
