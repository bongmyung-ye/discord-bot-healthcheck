import {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export const aboutCommand = new SlashCommandBuilder()
  .setName("about")
  .setDescription("Show information about this healthcheck bot.");

export async function handleAboutCommand(
  _client: Client,
  interaction: ChatInputCommandInteraction,
) {
  const embed = new EmbedBuilder()
    .setTitle("Discord Bot Healthcheck")
    .setDescription(
      [
        "Discord 봇 상태를 빠르게 확인하기 위한 작은 유틸 봇입니다.",
        "",
        "서버에 올린 봇이 정상적으로 동작하는지 확인할 때 사용할 수 있습니다.",
      ].join("\n"),
    )
    .setColor(0x2f81f7)
    .addFields(
      {
        name: "Stack",
        value: "TypeScript · Node.js · discord.js",
        inline: false,
      },
      {
        name: "Commands",
        value: "`/health` · `/about`",
        inline: false,
      },
    )
    .setFooter({ text: "discord-bot-healthcheck" })
    .setTimestamp();

  await interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
}