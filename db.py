from flask_mysqldb import MySQL
from main import app

app.config['MYSQL_HOST'] = 'us-cdbr-east-05.cleardb.net'
app.config['MYSQL_USER'] = 'bf702d51c5fe8b'
app.config['MYSQL_PASSWORD'] = '95c5b72b'
app.config['MYSQL_DB'] = 'heroku_576655c06b722f3'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor' #To get the data result as dictionary instead of touple


mysql = MySQL(app)


with app.app_context():
    cursor =  mysql.connection.cursor()
    cursor.execute("select * from controlfood where transaction_id <> 4") #Select all records except the first wich have a transaction_id=4
    data =  cursor.fetchall()

for d in data:
    print(d)