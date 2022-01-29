const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5)
}

const convertTime = (time) => {
  return '0' + (Math.floor(time / 60)) + ':' + (time % 60 < 10 ? '0' : '') + time % 60;
}

export { shuffle, convertTime }