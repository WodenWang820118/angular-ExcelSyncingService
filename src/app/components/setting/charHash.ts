const charHash = []
for (let i = 65; i < 91; i++) {
  charHash.push({
    'char': String.fromCharCode(65),
    'number': (i-65)
  })
}

export interface CharHashPair {
  'char': String,
  'number': Number
}