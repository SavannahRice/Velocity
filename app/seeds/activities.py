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

    # s3 = boto3.resource('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    # obj = s3.Object('042521srtestbucket','trailforks.gpx')
    # gpx_file = obj.get()['Body'].read()
    

    # gpx_file = open('https://042521srtestbucket.s3-us-west-2.amazonaws.com/trailforks.gpx', 'r')
    # gpx = gpx = gpxpy.parse(gpx_file)
    # moving_data = gpx.get_moving_data()

    file_urls=[
        'https://042521srtestbucket.s3-us-west-2.amazonaws.com/b38cc2ba27494e3e83042fb8ddbb0b76.gpx',
        'https://042521srtestbucket.s3-us-west-2.amazonaws.com/4c68d030de02444bb27af921d5d91d35.gpx',
        'https://042521srtestbucket.s3-us-west-2.amazonaws.com/d8f6c1d8aa7a44b39bbf57f8184a3487.gpx',
        'https://042521srtestbucket.s3-us-west-2.amazonaws.com/d3142f96b5a0497aa2f7d4eaed58df0e.gpx',
        'https://042521srtestbucket.s3-us-west-2.amazonaws.com/91537ce705984151b2058c5502a7bde6.gpx',
        'https://042521srtestbucket.s3-us-west-2.amazonaws.com/144954ed3fa44e1b84553e42b9c3a44a.gpx',
        'https://042521srtestbucket.s3-us-west-2.amazonaws.com/39221f2b0e084403a2de4df472996dde.gpx'
    ]


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
        'https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/methode/2019/11/18/9f0e71be-075c-11ea-a68f-66ebddf9f136_image_hires_131553.jpg?itok=Ond-tbiH&v=1574054177',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beginner-mountain-biking-1615604804.jpg?crop=1.00xw:0.753xh;0,0.171xh&resize=1200:*',
        'https://sacredrides.com/wp-content/uploads/2020/09/LasVegasStGeorge05hero.jpg',
        'https://i2.keller-sports.com/guide/en/2019/03/Trailrunning-vs.-urban-running-advantages-and-disadvantages-running-on-trails-and-road-runners.jpg',
        'https://sbac.swellclubs.com/wp-content/uploads/sites/2/2019/09/Best-Trail-Runs-Santa-Barbara-1024x642.jpg.webp',
        'https://blog.sport-conrad.com/wp-content/uploads/2018/06/header_trailrunning_rucksaecke-980x450.jpg',
        'https://d36hbyt2dpr66x.cloudfront.net/wp-content/uploads/2017/09/HTTR_20_solo.full_.jpg',
        'https://www.rei.com/dam/content_022717_0622_road_biking_for_beginners_lg.jpg',
        'https://11jj3u3z9chg9d1f14sqkl13-wpengine.netdna-ssl.com/wp-content/uploads/2018/11/Road-Bike-Moab.jpg',
        'https://images.immediate.co.uk/production/volatile/sites/21/2020/11/Girl-Power-02-28cfda3.jpg?quality=90&resize=620,413',
        'https://media.self.com/photos/57d8adac50778cef321a535a/master/pass/road-biking-guide-01-fiss616.jpg'

    ]


    # activity = Activity(activity_type_id=2, 
    #     user_id=1,
    #     gps_file_url='https://042521srtestbucket.s3-us-west-2.amazonaws.com/trailforks.gpx',
    #     photo_url='https://www.coloradoski.com/sites/default/files/inline-images/Jacqueline-Thomas-TrestleBikePark-Chris-Wellhausen-05-RGB.jpg',
    #     activity_description=descriptions[random.randrange(len(descriptions))],
    #     duration=round(moving_data.moving_time / 1002, 1) ,
    #     distance=round(moving_data.moving_distance * 0.000621371, 1),
    #     avg_speed=round(moving_data.moving_distance/moving_data.moving_time, 1),
    #     max_speed=round(moving_data.max_speed, 1),
    #     ascent_feet=400,
    #     descent_feet=375)
    # db.session.add(activity)

    for activity in range(50):
        new_activity = Activity(activity_type_id=2, 
        user_id=random.randrange(1, num_users),
        gps_file_url=file_urls[random.randrange(len(file_urls))],
        photo_url=photo_urls[random.randrange(len(photo_urls))],
        activity_description=descriptions[random.randrange(len(descriptions))],
        duration=random.randrange(1, 4) ,
        distance=random.randrange(10, 30),
        avg_speed=random.randrange(10, 26),
        max_speed=random.randrange(20, 55),
        ascent_feet=400,
        descent_feet=375
        )
        db.session.add(new_activity)
    db.session.commit()

def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()
    

