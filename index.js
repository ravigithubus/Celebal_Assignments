const http=require('http')
const port=3000

const server=http.createServer((req,res)=>{
        res.write("Hello World");
        res.end();
})

server.listen(port,(error)=>{
    if(error){
        console.log(error.message);
    }else{
        console.log(`Server is running at ${port}`);
    }
})