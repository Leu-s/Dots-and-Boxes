from os import getenv
from dotenv import load_dotenv

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = f"{getenv('SQLALCHEMY_DATABASE_URI')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = f"{getenv('FLASK_SECRET_KEY')}"

