pragma solidity ^0.8.9;

contract StarNotary { 

    string public starName; 
    address public starOwner;

    constructor() public { 
        starName = "Awesome Udacity Star";
    }

    function claimStar() public { 
        starOwner = msg.sender;
    }
}