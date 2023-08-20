import { Redis } from "@upstash/redis"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PineconeClient } from "@pinecone-database/pinecone"
import { PineconeStore } from "langchain/vectorstores/pinecone"

export type ComanionKey = {
    companionName: string;
    modelName: string;
    userId: string;
};

export class MemoryManager {
    private static instance: MemoryManager;
    private history: Redis;
    private vecorDBClient: PineconeClient;

    public constructor() {
        this.history = Redis.fromEnv();
        this.vecorDBClient = new PineconeClient();
    }

    public async init() {
        if (this.vecorDBClient instanceof PineconeClient) {
            await this.vecorDBClient.init({
                apiKey: process.env.PINECONE_API_KEY!,
                environment: process.env.PINECONE_ENVIRONMENT!,
            })
        }
    }

    public async vectorSearch(
        recentChatHistory: string,
        companionFileName: string
    ) {
        const PineconeClient = <PineconeClient>this.vecorDBClient;

        const pineconeIndex = PineconeClient.Index(
            process.env.PINECONE_INDEX! || ""
        );

        const vectorstores = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }), { pineconeIndex }
        )
    }
}