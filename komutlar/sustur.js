const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {

  if (!message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) return message.reply(`Botun yeterli yetkisi yok!!`);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  let modLog = JSON.parse(fs.readFileSync("./jsonlar/mLog.json", "utf8"));
  if (!modLog[message.guild.id]) return message.reply('Lütfen **mod-log-ayarla** komutu ile Moderasyon Kayıtları kanalı ayarlayınız!');
  let sRol = JSON.parse(fs.readFileSync("././jsonlar/sRol.json", "utf8"));
  if (!sRol[message.guild.id]) return message.reply('Lütfen **sustur-rol-ayarla** komutu ile Susturma rolü ayarlayınız!');
  let modlog = message.guild.channels.get(modLog[message.guild.id].modlog);
  let muteRole = message.guild.roles.get(sRol[message.guild.id].susturRol);
  if (!modLog[message.guild.id]) return message.reply('Lütfen **r?sustur-rol-ayarla** yazarak Susturma Rolü ayarlayınız! \nSunucuya Özel Ön Ek var ise `r?` olmaz ayarladığınız ön ek olur.');
  if (message.mentions.users.size < 1) return message.reply('Susturacağın kişiyi etiketlemelisin!');
  if (reason.length < 1) return message.reply('Susturma sebebini yazmadın!');
  if (user.id === message.author.id) return message.reply('Kendini susturamazsın!');
  /*if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  if (message.guild.member(user).roles.has(muteRole)) return message.reply('Bu kişi zaten susturulmuş!');
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Susturma')
  .addField('Susturulan Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Susturan Yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Susturma Sebebi', "```" + reason + "```")
  modlog.send(embed);
  
  message.channel.overwritePermissions(muteRole, {
    SEND_MESSAGES: false,
  })
  
  message.guild.members.get(user.id).addRole(muteRole)
  
  message.channel.send(`<@${user.id}> **adlı kullanıcı başarıyla susturuldu!**`)
 
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  permLevel: `Mesajları yönet yetkisine sahip olmak gerekir.`
};

exports.help = {
  name: 'sustur',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi susturur.',
  usage: 'sustur <@kişi-etiket> <sebep>'
};