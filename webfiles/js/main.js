var daysSince = "";


async function GetDays(){
// Set the target date to Feb-18-2023 11:38:23 PM +UTC
const targetDate = new Date(Date.UTC(2023, 1, 18, 23, 38, 23));

// Get the current date and time
const currentDate = new Date();

// Calculate the time difference in milliseconds
const timeDiff = currentDate.getTime() - targetDate.getTime();

// Convert the time difference to days
daysSince = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
daysSince += 1;
 }

setInterval(function () {
  GetPriceData();
  GetAPYData();
  ShowBalance();
}, 100000);

// Call updateTime every second
setInterval(function() {GetTimeTillDayEnd()}, 1000);

async function GetTimeTillDayEnd() {
  // Number of seconds in a day
  /*const SECONDS_IN_DAY = 86400;
  const startTime = 1676720303;
  console.log(startTime);
  var nowBlock = await web3.eth.getBlockNumber();
  let block = await web3.eth.getBlock(nowBlock);
  var nowTime = block.timestamp;
  console.log(nowTime);
  var timeElapsed = (nowTime - startTime);
  var daysElapsed = timeElapsed / SECONDS_IN_DAY;
  console.log("DAYS ELAPSED : " + daysElapsed);*/

  // Get the current time in UTC
  const now = new Date();

  // Calculate the target time as 11:38:23 PM +UTC today
  const target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 38, 23));

  // If the target time has already passed today, add one day to the target time
  if (target.getTime() <= now.getTime()) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  // Calculate the time left until the target time
  const timeLeft = target.getTime() - now.getTime();

  // Convert the time left to hours, minutes, and seconds
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Format the time left as a string
  const timeString = `${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;

  // Update the time display
  document.getElementById('timeTillDayEnd').textContent = "Day " + daysSince + " Ends In : " + timeString;
  //document.getElementById("timeTillDayEnd").innerHTML = "Day Ends In : " + ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
}

async function GetPriceData() {
  var staker = await ignantContract.methods.staker(activeAccount).call();
  var burnt = web3.utils.fromWei(staker.totalBurnt);
  console.log(burnt);
  document.getElementById("ignantBurnt").innerHTML = toFixedMax(burnt, 8) + " IGNANT";
  var staked = web3.utils.fromWei(staker.stakedBalance);
  console.log(staked);
  document.getElementById("aigStaked").innerHTML = toFixedMax(staked, 8) + " AIG";
  var claimable = web3.utils.fromWei(await ignantContract.methods.calcStakingRewards(activeAccount).call());
  document.getElementById("stakingRewards").innerHTML = claimable + " IGNANT";
  var balance = web3.utils.fromWei(await aigContract.methods.balanceOf(activeAccount).call());
  document.getElementById("aigBalance").innerHTML = toFixedMax((balance), 18); + " AIG";

}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function GetAPYData() {
  GetStakingApy();
  GetMaxApy();
  GetTimeTillEndstake();
}

async function GetTimeTillEndstake() {
  var staker = await ignantContract.methods.staker(activeAccount).call();
  var stakeStart = staker.stakeStartTimestamp;
  var daysSeconds = 86400;
  var endTime = parseInt(stakeStart) + (daysSeconds * 3);
  var now = Date.now() / 1000;
  var secondsTill = endTime - now;
  if (staker.stakedBalance <= 0) {
    document.getElementById("aigStakingDaysLeft").innerHTML = "N/A";
  }
  else {
    if (secondsTill <= 0) {
      document.getElementById("aigStakingDaysLeft").innerHTML = "Unlocked";
    }
    else {
      var minutesTill = secondsTill / 60;
      var hoursTill = minutesTill / 60;
      var daysTill = hoursTill / 24;
      document.getElementById("aigStakingDaysLeft").innerHTML = toFixedMax(daysTill, 3) + " day/s";
    }
  }
}


async function GetStakingApy() {

  var apyAdjust = 10000;
  var daysSinceDeployment = await ignantContract.methods.daysSinceDeployment().call();
  var staker = await ignantContract.methods.staker(activeAccount).call();
  var userStakeDeposit = staker.stakedBalance;
  //var stakedValue = ignantUsd * web3.utils.fromWei(userStakeDeposit);
  var burntBalance = staker.totalBurnt;
  if (burntBalance == 0) {
    apyAdjust = 10000;
  }
  else {
    var burntPercentage = ((burntBalance * 100) / userStakeDeposit);
    console.log(burntPercentage + " PERCENT")
    var v = (10000 * burntPercentage) / 100;
    apyAdjust = (apyAdjust - v);
    if (apyAdjust < 10) {
      apyAdjust = 10;
    }
    if (apyAdjust < (10 + (daysSinceDeployment * 10))) {
      apyAdjust = (10 + (daysSinceDeployment * 10));
    }
    if (daysSinceDeployment >= 100) {
      apyAdjust = 10000 - v;
      if (apyAdjust < 1000) {
        apyAdjust = 1000;
      }
    }
  }
  if (userStakeDeposit == 0) {
    document.getElementById("aigStakingAPY").innerHTML = "10.01%";
  }
  else {
    var ignantPerMinute = (userStakeDeposit / apyAdjust / 525) * 1;
    console.log(ignantPerMinute);
    var ignantPerYear = ignantPerMinute * 525960;
    // var usdPerYear = web3.utils.fromWei(ignantPerMinute.toString()) * ignantUsd * 525600;
    //get x multiple
    //var annualXGainz = (usdPerYear / stakedValue);
    var annualXGainz = (ignantPerYear / userStakeDeposit);
    console.log(annualXGainz + " annual x gains");
    //get percent APY
    var apyPercent = annualXGainz * 100;
    console.log(apyPercent + " percent");
    document.getElementById("aigStakingAPY").innerHTML = apyPercent.toFixed(3) + "%";
  }
}

async function GetMaxApy() {

  var apyAdjust = 10000;
  var daysSinceDeployment = await ignantContract.methods.daysSinceDeployment().call();
  var userStakeDeposit = 1000000000000000;
  //var stakedValue = ignantUsd * web3.utils.fromWei(userStakeDeposit);
  var burntBalance = 1000000000000000;
  if (burntBalance == 0) {
    apyAdjust = 10000;
  }
  else {
    var burntPercentage = ((burntBalance * 100) / userStakeDeposit);
    console.log(burntPercentage + " PERCENT")
    var v = (10000 * burntPercentage) / 100;
    apyAdjust = (apyAdjust - v);
    if (apyAdjust < 10) {
      apyAdjust = 10;
    }
    if (apyAdjust < (10 + (daysSinceDeployment * 10))) {
      apyAdjust = (10 + (daysSinceDeployment * 10));
    }
    if (daysSinceDeployment >= 100) {
      apyAdjust = 10000 - v;
      if (apyAdjust < 1000) {
        apyAdjust = 1000;
      }
    }
  }
  if (userStakeDeposit == 0) {
    document.getElementById("aigStakingAPY").innerHTML = "10.01%";
  }
  else {
    var ignantPerMinute = (userStakeDeposit / apyAdjust / 525) * 1;
    console.log(ignantPerMinute);
    var ignantPerYear = ignantPerMinute * 525960;
    // var usdPerYear = web3.utils.fromWei(ignantPerMinute.toString()) * ignantUsd * 525600;
    //get x multiple
    //var annualXGainz = (usdPerYear / stakedValue);
    var annualXGainz = (ignantPerYear / userStakeDeposit);
    console.log(annualXGainz + " annual x gains");
    //get percent APY
    var apyPercent = annualXGainz * 100;
    console.log(apyPercent + " percent");
    document.getElementById("maxStakingAPY").innerHTML = apyPercent.toFixed(3) + "%";
  }
}



async function ApproveTokens() {
  if (!sendok) {
    errorMessage("Cannot send tx, please check connection");
    return;
  }
  if (typeof web3 !== "undefined") {
    var value = document.getElementById("stakeAmount").value;

    if (value == null || value <= 0 || value == "") {
      errorMessage("Value must be greater than 0");
      return;
    }
    var _aig = web3.utils.toWei(value);
    aigContract.methods.approve(ignantContractAddress, web3.utils.toHex(_aig)).send({
      from: activeAccount
    })
      .on('receipt', function (receipt) {
        successMessage("AIG approved successfully!");
        GetPriceData();
        GetAPYData();
        ShowBalance();
        console.log(receipt);
      })
      .on('error', function (error) {
        //errorMessage('Stake failed, try again');
        console.log(error);
      });
  }
}

async function StakeTokens() {
  if (!sendok) {
    errorMessage("Cannot send tx, please check connection");
    return;
  }
  if (typeof web3 !== "undefined") {
    var value = document.getElementById("stakeAmount").value;
    var allowance = await aigContract.methods.allowance(activeAccount, ignantContractAddress).call();
    var balance = await aigContract.methods.balanceOf(activeAccount).call();
    if (value == null || value <= 0 || value == "") {
      errorMessage("Value must be greater than 0");
      return;
    }
    if (parseInt(web3.utils.fromWei(allowance)) < parseInt(value)) {
      errorMessage("Approval for AIG needed");
      return;
    }
    if (parseInt(web3.utils.fromWei(balance)) < parseInt(value)) {
      errorMessage("Insufficient available AIG balance");
      return;
    }
    var _aig = web3.utils.toWei(value);
    ignantContract.methods.StakeTokens(web3.utils.toHex(_aig)).send({
      from: activeAccount
    })
      .on('receipt', function (receipt) {
        successMessage("AIG staked successfully!");
        GetPriceData();
        GetAPYData();
        ShowBalance();
        console.log(receipt);
      })
      .on('error', function (error) {
        //errorMessage('Stake failed, try again');
        console.log(error);
      });
  }
}

async function UnstakeTokens() {
  var staker = await ignantContract.methods.staker(activeAccount).call();
  var stakedAig = staker.stakedBalance;
  if (stakedAig == 0) {
    errorMessage("Nothing to unstake");
    return;
  }
  var fin = await ignantContract.methods.isStakeFinished(activeAccount).call();
  if (!fin) {
    errorMessage("Cannot unstake yet");
    return;
  }
  else {
    ignantContract.methods.UnstakeTokens().send({
      from: activeAccount
    })
      .on('receipt', function (receipt) {
        successMessage("Successfully unstaked IGNANT");
        GetPriceData();
        GetAPYData();
        ShowBalance();
        console.log(receipt);
      })
      .on('error', function () {
        console.error;
        //errorMessage("unstake failed, please try again...");
      });
  }
}

async function ClaimInterest() {
  var claimable = await ignantContract.methods.calcStakingRewards(activeAccount).call();
  if (claimable == 0) {
    errorMessage("Nothing to claim");
    return;
  }
  ignantContract.methods.ClaimStakeInterest().send({
    from: activeAccount
  })
    .on('receipt', function (receipt) {
      successMessage("Successfully claimed staking interest in IGNANT");
      GetPriceData();
      GetAPYData();
      ShowBalance();
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      //errorMessage("Claim failed, please try again later...");
    });
}

async function BurnTokens() {
  if (!sendok) {
    errorMessage("Cannot send tx, please check connection");
    return;
  }
  if (typeof web3 !== "undefined") {
    var value = document.getElementById("burnAmount").value;
    var balance = await ignantContract.methods.balanceOf(activeAccount).call();
    if (value == null || value <= 0 || value == "") {
      errorMessage("Value must be greater than 0");
      return;
    }
    if (parseInt(web3.utils.fromWei(balance)) < parseInt(value)) {
      errorMessage("Insufficient available IGNANT balance");
      return;
    }
    var _ignant = web3.utils.toWei(value);
    ignantContract.methods.BurnIgnant(web3.utils.toHex(_ignant)).send({
      from: activeAccount
    })
      .on('receipt', function (receipt) {
        successMessage("IGNANT burnt successfully!");
        GetPriceData();
        GetAPYData();
        ShowBalance();
        console.log(receipt);
      })
      .on('error', function (error) {
        //errorMessage('Burn failed, try again');
        console.log(error);
      });
  }
}

/*----------HELPER FUNCTIONS------------ */

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

function doSort(ascending) {
  ascending = typeof ascending == 'undefined' || ascending == true;
  return function (a, b) {
    var ret = a[1] - b[1];
    return ascending ? ret : -ret;
  };
}

function numStringToBytes32(num) {
  var bn = new web3.utils.BN(num).toTwos(256);
  return padToBytes32(bn.toString(16));
}

function bytes32ToNumString(bytes32str) {
  bytes32str = bytes32str.replace(/^0x/, '');
  var bn = new web3.utils.BN(bytes32str, 16).fromTwos(256);
  return bn.toString();
}

function bytes32ToInt(bytes32str) {
  bytes32str = bytes32str.replace(/^0x/, '');
  var bn = new web3.utils.BN(bytes32str, 16).fromTwos(256);
  return bn;
}

function padToBytes32(n) {
  while (n.length < 64) {
    n = "0" + n;
  }
  return "0x" + n;
}

function toFixedMax(value, dp) {
  return +parseFloat(value).toFixed(dp);
}