const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
app.use(express.urlencoded({extended : true}))
app.use(express.json())
const core = require('cors')
app.use(core())

const transporter = nodemailer.createTransport({
  service : 'Gmail',
  auth : {
    user : 'kaminahacker2004@gmail.com',
    pass : 'jjrfaaompigkyjhg'
  }
})

transporter.verify((error,response)=> {
  if(error) {
    console.log(error)
  }
  else {
    console.log("Transporter is ready to send mails")
    app.listen(3001,()=> {
      console.log("server is runnig at 3001")
    })
  }
})


app.post('/',async(req,res)=> {
  const {name,email,number,query,url} = req.body
  console.log(req.body)
  let mailOption = {
    from : 'kaminahacker2004@gmail.com',
    to : 'puspanand94@gmail.com',
    subject  : "New query",
    text : `
            Name  : ${name}
            Email  : ${email}
            Website : ${url}
            number : ${number},
            query : ${query}
    `
  }
  try {
    let response = await transporter.sendMail(mailOption)
    res.status(200).send({message : "Email has sended succesfully", info : response})
  } catch (error) {
    res.send({message : "Something went wrong", error : error})
  }
})

// get a proposal route

// app.post('/getproposal',(req,res)=> {
//   const {email} = req.body
//   console.log(req.body)
//   res.send('hiii')
//   let mailOption = {
//     from : "kaminahaker2004@gmail.com",
//     to : email,
//     subject : "hellooooo from tanusa digital",
//     text : "I am from tanusa digital"
//   }
//   try {
//     let response = transporter.sendMail(mailOption)
//     res.status(200).send({messege : "email has sended succesfully", info : response})
//   } catch (error) {
//     res.status(404).send({message : "somethign went wrong",info : error})
//   }
// })