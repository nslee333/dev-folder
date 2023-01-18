
const arrayToParse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrayToParse2 = [1, 2, 3, -2, 5, 6, 7, 8, 9, 1000];


const find = (array) => {
    
  let highValue = array[0];
  let highValueIndex = 0;
  let lowValue = array[0];
  let lowValueIndex = 0;



  for (let i = 0; i < 8; i++) {
    console.log(i);
    if (array[i] > highValue) {
      highValue = array[i];
      highValueIndex = i;
    }
    
    if (array[i] < lowValue) {
      lowValue = array[i];
      lowValueIndex = i;
    }
  }
    
    return {highValue, lowValue, highValueIndex, lowValueIndex};
}

console.log(find(arrayToParse));
console.log(find(arrayToParse2));