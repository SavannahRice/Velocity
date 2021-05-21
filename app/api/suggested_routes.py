from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db, follows

suggested_routes = Blueprint('suggested', __name__ )

@suggested_routes.route('/')
@login_required
def get_suggested():
    # users = db.session.query(User).order_by(follows.c.user_id)
    # users = User.query.filter(follows.user_id == current_user.id).all()
    # users = db.session.query(User).join(follows, User.id == follows.c.user_id).filter(follows.c.follower_id != current_user.id).all()
    # users = User.query.filter(User.followers.c.follower_id != current_user.id).limit(10)
    # users = db.session.query(User).filter(User.followers.any(id != current_user.id))
    
    user = User.query.get(current_user.id)

    following = user.follows
    idList = [follow.id for follow in following]
    idList.append(current_user.id)
    notFollowing = User.query.filter(User.id.notin_(idList)).limit(10).all()
    
    return {"users": [user.to_dict() for user in notFollowing]}
# 