// JavaScript Document
const infura = "https://mainnet.infura.io/v3/65d2de4060574ab08acb329d1f329e3f";

const decimals = 18;

const aigContractAddress = "0x6e9513330fe54AD5a793908dFE5676596394534a";
const ignantContractAddress = "0x90f54b8dc2a84092dEA959d0308C8040A05Ac4E9";

const ignantAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TokenBurn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TokenStake",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TokenUnstake",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			}
		],
		"name": "BurnIgnant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ClaimStakeInterest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			}
		],
		"name": "StakeTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "UnstakeTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "calcStakingRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "daysSinceDeployment",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "isStakeFinished",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "minsPastStakeTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "staker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "stakedBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stakeStartTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalStakingInterest",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalBurnt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalStaked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const aigAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

var activeAccount;
var account;
var sendok;
var accountInterval;
var web3Found;
var walletConnectActive;

var aigContract;
var ignantContract;

var isDeviceMobile = function () {
	//check for mobile or desktop
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) { //mobile
		return true;
	} else { //desktop
		return false;
	}
}

var checkProvider = function () {
	if (web3.currentProvider.isMetaMask === true) {
		return "metamask";
	} else if (typeof (mist) !== "undefined") {
		return "mist";
	} else if (web3.currentProvider.isTrust === true) {
		return "trust";
	} else if (typeof window.__CIPHER__ !== 'undefined') {
		return "cipher";
	} else if (typeof window.SOFA !== 'undefined') {
		return "toshi";
	} else {
		//errorMessage("Error detecting provider");
		return "";
	}
}

///////////////////////////////////////////////////////////////////////

function Connect() {
	document.getElementById("connectPopUp").style.visibility = "visible";
	$("#connectPopUp").fadeIn(1000);
	document.getElementById("connectBtn").style.visibility = "collapse";
	$("#connectBtn").fadeOut(1000);

}

async function CloseConnect(connected) {
	document.getElementById("connectPopUp").style.visibility = "collapse";
	$("#connectPopUp").fadeOut(1000);
	if (!connected) {
		document.getElementById("connectBtn").style.visibility = "visible";
		$("#connectBtn").fadeIn(1000);
	}
	else {
		document.getElementById("disconnectBtn").style.visibility = "visible";
		document.getElementById("disconnectBtn").style.position = "";
		$("#disconnectBtn").fadeIn(1000);
	}

}

async function Disconnect() {
	if (walletConnectActive) {
		await web3.eth.currentProvider.disconnect();
	}
	location.reload();
}

async function MetamaskConnect() {

	if (window.ethereum == undefined) {
		errorMessage("No wallet found, please try with a compatible dapp browser.");
		console.log("Defaulting to infura for view only");
	}
	if (typeof web3 !== "undefined") {
		// Modern dapp browsers...
		if (window.ethereum) {
			web3 = new Web3(ethereum);
			console.log("Window ethereum");
			try {
				// Request account access if needed
				ethereum.enable().then(function () {
					if (!web3Found) {
						web3Found = true;
						ignantContract = new web3.eth.Contract(ignantAbi, ignantContractAddress);
						aigContract = new web3.eth.Contract(aigAbi, aigContractAddress);
						console.log("Web3 Found!");
						console.log(web3.version);
					}
				});
				CloseConnect(true);
				CheckAccount();
				CheckNetwork();
				// Acccounts now exposed
			} catch (error) {
				// User denied account access...
				if (!web3Found) {
					web3Found = true;
					web3 = new Web3(new Web3.providers.HttpProvider(infura));
					console.error;
					console.log("Defaulting to infura for view only");
					errorMessage("Failed to connect to your wallet.");
					return;
				}
			}
		}
		// Legacy dapp browsers...
		else if (window.web3) {
			web3 = new Web3(window.web3.currentProvider);
			console.log(web3.currentProvider);
			if (!web3Found) {
				web3Found = true;
				ignantContract = new web3.eth.Contract(ignantAbi, ignantContractAddress);
				aigContract = new web3.eth.Contract(aigAbi, aigContractAddress);
				console.log("Web3 Found!");
				console.log(web3.version);
				CloseConnect(true);
				CheckAccount();
				CheckNetwork();
			}
		}
		// Non-dapp browsers...
		else {
			//non detected;
			if (!web3Found) {
				web3Found = true;
				errorMessage("Failed to connect to your wallet, please try again.");
				console.log("Defaulting to infura for view only");
				return;
			}
		}
	} else { //no web3 provider found
		if (!web3Found) {
			web3Found = true;
			console.log("Defaulting to infura for view only");
		}
	}
}

