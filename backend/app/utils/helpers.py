# Utility functions

def format_price(price: float) -> str:
    return f"${price:.2f}"

def validate_email(email: str) -> bool:
    # Simple email validation
    return "@" in email and "." in email
