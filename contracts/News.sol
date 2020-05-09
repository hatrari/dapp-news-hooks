pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract News {
  struct Info {
    uint id;
    address owner;
    string date;
    string content;
    uint likes;
  }
  
  Info[] _infos;
  
  function create(string memory content, string memory date) public {
    uint id = _infos.length;
    _infos.push(Info(id, msg.sender, date, content, 0));
  }

  function like(uint id) public {
    Info storage info = _infos[id];
    info.likes++;
  }

  function news() public view returns(Info[] memory) {
    return _infos;
  }
}