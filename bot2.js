const Discord = require('discord.js')
const ytdl = require("ytdl-core");
const { Client, Util } = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const client = new Discord.Client();

    var setGame = ['-play','By : Mefo_EGY|🆁🅰','Server : MOT'];
    var i = -1;client.on('ready', function(){
    var ms = 60000 ;
    var j = 0;
    setInterval(function (){
        if( i == -1 ){
            j = 1;
        }
        if( i == (setGame.length)-1 ){
            j = -1;
        }
        i = i+j;
     client.user.setActivity(setGame[i],{type: 'WATCHING'});
    }, ms);
});

client.on('ready', () => {
client.user.setStatus("dnd");
});

const prefix = "-"
client.on('message', async msg => {
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1] .replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length)
    if (command === `play`) {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('يجب توآجد حضرتك بروم صوتي .');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('لا يتوآجد لدي صلاحية للتكلم بهذآ الروم');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('لا يتوآجد لدي صلاحية للتكلم بهذآ الروم');
        }
 
        if (!permissions.has('EMBED_LINKS')) {
            return msg.channel.sendMessage("**يجب توآفر برمشن `EMBED LINKS`لدي **rl")
            }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true);
            }
            return msg.channel.send(` **${playlist.title}** تم الإضآفة إلى قأئمة التشغيل`);
        } else {
            try {
 
                var video = await youtube.getVideo(url);
 
            } catch (error) {
                try {
                                            var fast = {};
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setAuthor(msg.author.username, msg.author.avatarURL)
                    .setThumbnail(`https://a.top4top.net/p_1014tyjb81.png`)
                    .setDescription(`**الرجآء إختيآر رقم المقطع** :
${videos.map(video2 => `[**${++index}**] **${video2.title}**`).join('\n')}`)
                    .setFooter(`${msg.guild.name}`)
                    .setColor("#36393F")
                    .setFooter("MOT","https://f.top4top.net/p_1082uu2v51.jpg")  
                    .setTimestamp()
                    msg.channel.sendEmbed(embed1).then(message =>{
 
                        message.delete(15000)
 
                    });
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 20000,
                            errors: ['time']
                        })
 
                        }catch(err) {
                        console.error(err);
                        return msg.channel.send('لم يتم إختيآر مقطع صوتي');
                        }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send(':x: لا يتوفر نتآئج بحث ');
                }
        }
 
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === `skip`) {
        if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');
        msg.react('⏭');
        if (!serverQueue) return msg.channel.send('لا يتوفر مقطع لتجآوزه');
        serverQueue.connection.dispatcher.end('تم تجآوز هذآ المقطع');
        return undefined;
    } else if (command === `stop`) {
        if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');
        msg.react('🛑');
        if (!serverQueue) return msg.channel.send('لا يتوفر مقطع لإيقآفه');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('تم إيقآف هذآ المقطع');
        return undefined;
    } else if (command === `vol`) {
        if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');
        msg.react('🔊');
        if (!serverQueue) return msg.channel.send('لا يوجد شيء شغآل.');
        if (!args[1]) return msg.channel.send(`:loud_sound: مستوى الصوت **${serverQueue.volume}**`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
        return msg.channel.send(`:speaker: تم تغير الصوت الي **${args[1]}**`);
    } else if (command === `np`) {
        if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');
        msg.react('📼');
        const embedNP = new Discord.RichEmbed()
    .setDescription(`:notes: الان يتم تشغيل : **${serverQueue.songs[0].title}**`)
        .setColor("#36393F")
        return msg.channel.sendEmbed(embedNP);
    } else if (command === `replay`) {
        if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');
        msg.react('⏮');
        const embedNP = new Discord.RichEmbed()
    .setDescription(`سيتم اعاده تشغيل الاغنية : **${serverQueue.songs[0].title}**`)
        .setColor("#36393F")
    msg.channel.send({embed: embedNP})
     return handleVideo(video, msg, msg.member.voiceChannel);
 
    } else if (command === `queue`) {
        if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');
        msg.react('🎶');  
        let index = 0;
        const embedqu = new Discord.RichEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL)
.setDescription(`**قائمة التشغيل**
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}
**الان يتم تشغيل : ** ${serverQueue.songs[0].title}`)
        .setFooter("MOT","https://f.top4top.net/p_1082uu2v51.jpg")
        .setTimestamp()
        .setColor("#36393F")
        return msg.channel.sendEmbed(embedqu);
    } else if (command === `p`) {
        if (serverQueue && serverQueue.playing) {
          msg.react('⏸');
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send('تم إيقاف الاغنية مؤقتا!');
        }
        return msg.channel.send('لا يوجد شيء حالي ف العمل.');
    } else if (command === "r") {
        if (serverQueue && !serverQueue.playing) {
          msg.react('⏯');
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send('تم استكمال الاغنية !');
        }
        return msg.channel.send('لا يوجد شيء حالي في العمل.');
    }
 
    return undefined;
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        time:`${video.duration.hours}:${video.duration.minutes}:${video.duration.seconds}`,
        eyad:`${video.thumbnails.hMOTh.url}`,
        best:`${video.channel.title}`,
        bees:`${video.raw.snippet.publishedAt}`,
        shahd:`${video.raw.kind}`,
        zg:`${video.raw.snippet.channelId}`,
        views:`${video.raw.views}`,
	like:`${video.raw.likeCount}`,
        dislike:`${video.raw.dislikeCount}`,
        hi:`${video.raw.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`لا أستطيع دخول هذآ الروم ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(` **${song.title}** تم اضافه الاغنية الي القائمة!`);
    }
    return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
 
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        fetchVideoInfo(`${song.hi}`, function (err, fuck) {
  if (err) throw new Error(err);
  console.log(fuck);
      const yyyy = {}
  if(!yyyy[msg.guild.id]) yyyy[msg.guild.id] = {
  }
    serverQueue.textChannel.send({embed : new Discord.RichEmbed()
   .setAuthor(msg.author.username, msg.author.avatarURL)
   .addField('▶️ ** Playing **', `
              **${fuck.title}**`)
  .addField('وقت المقطع :' , `${song.time}`, true)
  .addField('اسم القناة :' , `${song.best}`, true)
  .addField('تاريخ نشر المقطع :' , `${fuck.datePublished}`, true)
  .addField('المشاهدات :' , `${fuck.views}`, true)
  .addField('اللايك👍' , `${fuck.likeCount}`, true)
  .addField('الديسلايك👎' , `${fuck.dislikeCount}`, true)
    .setThumbnail(`${song.eyad}`)
    .setColor('#36393F')
    .setFooter("MOT","https://f.top4top.net/p_1082uu2v51.jpg")
    .setTimestamp()
});
})
}
});



