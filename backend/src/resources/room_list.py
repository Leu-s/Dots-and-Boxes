from flask_restful import Resource
from flask import request
from src import db
from src import models
from src.resources.auth import token_required
from src.schemas.rooms import RoomSchema


class RoomList(Resource):
    room_schema = RoomSchema()

    # @token_required
    def get(self):
        rooms = db.session.query(models.Room).all()
        self.room_schema.dump(rooms, many=True)
        if rooms:
            return {'result': True,
                    'rooms': self.room_schema.dump(rooms, many=True)}, 200
        else:
            return {'result': False}, 200

    # @token_required
    def post(self):
        request_json = request.get_json(force=True)
        title, user_uuid = request_json.get('title', ''), request_json.get('user_uuid', '')

        user = db.session.query(models.User).filter_by(uuid=user_uuid).first()
        if not user:
            return {'result': False, 'message': 'User with this uuID does not exist'}

        room_in_db = db.session.query(models.Room).filter_by(title=title).first()
        if room_in_db:
            return {'result': False, 'message': 'The title is already taken'}

        if user:
            room = models.Room(title=title, creator_id=user.id)
            db.session.add(room)
            db.session.commit()
            return {'result': True,
                    'newRoom': self.room_schema.dump(db.session.query(models.Room).filter_by(title=title).first())}, 201
        else:
            return {'result': False, 'message': ''}, 200

    @token_required
    def delete(self):
        request_json = request.get_json(force=True)
        room_uuid = request_json.get('room_uuid', '')
        if not room_uuid:
            return {'result': False, 'message': 'Room uuID is required'}, 200

        room = db.session.query(models.Room).filter_by(id=room_uuid).first()

        if room:
            db.session.delete(room)
            return {'result': True, 'message': "Room '{}' was delete successfully".format(room.title)}, 200
        else:
            return {'result': False, 'message': 'Room not found'}, 404
