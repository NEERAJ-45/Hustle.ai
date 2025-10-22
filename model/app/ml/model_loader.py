from sentence_transformers import SentenceTransformer
from app.config import settings
from app.utils.logger import get_logger

logger = get_logger(__name__)
_model_instance = None

def get_model():
    """Load SBERT model singleton instance (thread-safe)."""
    global _model_instance
    if _model_instance is None:
        logger.info(f"Loading SentenceTransformer model: {settings.MODEL_NAME}")
        _model_instance = SentenceTransformer(settings.MODEL_NAME)
        logger.info("Model loaded successfully.")
    return _model_instance
