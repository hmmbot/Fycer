const Discord = require('discord.js');


exports.run = function(client, message) {

    message.channel.send(`**Botun pingi:  ${client.ping} ms**`);
};

exports.conf = {
  enabled: true,  
  guildOnly: false,  
  aliases: ['ping','p'],  
  permLevel: 2 
};

exports.help = {
  name: 'ping',  
  description: 'Botun pingini gösterir',  
  usage: 'ping' 
};
