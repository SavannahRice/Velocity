from flask import Blueprint, jsonify, request
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
    upload_file_to_s3, allowed_file, get_unique_filename, upload_object_to_s3)

activity_routes = Blueprint('activities', __name__)

@activity_routes.route('')
@login_required
def get_all_activities():
    activities = Activity.query.filter_by(user_id=current_user.id).order_by(Activity.id.desc()).all()
    # s3 = boto3.resource('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    
    # allTracksArr = []
    # for activity in activities:
    #     singleActivity = []
    #     url_list = activity.gps_file_url.split('/')
    #     file_ext = url_list[len(url_list) - 1]
    #     obj = s3.Object('042521srtestbucket', file_ext)
    #     gpx_file = obj.get()['Body'].read()
    #     gpx = gpxpy.parse(gpx_file)
    #     # activity.gps_file_url = gpx
    #     for track in gpx.tracks:
    #         for segment in track.segments:
    #             for point in segment.points:
    #                 singleActivity.append([point.latitude, point.longitude])
    #                 # print('Point at ({0},{1}) -> {2}'.format(point.latitude, point.longitude, point.elevation))
    #     allTracksArr.append(singleActivity)
    # print('LOOP DONE ++++++++++++++++++++++++++++', allTracksArr)
        
    return {"activities": [activity.to_dict() for activity in activities]}

@activity_routes.route('/following/<int:id>')
@login_required
def get_followingActivities(id):
    activities = Activity.query.filter_by(user_id=id)
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
    # obj = s3.Object('042521srtestbucket', file_ext)

    obj = s3.get_object(Bucket=os.environ.get("S3_BUCKET"), Key=file_ext)
    serialized = obj['Body'].read()
    gpx_pts = pickle.loads(serialized)
   
    
    # This reads the retrieved file, so it can be parsed. 
    # gpx_file = obj.get()['Body'].read()
    
    # This parses the gpx file into an array of subarrays, each subarray contains 
    # [latitude, longitude]. This will be used on the frontend to plot each point as 
    # a polyline using leaflet. 
    # gpx = gpxpy.parse(gpx_file)
    # for track in gpx.tracks:
    #     for segment in track.segments:
    #         for point in segment.points:
    #             singleActivity.append([point.latitude, point.longitude])
                    

    return {"activity": activity.to_dict(), "track": gpx_pts}

@activity_routes.route('/new', methods=["POST"])
@login_required
def add_single_activity():
    
    activity_description = request.form['description']

    if "image" not in request.files:
        photo = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mickelsontrail-credit-chad-coppess-at-sdgfp-south-dakota-game-fish-and-parks-1564596541.jpg?crop=1xw:1xh;center,top&resize=480:*'

    if "gpx" not in request.files:
        return {"errors": "file type not permitted"}, 400
    
    gpx = request.files["gpx"]
    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "image file type not permitted"}, 400


    if not allowed_file(gpx.filename):
        return {"errors": "gpx file type not permitted"}, 400

    gpx_filename = get_unique_filename(gpx.filename)
    image.filename = get_unique_filename(image.filename)

# This reads the uploaded gpx file
    # gpx_file = gpx.get()['Body'].read()
    gpx_file = request.files["gpx"]
    singleActivity = []
# This should parse the read uploaded gpx file and put into array of arrays 'singleActivity'
    gpx = gpxpy.parse(gpx_file)
    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                singleActivity.append([point.latitude, point.longitude])

# Serializing the list
    serialized_gpx = pickle.dumps(singleActivity)

    # upload = upload_file_to_s3(gpx)
    image_upload = upload_file_to_s3(image)
    gpx_upload = upload_object_to_s3(gpx_filename, serialized_gpx)

    if "url" not in gpx_upload:
        return gpx_upload, 400
    
    if "url" not in image_upload:
        return image_upload, 400


    url = gpx_upload["url"]

    photo = image_upload["url"]

    

    # s3 = boto3.resource('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    # filename = url.split('/')
    # file_ext = filename[len(filename) - 1]
    # obj = s3.Object('042521srtestbucket', file_ext)
    # gpx_file = obj.get()['Body'].read()
    # gpx_points = gpxpy.parse(gpx_file)
    moving_data = gpx.get_moving_data()
    

    new_activity = Activity(activity_type_id=1,user_id=current_user.id, gps_file_url=url, 
                    photo_url=photo,
                    activity_description=activity_description, duration=round(moving_data.moving_time / 1002, 1), 
                    distance=round(moving_data.moving_distance * 0.000621371, 1),
                    avg_speed=round(moving_data.moving_distance/moving_data.moving_time, 1),
                    max_speed=round(moving_data.max_speed, 1), 
                    ascent_feet=300,
                    descent_feet=300)
    
    db.session.add(new_activity)
    db.session.commit()
    return {"url": url}


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

# @activity_routes.route('/new', methods=["POST"])
# @login_required
# def add_single_activity():
    
#     activity_description = request.form['description']

#     if "image" not in request.files:
#         photo = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mickelsontrail-credit-chad-coppess-at-sdgfp-south-dakota-game-fish-and-parks-1564596541.jpg?crop=1xw:1xh;center,top&resize=480:*'

#     if "gpx" not in request.files:
#         return {"errors": "file type not permitted"}, 400
    
#     gpx = request.files["gpx"]
#     image = request.files["image"]

#     if not allowed_file(image.filename):
#         return {"errors": "image file type not permitted"}, 400


#     if not allowed_file(gpx.filename):
#         return {"errors": "gpx file type not permitted"}, 400

#     gpx.filename = get_unique_filename(gpx.filename)
#     image.filename = get_unique_filename(image.filename)

#     upload = upload_file_to_s3(gpx)
#     image_upload = upload_file_to_s3(image)

#     if "url" not in upload:
#         return upload, 400
    
#     if "url" not in image_upload:
#         return upload, 400


#     url = upload["url"]

#     photo = image_upload["url"]

    

#     s3 = boto3.resource('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
#     filename = url.split('/')
#     file_ext = filename[len(filename) - 1]
#     obj = s3.Object('042521srtestbucket', file_ext)
#     gpx_file = obj.get()['Body'].read()
#     gpx_points = gpxpy.parse(gpx_file)
#     moving_data = gpx_points.get_moving_data()
    

#     new_activity = Activity(activity_type_id=1,user_id=current_user.id, gps_file_url=url, 
#                     photo_url=photo,
#                     activity_description=activity_description, duration=round(moving_data.moving_time / 1002, 1), 
#                     distance=round(moving_data.moving_distance * 0.000621371, 1),
#                     avg_speed=round(moving_data.moving_distance/moving_data.moving_time, 1),
#                     max_speed=round(moving_data.max_speed, 1), 
#                     ascent_feet=300,
#                     descent_feet=300)
    
#     db.session.add(new_activity)
#     db.session.commit()
#     return {"url": url}    


