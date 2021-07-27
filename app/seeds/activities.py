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
import pickle

def seed_activities():

    s3 = boto3.resource('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    obj = s3.Object('042521srtestbucket','trailforks.gpx')
    gpx_file = obj.get()['Body'].read()

    singleActivity = []
    # This parses the uploaded gpx file GPX(tracks=[GPXTrack(name='\n from Sep 3, 2019\n', segments=[GPXTrackSegment(points=[...])])])
    gpx_parsed = gpxpy.parse(gpx_file)
    for track in gpx_parsed.tracks:
        # Track is all data related to one track, all latitude/longitude pairs, all elevations, all timestamps
        for segment in track.segments:
            # A segment is a collection of all data at one specific point, one latitude/longitude pair, one elevation, one timestamp
            for point in segment.points:
                # This collects only the latitude/longitude pairs from each se
                singleActivity.append([point.latitude, point.longitude])
    
    serialized_gpx = pickle.dumps(singleActivity)
    moving_data = gpx_parsed.get_moving_data()
    # duration is in decaseconds
    duration = round((moving_data.moving_time + moving_data.stopped_time) * 0.0027778, 1)
    distance = round((moving_data.moving_distance + moving_data.stopped_distance)/ 1609.5, 1)


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

    photo_urls = [
        'https://sacredrides.com/wp-content/uploads/2020/09/LasVegasStGeorge05hero.jpg',
        'https://sbac.swellclubs.com/wp-content/uploads/sites/2/2019/09/Best-Trail-Runs-Santa-Barbara-1024x642.jpg.webp',
        'https://blog.sport-conrad.com/wp-content/uploads/2018/06/header_trailrunning_rucksaecke-980x450.jpg',
        'https://d36hbyt2dpr66x.cloudfront.net/wp-content/uploads/2017/09/HTTR_20_solo.full_.jpg',
        'https://www.rei.com/dam/content_022717_0622_road_biking_for_beginners_lg.jpg',
        'https://11jj3u3z9chg9d1f14sqkl13-wpengine.netdna-ssl.com/wp-content/uploads/2018/11/Road-Bike-Moab.jpg',
        'https://media.self.com/photos/57d8adac50778cef321a535a/master/pass/road-biking-guide-01-fiss616.jpg'
    ]


    for activity in range(50):
        new_activity = Activity(activity_type_id=2, 
        user_id=random.randrange(1, num_users),
        gps_file_url=serialized_gpx,
        photo_url=photo_urls[random.randrange(len(photo_urls))],
        activity_description=descriptions[random.randrange(len(descriptions))],
        duration=duration,
        distance=distance,
        avg_speed=distance/duration,
        max_speed=random.randrange(20, 55),
        ascent_feet=400,
        descent_feet=375
        )
        db.session.add(new_activity)
    db.session.commit()

def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()
    

