const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(Logged in as ${client.user.tag}!);
});

client.on('message', message => {
    var ownerid = '426130019119529984'
    let args = message.content.split(' ').slice(1)
    if (message.author.id != ownerid) return;
    if (message.content.startsWith('setGame')) {
        if (message.author.id != ownerid) return;
        else {
            client.user.setGame(args.join(' '));
            message.channel.send(My New Game is = ${args.join('  ')})

        }
    }


})

client.login('Mzg4NDYzMTc4Mzc3MzMwNjg4.DfS-lQ.OnNrretRQvc--rfSGbSIYEmpKSA');
