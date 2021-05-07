from flask import Blueprint, jsonify, request
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

follower_routes = Blueprint('followers', __name__)

@follower_routes.route('/suggested')
@login_required
def get_suggested_users():
    # User.query.get(id=current_user.id)
    # followers = user.followers
    # for follower in followers:
    #     print("FFFF", follower)
    # return {"user": user.to_dict()}
    pass