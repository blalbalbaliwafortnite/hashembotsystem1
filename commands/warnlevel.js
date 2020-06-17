const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
 if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) { return message.reply('ليس لديــك صلآحيـه!"'); }
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("**لايمكنني ايجاد العضو**");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("لايمكنني ذالك لانه لديه الخاصيه `MANAGE_MESSAGES`");

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  
  let warnlevel = warns[wUser.id].warns;

  message.reply(`**لديه ${warnlevel} تحذيرات :page_facing_up: <@${wUser.id}> **`);

}

module.exports.help = {
  name: "warnlevel"
}