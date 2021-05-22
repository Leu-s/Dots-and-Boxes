from src import api
from src.resources.room_list import RoomList
from src.resources.auth import UserRegistration
from src.resources.auth import UserAuthorization

api.add_resource(UserRegistration, '/api/reg', strict_slashes=False)
api.add_resource(UserAuthorization, '/api/auth', strict_slashes=False)
api.add_resource(RoomList, '/api/rooms', strict_slashes=False)
