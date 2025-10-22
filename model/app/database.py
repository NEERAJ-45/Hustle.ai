from pymongo import MongoClient
from app.config import settings
from app.utils.logger import get_logger

logger = get_logger(__name__)

# Connect MongoDB
try:
    client = MongoClient(settings.MONGO_URI)
    db = client[settings.MONGO_DB]
    logger.info(f"Connected to MongoDB Database: {settings.MONGO_DB}")
except Exception as e:
    logger.error(f"Database Connection Failed: {e}")
    raise RuntimeError("Failed to connect MongoDB")

def get_collection(name: str):
    """Utility to get MongoDB collection by name."""
    return db[name]
