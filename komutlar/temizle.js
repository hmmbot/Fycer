const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = function(client, message, args) {
  
 if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  if (!args[0]) return message.reply("Temizlemek istediğin mesaj sayısını yazmalısın!")
  
  if (args[0] < 1) return message.reply("**1** adetten az mesaj silemem!")
if (args[0] > 100) return message.reply("**100** adetten fazla mesaj silemem!")
  
  message.channel.fetchMessages({
    limit: args[0]
  }).then(messages => message.channel.bulkDelete(messages));
  
  message.channel.send(`**${args[0]}** adet mesaj başarıyla silindi!`).then(msg => {
    msg.delete(3000)
})
  
    message.delete();

};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["sil", "mesaj-sil", "mesajları-sil"],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Belirtilen miktarda mesaj siler.',
  usage: 'temizle <miktar>'
};