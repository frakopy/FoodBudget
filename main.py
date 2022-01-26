from flask import Flask
from flask import request
from flask import render_template
from flask import redirect
from flask import url_for
from flask import jsonify

app = Flask(__name__)

@app.route('/') 
def index():
    return render_template('index.html')


@app.route('/writeData', methods = ['POST'])
def proces_data():
    
    if request.method == 'POST':
        data = request.json
        description = data['description']
        spending = data['spending']
        print(f'Description = {description}')
        print(f'Spending = {spending}')
        if description and spending:
            return jsonify(code_response = 400)
        else:
            return jsonify(code_response = 600)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 8089)




