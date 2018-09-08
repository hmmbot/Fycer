const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../ayarlar.json');
let rol = JSON.parse(fs.readFileSync("././jsonlar/sRol.json", "utf8"));

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let role = message.mentions.roles.first()
  
    if (!role) {
        return message.reply("Ayarlamak istediğin rolü etiketlemelisin!")
    }

    if(!rol[message.guild.id]){
        rol[message.guild.id] = {
            susturRol: role.id
        };
    }
    fs.writeFile("././jsonlar/sRol.json", JSON.stringify(rol), (x) => {
        if (x) console.error(x)
      })
    const embed = new Discord.RichEmbed()
    .setTitle(`» Susturma rolü başarıyla **${role.name}** olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sustur-rol', 'sustur-rol-belirle'],
    permLevel: `Yönetici izni gerekiyor.`
}

exports.help = {
    name: 'sustur-rol-ayarla',
    category: 'moderasyon',
    description: 'Birisi susturulunca verilecek rolü ayarlar.',
    usage: 'sustur-rol-ayarla <@rol>'
}