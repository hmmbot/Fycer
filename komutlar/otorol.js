const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../ayarlar.json');
let rol = JSON.parse(fs.readFileSync("././jsonlar/otoR.json", "utf8"));

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let role = message.mentions.roles.first() || message.guild.roles.find(r => r.name === args.slice(0).join(' '));
  
    if (!role) {
        return message.reply("Ayarlamak istediğin rolü yazmalısın!")
    }

    if(!rol[message.guild.id]){
        rol[message.guild.id] = {
            otoRol: role.id
        };
    }
    fs.writeFile("././jsonlar/otoR.json", JSON.stringify(rol), (x) => {
        if (x) console.error(x)
      })
    const embed = new Discord.RichEmbed()
    .setDescription(`» Oto rol başarıyla **${role.name}** olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['oto-rol', 'oto-rol-belirle'],
    permLevel: `Yönetici izni gerekiyor.`
}

exports.help = {
    name: 'otorol',
    category: 'ayarlar',
    description: 'Sunucuya birisi katıldıgında verilecek rolü ayarlar.',
    usage: 'otorol <@rol>'
}