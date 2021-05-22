import uuid

from werkzeug.security import generate_password_hash

from src import db
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, nullable=False)
    username = db.Column(db.String(length=16), nullable=False, unique=True)
    password = db.Column(db.String(length=254), nullable=False)
    registration_date = db.Column(db.DateTime, nullable=False)

    rooms = db.relationship('Room', backref='creator')

    games = db.Column(db.Integer, default=0)
    win = db.Column(db.Integer, default=0)
    defeat = db.Column(db.Integer, default=0)

    def __init__(self, username: str, password: str):
        self.uuid = str(uuid.uuid4())
        self.username = username
        self.password = generate_password_hash(password)
        self.registration_date = datetime.now()

    def __repr__(self):
        return f'id: {self.id}; UUID: {self.uuid}; Username: {self.username};'


class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, nullable=False)
    title = db.Column(db.String(length=64), unique=True, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __init__(self, title, creator_id):
        self.title = title
        self.creator_id = creator_id
        self.uuid = uuid.uuid4()

    def __repr__(self):
        return f'Room: {self.title}; Creator: {self.creator.username}:'

