from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os

# Initialize Flask app
app = Flask(__name__)

# Directory to store uploaded images
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    image_type = db.Column(db.String(10), nullable=False)  # 'user' or 'dress'
    path = db.Column(db.String(200), nullable=True)  # File path
    url = db.Column(db.String(200), nullable=True)  # Optional: Image URL

# Create database tables
with app.app_context():
    db.create_all()

# Helper function to register a user
def register_user(email, name, password):
    try:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {"message": "User already exists", "status": 0}

        new_user = User(email=email, name=name, password=password)
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User registered successfully", "status": 1}
    except Exception as e:
        return {"message": str(e), "status": -1}

# API to register a user
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')

    if not email or not name or not password:
        return jsonify({"message": "All fields are required"}), 400

    result = register_user(email, name, password)
    return jsonify(result)

# API to upload images
@app.route('/upload', methods=['POST'])
def upload_image():
    user_id = request.form.get('user_id')
    image_type = request.form.get('image_type')  # 'user' or 'dress'

    if not image_type:
        return jsonify({"message": "Image type is required"}), 400

    file = request.files.get('file')
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        new_image = Image(user_id=user_id, image_type=image_type, path=filepath)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({"message": "Image uploaded successfully", "path": filepath}), 201

    image_url = request.form.get('image_url')
    if image_url:
        new_image = Image(user_id=user_id, image_type=image_type, url=image_url)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({"message": "Image URL saved successfully", "url": image_url}), 201

    return jsonify({"message": "No file or URL provided"}), 400

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