client.on('ready', () => {
	client.channels.get("467063263465570314").join();
	});

client.on('message', message => {
     if (message.content === "servers") {
     let embed = new Discord.RichEmbed()
  .setColor("#36393F")
  .addField("**Server: **" , client.guilds.size)
  message.channel.sendEmbed(embed);
    }
if (message.content === '-help') {
         let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
      .addField("**🎵 Music Commands | اومر الاغاني 🎵**","** **")
      .addField("**▶️ -play **","**لـ تشغيل الاغنية**")
      .addField("**🛑 -stop **","**لـ ايقاف الاغنية**")
      .addField("**🔊 -vol **","**لـ تعلية الصوت او انخفاضه**")
      .addField("**📼 -np **","**لـ معرفة الاغنية التي تعمل الان**")
      .addField("**⏮ -replay **","**لـ اعادة تشغيل الاغنية**")
      .addField("**🎶 -queue **","**لـ معرفة قائمة التشغيل**")
      .addField("**⏸ -p **","**لـ ايقاف الاغنية مؤقتا**")
      .addField("**⏯ -r **","**لـ استكمال الاغنية**")
	 
.setColor("#36393F")
.setFooter("MOT","[url=https://f.top4top.net/p_1082uu2v51.jpg][/url]")
.setTimestamp()	 
  message.author.sendEmbed(embed);
    }
});

client.on('message', message => {
     if (message.content === "servers") {
     let embed = new Discord.RichEmbed()
  .setColor("#36393F")
  .addField("**Server: **" , client.guilds.size)
  message.channel.sendEmbed(embed);
    }
if (message.content === '-help') {
         let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)    
      .addField("**:wrench: Programmer bot | مبرمج البوت :wrench: **",
		                                                                "**     @ Mefo_EGY|🆁🅰#9743**")

.setColor("#36393F")
.setFooter("MOT","[url=https://f.top4top.net/p_1082uu2v51.jpg[/jpg][/url]")
.setTimestamp()	 
  message.author.sendEmbed(embed);
    }
});

client.on('message', message => {
if (message.content === "-help") {
message.react("📩")
}
});

client.on('message', msg => {
  if (msg.content === '-help') {
    msg.reply(':envelope: | تم ارسال الرساله في الخاص');

  }
});

client.login(process.env.BOT_TOKEN);
