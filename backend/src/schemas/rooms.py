from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from src.models import Room


class RoomSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Room
        exclude = ['id']
        load_instance = True
        include_fk = True
