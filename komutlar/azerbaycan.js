const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
    .setImage(`http://dadli.biz/fotoalbom/files/1392747/4d52e33e5afadba5e2559f19260c753a.gif`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['aze'],
  permLevel: 0
};

exports.help = {
  name: 'azerbaycan',
  description: 'Azerbaycan bayrağı atar',
  usage: 'azerbaycan'
};
