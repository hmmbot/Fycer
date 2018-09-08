const Discord = require('discord.js');
 
exports.run = function(client, message) {
  
    message.channel.send("Bot yeniden başlatılıyor").then(msg => {
    console.log("Bot yeniden başlatılıyor");
    process.exit(0);  
  });

} 

exports.conf = {
  enabled: true,  
  guildOnly: false,  
  aliases: [],  
  permLevel: 4 
};

exports.help = {
  name: 'reboot',  
  description: 'Botu yeniden baslatir!', 
  usage: 'reboot'  
};
