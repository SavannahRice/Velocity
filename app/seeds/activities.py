from app.models import db, Activity
from faker import Faker
fake = Faker()
import requests
import random
import gpxpy
from gpxpy.gpx import GPXRoute
import gpxpy.geo
import boto3
import os

def seed_activities():

    s3 = boto3.resource('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    obj = s3.Object('042521srtestbucket','trailforks.gpx')
    gpx_file = obj.get()['Body'].read()
    

    # gpx_file = open('https://042521srtestbucket.s3-us-west-2.amazonaws.com/trailforks.gpx', 'r')
    gpx = gpx = gpxpy.parse(gpx_file)
    moving_data = gpx.get_moving_data()


    num_activity_type=5
    num_users=51
    descriptions=[
        'Commit to be fit.',
        'Sore today, strong tomorrow.',
        'Train insane or remain the same.',
        'Excuses don’t burn calories.',
        'Strive for progress, not perfection.',
        'It never gets easier, you just get stronger.',
        'What seems impossible today will one day be your warm-up.',
        'Setbacks are not failures. There is no such thing as failing if you simply keep going.',
        'Did you say exercise? I thought you said extra fries.',
        'Already planning what I’m going to eat after this.',
        'Run as if your phone’s remaining battery life is 1%.',
        'Setting goals and crushing them!',
        'I have to exercise in the morning before my brain figures out what I’m doing.'
    ]
    activity = Activity(activity_type_id=2, 
        user_id=1,
        gps_file_url='https://042521srtestbucket.s3-us-west-2.amazonaws.com/trailforks.geojson',
        photo_url='https://www.coloradoski.com/sites/default/files/inline-images/Jacqueline-Thomas-TrestleBikePark-Chris-Wellhausen-05-RGB.jpg',
        activity_description=descriptions[random.randrange(len(descriptions))],
        duration=round(moving_data.moving_time / 1002, 1) ,
        distance=round(moving_data.moving_distance * 0.000621371, 1),
        avg_speed=round(moving_data.moving_distance/moving_data.moving_time, 1),
        max_speed=round(moving_data.max_speed, 1),
        ascent_feet=400,
        descent_feet=375)
    db.session.add(activity)

    for activity in range(50):
        new_activity = Activity(activity_type_id=2, 
        user_id=random.randrange(1, num_users),
        gps_file_url='https://042521srtestbucket.s3-us-west-2.amazonaws.com/trailforks.geojson',
        photo_url='https://www.coloradoski.com/sites/default/files/inline-images/Jacqueline-Thomas-TrestleBikePark-Chris-Wellhausen-05-RGB.jpg',
        activity_description=descriptions[random.randrange(len(descriptions))],
        duration=round(moving_data.moving_time / 1002, 1) ,
        distance=round(moving_data.moving_distance * 0.000621371, 1),
        avg_speed=round(moving_data.moving_distance/moving_data.moving_time, 1),
        max_speed=round(moving_data.max_speed, 1),
        ascent_feet=400,
        descent_feet=375
        )
        db.session.add(new_activity)
    db.session.commit()

def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()
    

