import os
import logging
from typing import Dict, Any, Optional
from llama_cpp import Llama
import requests
import zipfile
import io

logger = logging.getLogger(__name__)

MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")
DEFAULT_MODEL_URL = "https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf"
DEFAULT_MODEL_PATH = os.path.join(MODEL_DIR, "tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf")


def ensure_model_downloaded():
    os.makedirs(MODEL_DIR, exist_ok=True)

    if not os.path.exists(DEFAULT_MODEL_PATH):
        logger.info(f"Загрузка модели TinyLLama из {DEFAULT_MODEL_URL}")
        try:
            response = requests.get(DEFAULT_MODEL_URL, stream=True)
            response.raise_for_status()

            with open(DEFAULT_MODEL_PATH, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)

            logger.info(f"Модель успешно загружена и сохранена в {DEFAULT_MODEL_PATH}")
        except Exception as e:
            logger.error(f"Ошибка при загрузке модели: {str(e)}")
            raise
_model = None


def get_model():
    global _model
    if _model is None:
        ensure_model_downloaded()
        try:
            _model = Llama(
                model_path=DEFAULT_MODEL_PATH,
                n_ctx=4096,
                n_batch=512,
                n_threads=4
            )
            logger.info(f"Модель TinyLlama успешно загружена с расширенным контекстом")
        except Exception as e:
            logger.error(f"Ошибка при инициализации модели: {str(e)}")
            raise
    return _model


def generate_completion(prompt: str,
                        model: str = "local",
                        temperature: float = 0.7,
                        max_tokens: int = 800) -> str:
    try:
        logger.info(
            f"Генерация с использованием локальной модели TinyLlama: temp={temperature}, max_tokens={max_tokens}")

        llm = get_model()

        formatted_prompt = f"""<|system|>
Ты - эксперт по созданию вирусных сценариев для социальных сетей.
<|user|>
{prompt}
<|assistant|>
"""

        output = llm(
            formatted_prompt,
            max_tokens=max_tokens,
            temperature=temperature,
            stop=["<|user|>", "<|system|>"],
            echo=False
        )

        answer = output["choices"][0]["text"].strip()
        logger.info(f"Сгенерирован ответ локальной моделью: {len(answer)} символов")

        return answer
    except Exception as e:
        logger.error(f"Ошибка при генерации с TinyLlama: {str(e)}")
        return f"Извините, произошла ошибка при генерации сценария: {str(e)}"
