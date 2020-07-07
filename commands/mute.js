const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("لايمكنني ذالك لانه لديه الخاصيه `MANAGE_MESSAGES`");
  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("**لايمكنني ايجاد العضو**");
  let muterole = message.guild.roles.find(`name`, "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#ffffff",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("لم تحدد وقتًا!");

  await(tomute.addRole(muterole.id));
  message.reply(`**<@${tomute.id}> تم اعطائه ميوت لـ ${ms(ms(mutetime))}** :zipper_mouth:`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`**<@${tomute.id}> تم فك الميوت** :white_check_mark:`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
