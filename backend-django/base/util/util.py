from pathlib import Path


def cron_log_path():
    return root_dir() / "cron.log"


def h5_data_path():
    return root_dir() / "data.h5"


def root_dir():
    return Path(__file__).parent.parent.parent
