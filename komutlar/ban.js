const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {

if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.reply(`Botun yeterli yetkisi yok!!`);
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  let modLog = JSON.parse(fs.readFileSync("./jsonlar/mLog.json", "utf8"));
  if (!modLog[message.guild.id]) return message.reply('Lütfen **mod-log-ayarla** komutu ile Moderasyon Kayıtları kanalı ayarlayınız!');
  let modlog = message.guild.channels.get(modLog[message.guild.id].modlog);
  if (message.mentions.users.size < 1) return message.reply('Yasaklayacağın kişiyi etiketlemelisin!');
  if (reason.length < 1) return message.reply('Yasaklama sebebini yazmadın!');
  if (user.id === message.author.id) return message.reply('Kendini yasaklayamazsın!');
  /*if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  if (!message.guild.member(user).bannable) return message.channel.send(`Bu kişiyi sunucudan yasaklayamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Yasaklama/Ban')
  .addField('Yasaklanan Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Yasaklayan Yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Yasaklanma Sebebi', "```" + reason + "```")
  modlog.send(embed);
  
   if (!message.guild.member(user).bannable) return message.reply('Yetkilileri yasaklayamam!');
  message.guild.ban(user, 2);
  
  
  message.channel.send(`<@${user.id}> **adlı kullanıcı başarıyla yasaklandı!**`)
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yasakla"],
  permLevel: `Üyeleri yasakla yetkisine sahip olmak gerekir.`
};

exports.help = {
  name: 'ban',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban <@kişi-etiket> <sebep>'
};