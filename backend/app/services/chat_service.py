import logging
import os
from starlette.concurrency import run_in_threadpool
from backend.app.llm.rag import RAGPipeline

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

JSON_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "base.json")


class ChatService:
    def __init__(self):
        try:
            self.rag_pipeline = RAGPipeline(JSON_PATH)
            logger.info(f"RAG pipeline initialized with JSON file: {JSON_PATH}")
        except Exception as e:
            logger.error(f"Failed to initialize RAG pipeline: {e}", exc_info=True)
            self.rag_pipeline = None

    async def generate_response(self, user_message: str) -> str:
        logger.info(f"Received user message: {user_message}")

        if not self.rag_pipeline:
            logger.error("RAG pipeline not initialized, reinitializing...")
            try:
                self.rag_pipeline = RAGPipeline(JSON_PATH)
            except Exception as e:
                logger.error(f"Failed to reinitialize RAG pipeline: {e}", exc_info=True)
                return "Извините, произошла ошибка при генерации ответа. Система обработки не инициализирована."

        try:
            answer = await run_in_threadpool(self.rag_pipeline.run, user_message)

            if not answer or answer.strip() == "":
                logger.warning("Empty response generated, using fallback")
                return "Извините, не удалось сгенерировать сценарий. Пожалуйста, уточните ваш запрос."

            logger.info(f"Generated answer using RAG")
            return answer
        except Exception as e:
            logger.error(f"Error generating response: {e}", exc_info=True)
            return "Извините, произошла ошибка при генерации ответа."


chat_service = ChatService()
