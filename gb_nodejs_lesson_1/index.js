let colors = require('colors');
const readline = require('readline-sync');

prime_numbers = (start_num, end_num) => {
  let color_id = 1;
  let num_count = 0;

  for (let index = start_num; index <= end_num; index++) {
    let flag = true;
    for (let i = 2; i < index; i++) {
      if (index % i == 0) {
        flag = false;
        break;
      }
    }
    if ((i = index) && flag) {
      num_count++;
      switch (color_id) {
        case 1: {
          console.log(colors.green(index));
          color_id = 2;
          break;
        }
        case 2: {
          console.log(colors.yellow(index));
          color_id = 3;
          break;
        }
        case 3: {
          console.log(colors.red(index));
          color_id = 1;
          break;
        }
      }
    }
  }
  if (num_count == 0) {
    console.log(colors.red('В указанном диапазоне нет простых чисел'));
  }
  return;
};

const start = readline.question('Введите начальное число диапазона: ');
const end = readline.question('Введите конечное число диапазона: ');

if (isNaN(start) || isNaN(end)) {
  console.log(colors.red('Ошибка: Одно из введенных значений не является числом'));
} else {
  prime_numbers(parseInt(start), parseInt(end));
}
