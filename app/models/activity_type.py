from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Activity_Type(db.Model):
    __tablename__='activity_types'

    id = db.Column(db.Integer, primary_key = True) 
    description = db.Column(db.String(50), nullable=False, unique=True)

    # activity = db.relationship('Activity', backref='activity_type')

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
        }