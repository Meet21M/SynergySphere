# SynergySphere API Documentation

## Overview
This API provides endpoints for managing items in the SynergySphere application.

## Base URL
`http://localhost:8000/api/v1`

## Endpoints

### GET /items
Retrieve a list of all items.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Sample Item",
    "description": "Description",
    "price": 19.99,
    "available": true
  }
]
```

### POST /items
Create a new item.

**Request Body:**
```json
{
  "name": "New Item",
  "description": "Item description",
  "price": 29.99,
  "available": true
}
```

**Response:**
```json
{
  "id": 2,
  "name": "New Item",
  "description": "Item description",
  "price": 29.99,
  "available": true
}
```

### GET /items/{item_id}
Retrieve a specific item by ID.

**Parameters:**
- `item_id` (integer): The ID of the item

**Response:**
```json
{
  "id": 1,
  "name": "Sample Item",
  "description": "Description",
  "price": 19.99,
  "available": true
}
```

## Error Responses
- `404 Not Found`: Item not found
- `422 Unprocessable Entity`: Invalid request data
