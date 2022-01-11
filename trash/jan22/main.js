function mostCommonLetter(str) {
    let charObj = {}
    let mostCommon = 0
    let word = ''
    for (let char of str) {
        if (charObj[char]) {
            charObj[char]++
        } else {
            charObj[char] = 1
        }
    }
    for (let char in charObj) {
        if (charObj[char] > mostCommon) {
            mostCommon = charObj[char]
            word = char
        }
    }
    console.log(word)
}
mostCommonLetter()