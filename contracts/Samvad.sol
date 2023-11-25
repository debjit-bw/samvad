// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract Samvad {
    // counters
    uint256 post_counter;
    uint256 reply_counter;

    // ccip
    IERC20 public payCoin;
    address payCoinAddress;

    struct Post {
        // identifiers
        address account;
        uint256 id;
        // contents
        string url;
        string text;
        string heading;
        // graph
        uint256[] replies;
    }

    struct Reply {
        // identifiers
        address account;
        uint256 id;
        // contents
        string text;
        // graph
        uint256 post;
        uint256 parent;
        uint256[] replies;
    }

    event PostCreated(
        address account,
        uint256 id,
        string url,
        string text,
        string heading
    );
    event ReplyCreated(
        address account,
        uint256 id,
        string text,
        uint256 parent
    );
    event PostEdited(address account, uint256 id, string additional_text);
    event ReplyEdited(address account, uint256 id, string additional_text);

        address _payCoinAddress
        payCoin = IERC20(_payCoinAddress);
        payCoinAddress = _payCoinAddress;
        post_counter = 0;
        reply_counter = 0;
        link = _link;
        router = _router;
        LinkTokenInterface(link).approve(router, type(uint256).max);
    }

    mapping(uint256 => Post) public posts;
    mapping(uint256 => Reply) public replies;

    // internal create functions

    function _internal_createPost(
        string memory url,
        string memory text,
        string memory heading
    ) private {
        post_counter++;
        posts[post_counter] = Post(
            msg.sender,
            post_counter,
            url,
            text,
            heading,
            new uint256[](0)
        );
        emit PostCreated(msg.sender, post_counter, url, text, heading);
    }

    function _internal_createReply(
        uint256 post,
        uint256 parent,
        string memory text,
        bool post_reply
    ) private {
        // check if post_reply is true then the post actually exists
        if (post_reply) {
            require(parent <= post_counter, "Post does not exist.");
        } else {
            require(parent <= reply_counter, "Reply does not exist.");
        }
        reply_counter++;
        replies[reply_counter] = Reply(
            msg.sender,
            reply_counter,
            text,
            post,
            parent,
            new uint256[](0)
        );
        posts[parent].replies.push(reply_counter);
        emit ReplyCreated(msg.sender, reply_counter, text, parent);
    }

    // external (eth) create functions

    function createPost(
        string memory url,
        string memory text,
        string memory heading
    ) public {
        _internal_createPost(url, text, heading);
    }

    function createReply(
        uint256 post,
        uint256 parent,
        string memory text
    ) public {
        _internal_createReply(post, parent, text, true);
    }

    // external (ccip - link) create functions

    // edit functions

    function add_paycoins(uint256 amount) public {
        payCoin.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
    }

    function withdraw_paycoins(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payCoin.transfer(msg.sender, amount);
    }
    }

    // view functions

    function getPost(
        uint256 id
    )
        public
        view
        returns (
            address,
            uint256,
            string memory,
            string memory,
            string memory,
            uint256[] memory
        )
    {
        Post memory post = posts[id];
        return (
            post.account,
            post.id,
            post.url,
            post.text,
            post.heading,
            post.replies
        );
    }

    function getReply(
        uint256 id
    )
        public
        view
        returns (address, uint256, string memory, uint256, uint256[] memory)
    {
        Reply memory reply = replies[id];
        return (
            reply.account,
            reply.id,
            reply.text,
            reply.parent,
            reply.replies
        );
    }

    function getPostCount() public view returns (uint256) {
        return post_counter;
    }

    function getReplyCount() public view returns (uint256) {
        return reply_counter;
    }

    function getPostReplies(uint256 id) public view returns (uint256[] memory) {
        return posts[id].replies;
    }

    function getReplyReplies(
        uint256 id
    ) public view returns (uint256[] memory) {
        return replies[id].replies;
    }

    function getPostRepliesCount(uint256 id) public view returns (uint256) {
        return posts[id].replies.length;
    }

    function getReplyRepliesCount(uint256 id) public view returns (uint256) {
        return replies[id].replies.length;
    }
}
