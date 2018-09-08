const Discord = require('discord.js');

exports.run = function(client, message, args) {

var user = message.mentions.members.first();
if (!user) return message.reply("Bilgi almak istediğin kişiyi etiketlemelisin!")

    const embed = new Discord.RichEmbed()
    .setAuthor(user.user.tag)
    .setImage(user.user.avatarURL)
   
       
    
    message.channel.send(embed)

};

exports.conf = {
  enabled: true,  
  guildOnly: false,  
  aliases: ['avatar'],  
  permLevel: 0
};

exports.help = {
  name: 'avatar',  
  description: 'Kullanıcının avatarını gosterir',  
  usage: 'avatar' 
};
