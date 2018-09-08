module.exports = member => {
module.exports =client => {
    let username = member.user.username;
    client.channels.get("485027669419884546").send(`\`${username}\` adlı kullanıcı ${guild.name} sunucusuna  giriş yaptı`)
}};




 