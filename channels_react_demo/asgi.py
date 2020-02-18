import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'channels_react_demo.settings')

import django
django.setup(set_prefix=False)

from .routing import application
assert application
