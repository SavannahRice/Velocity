from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Activity
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

