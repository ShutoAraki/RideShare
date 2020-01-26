echo "Cleaning"
find . -name "*.pyc" -exec rm -f {} \;

echo "Migrating"
python manage.py migrate --noinput

echo "Collecting static files"
python manage.py collectstatic --noinput

daphne --bind 0.0.0.0 --port 8000 taxi.asgi:application 
