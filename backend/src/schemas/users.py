from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from src.models import User


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_Instance = True
        exclude = ['id']
        load_only = ['password']
