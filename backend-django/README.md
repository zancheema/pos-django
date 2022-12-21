# Recommender POS Django Backend

#### **Commands to run install and run the Project**
- start virtual env (linux): 
`source env/bin/activate`
- install dependencies: 
`pip install -r requirements.txt`
- run cronjob to refresh model (optional, only works on linux):
`python manage.py crontab add`
- run the server on port 8000:
`python manage.py runserver`