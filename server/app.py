from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import string
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///valentine.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
api = Api(app)
CORS(app)
from dotenv import load_dotenv
load_dotenv()

from models import Valentine

class ValentineResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('sender_email', required=True, help="Sender email cannot be blank!")
    parser.add_argument('recipient_email', required=True, help="Recipient email cannot be blank!")

    def post(self):
        data = self.parser.parse_args()
        token = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
        new_valentine = Valentine(sender_email=data['sender_email'],
                                  recipient_email=data['recipient_email'],
                                  token=token)
        db.session.add(new_valentine)
        db.session.commit()
        return {'token': token}, 201

api.add_resource(ValentineResource, '/valentines')

def delete_old_records():
    threshold = datetime.utcnow() - timedelta(hours=72)
    old_records = Valentine.query.filter(Valentine.responded_at <= threshold).all()
    for record in old_records:
        db.session.delete(record)
    db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)