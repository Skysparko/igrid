import { Injectable } from "@nestjs/common";
import { embed } from "ai";
import { createOllama } from "ollama-ai-provider";

import { CHUNK_NEIGHBOURS, TOP_K_EMBEDDINGS } from "src/ai/ai.constants";
import { RagRepository } from "src/ai/repositories/rag.repository";
import { MESSAGE_ROLE, OPENAI_MODELS } from "src/ai/utils/ai.type";

import type { MessageRole } from "src/ai/utils/ai.type";
import type { UUIDType } from "src/common";

@Injectable()
export class RagService {
  constructor(private readonly ragRepository: RagRepository) {}

  async getContext(
    content: string,
    lessonId: UUIDType,
    neighbours: number = CHUNK_NEIGHBOURS,
  ): Promise<{
    chunks: {
      role: MessageRole;
      content: string;
      documentId: unknown;
      chunkIndex: unknown;
      similarityScore: unknown;
      fileName: unknown;
    }[];
  }> {
    const embedding = await this.getEmbedding(content);

    const chunks = await this.ragRepository.findTopKDocumentChunksWithNeighboursForAiMentorLesson(
      lessonId,
      embedding,
      TOP_K_EMBEDDINGS,
      neighbours,
    );

    return {
      chunks: chunks.map((chunk) => ({
        role: MESSAGE_ROLE.SYSTEM as MessageRole,
        content: `[RAG] ${chunk.content}` as string,
        documentId: chunk.document_id,
        chunkIndex: chunk.chunk_index,
        similarityScore: chunk.similarity_score,
        fileName: chunk.file_name,
      })),
    };
  }

  private async getEmbedding(content: string) {
    const provider = await this.getOpenAI();
    const { embedding } = await embed({
      model: provider.textEmbeddingModel(OPENAI_MODELS.EMBEDDING),
      value: content,
      experimental_telemetry: { isEnabled: true },
    });

    return embedding;
  }

  async getOpenAI() {
    return createOllama({
      baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/api",
    });
  }
}
