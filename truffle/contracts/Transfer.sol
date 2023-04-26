//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

contract Transfer {
    address payable from;
    address payable to;

    constructor() {
        from = payable(msg.sender);
    }

    event Pay(address _to, address _from, uint amt);

    function pay(address payable _to) public payable returns (bool) {
        to = _to;
        to.transfer(msg.value);
        emit Pay(to, from, msg.value);
        return true;
    }
}
