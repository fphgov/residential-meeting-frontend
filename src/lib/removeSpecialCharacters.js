export const rmEmojis = (text) => {
  return text
        .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
        .replace(/(\u00A9|\u00AE|[\u2000-\u3300]|\uD83C[\uD000-\uDFFF]|\uD83D[\uD000-\uDFFF]|\uD83E[\uD000-\uDFFF])/g, '')
}

export const rmHrefs = (text) => {
  return text.replace(/http(s?):\/\/|ftp:\/\/|www./g, '')
}

export const rmForNumber = (text) => {
  return rmEmojis(text.replace(/[\D]/gi, ''))
}

export const rmAllChar = (text) => {
  return rmEmojis(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
}

export const rmAllCharForEmail = (text) => {
  return rmEmojis(text.replace(/[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, ''))
}

export const rmAllCharForName = (text) => {
  return rmHrefs(rmEmojis(text.replace(/[`~!@#$%^&*()_|+\=?;:'",<>\{\}\[\]\\\/]/gi, '')))
}

export const rmAllCharForTitle = (text) => {
  return rmHrefs(rmEmojis(text.replace(/[`~@#$^*_|\=;<>\{\}\[\]\\]/gi, '')))
}

export const rmAllCharForAddress = (text) => {
  return rmHrefs(rmEmojis(text.replace(/[`~!@#$%^&*()_|+\=?;:'"<>\{\}\[\]\\]/gi, '')))
}
