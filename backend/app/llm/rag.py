import logging
from .vectorstore import VectorStore
from .prompts import build_prompt
from .model import generate_completion

logger = logging.getLogger(__name__)


class RAGPipeline:
    def __init__(self, json_path):
        try:
            self.store = VectorStore(json_path)
            logger.info(f"Successfully initialized VectorStore with {json_path}")
        except Exception as e:
            logger.error(f"Failed to initialize VectorStore: {e}")
            raise

    def run(self, user_prompt: str) -> str:
        try:
            logger.info(f"Searching for relevant examples for query: {user_prompt[:50]}...")
            examples = self.store.query(user_prompt)

            if not examples:
                logger.warning("No relevant examples found, using empty context")

            logger.info(f"Building prompt with {len(examples)} examples")
            prompt = build_prompt(examples, user_prompt)

            logger.info("Generating completion using LLM")
            response = generate_completion(prompt)

            if not response or response.strip() == "":
                logger.warning("Empty response from LLM")
                return "Извините, не удалось сгенерировать сценарий на основе вашего запроса. Пожалуйста, уточните детали."

            return response
        except Exception as e:
            logger.error(f"Error in RAG pipeline: {e}")
            return "Произошла ошибка при обработке запроса. Пожалуйста, попробуйте еще раз или свяжитесь с поддержкой."
