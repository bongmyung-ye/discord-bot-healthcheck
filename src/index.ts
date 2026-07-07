import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { runCommand } from "./commands/index.js";
import { registerCommands } from "./services/commandRegistry.js";
import { loadEnv } from "./utils/env.js";
import { sendCommandError } from "./utils/interaction.js";
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

    const sent = await sendCommandError(interaction);

    if (!sent) {
      logger.error(`Failed to send error response: ${interaction.commandName}`);
    }
  }
});

await registerCommands(env);
await client.login(env.token);