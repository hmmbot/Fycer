const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {

if (!message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) return message.reply(`Botun yeterli yetkisi yok!!`);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let modLog = JSON.parse(fs.readFileSync("./jsonlar/mLog.json", "utf8"));
  if (!modLog[message.guild.id]) return message.reply('Lütfen **mod-log-ayarla** komutu ile Moderasyon Kayıtları kanalı ayarlayınız!');
  let sRol = JSON.parse(fs.readFileSync("././jsonlar/sRol.json", "utf8"));
  if (!sRol[message.guild.id]) return message.reply('Lütfen **sustur-rol-ayarla** komutu ile Susturma rolü ayarlayınız!');
  let modlog = message.guild.channels.get(modLog[message.guild.id].modlog);
  let muteRole = message.guild.roles.get(sRol[message.guild.id].susturRol);
  if (message.mentions.users.size < 1) return message.reply('Susturmasını kaldıracağın kişiyi etiketlemelisin!');
  if (user.id === message.author.id) return message.reply('Kendinin susturmasını kaldıramazsın!');
  /*if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  if (!message.guild.member(user).roles.has(muteRole.id)) return message.reply('Bu kişi susturulmamış!');
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Susturma Kaldırma')
  .addField('Susturması Kaldırılan Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Susturmayı Kaldıran Yetkili', `${message.author.username}#${message.author.discriminator}`)
  modlog.send(embed);
  
  message.guild.members.get(user.id).removeRole(muteRole)
  
  
  message.channel.send(`<@${user.id}> **adlı kullanıcının başarıyla susturulması kaldırıldı!**`)
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute", "sustur-kaldır"],
  permLevel: `Mesajları yönet yetkisine sahip olmak gerekir.`
};

exports.help = {
  name: 'susturma',
  category: 'moderasyon',
  description: 'Susturulmuş bir kişinin susturmasını kaldırmayı sağlar.',
  usage: 'susturma <@kişi-etiket>'
};
