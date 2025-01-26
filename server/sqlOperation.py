import sqlite3
from config import PROD

# 1 -> Success 
# 0 -> Something went wrong
# -1 -> Database Error

def connect():
    try:
        if PROD == "Yes":
            db_path = "/home/site/wwwroot/database.db"
        else:
            db_path = "data.db"
        con = sqlite3.connect(db_path)
        cursor = con.cursor()
        return con, cursor
    except:
        return None, None

def createTables():
    con, cursor = connect()
    if con is None:
        return -1 
    cursor.execute("create table if not exists User(email varchar, name varchar, password varchar)")
    cursor.execute("create table if not exists Preferences(name varchar, Likes IMAGE)")
    return 1

def registerUser(details):   
    cursor.execute("create table if not exists User(email varchar, name varchar, password varchar)")
    cursor.execute("create table if not exists Preferences(name varchar, Likes IMAGE)")
    email = details[0]
    name = details[1]
    password = details[2]

    con, cursor = connect()
    if con is None:
        return -1 

    cursor.execute("select * from User where email = ?", (email,))
    data = cursor.fetchall()
    if data == []:
        cursor.execute("insert into User(email, name, password) values(?,?,?)", (email, name, password))
        con.commit()
        con.close()
        return 1 
    else:
        con.close()
        return 0  
