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
    .setImage(`https://turkbayraklari.com/wp-content/uploads/2015/11/turk-bayragi-gif.gif`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['türk', 'tr'],
  permLevel: 0
};

exports.help = {
  name: 'türkiye',
  description: 'Türk bayrağı atar',
  usage: 'türkiye'
};
