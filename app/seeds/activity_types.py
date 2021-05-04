from app.models import db, Activity_Type
from faker import Faker
fake = Faker()
import requests
import random

def seed_activity_types():
    # types = ['Road Biking', 'Mountain Biking', 'Running', 'Trail Running', 'Dirt Biking', 'Horseback Riding']

    # for activity in types:
    #     activity_type = Activity_Type(description=activity)
    #     db.session.add(activity_type)
    road = Activity_Type(description='Road Biking')
    db.session.add(road)

    mountain = Activity_Type(description='Mountain Biking')
    db.session.add(mountain)

    run = Activity_Type(description='Running')
    db.session.add(run)

    trail = Activity_Type(description='Trail Running')
    db.session.add(trail)

    dirt = Activity_Type(description='Dirt Biking')
    db.session.add(dirt)

    db.session.commit()

def undo_activity_types():
    db.session.execute('TRUNCATE activity_types RESTART IDENTITY CASCADE;')
    db.session.commit()

