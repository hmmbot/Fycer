const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {

if (!message.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")) return message.reply(`Botun yeterli yetkisi yok!!`);
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  let modLog = JSON.parse(fs.readFileSync("./jsonlar/mLog.json", "utf8"));
  if (!modLog[message.guild.id]) return message.reply('Lütfen **mod-log-ayarla** komutu ile Moderasyon Kayıtları kanalı ayarlayınız!');
  let modlog = message.guild.channels.get(modLog[message.guild.id].modlog);
  if (message.mentions.users.size < 1) return message.reply('Atacağın kişiyi etiketlemelisin!');
  if (reason.length < 1) return message.reply('Atma sebebini yazmadın!');
  if (user.id === message.author.id) return message.reply('Kendini atamazsın!');
  /*if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  if (!message.guild.member(user).kickable) return message.channel.send(`Bu kişiyi sunucudan atamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Atma/Kick')
  .addField('Atılan Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Atan Yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Atılma Sebebi', "```" + reason + "```")
  modlog.send(embed);
  
  message.guild.member(user).kick();
  
  
  message.channel.send(`<@${user.id}> **adlı kullanıcı başarıyla atıldı!**`)
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["at"],
  permLevel: `Üyeleri at yetkisine sahip olmak gerekir.`
};

exports.help = {
  name: 'kick',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'kick <@kişi-etiket> <sebep>'
};