# Demo: Django - Channels - React - Webhooks

## Prerequisites to run the demo:    
* Python 3.7+
* Redis:
    * Option 1: Install redis on your machine.
    * Option 2: with docker, run: `docker run -p 6379:6379 -d redis:2.8`
* [pipenv](https://pipenv.kennethreitz.org/en/latest/) (Or - if you don't want to use pipenv, see `requirements.txt`)

## To install:

    git clone https://github.com/nonZero/django-channels-react.git
    cd django-channels-react
    pipenv install

## To run:
This runs the demo from `/static/
   
    pipenv run python manage.py runserver
    
The demo is running on <http://127.0.0.1:8000/> .



## Prerequisites to develop the react app:    
* All of the above
* node
* [pipenv](https://pipenv.kennethreitz.org/en/latest/) (Or - if you don't want to install pipenv, see `requirements.txt`)

## To install:

* Follow instructions above and also run `npm install --dev` (or `yarn install` if you have yarn)  

## To run:
    
In one terminal run:
    
    pipenv run python manage.py runserver
    
And on another one:

    npm start

Parcel is serving the app on <http://127.0.0.1:1234/> .    
    

