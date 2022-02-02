from flask_mysqldb import MySQL

class database():

    def get_budget(self, mysql):
        try:
            cursor =  mysql.connection.cursor()
            cursor.execute("SELECT * FROM controlfood WHERE transaction_id=(SELECT max(transaction_id) FROM controlfood)") 
            budget =  cursor.fetchone()['Budget_Available']
            return budget
        except Exception as e:
            return e

    def get_all(self, mysql):
        try:
            cursor =  mysql.connection.cursor()
            cursor.execute("SELECT spending, description, date FROM controlfood where transaction_id <> 4") 
            data =  cursor.fetchall()
            data_html = []
            for d in data:
                d['date'] = d['date'].strftime("%d/%b/%Y")#Formating and updating the value of date coming from the database
                data_html.append(d)
            return data_html
        except Exception as e:
            return e
    
    def delete_all(self, mysql):
        try:
            cursor =  mysql.connection.cursor()
            cursor.execute("DELETE FROM controlfood where transaction_id <> 4")
            mysql.connection.commit()
            cursor.execute("SELECT * FROM controlfood WHERE transaction_id=(SELECT max(transaction_id) FROM controlfood)") 
            budget =  cursor.fetchone()['Budget_Available']
            cursor.close()
            return 100, budget
        except Exception as e:
            return 600


    def insert_data(self, mysql, spending, description):
        try:
            cursor =  mysql.connection.cursor()
            cursor.execute("SELECT * FROM controlfood WHERE transaction_id=(SELECT max(transaction_id) FROM controlfood)") 
            budget =  cursor.fetchone()['Budget_Available'] #Getting the budget available
            if budget >= spending:
                new_budget = budget - spending
                cursor.execute("INSERT INTO controlfood (Budget_Available, spending, description) VALUES ('{}', '{}', '{}')".format(new_budget, spending, description)) 
                mysql.connection.commit()
                cursor.close()
                return 400, new_budget
            else:
                cursor.close()
                return 300, budget
        except Exception as e:
            return e




