function convertStringToNumber(statement){
  const numberWords = [
    'không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười',
    'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu',
    'mười bảy', 'mười tám', 'mười chín', 'hai mươi', 'hai mươi một', 'hai mươi hai',
    'hai mươi ba', 'hai mươi bốn', 'hai mươi lăm', 'hai mươi sáu', 'hai mươi bảy',
    'hai mươi tám', 'hai mươi chín', 'ba mươi', 'ba mươi một', 'ba mươi hai',
    'ba mươi ba', 'ba mươi bốn', 'ba mươi lăm', 'ba mươi sáu', 'ba mươi bảy',
    'ba mươi tám', 'ba mươi chín', 'bốn mươi', 'bốn mươi một', 'bốn mươi hai',
    'bốn mươi ba', 'bốn mươi bốn', 'bốn mươi lăm', 'bốn mươi sáu', 'bốn mươi bảy',
    'bốn mươi tám', 'bốn mươi chín', 'năm mươi', 'năm mươi một', 'năm mươi hai',
    'năm mươi ba', 'năm mươi bốn', 'năm mươi lăm', 'năm mươi sáu', 'năm mươi bảy',
    'năm mươi tám', 'năm mươi chín', 'sáu mươi', 'sáu mươi một', 'sáu mươi hai',
    'sáu mươi ba', 'sáu mươi bốn', 'sáu mươi lăm', 'sáu mươi sáu', 'sáu mươi bảy',
    'sáu mươi tám', 'sáu mươi chín', 'bảy mươi', 'bảy mươi một', 'bảy mươi hai',
    'bảy mươi ba', 'bảy mươi bốn', 'bảy mươi lăm', 'bảy mươi sáu', 'bảy mươi bảy',
    'bảy mươi tám', 'bảy mươi chín', 'tám mươi', 'tám mươi một', 'tám mươi hai',
    'tám mươi ba', 'tám mươi bốn', 'tám mươi lăm', 'tám mươi sáu', 'tám mươi bảy',
    'tám mươi tám', 'tám mươi chín', 'chín mươi', 'chín mươi một', 'chín mươi hai',
    'chín mươi ba', 'chín mươi bốn', 'chín mươi lăm', 'chín mươi sáu', 'chín mươi bảy',
    'chín mươi tám', 'chín mươi chín', 'một trăm'
  ];
  const reversedNumberWords = numberWords.reverse();

  const numberMap = [];
  for (let i = 0; i < numberWords.length; i++) {
    numberMap[numberWords[i]] = numberWords.length - i - 1;
  }

  for (var i = 0; i < reversedNumberWords.length; i++) {
    if (statement.includes(reversedNumberWords[i])) {
        statement = statement.replace(reversedNumberWords[i], numberMap[reversedNumberWords[i]])
        break;
    }
  }

  return statement;
}

module.exports = convertStringToNumber;