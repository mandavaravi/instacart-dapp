//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

// import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";

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

    // using Counters for Counters.Counter;

    ///
    /// only owner modifier is inherited from imported dependencies
    ///

    function isRetailer() public view returns (bool) {
        for (uint256 i = 0; i < retailerIds.length; i++) {
            if (msg.sender == retailerIds[i]) {
                return true;
            }
        }
    }

    modifier onlyRetailer() {
        require(isRetailer());
        _;
    }

    modifier onlyUser() {
        require(isUser());
        _;
    }

    function isUser() public view returns (bool) {
        for (uint256 i = 0; i < userIds.length; i++) {
            if (msg.sender == userIds[i]) {
                return true;
            }
        }
    }

    // Counters.Counter private _tokenIdCounter;
    // address public scOwner;

    // constructor() ERC721("Test2", "IC") {
    //     scOwner = msg.sender;
    //     // Start token ID at 1. By default is starts at 0.
    //     _tokenIdCounter.increment();
    // }

    //print
    event LogMessage(string message);

    function print(string memory message) public {
        emit LogMessage(message);
    }

    struct ItemStruct {
        uint256 itemId;
        string itemName;
        uint256 categoryId;
        uint256 itemPrice;
        uint256 quantity;
        uint256 pricePerQuantity;
        address payable sellerId;
    }

    //start of items section
    mapping(uint256 => ItemStruct) private items; // mapping from item id to item details
    uint256[] private itemIds; // array of all item ids

    function getItemById(
        uint256 itemId
    ) public view returns (ItemStruct memory) {
        ItemStruct memory item = items[itemId];
        return item;
    }

    function getAllItems() public view returns (ItemStruct[] memory) {
        uint256 itemCount = itemIds.length;
        ItemStruct[] memory itemsArray = new ItemStruct[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 itemId = itemIds[i];
            itemsArray[i] = items[itemId];
        }
        return itemsArray;
    }

    struct UserStruct {
        address userId;
        string userName;
        string homeAddress;
    }

    //end of item section

    //start of user section
    mapping(address => UserStruct) private idToUser;
    mapping(address => ItemStruct[]) private userIdToCartList;
    address[] private userIds;

    function addUser(
        address userId,
        string memory name,
        string memory homeAddr
    ) public {
        if (bytes(idToUser[userId].userName).length > 0) {
            revert("USER EXISTS");
        }
        idToUser[userId] = UserStruct(userId, name, homeAddr);
        userIds.push(userId);
    }

    function getAllUsers() public view returns (UserStruct[] memory) {
        uint256 userCount = userIds.length;
        UserStruct[] memory resUsers = new UserStruct[](userCount);
        for (uint256 i = 0; i < userCount; i++) {
            address tempId = userIds[i];
            resUsers[i] = idToUser[tempId];
        }
        return resUsers;
    }

    function getUserById(
        address userId
    ) public view returns (UserStruct memory) {
        UserStruct memory user = idToUser[userId];
        return user;
    }

    //cart operations

    function addItemToCart(
        address userId,
        uint256 itemId,
        string memory name,
        uint256 catId,
        uint256 price,
        uint256 quantity,
        address payable sellerId
    ) public {
        ItemStruct memory temp = ItemStruct(
            itemId,
            name,
            catId,
            price,
            quantity,
            price * quantity,
            sellerId
        );
        userIdToCartList[userId].push(temp);
    }

    function viewCart(
        address userId
    ) public view returns (ItemStruct[] memory) {
        return userIdToCartList[userId];
    }

    function updateCart(
        address userId,
        uint256 itemId,
        uint256 newQuant
    ) public {
        bool isExists = false;
        for (uint256 i = 0; i < userIdToCartList[userId].length; i++) {
            if (itemId == userIdToCartList[userId][i].itemId) {
                isExists = true;
                userIdToCartList[userId][i].quantity = newQuant;
                break;
            }
        }
        if (!isExists) {
            print("Try with item already existing in cart");
        }
    }

    function removeItemFromCart(
        address userId,
        uint256 itemId
    ) public returns (ItemStruct[] memory) {
        uint256 itemIndx = 0;
        bool isExists = false;
        for (uint256 i = 0; i < userIdToCartList[userId].length; i++) {
            if (itemId == userIdToCartList[userId][i].itemId) {
                isExists = true;
                itemIndx = i;
                break;
            }
        }

        if (isExists) {
            uint256 i = 0;
            for (i = itemIndx; i < userIdToCartList[userId].length - 1; i++) {
                userIdToCartList[userId][i] = userIdToCartList[userId][i + 1];
            }
            userIdToCartList[userId].pop();
            return userIdToCartList[userId];
        }
        return userIdToCartList[userId];
    }

    //end of user section

    //start of retailer section

    struct RetailerStruct {
        address retailerId;
        string retailerName;
        string homeAddress;
    }

    mapping(address => RetailerStruct) private idToRetailer;
    address[] private retailerIds;
    mapping(address => ItemStruct[]) retailerToInv;

    function addRetailer(
        address retailerId,
        string memory name,
        string memory homeAddr
    ) public {
        if (bytes(idToRetailer[retailerId].retailerName).length > 0) {
            revert("USER EXISTS");
        }
        idToRetailer[retailerId] = RetailerStruct(retailerId, name, homeAddr);
        retailerIds.push(retailerId);
    }

    function getRetailerById(
        address retId
    ) public view returns (RetailerStruct memory) {
        RetailerStruct memory retailer = idToRetailer[retId];
        return retailer;
    }

    function getAllRetailer() public view returns (RetailerStruct[] memory) {
        uint256 userCount = retailerIds.length;
        RetailerStruct[] memory resUsers = new RetailerStruct[](userCount);
        for (uint256 i = 0; i < userCount; i++) {
            address tempId = retailerIds[i];
            resUsers[i] = idToRetailer[tempId];
        }
        return resUsers;
    }

    //retailer functions
    function addnewItemToInvt(
        string memory name,
        uint256 catId,
        uint256 price,
        uint256 quantity,
        address payable sellerId,
        uint256 itemId
    ) public {
        //check if itemID exists
        for (uint256 i = 0; i < itemIds.length; i++) {
            if (itemIds[i] == itemId) {
                print("try different ID");
                return;
            }
        }
        ItemStruct memory temp = ItemStruct(
            itemId,
            name,
            catId,
            price,
            quantity,
            price * quantity,
            sellerId
        );
        retailerToInv[sellerId].push(temp);
        //update items mapping
        items[itemId] = temp;
        itemIds.push(itemId);
    }

    function viewInventory(address sellerId) public view returns (ItemStruct[] memory) {
        return retailerToInv[sellerId];
    }

    // should also handle price change
    function UpdateInventory(
        uint256 itemId,
        uint256 newQuant,
        address sellerId
    ) public {
        bool isExists = false;
        for (uint256 i = 0; i < retailerToInv[sellerId].length; i++) {
            if (itemId == retailerToInv[sellerId][i].itemId) {
                isExists = true;
                retailerToInv[sellerId][i].quantity = newQuant;
                break;
            }
        }
        if (!isExists) {
            print("Try with item already existing in cart");
        }
    }

    function removeItemInventory(address retailerId, uint256 itemId) public {
        uint256 itemIndx = 0;
        bool isExists = false;
        for (uint256 i = 0; i < retailerToInv[retailerId].length; i++) {
            if (itemId == retailerToInv[retailerId][i].itemId) {
                isExists = true;
                itemIndx = i;
                break;
            }
        }

        if (isExists) {
            uint256 i = 0;
            for (i = itemIndx; i < retailerToInv[retailerId].length - 1; i++) {
                retailerToInv[retailerId][i] = retailerToInv[retailerId][i + 1];
            }
            retailerToInv[retailerId].pop();
        }

        for (uint256 i = 0; i < itemIds.length; i++) {
            if (itemIds[i] == itemId) {
                for (uint256 j = i; j < itemIds.length - 1; j++) {
                    itemIds[j] = itemIds[j + 1];
                }
                itemIds.pop();
                break;
            }
        }
    }

    uint256 orderIdCounter = 0;
    mapping(address => uint256) userToOrderId;
    mapping(uint256 => ItemStruct[]) orderToDetails;

    function viewOrdersByUserId(
        address userId
    ) public view returns (ItemStruct[] memory) {
        return orderToDetails[userToOrderId[userId]];
    }

    function placeOrder(address userId) public payable {
        // ❌ Check that totalSupply is less than MAX_SUPPLY
        //require(totalSupply() < MAX_SUPPLY, "Can't mint anymore tokens.");

        //check if payment is more than min amount
        // ItemStruct[] memory temp = userIdToCartList[userId];
        uint256 final_amount = 0;
        for (uint256 i = 0; i < userIdToCartList[userId].length; i++) {
            final_amount += userIdToCartList[userId][i].pricePerQuantity;
        }

        userIdToCartList[userId][0].sellerId.transfer(final_amount);
        userToOrderId[userId] = orderIdCounter;
        orderToDetails[orderIdCounter] = userIdToCartList[userId];
        orderIdCounter++;

        // ItemStruct[] memory prevInv = retailerToInv[userIdToCartList[userId][0].sellerId];
        uint256 j = 0;
        // uint256 k =0;
        for (
            uint256 i = 0;
            i < retailerToInv[userIdToCartList[userId][0].sellerId].length;
            i++
        ) {
            while (j < userIdToCartList[userId].length) {
                if (
                    retailerToInv[userIdToCartList[userId][0].sellerId][i]
                        .itemId == userIdToCartList[userId][j].itemId
                ) {
                    retailerToInv[userIdToCartList[userId][0].sellerId][i]
                        .quantity -= userIdToCartList[userId][j].quantity;
                    j++;
                }
            }
        }

        while (userIdToCartList[userId].length > 0) {
            userIdToCartList[userId].pop();
        }

        // require(final_amount >= 5, "Wont get any NFT");
        // uint256 tokenId = _tokenIdCounter.current();
        // _tokenIdCounter.increment();
        // _safeMint(userId, tokenId);
    }

    // function viewOrdersByRetailerId(address retailerId) public view returns(ItemStruct[] memory) {

    // }

    /*
    //===============================================//
    // ===== 5. Other Functions ===== //

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://happyMonkeyBaseURI/";
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    */
}
