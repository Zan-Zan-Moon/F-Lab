// Promise 연습
function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('1'), ms);
  });
}

delay(3000).then(() => console.log('3초후 실행'));
delay(3000)
  .then((res) => {
    return `${res} + 1`;
  })
  .then((res) => {
    console.log(res);
  });
