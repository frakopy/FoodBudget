from flask import Flask
from flask import request
from flask import render_template
from flask import redirect
from flask import url_for
from flask import jsonify
from flask_mysqldb import MySQL
from db import database

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'us-cdbr-east-05.cleardb.net'
app.config['MYSQL_USER'] = 'bf702d51c5fe8b'
app.config['MYSQL_PASSWORD'] = '95c5b72b'
app.config['MYSQL_DB'] = 'heroku_576655c06b722f3'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor' #To get the data result as dictionary instead of touple

mysql = MySQL(app)

db = database()

@app.route('/') 
def index():
    budget = db.get_budget(mysql)
    budget = '$' + str(budget)
    return render_template('index.html', budget=budget)

@app.route('/getData')
def get_Data():
    data_html = db.get_all(mysql)
    return render_template('showRecords.html', data=data_html)


@app.route('/writeData', methods = ['POST'])
def write_data():
    if request.method == 'POST':
        data = request.json
        description = data['description']
        spending = data['spending']
        if description and spending:
            spending = float(spending)
            result, new_budget = db.insert_data(mysql, spending, description)
            new_budget =  str(new_budget)
            return jsonify(code_response = result, new_budget = new_budget)
        else:
            budget = db.get_budget(mysql)
            budget = '$' + str(budget)
            return jsonify(code_response = 600, new_budget = budget)


@app.route('/deleteData', methods=['GET'])
def delete_data():
    result, budget = db.delete_all(mysql)
    return jsonify(code_response = result, new_budget = budget)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 8089)


