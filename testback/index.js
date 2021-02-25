const express= require('express');

const app = express();



const port = 8000;

app.get('/', (req,res)=> {
    return res.send('You are on Home Route');
});

app.get('/login', (req,res)=> {
    return res.send('You are on Login Route');
});

app.get('/admin', (req,res)=> {
    return res.send('You are on Admin Route');
});

app.get('/signup', (req,res)=> {
    return res.send('You are on Signup Route');
});


app.listen(port,()=>{
    console.log('Server is running ........ ${port}');
});


// const port = 4000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
//   })