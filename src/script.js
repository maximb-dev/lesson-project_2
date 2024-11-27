'use strict';

const account1 = {
    userName: 'Cecil Ireland',
    transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
    interest: 1.5,
    pin: 1111,
    transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2024-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
    ],
    currency: 'USD',
    locale: 'en-US',
  };
  
  const account2 = {
    userName: 'Amani Salt',
    transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
    interest: 1.3,
    pin: 2222,
    transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
    ],
    currency: 'UAH',
    locale: 'uk-UA',
  };
  
  const account3 = {
    userName: 'Corey Martinez',
    transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
    interest: 0.8,
    pin: 3333,
    transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
    ],
    currency: 'RUB',
    locale: 'ru-RU',
  };
    
  const account4 = {
    userName: 'Kamile Searle',
    transactions: [530, 1300, 500, 40, 190],
    interest: 1,
    pin: 4444,
    transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    ],
    currency: 'EUR',
    locale: 'fr-CA',
  };
  
  const account5 = {
    userName: 'Oliver Avila',
    transactions: [630, 800, 300, 50, 120],
    interest: 1.1,
    pin: 5555,
    transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    ],
    currency: 'USD',
    locale: 'en-US',
  };

const accounts = [account1, account2, account3, account4, account5];

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function formateTransactionDate(date,locale){

    const getDaysBetween2Dates = (date1,date2) =>Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));
    const daysPasted = getDaysBetween2Dates(new Date, date);
    console.log(daysPasted);

  const daysAgo = {
    0: 'Сегодня',
    1: 'Вчера'
  };

  if (daysPasted in daysAgo) {
    return daysAgo[daysPasted];
  } else if (daysPasted <= 7) {
    return `${daysPasted} дней назад!`;
  } else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
}

function formatCurrency(value, locale,currency){
  return new Intl.NumberFormat(locale,{
    style: 'currency',
    currency: currency,
  }).format(value);
}

const displayTransactions = function (account, sort = false)
{
  containerTransactions.innerHTML = '';

  const transacs = sort ? account.transactions.slice().sort((x,y) => x - y) : account.transactions;
  

  transacs.forEach(function(trans,index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.transactionsDates[index]);
    
    const transDate = formateTransactionDate(date, account.locale);

    const formatedTrans = formatCurrency(trans, account.locale, account.currency);
    const transactionsRow = `
    <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">${transDate}</div>
          <div class="transactions__value">${formatedTrans}</div>
        </div>
    </div>
    `

    containerTransactions.insertAdjacentHTML('afterbegin',transactionsRow);
  });
}

function createNicknames(acc){
  acc.forEach(function(acc){
    acc.nickName = acc.userName.toLowerCase().split(' ').map(item => item[0]).join('');
  });
}

createNicknames(accounts);

function displayBalance(account){
  const balance = account.transactions.reduce((acc,trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = formatCurrency(balance,account.locale, account.currency);
}

function displayTotal(account)
{
  const dipositsTotal = account.transactions.filter(trans => trans > 0).reduce((acc,trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(dipositsTotal,account.locale, account.currency);

  const widthrawTotal = account.transactions.filter(trans => trans < 0).reduce((acc,trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(widthrawTotal,account.locale, account.currency);

  const interestTotal = account.transactions.reduce((acc, trans) => {
    if (trans > 0) {
      const interest = (trans * account.interest) / 100;
      if (interest >= 5) {
        return acc + interest;
      }
    }
    return acc;
  }, 0);

  labelSumInterest.textContent = formatCurrency(interestTotal,account.locale, account.currency);
}

let currentAccount,currentLogOutTimer;


const starLogoutTimer = function(){

  const logoutTimerCallBack = function() {
    const minutes = String(Math.trunc(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    labelTimer.textContent = `${minutes}:${seconds}`;
    if(timer === 0)
    {
      clearInterval(logoutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Войдите в свой аккаунт`;
    }
    timer--;
  }

  let timer = 300;
  logoutTimerCallBack();
  const logoutTimer = setInterval(logoutTimerCallBack, 1000);

  return logoutTimer;
}


function updateUI(account){
   //Display transactions
   displayTransactions(account);
   //Display balance
   displayBalance(account);
   //Display total
   displayTotal(account);
}

btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  currentAccount = accounts.find(account => account.nickName === inputLoginUsername.value);
  
  if(currentAccount?.pin === +(inputLoginPin.value))
  { 
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Рады, что вы снова с нами, ${currentAccount.userName.split(' ')[0]}!`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    }
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    inputLoginPin.value = '';
    inputLoginUsername.value = '';
    inputLoginPin.blur();

    if(currentLogOutTimer){
      clearInterval(currentLogOutTimer);
    }
    currentLogOutTimer = starLogoutTimer();

    updateUI(currentAccount);
  }
})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const trasferTo = accounts.find(account => account.nickName === inputTransferTo.value);
  const transferAmmount = +(inputTransferAmount.value);
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  if(currentAccount && trasferTo && currentAccount.balance > transferAmmount && transferAmmount > 0)
  {
    currentAccount.transactions.push(-transferAmmount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    trasferTo.transactions.push(transferAmmount);
    trasferTo.transactionsDates.push(new Date().toISOString());
    updateUI(currentAccount);

    clearInterval(currentLogOutTimer);
    currentLogOutTimer = starLogoutTimer();
  }else{
    console.log(`Недостаточно денег`);
  }
})

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  const correctLogin = currentAccount.nickName === inputCloseUsername.value;
  const correctPin = currentAccount.pin === +(inputClosePin.value);
  inputClosePin.value = '';
  inputCloseUsername.value = '';
  if(!correctLogin && !correctPin)
  {
    return alert('Лол кек чебурек');
  }
  else{
    const currentAccountIndex = accounts.findIndex(account => account.nickName === currentAccount.nickName);
    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Войдите в свой аккаунт`;
    console.log(accounts);
  }
})

btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const loanAmmount = Math.floor(inputLoanAmount.value);
  clearInterval(currentLogOutTimer);
  currentLogOutTimer = starLogoutTimer();
  if(loanAmmount > 0 && currentAccount.transactions.some(trans => trans >= loanAmmount / 10))
  {
    setTimeout(function(){
      currentAccount.transactions.push(loanAmmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 5000);
  }
  else{
    alert('Лол кек чебурек');
  }
  inputLoanAmount.value = '';
})

let transactionsSorted = false;

btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayTransactions(currentAccount,!transactionsSorted);
  transactionsSorted = !transactionsSorted;
})