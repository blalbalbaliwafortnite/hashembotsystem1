const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

 if (!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) { return message.reply('ليس لديــك صلآحيـه!"'); }
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("**لايمكنني ايجاد العضو**");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("لايمكنني ذالك لانه لديه الخاصيه `MANAGE_MESSAGES`");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("لوحة التحذير")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("تحذير العضو", `<@${wUser.id}>`)
  .addField("حذر في", message.channel)
  .addField("عدد التحذيرات", warns[wUser.id].warns)
  .addField("السبب", reason);

  let warnchannel = message.guild.channels.find(`name`, "logs-warn");
  if(!warnchannel) return message.reply("تعذر العثور على القناة");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 1){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("يجب عليك انشاء رول باسم Muted");

    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> تم اعطائه ميوت لمده ساعة`);
    console.log("mute one hour");

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> لقد تم فك الميوت علي العضو`)
    }, 3600000)
  }
  
  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("يجب عليك انشاء رول باسم Muted");

    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> تم اعطائه ميوت لمده يوم`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> لقد تم فك الميوت علي العضو`)
    }, 86400000)
  }
  
  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("يجب عليك انشاء رول باسم Muted");

    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> تم اعطائه ميوت لمده يومين`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> لقد تم فك الميوت علي العضو`)
    }, 172800000)
  }

  if(warns[wUser.id].warns == 4){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> تم اعطائه باند لعدم احترام القوانين`)
  }

}

module.exports.help = {
  name: "warn"
}
