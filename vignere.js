function encrypt(msg, keyword, vSet) {
  let encrypted = '';
  let keyedMsg = msg
    .split(' ')
    .map((x) => {
      let toRepeat = keyword.repeat(Math.floor(x.length / keyword.length));
      let extra = keyword.substring(0, x.length % keyword.length);
      return toRepeat + extra;
    })
    .join(' ');

  for (let i = 0; i < msg.length; i++) {
    if (msg[i] == ' ') {
      encrypted += ' ';
      continue;
    }
    let x = vSet.find((x) => x[0] == msg[i]);
    let char = x[vSet[0].findIndex((x) => x == keyedMsg[i])];
    encrypted += char;
  }

  return encrypted;
}

function createVignereSet(key, letters = 'abcdefghijklmnopqrstuvwxyz') {
  if (/(\w)(.+)?\1/.test(key)) throw Error('Repeating letters in key value');

  const keyedAlphabet = key + letters.replace(new RegExp(`[${key}]`, 'g'), '');
  const vSet = [];

  for (let i = 0; i < keyedAlphabet.length; i++) {
    let line = keyedAlphabet.substring(i) + keyedAlphabet.substring(0, i);
    vSet.push(line.split(''));
  }

  return vSet;
}
