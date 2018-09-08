client.on('guildCreate', guild => {
    console.log(`${guild.name} sunucusuna katıldım ${guild.members.size} kullanıcı var`)
});