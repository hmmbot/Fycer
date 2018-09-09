const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.on('guildCreate', guild => {
  let channel = client.channels.get("487692001933000725")
      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`Giriş ${guild.name}`)
      .setThumbnail(guild.iconURL)
      .addField("Kurucu", guild.owner)
      .addField("Sunucu ID", guild.id, true)
      .addField("Toplam Kullanıcı", guild.memberCount, true)
      .addField("Toplam Kanal", guild.channels.size, true)
       channel.send(embed);
  });
client.on('guildDelete', guild => {
  let channel = client.channels.get("487692001933000725")
      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`Çıkış ${guild.name}`)
      .setThumbnail(guild.iconURL)
      .addField("Kurucu", guild.owner)
      .addField("Sunucu ID", guild.id, true)
      .addField("Toplam Kullanıcı", guild.memberCount, true)
      .addField("Toplam Kanal", guild.channels.size, true)
       channel.send(embed);
  });

  client.on("message", message => {
    client.on("message", message => {
      client.on("message", message => {
      })
    })
  })
  let ot = JSON.parse(fs.readFileSync("./jsonlar/otoR.json", "utf8"));

client.on("guildMemberAdd", member => {
  
  if (!ot[member.guild.id]) return;
  
  var rol = ot[member.guild.id].otoRol;
  if (!rol) return;
  
  member.addRole(rol)
  
})
  
    client.on("message", message => {

      if (message.author.bot) return
      
      if (message.guild.id !== "483608125228974080") return
      
      client.channels.get("487691916142444544").send(`Mesaj! \n\nMesajı Gönderen: ${message.author.tag} \nMesaj: ${message.content}`)
      
      });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.author);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyDSiyHBWZI9dDZBWXloNVhrHbpzTTfa0L8');
const queue = new Map();
const { RichEmbed } = require('discord.js');

client.on("message", async message => {
  
  if (!message.guild) return;
  
  let prefix = "f!";
  
  var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(' ');
  var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  var serverQueue = queue.get(message.guild.id);
  
    switch (args[0].toLowerCase()) {
        
      case "oynat":
    var voiceChannel = message.member.voiceChannel;
    const voiceChannelAdd = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Lütfen herhangi bir sesli kanala katılınız.`)
    if (!voiceChannel) return message.channel.send(voiceChannelAdd);
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const warningErr = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.`)
      return message.channel.send(warningErr);
    }
    if (!permissions.has('SPEAK')) {
      const musicErr = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`)
      return message.channel.send(musicErr);
    }
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      var playlist = await youtube.getPlaylist(url);
      var videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        var video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message, voiceChannel, true);
      }
      const PlayingListAdd = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`[${playlist.title}](https://www.youtube.com/watch?v=${playlist.id}) İsimli şarkı oynatma listesine Eklendi.`)
      return message.channel.send(PlayingListAdd);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          var index = 0;
          const embed = new RichEmbed()
          .setColor("RANDOM")
          .setTitle(`Şarkı Seçimi`)
          .setDescription(`${videos.map(video2 => `\`${++index}\`) [${video2.title}](https://www.youtube.com/watch?v=${video2.id})`).join('\n')} \n\nLütfen hangi şarkıyı seçmek istiyorsan \`1\` ile \`10\` arası bir sayı yaz.`)
          .setFooter(`Şarkı seçimi "30" saniye içinde iptal edilecektir.`)
          message.channel.send({embed})
          try {
            var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
              maxMatches: 1,
              time: 30000,
              errors: ['time']
            });
          } catch (err) {
            console.error(err);
            const NoNumber = new RichEmbed()
            .setColor("RANDOM")
            .setDescription(`Hiç bir değer girilmedi şarkı seçimi iptal edildi!`) 
            return message.channel.send(NoNumber);
          }
          
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          const songNope = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Aradığınız isimde bir şarkı bulamadım.`) 
          return message.channel.send(songNope);
        }
      }
      return handleVideo(video, message, voiceChannel);
    }
    break;
      case "geç":
      const err0 = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`Bir sesli kanalda değilsin.`) 
    if (!message.member.voiceChannel) return message.channel.send(err0);
    const err05 = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(err05);
    const songSkip = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Şarkı başarıyla geçildi!`)
    serverQueue.connection.dispatcher.end('');
    message.channel.send(songSkip)
    return undefined;
