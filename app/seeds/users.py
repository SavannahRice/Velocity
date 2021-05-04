# from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
fake = Faker()
import requests
import random

# Adds a demo user, you can add other users here if you want
def seed_users():

    url = 'https://api.unsplash.com/search/photos/?query=cyclist&count=30&client_id=w7D9hahfveF5lpAyA5ED7oMcmfmnf-34xpUmZsC2ubs'
    r = requests.get(url)
    response = r.json()
    photos = []
    photoObj = response['results']
    for photo in photoObj:
        photos.append(photo['urls']['small'])

    cities = [
        'Alameda',
        'Dublin',
        'Hayward',
        'Oakland',
        'San Leandro',
        'Albany',
        'Emeryville',
        'Livermore',
        'Piedmont',
        'Union City',
        'Berkeley',
        'Fremont',
        'Newark',
        'Pleasanton',
        'Antioch',
        'Clayton',
        'El Cerrito',
        'Martinez',
        'Oakley',
        'Pinole',
        'Walnut Creek',
        'Concord',
        'Moraga',
        'Orinda',
        'Pittsburgh',
        'Danville',
        'Lafayette',
        'Pleasant Hill',
        'San Ramon',
        'Arcata',
        'Eureka',
        'Sausalito',
        'Novato',
        'Tiburon',
        'Ross',
        'Monterey',
        'Salinas',
        'Seaside',
        'Carmel',
        'Napa'
    ]

    demo = User(username='Demo', email='demo@aa.io',
                city='Walnut Creeek',
                state='California',
                avatar_img='https://i.pinimg.com/736x/c4/16/43/c416433733a9a307266208014a5fc92a.jpg',
                hashed_password='password')

    db.session.add(demo)

    for num in range(50):
        user = User(username=fake.name(), 
        email=fake.email(), 
        city=cities[random.randrange(len(cities))],
        state='California',
        avatar_img=photos[random.randrange(len(photos))],
        hashed_password='password')
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
