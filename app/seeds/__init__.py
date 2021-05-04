from flask.cli import AppGroup
from .users import seed_users, undo_users
from .activity_types import seed_activity_types, undo_activity_types
from .activities import seed_activities, undo_activities
from .likes import seed_likes, undo_likes
from .followers import seed_followers, undo_followers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_activity_types()
    seed_activities()
    seed_likes()
    seed_followers()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_activity_types()
    undo_activities()
    undo_likes()
    undo_followers()
    # Add other undo functions here
