module.exports = member => {
 member.kick(7)
  .then(() => console.log(`Hos gitdin ${member.username}`))
  .catch(console.error)
};