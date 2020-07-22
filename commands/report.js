const Discord = require("discord.js");
const { stripIndents } = require("common-tags");


module.exports.run = async (bot, message, args) => {

        // If the bot can delete the message, do so
        if (message.deletable) message.delete();

        // Either a mention or ID
        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No person found
        if (!rMember)
            return message.reply("لايمكنني ايجاد الشخص").then(m => m.delete(5000));

        // The member has BAN_MEMBERS or is a bot
        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("لايمكنك ابلاغ علي آداره او المشرفين.").then(m => m.delete(5000));

        // If there's no argument
        if (!args[1])
            return message.channel.send("يرجى كتابة السبب حول ابلاغ علي العضو").then(m => m.delete(5000));
        
        const channel = message.guild.channels.find(c => c.name === "logs-reports")
            
        // No channel found
        if (!channel)
            return message.channel.send("لايمكنني ايجاد القناة الريبورت يرجى انشاء قناة").then(m => m.delete(5000));

        const embed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**> Member:** ${rMember} (${rMember.user.id})
            **> Reported by:** ${message.member}
            **> Reported in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
}

module.exports.help = {
  name: "report"
}
