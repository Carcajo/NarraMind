import logging
from starlette.concurrency import run_in_threadpool
from backend.app.llm.rag import get_answer

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


class ChatService:
    def __init__(self):
        self.system_prompt = """
        Ты эксперт в написании вирусных сценариев для Reels и TikTok.
        Придумай цепляющие и привлекающие внимание заголовки, которые мотивируют посмотреть видео.
        Заголовки должны быть короткими, лаконичными и личными. Избегай заезженных формулировок.
        Ты получишь описание компании/товара и жанр видео. Ответь сценарием на 15 секунд (для TikTok) или 15–60 секунд (для Reels).
        Если вопрос не про видео, рекламу или SMM — скажи "Я предназначен только для рекламы. Пожалуйста, задавайте вопросы по теме."
        """

    async def generate_response(self, user_message: str) -> str:
        full_prompt = f"{self.system_prompt}\n\nПользователь: {user_message}"
        logger.info(f"Received user message: {user_message}")
        logger.debug(f"Full prompt: {full_prompt}")

        try:
            answer = await run_in_threadpool(get_answer, full_prompt)
            logger.info(f"Generated answer: {answer}")
            return answer
        except Exception as e:
            logger.error(f"Error generating response: {e}", exc_info=True)
            return "Извините, произошла ошибка при генерации ответа."


chat_service = ChatService()
