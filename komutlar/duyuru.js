const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    var mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply("Duyuru mesajını yazmalısın!")
  
message.channel.send('@everyone').then(message => message.delete(1000));

   let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor("Duyuru!")
.setThumbnail('https://cdn.discordapp.com/attachments/416282172530491392/486601913245368320/arkaplan....png')
.setDescription(mesaj)
.setFooter(`Duyuru yapan kişi: ${message.author.tag}`)
message.channel.send(embed)

message.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'duyuru',
  description: 'Sunucunuzda duyuru yaparsınız.',
  usage: 'duyuru <mesaj>'
};