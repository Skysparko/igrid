import { Injectable } from "@nestjs/common";

import type { OpenAIModels } from "src/ai/utils/ai.type";

@Injectable()
export class TokenService {
  /**
   * Estimates token count for local LLM models.
   * Uses a simple heuristic: ~4 characters per token on average.
   * This is a reasonable approximation for most models.
   */
  countTokens(_model: OpenAIModels, text: string): number {
    // Simple token estimation: ~4 characters per token
    // This is a reasonable approximation for most LLMs
    return Math.ceil(text.length / 4);
  }
}
