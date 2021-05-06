from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Activity, Likes, db
from flask_login import login_required, current_user
import gpxpy
from gpxpy.gpx import GPXRoute
import gpxpy.geo
import boto3
import os
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

activity_routes = Blueprint('activities', __name__)

@activity_routes.route('')
@login_required
def get_all_activities():
    activities = Activity.query.filter_by(user_id=current_user.id)
    s3 = boto3.resource('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))
    
    # for activity in activities:
    #     url_list = activity.gps_file_url.split('/')
    #     file_ext = url_list[len(url_list) - 1]
    #     obj = s3.Object('042521srtestbucket', file_ext)
    #     gpx_file = obj.get()['Body'].read()
    #     # gpx = gpxpy.parse(gpx_file)
    #     # activity.gps_file_url = gpx
    #     print('+++++++++++++++++++', gpx_file )

    return {"activities": [activity.to_dict() for activity in activities]}

@activity_routes.route('/following/<int:id>')
@login_required
def get_followingActivities(id):
    print("Made it to route ++++++++++++++++++++++++++++++", id)
    activities = Activity.query.filter_by(user_id=id)
    return {"activities": [activity.to_dict() for activity in activities]}

    # data = request.json
    # print(data)
    
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
    like = Likes.query.get(id)
    db.session.delete(like)
    db.session.commit()
    return {"like": "Nothing"}

@activity_routes.route('/likes')
@login_required
def get_activity_likes():
   
    likes = Likes.query.filter_by(user_id=current_user.id)
    return {"likes": [like.to_dict() for like in likes]}