async function WalletConnect() {
	//An infura ID, or custom ETH node is required for Ethereum, for Binance Smart Chain you can just use their public endpoint
	var provider = new WalletConnectProvider.default(
		{
			infuraId: "65d2de4060574ab08acb329d1f329e3f",
		});
	//present the Wallet Connect QR code
	provider.enable().then(function (res) {
		//get wallet addrs and then wrap this into the Web3 JS
		web3 = new Web3(provider);
		if (!web3Found) {
			web3Found = true;
			walletConnectActive = true;
			ignantContract = new web3.eth.Contract(ignantAbi, ignantContractAddress);
			aigContract = new web3.eth.Contract(aigAbi, aigContractAddress);
			console.log("Web3 Found!");
			console.log(web3.version);
			CloseConnect(true);
			CheckAccount();
			CheckNetwork();
		}

	});
}

function CheckAccount() {
	//get available accounts
	web3.eth.getAccounts(async function (err, accounts) {
		if (err !== null) {
			errorMessage("An error occurred: " + err);
		}
		else if (accounts.length == 0) //is user logged in?
		{
			setTimeout(function () {
				errorMessage("Login to your wallet and connect.");
			}, 5000);
		} else {
			account = accounts[0];
			activeAccount = account;
			web3.eth.defaultAccount = account;
			setTimeout(function () {
				ShowUserAddress();
				ShowBalance();
				//Populate();
				GetPriceData();
				GetAPYData();
				GetDays();
			}, 2000);
			clearInterval(accountInterval);
			//interval for account change
			accountInterval = setInterval(function () {
				console.log("Checking wallet presence...");
				web3.eth.getAccounts(function (err, accounts) {
					if (accounts[0] !== activeAccount) {
						console.log("Wallet change detected, refreshing page...");
						location.reload();
					} else {
						console.log("Active wallet = " + activeAccount);
					}
				});
			}, 10000);
		}
	});
}
//////////
function CheckNetwork() {
	web3.eth.net.getId().then(netId => {
		switch (netId) {
			case 1:
				console.log('Connected to ETH Mainnet');
				sendok = true;
				return true;
			case 2:
				errorMessage("You are using the Morden test network, please change to ETH Mainnet");
				console.log('Connected to deprecated Morden test network.');
				return false;
			case 3:
				errorMessage("You are using the Ropsten test network, please change to ETH Mainnet");
				console.log('Connected to Ropsten test network.');
				return false;
			case 4:
				console.log('Connected to ETH Rinkeby test network.');
				errorMessage("You are using the Rinkeby test network, please change to ETH Mainnet");
				return false;
			case 42:
				errorMessage("You are using the Kovan test network, please change to ETH Mainnet");
				console.log('This is the Kovan test network.');
				return false;
			default:
				errorMessage("You are using a different chain, please change to ETH MainNet");
				console.log('This is an unknown network.');
				//sendok = true;
				return false;
		}
	});
}

function errorMessage(text) {
	console.log(text);
	document.getElementById("errorMsg").innerHTML = '<i class="fa fa-exclamation-circle"></i>&nbsp;' + text;
	document.getElementById("errorMsg").style.display = "block";
	document.getElementById("errorMsg").style.visibility = "visible";
	setTimeout(function () {
		$("#errorMsg").fadeOut(1000);
	}, 3000);
}

function successMessage(text) {
	console.log(text);
	document.getElementById("successMsg").innerHTML = '<i class="fa fa-exclamation-circle"></i>&nbsp;' + text;
	document.getElementById("successMsg").style.display = "block";
	document.getElementById("successMsg").style.visibility = "visible";
	setTimeout(function () {
		$("#successMsg").fadeOut(1000);
	}, 3000);
}

function ShowUserAddress() {
	var elem = document.getElementById("userAddress");
	elem.innerHTML = activeAccount;
	console.log('Detected Account - ' + activeAccount.toString());
}

async function ShowBalance() {
	ignantContract.methods.balanceOf(activeAccount).call().then(function (balance) {
		document.getElementById("balanceBurning").innerHTML = toFixedMax(balance / 10 ** decimals, 3) + " IGNANT";
	});
}