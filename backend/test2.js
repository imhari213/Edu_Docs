var Web3 = require('web3');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;

var web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/01430c533dcd4c42bd9cc98cff3eb0a4')
);

var address = '0xaBe93970E0F305142629D40e49797b6894d03CbA';
var key = 'df83bc5744bf6d7ec9f5dc716c7f2123041b871126109d59a95d90a7a4699ebc';


var interface = [ { "constant": false, "inputs": [ { "name": "ob", "type": "string" } ], "name": "setdata", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "get", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
var bytecode = '608060405234801561001057600080fd5b506102d7806100206000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636d4ce63c14610051578063900cf582146100e1575b600080fd5b34801561005d57600080fd5b5061006661014a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100a657808201518184015260208101905061008b565b50505050905090810190601f1680156100d35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100ed57600080fd5b50610148600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506101ec565b005b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101e25780601f106101b7576101008083540402835291602001916101e2565b820191906000526020600020905b8154815290600101906020018083116101c557829003601f168201915b5050505050905090565b8060009080519060200190610202929190610206565b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061024757805160ff1916838001178555610275565b82800160010185558215610275579182015b82811115610274578251825591602001919060010190610259565b5b5090506102829190610286565b5090565b6102a891905b808211156102a457600081600090555060010161028c565b5090565b905600a165627a7a7230582049aa3febaf103699a7314fb49849a7b1e42e465b551e4fd4c5b48e2a4d9b1b940029'

const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(interface); 


//var bytecode = '6060604052341561000f57600080fd5b60405160208061084f83398101604052808051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166002816100e491906100eb565b505061013e565b815481835581811511610112578183600052602060002091820191016101119190610117565b5b505050565b61013b91905b80821115610137576000808201600090555060010161011d565b5090565b90565b6107028061014d6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635c19a95c1461005e578063609ff1bd146100975780639e7b8d61146100c6578063b3f98adc146100ff57600080fd5b341561006957600080fd5b610095600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610125565b005b34156100a257600080fd5b6100aa610478565b604051808260ff1660ff16815260200191505060405180910390f35b34156100d157600080fd5b6100fd600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104f6565b005b341561010a57600080fd5b610123600480803560ff169060200190919050506105f3565b005b600080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160010160009054906101000a900460ff161561018557610473565b5b600073ffffffffffffffffffffffffffffffffffffffff16600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156102b357503373ffffffffffffffffffffffffffffffffffffffff16600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b1561032257600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250610186565b3373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561035b57610473565b60018260010160006101000a81548160ff021916908315150217905550828260010160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff161561045b57816000015460028260010160019054906101000a900460ff1660ff1681548110151561043b57fe5b906000526020600020900160000160008282540192505081905550610472565b816000015481600001600082825401925050819055505b5b505050565b6000806000809150600090505b6002805490508160ff1610156104f1578160028260ff168154811015156104a857fe5b90600052602060002090016000015411156104e45760028160ff168154811015156104cf57fe5b90600052602060002090016000015491508092505b8080600101915050610485565b505090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614158061059e5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff165b156105a8576105f0565b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055505b50565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff168061065b57506002805490508260ff1610155b15610665576106d2565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460028360ff168154811015156106b657fe5b9060005260206000209001600001600082825401925050819055505b50505600a165627a7a72305820988376ae8319217df144e440f7cfdcd479d4708bccb4e5bfffd16fba28497d1e0029';
//var interface = [ { "constant": false, "inputs": [ { "name": "to", "type": "address" } ], "name": "delegate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "toVoter", "type": "address" } ], "name": "giveRightToVote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_numProposals", "type": "uint8" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [ { "name": "toProposal", "type": "uint8" } ], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "winningProposal", "outputs": [ { "name": "_winningProposal", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" } ]

// var bytecode = '0x60806040526040805190810160405280600481526020017f676f6f64000000000000000000000000000000000000000000000000000000008152506001908051906020019061004f929190610062565b5034801561005c57600080fd5b50610107565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a357805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518255916020019190600101906100b5565b5b5090506100de91906100e2565b5090565b61010491905b808211156101005760008160009055506001016100e8565b5090565b90565b6101a4806101166000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063cfae321714610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b606060018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561016e5780601f106101435761010080835404028352916020019161016e565b820191906000526020600020905b81548152906001019060200180831161015157829003601f168201915b50505050509050905600a165627a7a7230582075525dfeac9d2edaf9301fb7c07beb754668f2e9e45996fc729bdcfeae13ce750029'
// var interface = [ { "constant": false, "inputs": [], "name": "greet", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]

function sendRaw(rawTx) {
    var privateKey = new Buffer(key, 'hex');
    var transaction = new tx(rawTx);
   transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
    '0x' + serializedTx, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}



// var rawTx = {
//     nonce: web3.toHex(web3.eth.getTransactionCount(address)),
//     gasLimit: web3.toHex(800000),
//     gasPrice: web3.toHex(20000000000),
//     data: "Hariprasad"
// };




// sendRaw(rawTx);


//var contractAddress = '0x69dE483C4424d97EFB2ADAEA86AaE170c4008B4D';
var contractAddress = '0x80152CA678436d9eAE70B77fc50c12cadB210112';
var txOptions = {
    nonce: web3.toHex(web3.eth.getTransactionCount(address)),
    gasLimit: web3.toHex(800000),
    gasPrice: web3.toHex(20000000000),
    to: contractAddress
}
var s = "ariprasad";
var rawTx = txutils.functionTx(interface, 'setdata', s, txOptions);
console.log(rawTx);
sendRaw(rawTx);


var contract = web3.eth.contract(interface);
var instance = contract.at(contractAddress);
instance.get.call(function(err, result) {
    if(err) {
        console.log(err);
    } else {
        console.log(result);
        
    }
});


var d = web3.eth.getTransaction("0x428882f945cd5eba4313723865f241cff970da987a2336072598b4bd746ec686");
var i = web3.toAscii(d.input);

const rsult = decoder.decodeData(d.input);

const check_value = rsult.inputs[0];

console.log(check_value);



