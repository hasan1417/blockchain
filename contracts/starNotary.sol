pragma solidity ^0.8.10;

import './ERC721Token.sol';

contract StarNotary is ERC721Token { 

    struct Star{
        string name;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo;

    function createStar(string memory _name, uint256 _tokenId) public{
        Star memory newStar = Star(_name);

        tokenIdToStarInfo[_tokenId] = newStar;

        ERC721Token.mint(_tokenId);
        
    }

}