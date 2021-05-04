from app.models import db, Likes
from faker import Faker
fake = Faker()
import requests
import random

# Adds a demo user, you can add other users here if you want
def seed_likes():

    for like in range(200):
        new_like = Likes(user_id=random.randrange(1,51), activity_id=random.randrange(1,50))
        db.session.add(new_like)
    db.session.commit()



def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()