/*eslint-env browser*/

window.onload = function() {
    let bankAccount = (function () {
        let owner = undefined;
        let balance = 0;

        function withdraw() {
            let withdrawalAmount = prompt('Enter amount to withdraw', '100')
            if (isNaN(parseFloat(withdrawalAmount))) {
                alert('Enter Number')
                withdraw()
            } else {
                balance = balance - withdrawalAmount
                getBalance()
            }
        }
        function deposit() {
            let depositAmount = prompt('Enter amount to deposit', '100')
            if (isNaN(parseFloat(depositAmount))) {
                alert('Enter Number')
                deposit()
            } else {
                balance = balance + parseFloat(depositAmount)
                getBalance()
            }
        }

        function getBalance() {
            document.getElementById('balance').value = balance
            return balance
        }

        function getOwnerName() {
            return owner
        }
        function setName(target) {
            owner = prompt("Enter your name")
            document.getElementById('ownerName').value = owner
        }

        return {
            withdraw,
            deposit,
            getBalance,
            getOwnerName,
            setName
        }
    })()

    let clientForm = document.getElementById('clientForm')
    clientForm.addEventListener('click', (e) => {
        e.preventDefault()
        const {target } = e
        if (target.matches('button#customerName')) {
            bankAccount.setName(target)
            bankAccount.getBalance()
        }
        if (target.matches('button#deposit')) {
            bankAccount.deposit()
        }
        if (target.matches('button#withdraw')) {
            bankAccount.withdraw()
        }
    })
};

var accounts = [];

// return account
function createAccount(accountName, username, amount) {
    var accountName = {
        username: username,
        balance: amount          
    }
    accounts.push(accountName);
}
// getAccount(username);

// find matching account 
function getAccount(username) {
    var foundUser;
    accounts.forEach(function (element, index) {
        if (element.username === username){
            foundUser = element;
        } 
    });
    return foundUser;
}

// check amount is a number
function checkAmount (amount) {
    var valid;
    if (typeof amount === "number"){
        valid = true;
    } else {
        valid = false;
    }
    return valid;
}
// Deposits amount to account
function deposit(username, amount) {
    var valid = checkAmount(amount);
    var ownerName = getAccount(username, accounts);
    if (valid && ownerName) {
        var deposited = ownerName.balance + amount;
        console.log("You have deposited $" + amount + ". Your account balance is $" + deposited +".");
        return ownerName.balance += amount;
    } else {
        console.log("Please enter a number to deposit");                   
    }
}

// Withdraws amount from account
function withdraw(username, amount) {
    var valid = checkAmount(amount);
    var ownerName = getAccount(username, accounts);
    if (valid && ownerName) {
        if (amount > ownerName.balance){
            console.log("I am sorry, you do not have enough funds");
        } else {
            return ownerName.balance -= amount;
        }
    } else {
        console.log("Please enter a number to deposit");        
    }
}

// Gets account balance
function getBalance(username) {
    var ownerName = getAccount(username, accounts);
    if (ownerName) {
        console.log("Your account currently has $" + ownerName.balance + " balance.");       
    } else {
        console.log("There is no account matching");
    }    
}
