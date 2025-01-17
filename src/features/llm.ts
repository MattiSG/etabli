import { Settings } from '@prisma/client';
import EventEmitter from 'eventemitter3';

import { LangchainWithLocalVectorStoreLlmManager } from '@etabli/src/features/llm-langchain';
import { MockVectorStoreLlmManager } from '@etabli/src/features/llm-mock';
import { OpenaiWithAssistantApiLlmManager } from '@etabli/src/features/llm-openai';
import { initSettingsIfNeeded } from '@etabli/src/features/settings';
import { ResultSchemaType } from '@etabli/src/gpt/template';
import { prisma } from '@etabli/src/prisma';

export interface LlmManager {
  init(): Promise<void>;
  clean(): Promise<void>;
  startHistoryCleaner(): Promise<void>;
  stopHistoryCleaner(): Promise<void>;
  ingestTools(settings: Settings): Promise<void>;
  ingestInitiatives(settings: Settings): Promise<void>;
  computeInitiative(settings: Settings, projectDirectory: string, prompt: string, rawToolsFromAnalysis: string[]): Promise<ResultSchemaType>;
  getInitiativesFromQuery(query: string): Promise<string[]>;
  truncateContentBasedOnTokens(content: string, maximumTokens: number): string;
  assertToolsDocumentsAreReady(settings: Settings): Promise<void>;
  requestAssistant(settings: Settings, sessionId: string, input: string, eventEmitter: ChunkEventEmitter): Promise<string>;
  assertInitiativesDocumentsAreReady(settings: Settings): Promise<void>;
}

export type ChunkEventEmitter = EventEmitter<'chunk'>;

export const llmManagerInstance =
  process.env.LLM_MANAGER_MOCK === 'true' ? new MockVectorStoreLlmManager() : new LangchainWithLocalVectorStoreLlmManager();
// export const llmManagerInstance = new OpenaiWithAssistantApiLlmManager();

export function extractFirstJsonCodeContentFromMarkdown(markdown: string): string | null {
  const regex = /```json\n([\s\S]+?)\n```/;
  const regexResult = regex.exec(markdown);

  return !!regexResult ? regexResult[1] : null;
}

export function extractFirstTypescriptCodeContentFromMarkdown(markdown: string): string | null {
  const regex = /```ts\n([\s\S]+?)\n```/;
  const regexResult = regex.exec(markdown);

  return !!regexResult ? regexResult[1] : null;
}

export async function initLlmSystem() {
  // Note: Prisma does not implement yet locking table though it should help not messing with requesting the LLM system while replacing sensitive components of it
  // This race condition should remain rare and having error thrown should be fine since replayed on the next iteration

  await initSettingsIfNeeded();

  await llmManagerInstance.init();
}

export async function cleanLlmSystem() {
  // Note: Prisma does not implement yet locking table though should help not messing with requesting the LLM system while replacing sensitive components of it
  // This race condition should remain rare and having error thrown should be fine since replayed on the next iteration

  await llmManagerInstance.clean();
}

export async function ingestToolListToLlmSystem() {
  // Since we don't want to send all tools at each request to GPT (because it would be costly but also would reduce the token capacity)
  // We send them as a document so GPT can index them so they can be used as knowledge

  // Note: Prisma does not implement yet locking table though it should help not messing with requesting the LLM system while replacing sensitive components of it
  // This race condition should remain rare and having error thrown should be fine since replayed on the next iteration
  const settings = await prisma.settings.findUniqueOrThrow({
    where: {
      onlyTrueAsId: true,
    },
  });

  await llmManagerInstance.ingestTools(settings);
}

export async function ingestInitiativeListToLlmSystem() {
  // The user assistant helping finding initiatives needs to have this knowledge base
  // We send all initiatives grouped into chunked documents so GPT can index them so they can be used as knowledge

  // Note: Prisma does not implement yet locking table though it should help not messing with requesting the LLM system while replacing sensitive components of it
  // This race condition should remain rare and having error thrown should be fine since replayed on the next iteration
  const settings = await prisma.settings.findUniqueOrThrow({
    where: {
      onlyTrueAsId: true,
    },
  });

  await llmManagerInstance.ingestInitiatives(settings);
}
