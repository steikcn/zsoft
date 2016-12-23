var http=require('http')
var jade=require('jade')

http.createServer((req,res)=>{
  res.writeHeader(200,{
    'Content-Type':'text/plain',
    'Charset':'utf-8'
  })
  //1. jade.compile
  //var html=jade.compile('div #{course}')({course:'JADE'})
  //2. jade.render
  //var html=jade.render('div #{course}',{course:'JADE render'})
  //3. jade.renderFile
  var html=jade.renderFile('index.jade',{course:'JADE renderFile',pretty:true})

  res.end(html)
}).listen(1337)

console.log('Server listening at 1337')
