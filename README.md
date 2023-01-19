
# Django-Chat-Room

A chatroom application built using Django Channels and WebSockets that allows users to send text messages and images in real-time.
## Features

- Users can join chat rooms by providing the room name.
- Users can send and receive text messages and images in real-time.
- Users can leave the room.


## Demo

Check out the live demo of the chatroom application here: https://chatroom-risy.onrender.com/

## Requierments

- Django (3.2 or higher)
- Channels (3.0 or higher)
- whitenoise(6.3 or higher)
## Installation

1. Clone the repository:
    ```https://github.com/obansa/Django-Chat-Room.git```
2. Install the dependencies:
    ```pip install -r requirements.txt```
3. Run migrations:
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
4. Start the development server:
    ```python manage.py runserver```
5. Open the application in your browser at http://localhost:8000/
## Usage
1. Input your username and the room name


## Note
- This chatroom uses Django Channels and WebSockets for real-time communication, so make sure that your server supports them.
- This chatroom is meant to be used as a starter template, so it may not include all the features of a production-ready application.