break;
      case "durdur":
    const err1 = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voiceChannel) return message.channel.send(err1);
    const err2 = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(err2);
    serverQueue.songs = [];
    const songEnd = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Şarkı başarıyla durduruldu!`)
    serverQueue.connection.dispatcher.end('');
    message.channel.send(songEnd)
    return undefined;
break;
      case "ses":
      const asd1 = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voiceChannel) return message.channel.send(asd1);
    const asd2 = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(asd2);

    if (!args[1]) return message.reply("Ses seviyesi ayarlamak için bir sayı yaz!");
    serverQueue.volume = args[1];
    if (args[1] > 15) return message.channel.send(`Ses seviyesi en fazla \`15\` olarak ayarlanabilir.`)
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    const volumeLevelEdit = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Ayarlanan Ses Seviyesi: **${args[1]}**`)
    return message.channel.send(volumeLevelEdit);
break;
      case "kuyruk":
      var siralama = 0;
    if (!serverQueue) return message.channel.send('Şuanda herhangi bir şarkı çalmıyor.');
        
    const kuyruk = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField("Şuanda Oynatılan", `[${serverQueue.songs[0].title}](https://www.youtube.com/watch?v=${serverQueue.songs[0].id})`)
    .addField("Şarkı Kuyruğu", `${serverQueue.songs.map(song => `${++siralama}) [${song.title}](https://www.youtube.com/watch?v=${song.id})`).join('\n')}`)
    return message.channel.send(kuyruk)
break;
case "duraklat":
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        const asjdhsaasjdha = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Şarkı başarıyla duraklatıldı!`)
      return message.channel.send(asjdhsaasjdha);
    }
    return message.channel.send('Şuanda herhangi bir şarkı çalmıyor.');
break;
      case "devamet":
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        const asjdhsaasjdhaadssad = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Şarkı başarıyla devam ettiriliyor...`)
      return message.channel.send(asjdhsaasjdhaadssad);
    }
    return message.channel.send('Şuanda herhangi bir şarkı çalmıyor.');
  

  return undefined;
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
  var serverQueue = queue.get(message.guild.id);
  //console.log(video);
  var song = {
    id: video.id,
    title: video.title,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
                durations: video.duration.seconds,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
    requester: message.author.id,
  };
  if (!serverQueue) {
    var queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Ses kanalına giremedim HATA: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(`Ses kanalına giremedim HATA: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    //console.log(serverQueue.songs);
    if (playlist) return undefined;

    const songListBed = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id}) isimli şarkı kuyruğa eklendi!`)
    return message.channel.send(songListBed);
  }
  return undefined;
}
  function play(guild, song) {
  var serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  //console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
    .on('end', reason => {
      if (reason === 'İnternetten kaynaklı bir sorun yüzünden şarkılar kapatıldı.');
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
  const playingBed = new RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Şuanda Oynatılıyor`, "https://davidjhinson.files.wordpress.com/2015/05/youtube-icon.png")
  .setDescription(`[${song.title}](${song.url})`)
  .addField("Şarkı Süresi", `${song.durationm}:${song.durations}`, true)
  .addField("Şarkıyı Açan Kullanıcı", `<@${song.requester}>`, true)
  .setThumbnail(song.thumbnail)
  serverQueue.textChannel.send(playingBed);
}
});

client.on('message', msg => {
if (msg.content.toLowerCase() === prefix + 'avatar') 
  msg.guild.member.avatarURL

});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.reply('Aleyküm selam,  hoş geldin ^^'); 
    }
  } 
		
});
client.on("message", msg => {
  const kufur = ["amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "meme", "göt", "götünü sikim"];
  if (kufur.some(word => msg.content.includes(word)) ) {
      msg.delete()
      msg.reply("Küfür etme!")
  }
});
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
