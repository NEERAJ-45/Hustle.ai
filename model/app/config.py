import os
from dotenv import load_dotenv

# Load the .env file from the current directory (app/)
load_dotenv()

class Settings:
    # Mandatory env variable: raise error if missing
    MONGO_URI: str = os.getenv("MONGODB_URI") or (_ for _ in ()).throw(
        ValueError("MONGODB_URI not set in .env")
    )
    
    # Optional env variables with defaults
    MONGO_DB: str = os.getenv("MONGO_DB", "test")
    MODEL_NAME: str = os.getenv("MODEL_NAME", "all-MiniLM-L6-v2")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

settings = Settings()
