'use strict';

const form = document.getElementById('form');
const select = document.getElementById('select');
const textVal = document.querySelectorAll('.text-val');
const valInput = document.getElementById('val');
const rubInput = document.getElementById('rub');
const btnOne = document.getElementById('btn-one');
const btnTwo = document.getElementById('btn-two');
const inputs = document.querySelectorAll('input');
const rubTotal = document.getElementById('rub-total');
const valTotal = document.getElementById('val-total');
let val = '';

const myHeaders = new Headers();
myHeaders.append("apikey", "DuZ2LolTEZnFtjFP6xCXLFB0DXe1qbhP");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const getDataTo = (val, num, btn) => {
  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=RUB&from=${val}&amount=${num}`, requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result))
    .then(data => render(data, btn))
    .catch(error => console.log('error', error));
};

const getDataFrom = (val, num, btn) => {
  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${val}&from=RUB&amount=${num}`, requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result))
    .then(data => render(data, btn))
    .catch(error => console.log('error', error));
};

const render = (res, btn) => {
  console.log(res);

  if (btn === btnOne) {
    rubTotal.value = res.result;
  }

  if (btn === btnTwo) {
    valTotal.value = res.result;
  }
};


select.addEventListener('input', e => {
  textVal.forEach(item => {
    if (e.target.value === 'EUR') {
      item.innerText = 'Евро (EUR)';
      val = 'EUR';
    }

    if (e.target.value === 'USD') {
      item.innerText = 'Доллар США (USD)';
      val = 'USD';
    }

    if (e.target.value === '') {
      item.innerText = '';
      val = '';
    }
  });

  inputs.forEach(item => {
    item.value = '';
  });
});

form.addEventListener('click', e => {
  e.preventDefault();

  if (e.target === btnOne && valInput.value !== '' && select.value !== '') {
    getDataTo(val, valInput.value, e.target);
  }

  if (e.target === btnTwo && rubInput.value !== '' && select.value !== '') {
    getDataFrom(val, rubInput.value, e.target);
  }

});

inputs.forEach(item => {
  if (item !== valInput && item !== rubInput) {
    item.disabled = 'true';
  }
});