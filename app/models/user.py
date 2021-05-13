from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

follows = db.Table(
    # joins table
    "followers", db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  city = db.Column(db.String(20), nullable= False)
  state = db.Column(db.String(15), nullable=False)
  avatar_img = db.Column(db.String(255), default='https://images.unsplash.com/photo-1541625810516-44f1ce894bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjU4NTR8MHwxfHNlYXJjaHw0fHxjeWNsaXN0fGVufDB8fHx8MTYyMDE1NzM5OQ&ixlib=rb-1.2.1&q=80&w=400')
  hashed_password = db.Column(db.String(255), nullable = False)
  created_at = db.Column(db.DateTime, nullable=False,
        default=datetime.date.today())
  updated_at = db.Column(db.DateTime, nullable=False,
        default=datetime.date.today())

  activities = db.relationship('Activity', back_populates='user_activities')
  likes = db.relationship('Likes', backref='user_likes')

  followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.user_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "city": self.city,
      "state": self.state,
      "avatar_img": self.avatar_img,
      "followers": [follower.get_user() for follower in self.followers],
      "following": [follower.get_user() for follower in self.follows],
      "activities": [activity.to_dict() for activity in self.activities],
      # "likes": [like.to_dict() for like in self.likes]
    }

  def get_user(self):
        return {
            "user_id": self.id,
            "username": self.username,
            "avatar_img": self.avatar_img,
            "activities": [activity.to_dict() for activity in self.activities]
            
        }

  def user_info(self):
    return {
      "username": self.username,
      "avatar_img": self.avatar_img,
    }