from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
import boto3
import pickle
import os


class Activity(db.Model):
    __tablename__='activities'

    id = db.Column(db.Integer, primary_key = True)
    activity_type_id = db.Column(db.Integer, db.ForeignKey('activity_types.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    gps_file_url = db.Column(db.PickleType)
    photo_url = db.Column(db.String(256))
    activity_description = db.Column(db.Text, nullable=False)
    duration = db.Column(db.Float, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    avg_speed = db.Column(db.Float, nullable=False)
    max_speed = db.Column(db.Float, nullable=False)
    ascent_feet = db.Column(db.Float, nullable=False)
    descent_feet = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
        default=datetime.date.today())
    updated_at = db.Column(db.DateTime, nullable=False,
        default=datetime.date.today())
    
    user_activities = db.relationship('User', back_populates='activities')
    activity_type = db.relationship('Activity_Type', backref='activity')
    likes = db.relationship('Likes', back_populates='activity')


    def to_dict(self):
        
        return {
            "id": self.id,
            "activity_type_id": self.activity_type_id,
            "gps_file_url": pickle.loads(self.gps_file_url),
            "photo_url": self.photo_url,
            "activity_description": self.activity_description,
            "duration": self.duration,
            "distance": self.distance,
            "avg_speed": self.avg_speed,
            "max_speed": self.max_speed,
            "ascent_feet": self.ascent_feet,
            "descent_feet": self.descent_feet,
            "activity_type": self.activity_type.to_dict(),
            "user": self.user_activities.user_info(),
            "likes": [like.to_dict() for like in self.likes],
            "created_at": self.created_at,
        }

    
