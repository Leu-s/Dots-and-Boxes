import jwt
import datetime
from src import db, app
from src import models
from src.schemas.users import UserSchema
from flask import jsonify, request
from flask_restful import Resource
from functools import wraps
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash
from utilities.validators import password_validator, username_validator


def token_required(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        token = request.headers.get('X-API-KEY', '')

        if not token:
            return "", 401, {'WWW-Authenticate': "Basic realm='Authentication required'"}
        try:
            user_uuid = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])['user_uuid']
        except (KeyError, jwt.ExpiredSignatureError, jwt.DecodeError):
            return "", 401, {'WWW-Authenticate': "Basic realm='Authentication required'"}

        user = db.session.query(models.User).filter_by(uuid=user_uuid).first()
        if not user:
            return "", 401, {'WWW-Authenticate': "Basic realm='Authentication required'"}
        return func(self, *args, **kwargs)
    return wrapper


class UserRegistration(Resource):
    user_schema = UserSchema()

    def get(self):
        # request_json = request.get_json(force=True, silent=True)

        username, password = request.args.get('username', ''), request.args.get('password', '')

        ctx: {str: bool} = {'username_db': False, 'username': False, 'password': False}

        username_in_database = db.session.query(models.User).filter_by(username=username).first()
        if username_in_database:
            ctx['username_db'] = True
        if username_validator(username):
            ctx['username'] = True
        if password_validator(password):
            ctx['password'] = True

        return ctx, 200

    def post(self):
        request_json = request.get_json(force=True)
        username, password = request_json.get('username', ''), request_json.get('password', '')
        if not password_validator(str(password)) or not username_validator(str(username)):
            return {'result': False, 'message': 'Username or password is not correct'}

        new_user = models.User(username=str(username), password=str(password))

        try:
            db.session.add(new_user)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return {'result': False, 'message': 'User is already registered'}

        return {'result': True, 'message': f'User {username} was created successfully'}, 201


class UserAuthorization(Resource):

    def get(self):
        auth = request.authorization
        if not auth:
            return "", 401, {'WWW-Authenticate': "Basic realm='Authentication required'"}

        user = db.session.query(models.User).filter_by(username=auth.get('username', '')).first()
        if not user or not check_password_hash(user.password, auth.get('password', '')):
            return "", 401, {'WWW-Authenticate': "Basic realm='Authentication required'"}

        token = jwt.encode(
            {
                'user_uuid': user.uuid,
                'exp': datetime.datetime.now() + datetime.timedelta(hours=6)
            }, app.config['SECRET_KEY']
        )
        return jsonify({
            'access_token': token
        })

