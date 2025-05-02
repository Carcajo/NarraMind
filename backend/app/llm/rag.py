from backend.app.llm.model import get_llm
from backend.app.llm.vectorstore import get_index_db

db = get_index_db()
retriever = db.as_retriever(k=3)
llm = get_llm()


def get_answer(user_question: str) -> str:
    docs = retriever.invoke(user_question)
    context = "\n\n".join(doc.page_content for doc in docs)
    prompt = f"{context}\n\nQuestion: {user_question}\nAnswer:"
    result = llm.invoke(prompt)
    return result.content
