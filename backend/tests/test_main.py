import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to SynergySphere API"}

def test_get_items():
    response = client.get("/api/v1/items")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_item():
    item_data = {"name": "Test Item", "price": 10.0}
    response = client.post("/api/v1/items", json=item_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Item"
    assert data["price"] == 10.0

def test_signup():
    user_data = {"email": "test@example.com", "username": "testuser", "password": "testpass"}
    response = client.post("/api/v1/auth/signup", json=user_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login():
    # First signup
    user_data = {"email": "test2@example.com", "username": "testuser2", "password": "testpass"}
    client.post("/api/v1/auth/signup", json=user_data)
    
    # Then login
    login_data = {"email": "test2@example.com", "password": "testpass"}
    response = client.post("/api/v1/auth/login-json", json=login_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_forgot_password():
    # First signup
    user_data = {"email": "test3@example.com", "username": "testuser3", "password": "testpass"}
    client.post("/api/v1/auth/signup", json=user_data)
    
    # Then forgot password
    forgot_data = {"email": "test3@example.com"}
    response = client.post("/api/v1/auth/forgot-password", json=forgot_data)
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
