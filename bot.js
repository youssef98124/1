const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

client.on('ready', () => {
     client.user.setActivity("RAMADAN",{type: 'WATCHING'});

});



client.on('message', message => {
           if (message.content.startsWith("=id")) {
     var args = message.content.split(" ").slice(1);
     let user = message.mentions.users.first();
     var men = message.mentions.users.first();
        var heg;
        if(men) {
            heg = men
        } else {
            heg = message.author
        }
      var mentionned = message.mentions.members.first();
         var h;
        if(mentionned) {
            h = mentionned
        } else {
            h = message.member
        }
               moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
    .setColor("RANDOM")
    .addField(': انضمامك لسيرفر قبل', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)
    .addField(': دخولك لديسكورد قبل', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true)
   .setThumbnail(message.author.avatarURL)
    message.channel.send(id)
}      
          });




      client.on('guildMemberAdd', member => {
      const welcomer =  member.guild.channels.find('name', 'welcome');//اسم الروم الي يرحب فيه

      var Canvas = require('canvas')
      var jimp = require('jimp')

      const w = ['./img/w1.png',
      './img/w2.png',
      './img/w3.png',
      './img/w4.png',
      './img/w5.png',
      './img/w7.png',
      './img/w8.png'];

              let Image = Canvas.Image,
                  canvas = new Canvas(401, 202),
                  ctx = canvas.getContext('2d');
              ctx.patternQuality = 'bilinear';
              ctx.filter = 'bilinear';
              ctx.antialias = 'subpixel';
              ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
              ctx.shadowOffsetY = 2;
              ctx.shadowBlur = 2;
              fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
                  if (err) return console.log(err)
                  let BG = Canvas.Image;
                  let ground = new Image;
                  ground.src = Background;
                  ctx.drawImage(ground, 0, 0, 401, 202);

      })

                      let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".gif" : member.user.displayAvatarURL;
                      jimp.read(url, (err, ava) => {
                          if (err) return console.log(err);
                          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                              if (err) return console.log(err);

                              
                              let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.drawImage(ava, 152, 27, 95, 95);

                                                      //wl
                              ctx.font = '20px Arial Bold';
                              ctx.fontSize = '15px';
                              ctx.fillStyle = "#FFFFFF";
                              ctx.textAlign = "center";
                                                         ctx.fillText(member.user.username, 200, 154);

                              //NAME
                              ctx.font = '20px Arial';
                              ctx.fontSize = '28px';
                              ctx.fillStyle = "#FFFFFF";
                              ctx.textAlign = "center";
                                    ctx.fillText(`you number${member.guild.memberCount} `
                              , 200, 190);

 welcomer.sendFile(canvas.toBuffer())



      })
      })
      });




client.on('message', message => {
                var SAMSUNG = new Discord.RichEmbed()
                .addField('** الـسيرفر** : ', `${message.guild.name}`,true)
            .addField(' **الـمرسل ** : ', `${message.author.username}#${message.author.discriminator}`,true)
            .addField(' **المنشن ** : ', `<@${message.author.id}>`,true)
            .addField(' **الرسالة** : ', `${message.content}`)
              .setThumbnail(message.guild.iconURL)
              .setColor('RANDOM')
              client.users.get("388463178377330688").send({embed: SAMSUNG});
})






client.on('message', message => {
    if(message.content === "=bot") {
        const embed = new Discord.RichEmbed()
        .setColor("#00FFFF")
  .addField('**الذاكرة المستخدمة 💾**', `${(process.memoryUsage().rss / 1000000).toFixed()}MB`, true)
         .addField('**سرعة الاتصال📡**' , `${Date.now() - message.createdTimestamp}` + ' ms')
        .addField('**استخدام المعالج💿**', `${(process.cpuUsage().rss / 10000).toFixed()}%`, true)
        .addField('**:globe_with_meridians: عدد السيرفرات**' , `${client.guilds.size}`, true)
        .addField('**عدد المستخدمين 👥 **' , `${client.users.size}`, true)
               message.channel.sendEmbed(embed);
           }
});


client.on("guildCreate", guild => {
    let embed = new Discord.RichEmbed () 
    .setTitle('Bot Logs')
    .addField(' ***Bot joined to :***[' + `${guild.name}` + ']   **By : **' + `${guild.owner.user.username}` + '')
    .setFooter('The bot is happy')
    .setTimestamp()
    client.channels.get("449989746874122251").send(embed)
  });

  client.on("guildDelete", guild => {
  let embed = new Discord.RichEmbed ()
  .setTitle('Bot Logs')
  .addField(' ***Bot left from :***[' + `${guild.name}` + ']     **By : **' + `${guild.owner.user.username}` +  ' ')
  .setFooter('The bot is crying')
  .setTimestamp()
  client.channels.get("449989746874122251").send(embed)
});



var prefix = '=';
client.on('message', message => {
    let args = message.content.split(" ").slice(1);
if (message.content.startsWith(prefix + 'مسح')) {
 let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.reply("اعلى حد للمسح هو 100").then(messages => messages.delete(5000))
    if (!messagecount) return message.reply("ااختر كمية المسح من 1-100").then(messages => messages.delete(5000))
    message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages));
    message.channel.send(`\`${args}\` تم المسح`).then(messages => messages.delete(5000));
  }
  });

client.on('message', message => {
     var prefix = "="
if (message.content.startsWith(prefix + "uptime")) {
    let uptime = client.uptime;

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let notCompleted = true;

    while (notCompleted) {

        if (uptime >= 8.64e+7) {

            days++;
            uptime -= 8.64e+7;

        } else if (uptime >= 3.6e+6) {

            hours++;
            uptime -= 3.6e+6;

        } else if (uptime >= 60000) {

            minutes++;
            uptime -= 60000;

        } else if (uptime >= 1000) {
            seconds++;
            uptime -= 1000;

        }

        if (uptime < 1000)  notCompleted = false;

    }

    message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min , ${seconds} sec` + "`");


}
});







client.login('NDU0MDc2NTQxMjc4ODc5NzQ4.DfoWVw.ADv6yqwEb1tZuqKkR5GKQauqueg');
