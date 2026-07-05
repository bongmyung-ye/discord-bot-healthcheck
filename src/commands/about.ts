import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export const aboutCommand = new SlashCommandBuilder()
  .setName("about")
  .setDescription("Show information about this healthcheck bot.");

export async function handleAboutCommand(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  const embed = new EmbedBuilder()
    .setTitle("Discord Bot Healthcheck")
    .setDescription(
      [
        "Discord 봇 운영 상태를 간단히 확인하기 위한 TypeScript 유틸 봇입니다.",
        "",
        "작은 프로젝트지만 실제 운영 환경에서 ping, uptime, memory 같은 기본 상태를 빠르게 확인하는 용도로 사용할 수 있습니다.",
      ].join("
"),
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
    .setFooter({ text: "Built for practical Discord bot operations" })
    .setTimestamp();

  await interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
}
