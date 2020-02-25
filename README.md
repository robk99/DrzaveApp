# DrzaveApp
Application with CRUD functions on lists of countries and cities  
## Table of contents  
1. [Prerequisties](#prerequisites)  
2. [Technology](#technology)  
3. [Installation](#installation)  
4. [Setting up](#settingUp)  
5. [Basic usage](#basicUsage)  
6. [Additions](#additions)

<a name="prerequisites"></a>
## Prerequisties
```
Postgres SQL + SQL Shell (psql)
Visual Studio (or similar IDE)
Visual Studio Code (or similar IDE)
```
<a name="technology"></a>
## Technology  
```
ASP .Net Web API Core 3.0  
PostgreSQL 12.1
Angular 8.0  
```  
<a name="installation"></a>
## Installation
- [Download PostgreSQL](https://www.postgresql.org/download/)

  - [Installation guide Windows 10](https://www.youtube.com/watch?v=e1MwsT5FJRQ)
  - [Installation guide Ubuntu](https://www.youtube.com/watch?v=-LwI4HMR_Eg)
- [Download Visual Studio 2019](https://visualstudio.microsoft.com/downloads/)

  - Important components:  
![Image of component](https://i.imgur.com/ukMX0Y8.png)
![Image of component](https://i.imgur.com/qmgB4tr.png)
- [Download Visual Studio Code](https://code.visualstudio.com/download)  
<a name="settingUp"></a>
## Setting up  
**Visual Studio:**
  1. Open appsettings.json inside "DrzaveWebAPI" and make sure connection string has the right data according to your postgres credentials, so as right port:  
  ![Image of setting up postgres credentials](https://i.imgur.com/qCdvTSd.png)  
  2. Build your solution:  
     Right click on solution and press: Build Solution  
  ![Image of building solution](https://i.imgur.com/rWu0U7n.png)  
  3. Create database with VS Package Manager Console:  
     Make sure the "Default Project" is set to: DAL  
  ![Image of creating database](https://i.imgur.com/rhMKXjU.png?1)  
  If built correctly you should see your tables in pgAdmin or psql.  
  4. Start Project with IIS Express:  
  ![Image of starting WebAPI project](https://i.imgur.com/WVWDKCd.png)
  
**SQL Shell (psql):**  
  1. Open psql and log in with your credentials:  
  ![Image logging in to psql](https://i.imgur.com/qPgxNM1.png)
  2. Inside project folder find folder "SQL", copy its path and paste it to psql with "database_creator.sql" file and press ENTER:  
  (psql should start creating database tables and functions)  
  (If you are using Linux be sure to change forwardslashes with backslashes and if you have path that contains spaces be sure to put whole path in backticks)  
  ![Image of creating tables](https://i.imgur.com/xIlWAEP.png?1)  
  If everything went well now you have populated you database with data.  
  
**Visual Studio Code:**  
  1. Open VS Code and drag&drop "Angular" folder from project:  
  ![Image of drag&dropping](https://i.imgur.com/973f9ZI.png)
  2. Inside VS Code go to Terminal -> New Terinal, write: "npm install" and hit ENTER:  
  ![Image of installing npm](https://i.imgur.com/dWvjf6Q.png)
  (Node Package Manager should now install all of the dependent packages)  
  3. When done, open "environment.ts" inside environment folder and make sure to match localhost url of your API application:  
  ![Image of environment.ts file](https://i.imgur.com/F42Kkzd.png)  
  Right click on "DrzaveWebAPI" inside Visual Studio and select Properties:  
  ![Image of DrzaveWebAPI properties](https://i.imgur.com/dZTGzxH.png)  
  4. Open terminal inside VS Code and type "ng serve -oo"  
  ![Image of starting Angular app](https://i.imgur.com/BHs8XUb.png)  
  
#### **Voilla! Now you can use application!**  
<a name="basicUsage"></a>
## Basic usage  
- Login or Registration  
![Image of Homepage](https://i.imgur.com/2E4ZF2p.png)  
- Login (default credentials are: admin/admin OR you can register new user on Registration page)  
![Image of Loginpage](https://i.imgur.com/4P3tmcl.png)  
- Clicking on any country you expand it and see if it contains cities:  
![Image of expanding](https://i.imgur.com/9cSWg2i.png)  
- Clicking on blue "edit" button you go to edit-route:  
![Image of edit-route](https://i.imgur.com/0v5olsq.png)  
- Clicking on "Cities" text you go to cities-route where you can edit cities likewise:  
![Image of cities-route](https://i.imgur.com/FCm27XG.png)  
- Error Page  
![Image of ErrorPage](https://i.imgur.com/s3yy4DP.png)  

<a name="additions"></a>
## Additions  
- **Exception logging**  
  Inside "..\DrzaveWebAPI\GlobalErrorHandlingLogs\logs" you can find txt file logs for some basic exceptions:  
![Image of exception logging](https://i.imgur.com/Wxfb8EL.png)  
- **HTTP request logging**  
  Inside "..\DrzaveWebAPI\HttpRequestHandlingLogs\logs" you can find JSON file logs for every HTTP request and response:  
![JSON http logs](https://i.imgur.com/PZlyIwy.png)  
- **JWT Authorization**  
  Inside browsers local storage you can find Json Web Token:  
![Image of jwt](https://i.imgur.com/Fa1EX2K.png)  
- **Password Hashing**  
  User passwords are hashed with PBKDF2 and SHA512 Encryption:  
![Image of hashed password](https://i.imgur.com/tVkoV4x.png)  
