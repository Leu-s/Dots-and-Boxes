import re


def password_validator(password) -> bool:
    # ! A-z 123 (6-24)
    regex = r"(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\W_]{6,24}$"
    check_password = re.fullmatch(regex, password)
    if check_password:
        return True
    else:
        return False


def username_validator(username) -> bool:
    # (6-24) A-z 123 _
    regex = r'^[a-zA-Z0-9_]{4,24}$'
    check_username = re.fullmatch(regex, username)
    if check_username:
        return True
    else:
        return False
