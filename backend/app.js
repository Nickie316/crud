const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

const db = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'YourPassword',
   database: 'db_shop'
})

const select = db.query('SELECT * FROM shop')

app.use(express.json())
app.use(cors())

// app.use('/', (req, res) => {
//    res.send('Hello World')
// })

app.get('/products', (req, res) => {
   // const{ name } = req.body
   // const { type } = req.body
   // const { qtd } = req.body
   // const { price } = req.body

   let SQL = "SELECT * FROM shop"

   db.query(SQL, (err, result) => {
      if(err) {
         console.log('Erro ao listar os produtos')
         console.log(err)
      } else {
         // console.log(result)
         res.send(result)
      }
   })
})

app.get('/products/:id', (req, res) => {
   const{ name } = req.body
   const { type } = req.body
   const { qtd } = req.body
   const { price } = req.body
   const { id } = req.body

   let SQL = "SELECT pdt_name, pdt_type, pdt_qtd, pdt_price FROM shop WHERE id =?"

   db.query(SQL, [name, type, qtd, price, id], (err, result) => {
      if(err) {
         console.log('Erro ao atualizar produto')
         console.log(err)
      } else {
         // console.log(result)
         res.send(result)
      }
   })
})

app.post('/register', (req, res) => {
   const{ name } = req.body
   const { type } = req.body
   const { qtd } = req.body
   const { price } = req.body
   
   let SQL = "INSERT INTO shop (pdt_name, pdt_type, pdt_qtd, pdt_price) VALUES (?, ?, ?, ?)"
   
   // `INSERT INTO shop (pdt_name, pdt_type, pdt_qtd, pdt_price) VALUES (?, ?, ?, ?), 
   // [${name}, ${type}, ${qtd}, ${price}]`, 

   db.query(SQL, [name, type, qtd, price],  (err, result) => {
      if(err) {
         console.log({msg: 'Erro ao cadastrar o produto'})
         console.log(err)
      } else {
         res.send({msg: 'Produto Cadastrado com Sucesso', result})
      }
   })
})

app.put(`/edit`, (req, res) => {
   const{ name } = req.body
   const { type } = req.body
   const { qtd } = req.body
   const { price } = req.body
   const { id } = req.body
    
   /*let inputName = document.querySelector('#InputName').innerHTML = name
   let typeProduct = document.querySelector('#TypeProduct').innerHTML = type
   let inputQTD = document.querySelector('#InputQTD').innerHTML = qtd
   let inputPrice = document.querySelector('#InputPrice').innerHTML = price*/

   inputName = document.querySelector('#InputName').innerHTML = name
   document.querySelector('#TypeProduct').innerHTML = type
   document.querySelector('#InputQTD').innerHTML = qtd
   document.querySelector('#InputPrice').innerHTML = price

   let SQL = "UPDATE shop SET pdt_name = ? , pdt_type = ?, pdt_qtd = ?, pdt_price = ? WHERE id = ?"

   db.query(SQL, [name, type, qtd, price, id], (err, result) => {
      if(err) {
         console.log({msg: 'Erro ao Editar o produto'})
         console.log(err)
      } else {
         res.send({msg: 'Produto Atualizado com Sucesso', result})
      }
   })

})

app.delete('/delete', (req, res) => {
   let SQL = "DELETE FROM shop WHERE id = ?"

   db.query(SQL, [id], (err, result) => {
      if(err) {
         console.log({msg: 'Erro ao deletar o produto'})
         console.log(err)
      } else {
         res.send({msg: 'Produto Deletado com Sucesso', result})
      }
   })
})

app.listen(3001, console.log('Backend Running in Port 3001'))