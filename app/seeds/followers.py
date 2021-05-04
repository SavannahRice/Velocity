from app.models import db
from faker import Faker
faker = Faker()

import json
import random

def seed_followers():
    for i in range(500):
        db.session.execute(f'''INSERT INTO followers (user_id, follower_id)
        VALUES ({faker.pyint(min_value = 1, max_value = 50)},{faker.pyint(min_value = 1, max_value = 50)});''')
    db.session.commit()

def undo_followers():
    db.session.execute('TRUNCATE followers RESTART IDENTITY CASCADE;')
    db.session.commit()