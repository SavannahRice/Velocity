from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Activity, Likes, db
from flask_login import login_required, current_user
import gpxpy
from gpxpy.gpx import GPXRoute
import gpxpy.geo
import boto3
import pickle
import os
from app.awsS3 import (
    upload_file_to_s3, 
    allowed_file, get_unique_filename, 
    upload_object_to_s3)

activity_routes = Blueprint('activities', __name__)

@activity_routes.route('')
@login_required
def get_all_activities():
    activities = Activity.query.filter_by(user_id=current_user.id).order_by(Activity.created_at.desc()).all()
    return {"activities": [activity.to_dict() for activity in activities]}

@activity_routes.route('/following')
@login_required
def get_followingActivities():
    user = User.query.get(current_user.id)
    following = user.follows
    idList = [follow.id for follow in following]
    activities = Activity.query.filter(Activity.user_id.in_(idList)).all()
    return {"activities": [activity.to_dict() for activity in activities]}

    
@activity_routes.route('/like/<int:id>', methods=["POST"])
@login_required
def like_single_activity(id):
    like = Likes(
        user_id=current_user.id,
        activity_id=id
    )
    db.session.add(like)
    db.session.commit()
    return like.to_dict()

@activity_routes.route('/like/<int:id>', methods=["DELETE"])
@login_required
def unlike_single_activity(id):
    like = Likes.query.filter_by(user_id=current_user.id).filter_by(activity_id=id).first()
    db.session.delete(like)
    db.session.commit()
    return {"like": "Nothing"}

@activity_routes.route('/likes')
@login_required
def get_activity_likes():
    likes = Likes.query.filter_by(user_id=current_user.id)
    return {"likes": [like.to_dict() for like in likes]}

@activity_routes.route('/<int:id>')
@login_required
def get_single_activity(id):

    activity = Activity.query.get(id)
   
    #  All gpx files are stored in AWS. This line provides AWS credentials to boto3 to get 
    # rescources from the default session.
    # s3 = boto3.resource('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
    )

    
    singleActivity = []
    # This splits the URL path to retrieve only the gpx file name. 
    url_list = activity.gps_file_url.split('/')
    file_ext = url_list[len(url_list) - 1]

    obj = s3.get_object(Bucket=os.environ.get("S3_BUCKET"), Key=file_ext)
    serialized = obj['Body'].read()
    gpx_pts = pickle.loads(serialized)
   
    return {"activity": activity.to_dict(), "track": gpx_pts}

@activity_routes.route('/new', methods=["POST"])
@login_required
def add_single_activity():
    
    activity_description = request.form['description']

    if "image" not in request.files:
        photo = ''

    if "gpx" not in request.files:
        return {"errors": "file type not permitted"}, 400
    
    gpx = request.files["gpx"]
    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "image file type not permitted"}, 400

    if not allowed_file(gpx.filename):
        return {"errors": "gpx file type not permitted"}, 400

    # gpx_filename = get_unique_filename(gpx.filename)
    image.filename = get_unique_filename(image.filename)
    
    singleActivity = []
    # This parses the uploaded gpx file GPX(tracks=[GPXTrack(name='\n from Sep 3, 2019\n', segments=[GPXTrackSegment(points=[...])])])
    gpx_parsed = gpxpy.parse(gpx)
    for track in gpx_parsed.tracks:
        # Track is all data related to one track, all latitude/longitude pairs, all elevations, all timestamps
        for segment in track.segments:
            # A segment is a collection of all data at one specific point, one latitude/longitude pair, one elevation, one timestamp
            for point in segment.points:
                # This collects only the latitude/longitude pairs from each segment, and stores them in an list of lists.
                singleActivity.append([point.latitude, point.longitude])

    # Serializing the list
    serialized_gpx = pickle.dumps(singleActivity)
    image_upload = upload_file_to_s3(image)
    
    if "url" not in image_upload:
        return image_upload, 400

    photo = image_upload["url"]
    moving_data = gpx_parsed.get_moving_data()
    # duration is in decaseconds
    duration = round((moving_data.moving_time + moving_data.stopped_time) * 0.0027778, 1)
    distance = round((moving_data.moving_distance + moving_data.stopped_distance)/ 1609.5, 1)
    
    new_activity = Activity(activity_type_id=1,user_id=current_user.id, gps_file_url=serialized_gpx, 
                    photo_url=photo,
                    activity_description=activity_description, 
                    duration=duration, 
                    distance=distance,
                    avg_speed=round(distance/duration, 1),
                    max_speed=round(moving_data.max_speed, 1), 
                    ascent_feet=300,
                    descent_feet=300)
    
    db.session.add(new_activity)
    db.session.commit()
    return {"activity": new_activity.to_dict()}


@activity_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_single_activity(id):
    activity = Activity.query.get(id)
    likes = Likes.query.filter_by(activity_id=id).all()

    for like in likes:
        db.session.delete(like)

    db.session.delete(activity)
    db.session.commit()
    return {"delete": "Post deleted"}
    
@activity_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def edit_single_activity(id):
    activity_description = request.form['description']
    activity = Activity.query.get(id)

    activity.activity_description = activity_description

    db.session.commit()
    return {"success": "edited"}

@activity_routes.route('/new/demo', methods=["POST"])
@login_required
def add_demo_activity():
    
    activity_description = request.form['description']
    if "image" not in request.files:
        photo = 'https://www.outsideonline.com/sites/default/files/styles/full-page/public/2018/10/25/jh-fatbiking-hero_h.jpg?itok=9F62G7hf'
    
    new_activity = Activity(activity_type_id=1,user_id=current_user.id, gps_file_url='https://042521srtestbucket.s3.amazonaws.com/29953700a4aa418e9928f2fa8c80856f.gpx', 
                    photo_url=photo,
                    activity_description=activity_description, duration=2.1, 
                    distance=15.5,
                    avg_speed=11.8,
                    max_speed=25, 
                    ascent_feet=300,
                    descent_feet=300)
    
    db.session.add(new_activity)
    db.session.commit()
    return {"activity": "added"}
    



