export default function myMask(num) {
  num.split('')
  let first = num[0] + num[1]
  let second = num[2] + num[3] + num[4]
  let third = num[5] + num[6] + num[7] + '-'
  let forth = num[8] + num[9] + '-'
  let fifth = num[10] + num[11]

  return first + ' (' + `${second}` + ') ' + third + forth + fifth
}
