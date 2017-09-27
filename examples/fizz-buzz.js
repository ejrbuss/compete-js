const challenge = require('../compete');

const fizzbuzz = n =>
    n % (3 * 5) ? (n % 3 ? (n % 5 ? n : 'Buzz') : 'Fizz') : 'FizzBuzz';

challenge({ out : 'out.txt' }, parseInt, fizzbuzz);