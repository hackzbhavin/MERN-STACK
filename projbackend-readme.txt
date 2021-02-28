
check the package.json file

create folders
1. models
2. controllers
3. routes

> npm install

-------
read
------
formidable
multer
bulkwrite

middleware
>bodyparser
>cors
>cookieparser

--------------


TODO:

File structure
===========
  |-------> controllers 
  |            |
  |            |-------> 1. auth.js (controllers<->Routes)
  |            |-------> 2. user.js (for specific user/<id> controllers<->Routes)
  |            |-------> 3. category.js (for specific category/<id> controllers<->Routes)
  |            |-------> 4. product.js 
  |            |-------> 3. order.js 
  |
  |
  |
  |-------> routes (1st entry)
  |            |
  |            |-------> 1. auth.js (Routes<->controllers)
  |            |-------> 2. user.js (controllers<->Routes)
  |            |-------> 3. category.js (for specific category/<id> controllers<->Routes) 
  |            |-------> 4. product.js 
  |            |-------> 5. order.js 
  |            |
  |
  |     
  |-------> models (1st entry)
  |            |
  |            |-------> 1. user.js (Registraion)
  |            |-------> 2. category.js 
  |            |-------> 3. product.js (Product details)
  |            |-------> 4. order.js (Cart related)
  |
  |
  |
  |-------> .env (secret)
  |-------> app.js  ( Main Heart )
  


  ------
  Robo 3T
  -------
  > Open 
  > create connection
  > keep default
  > click connect