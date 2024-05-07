const charSet = document.querySelector('#characterSet');
const key = document.querySelector('#key');
const msg = document.querySelector('#message');
const keyword = document.querySelector('#keyword');
const btn = document.querySelector('button');
const inputs = document.querySelectorAll('input');

inputs.forEach((x) =>
  x.addEventListener('change', (e) => {
    e.target.value = e.target.value.trim().toLowerCase();
  })
);

btn.addEventListener('click', () => {
  if (validateSet(charSet, key)) {
    let alphabet = charSet.value !== '' ? charSet.value : undefined;
    let vignereSet = createVignereSet(key.value, alphabet);

    if (validateInputs(charSet, [key, msg, keyword])) {
      let encoded = encrypt(msg.value, keyword.value, vignereSet);
      document.querySelector('.output').textContent = encoded;
    }
  }
});

function validateInputs(main, sub) {
  let og = 'abcdefghijklmnopqrstuvwxyz';
  for (let str of sub) {
    let copy = main.value !== '' ? main.value : og;
    for (let i = 0; i < str.value.length; i++) {
      if (str.value[i] == ' ') continue;
      if (!copy.includes(str.value[i])) {
        str.parentElement.classList.add('error');
        return 0;
      } else {
        str.parentElement.classList.remove('error');
      }
    }
  }

  return 1;
}

function validateSet(...elts) {
  let testExp = new RegExp(/(.).*\1/);
  for (let elt of elts) {
    if (testExp.test(elt.value)) {
      elt.parentElement.classList.add('error');
      return 0;
    } else {
      elt.parentElement.classList.remove('error');
    }
  }

  return 1;
}
