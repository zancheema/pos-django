from datetime import datetime
from pathlib import Path
from base.util.cache import save_model
from base.util.util import cron_log_path

def refresh_recommendations():
    save_model()
    
    with open(cron_log_path(), 'a') as my_log:
        my_log.write(f'recommendations refreshed at: {datetime.now()}\n')
