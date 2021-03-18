============== Read =================
reactjs docs
serverless-stack.com -> environment variable
reacttraining.com

=============== Steps ================

go to home dir and create folder with command line or terminal

> npx create-react-app projfrontend

===============================
steps:
> npm start
remove files

---> src 
   |---> Remove everything excepts app.js
===============================


============== installation ======================

installation
> npm install react-router-dom
> npm install query-string


====================================
------ IMPORTANT -------

make sure backend is DB is connected on other terminal
ex:

terminal 1: projfrontend > npm start 
                            |----------> localhost server

terminal 2: projbackend  > npm start
                            |----------> DB connected


--------END IMPORTANT ---------
====================================



====================================
====================================
        Src FOLDER
        |
        |------> core 
        |    |
        |    |------> helper folder --> Talks to backend
        |    |------> Base.js ()
        |    |------> Home.js ()
        |    |------> navbar.js
        |
        |
        |
        |------> auth ---> user sigin and signout
            |
            |

        |------>
        |
        |

    .env (Secure file...... restart the server after adding file at first)
                |--> REACT_APP_BACKEND=http://localhost:8000/api/


