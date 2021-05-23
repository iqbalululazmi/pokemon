export const randomNameGenerator = () => {
  const num = 6
  let res = ''
  const datetime = new Date().toISOString()
  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * 27)
    res += String.fromCharCode(97 + random)
  }
  return `${datetime.substring(0, 10)}-${res}`
}
