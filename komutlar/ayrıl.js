const Discord = require('discord.js');

exports.run = async (client, message, args) => {

if(message.author.id !== "376404681389244418") return message.reply(`bu komutu sadece Bot Sahibi kullanabilir!`);

     var isim = args.slice(0).join(' ');
   if (isim.length < 1 && !isim) return message.reply("botun ayrılmasını istediğin sunucuyu yazmalısın!");

    var sunucu = client.guilds.find(g => g.name === isim);

   sunucu.leave();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'ayrıl',
  description: 'Botu istenilen sunucudan çıkartır.',
  usage: 'ayrıl <sunucu adı>'
};