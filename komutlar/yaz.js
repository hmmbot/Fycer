const Discord = require('discord.js');


exports.run = function(client, message, args) {
    const mesaj = args.slice(0).join(' ')
    if (mesaj <1) {
        message.reply("Yazmam icin bir mesaj belirle")
    }
    else{
        message.delete();
        message.channel.send(mesaj)
    }

   
};

exports.conf = {
  enabled: true,  
  guildOnly: false,  
  aliases: [],  
  permLevel: 4 
};

exports.help = {
  name: 'yaz',  
  description: 'Botun pingini gösterir',  
  usage: 'yaz' 
};
