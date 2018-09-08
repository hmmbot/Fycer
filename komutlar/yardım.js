const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Komutlar")
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**Yetkili Komutları**", `f!kick = İstediğiniz Kişiyi Sunucudan Atar! \nf!ban = İstediğiniz Kişiyi Sunucudan Banlar! \nf!uyar = İstediğiniz Kişiyi Uyarır! \nf!sustur = İstediğiniz Kişiyi Susturur! \nf!susturma = Susturmayı Kaldırır! \nf!temizle = Mesaj siler (max 100)! \nf!duyuru =  Güzel Bir Duyuru Görünümü Sağlar! \nf!mod-log-ayarla = Modlog Ayarlar! \n!sustur-rol-ayarla = Sustur Rolu Ayarlar! \nf!otorol = Sunucuya Birisi Katıldığında Verilecek Rolü Ayarlar! \nf!ping Botun Gecikme Süresini Gösterir! `)
  .addField("**Eğlence Komutları:**", `f!alkış = Alkış Atar! \nf!avatar = İstediğiniz Kişinin Avatarını Gösterir! \nf!azerbaycan = Azerbaycan Bayrağı Atar! \nf!türkiye = Türkiye Bayrağı Atar!`)
  .addField("**Müzik Komutları**", `f!oynat = Şarkı Açar! \nf!geç = Şarkıyı Geçer! \nf!durdur = Şarkıyı Durdurur! \nf!ses = Ses Seviyesini Ayarlar! \nf!duraklat = Şarkıyı Duraklatır! \nf!devamet = Şarkıyı Devam Etdirir!`)
  .setFooter('**Fycer|BOT**')
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send('**Komutları DM den atıyorum**')
    message.author.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
