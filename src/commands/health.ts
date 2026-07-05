import {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
  version as discordJsVersion,
} from "discord.js";
import { formatBytes, formatUptime } from "../utils/format.js";

export const healthCommand = new SlashCommandBuilder()
  .setName("health")
  .setDescription("Check the current bot health status.");

export async function handleHealthCommand(
  client: Client,
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  const memory = process.memoryUsage();

  const embed = new EmbedBuilder()
    .setTitle("Bot Healthcheck")
    .setDescription("현재 봇 런타임 상태입니다.")
    .setColor(0x5865f2)
    .addFields(
      {
        name: "Status",
        value: client.isReady() ? "Online" : "Starting",
        inline: true,
      },
      {
        name: "Ping",
        value: `${client.ws.ping}ms`,
        inline: true,
      },
      {
        name: "Uptime",
        value: formatUptime(process.uptime()),
        inline: true,
      },
      {
        name: "Memory",
        value: formatBytes(memory.rss),
        inline: true,
      },
      {
        name: "Guilds",
        value: String(client.guilds.cache.size),
        inline: true,
      },
      {
        name: "Node.js",
        value: process.version,
        inline: true,
      },
      {
        name: "discord.js",
        value: discordJsVersion,
        inline: true,
      },
    )
    .setFooter({ text: "discord-bot-healthcheck" })
    .setTimestamp();

  await interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
}
