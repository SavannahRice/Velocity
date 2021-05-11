from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}
    
    
    


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/follow/<int:id>', methods=["POST"])
@login_required
def add_follower(id):
    user = User.query.get(id)
    
    db.session.execute(f'''INSERT INTO followers (user_id, follower_id)
    VALUES ({id}, {current_user.id});''')
    print('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++', id, current_user.id)
    db.session.commit()
    return user.to_dict()
