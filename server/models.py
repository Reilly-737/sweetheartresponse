from app import db
from sqlalchemy.sql import func

class Valentine(db.Model):
    __tablename__ = 'valentines'

    id = db.Column(db.Integer, primary_key=True)
    sender_email = db.Column(db.String, nullable=False)
    recipient_email = db.Column(db.String, nullable=False)
    token = db.Column(db.String, unique=True, nullable=False)
    response = db.Column(db.String)  
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    responded_at = db.Column(db.DateTime(timezone=True))

    def __repr__(self):
        return f'<Valentine(id={self.id}, sender_email={self.sender_email}, recipient_email={self.recipient_email})>'