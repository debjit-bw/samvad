// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract SamvadCC {
    // ccip
    LinkTokenInterface link;
    IRouterClient router;
    uint64 destinationChainSelector;
    address samvad;

    // balances
    IERC20 public payCoin;
    address payCoinAddress;

    event SentPaycoins(bytes32 messageId, uint256 amount);
    event SentPost(bytes32 messageId, string url, string text, string heading);
    event SentReply(
        bytes32 messageId,
        address user,
        uint256 post,
        uint256 parent,
        string text,
        bool top_level,
        uint256 amount
    );
    event RequestedWithdrawl(bytes32 messageId, uint256 amount);

    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees);

    constructor(
        address _link,
        address _router,
        address _payCoinAddress,
        address _samvad,
        uint64 _destinationChainSelector
    ) {
        payCoin = IERC20(_payCoinAddress);
        payCoinAddress = _payCoinAddress;
        router = IRouterClient(_router);
        link = LinkTokenInterface(_link);
        // link.approve(_router, type(uint256).max);
        samvad = _samvad;
        destinationChainSelector = _destinationChainSelector;
    }

    // function _sendData(
    //     bytes memory _data
    // )

    function sendPaycoins(uint256 _amount) public returns (bytes32 messageId) {
        bytes memory _data = abi.encodePacked(
            msg.sender,
            uint8(0),
            "",
            "",
            "",
            uint256(0),
            uint256(0),
            false,
            _amount
        );

        Client.EVMTokenAmount[]
            memory tokenAmounts = new Client.EVMTokenAmount[](1);
        Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount({
            token: address(payCoin),
            amount: _amount
        });
        tokenAmounts[0] = tokenAmount;

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(samvad),
            data: _data,
            tokenAmounts: tokenAmounts,
            feeToken: address(link),
            extraArgs: abi.encode(
                Client.EVMExtraArgsV1({gasLimit: 4000000, strict: false})
            )
        });

        uint256 fees = router.getFee(destinationChainSelector, message);

        if (fees > link.balanceOf(address(this)))
            revert NotEnoughBalance(link.balanceOf(address(this)), fees);

        // Approve Router to spend CCIP-BnM tokens we send
        payCoin.approve(address(router), _amount);

        // Send CCIP Message
        messageId = router.ccipSend(destinationChainSelector, message);

        emit SentPaycoins(messageId, _amount);
    }

    function createPost(
        string memory url,
        string memory text,
        string memory heading
    ) public returns (bytes32 messageId) {
        // create a post on samvad
        bytes memory _data = abi.encodePacked(
            msg.sender,
            uint8(0),
            url,
            text,
            heading,
            uint256(0),
            uint256(0),
            false,
            uint256(0)
        );

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(samvad),
            data: _data,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            feeToken: address(link),
            extraArgs: abi.encode(
                Client.EVMExtraArgsV1({gasLimit: 4000000, strict: false})
            )
        });

        uint256 fees = router.getFee(destinationChainSelector, message);

        if (fees > link.balanceOf(address(this)))
            revert NotEnoughBalance(link.balanceOf(address(this)), fees);

        // Send CCIP Message
        messageId = router.ccipSend(destinationChainSelector, message);

        emit SentPost(messageId, url, text, heading);
    }

    function createReply(
        address user,
        uint256 post,
        uint256 parent,
        string memory text,
        bool top_level,
        uint256 amount
    ) public returns (bytes32 messageId) {
        // create a post on samvad
        bytes memory _data = abi.encodePacked(
            user,
            uint8(1),
            "",
            text,
            "",
            post,
            parent,
            top_level,
            amount
        );

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(samvad),
            data: _data,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            feeToken: address(link),
            extraArgs: abi.encode(
                Client.EVMExtraArgsV1({gasLimit: 4000000, strict: false})
            )
        });

        uint256 fees = router.getFee(destinationChainSelector, message);

        if (fees > link.balanceOf(address(this)))
            revert NotEnoughBalance(link.balanceOf(address(this)), fees);

        // Send CCIP Message
        messageId = router.ccipSend(destinationChainSelector, message);

        emit SentReply(messageId, user, post, parent, text, top_level, amount);
    }

    function requestWithdrawl(uint256 amount) public returns (bytes32 messageId) {
        // request withdrawl of paycoins from primary chain
        bytes memory _data = abi.encodePacked(
            msg.sender,
            uint8(2),
            "",
            "",
            "",
            uint256(0),
            uint256(0),
            false,
            amount
        );

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(samvad),
            data: _data,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            feeToken: address(link),
            extraArgs: abi.encode(
                Client.EVMExtraArgsV1({gasLimit: 4000000, strict: false})
            )
        });

        uint256 fees = router.getFee(destinationChainSelector, message);

        if (fees > link.balanceOf(address(this)))
            revert NotEnoughBalance(link.balanceOf(address(this)), fees);

        // Send CCIP Message
        messageId = router.ccipSend(destinationChainSelector, message);
        
        emit RequestedWithdrawl(messageId, amount);
    }
}