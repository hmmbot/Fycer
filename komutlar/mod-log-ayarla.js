const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../ayarlar.json');
let kanal = JSON.parse(fs.readFileSync("././jsonlar/mLog.json", "utf8"));

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply("Mod log olarak ayarlamak istediğiniz kanalı etiketlemelisiniz!")
    }

    if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            modlog: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/mLog.json", JSON.stringify(kanal), (x) => {
        if (x) console.error(x)
      })
  
    const embed = new Discord.RichEmbed()
    .setDescription(`» Moderasyon Kayıtları kanalı başarıyla ${channel} olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log-belirle'],
    permLevel: `Yönetici izni gerekiyor.`
}

exports.help = {
    name: 'mod-log-ayarla',
    category: 'moderasyon',
    description: 'Moderasyon kayıtları kanalını ayarlar.',
    usage: 'mod-log-ayarla <#kanal>'
}