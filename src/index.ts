import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { runCommand } from "./commands/index.js";
import { registerCommands } from "./services/commandRegistry.js";
import { loadEnv } from "./utils/env.js";
import { logger } from "./utils/logger.js";

const env = loadEnv();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
  logger.info(`Logged in as ${client.user?.tag ?? "Unknown bot"}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const handled = await runCommand(client, interaction);

    if (!handled) {
      logger.warn(`Unhandled command: ${interaction.commandName}`);
    }
  } catch (error) {
    logger.error(`Command failed: ${interaction.commandName}`, error);

    const response = {
      content: "명령어를 처리하는 중 문제가 발생했습니다.",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(response);
      return;
    }

    await interaction.reply(response);
  }
});

await registerCommands(env);
await client.login(env.token);