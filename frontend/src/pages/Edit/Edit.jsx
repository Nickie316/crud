import { faCircleCheck, faListAlt } from "@fortawesome/free-regular-svg-icons"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import FaPentoSquare from "../../components/icons/fa-pen-to-square";
import FaBroom from "../../components/icons/fa-broom";
import FaHouse from '../../components/icons/fa-house'

export default function Edit() {
   const navigate = useNavigate()
   let inputName = document.querySelector('#InputName')
   let typeProduct = document.querySelector('#TypeProduct')
   let inputQTD = document.querySelector('#InputQTD')
   let inputPrice = document.querySelector('#InputPrice')
   
   const [product, setProduct] = useState()

   const { id } = useParams()

   useEffect(() => {
      // getItem()
      // productForEdit(id)
      updateProduct(id)
   })

   async function getItem() {
      await axios.get(`http://localhost:3001/products/${id}`)
         .then(response => {
            console.log(response.data[0])
            // let pdt_name = response.data[0].pdt_name
            // let pdt_type = response.data[0].pdt_type
            // let pdt_qtd = response.data[0].pdt_qtd
            // let pdt_price = response.data[0].pdt_price

            // inputName.value = response.data[0].pdt_name
            // typeProduct.value = response.data[0].pdt_type
            // inputQTD.value = response.data[0].pdt_qtd
            // inputPrice.value = response.data[0].pdt_price

            // inputName.value = response.data[0].pdt_name
            // typeProduct.value = response.data[0].pdt_type
            // inputQTD.value = response.data[0].pdt_qtd
            // inputPrice.value = response.data[0].pdt_price
         })
         .catch(err => console.log(err))
   }

   // Rejecct
   // const productForEdit = async (id) => {
   /*async function productForEdit(id) {
      await axios.get(`http://localhost:3001/products/${id}`)
         .then(response => {
            console.log(response.data[0])
            // let pdt_name = response.data[0].pdt_name
            // let pdt_type = response.data[0].pdt_type
            // let pdt_qtd = response.data[0].pdt_qtd
            // let pdt_price = response.data[0].pdt_price

            inputName.value = response.data[0].pdt_name
            typeProduct.value = response.data[0].pdt_type
            inputQTD.value = response.data[0].pdt_qtd
            inputPrice.value = response.data[0].pdt_price

            // inputName.value = pdt_name
            // typeProduct.value = pdt_type
            // inputQTD.value = pdt_qtd
            // inputPrice.value = pdt_price
         })
         .then(
            axios.put(`http://localhost:3001/edit/${id}`, {
                  name: inputName.value,
                  type: typeProduct.value,
                  qtd: inputQTD.value,
                  price: inputPrice.value
            })
               .then(() => {
                  inputName = inputName.value
                  typeProduct = typeProduct.value
                  inputQTD = inputQTD.value
                  inputPrice = inputPrice.value
               })
               .then(response => {
                  console.log(response.data.msg)
               })
               .catch(err => console.log(err))
      
            // console.log(inputName.value, typeProduct.value, inputQTD.value, inputPrice.value)
      
            // clearInput()
         )
         .catch(err => console.log(err))
   } */

   // const updateProduct = async(id) => {
   async function updateProduct(id) {

      await axios.get(`http://localhost:3001/products/${id}`)
         .then(response => {
            console.log(response.data[0])
            let pdt_name = response.data[0].pdt_name
            let pdt_type = response.data[0].pdt_type
            let pdt_qtd = response.data[0].pdt_qtd
            let pdt_price = response.data[0].pdt_price

            // inputName.value = pdt_name
            // typeProduct.value = pdt_type
            // inputQTD.value = pdt_qtd
            // inputPrice.value = pdt_price

            // inputName = response.data[0].pdt_name
            // typeProduct = response.data[0].pdt_type
            // inputQTD = response.data[0].pdt_qtd
            // inputPrice = response.data[0].pdt_price

            document.querySelector('#InputName').value = pdt_name
            document.querySelector('#TypeProduct').value = pdt_type
            document.querySelector('#InputQTD').value = pdt_qtd
            document.querySelector('#InputPrice').value = pdt_price


            return response.data[0]
         })
         .then(
            axios.put(`http://localhost:3001/edit/${id}`, {
               id: id
               /*name: inputName.value,
               type: typeProduct.value,
               qtd: inputQTD.value,
               price: inputPrice.value */
            })
            .then(response => {
               setProduct(
                  product.map(prod => {
                     return prod.id === id ?
                        {
                           id: inputName.value,
                           name: typeProduct.value,
                           qtd: inputQTD.value,
                           price: inputPrice.value
                        } : prod
                  })
               )
               console.log(response)
            })
         )
       
         .catch(err => console.log(err))

      setTimeout(() => { navigate('/list') }, 1000)
      /*axios.put(`http://localhost:3001/edit/${id}`, {
         // id: id,
         name: inputName.value,
         type: typeProduct.value,
         qtd: inputQTD.value,
         price: inputPrice.value 
      })
      .then(console.log('Entrou no Update'))
      .then(response => setProduct(response.data[0]))
      
      // alert(`
      //    Produto atulizado com sucesso: 
      //    Nome: ${inputName.value},
      //    Tipo: ${typeProduct.value},
      //    Quantidade: ${inputQTD.value},
      //    Preço: ${inputPrice.value }
      // `)

      setTimeout(() => { navigate('/list') }, 1000) */
   }
   
   function clearInput() {
      console.log(inputName.value, typeProduct.value, inputQTD.value, inputPrice.value)

      inputName.value = ''
      inputQTD.value = ''
      inputPrice.value = ''
   }

   return (
      <>
      <div className="container flex column">
            <h1 className='h1 flex text-title'>
               Editar o Produto
               <FaPentoSquare w='40' h='40' iconColor='#C1C7E0' className="pl-1"/>
            </h1>

            <form action="#" className="container flex column">

               <div className="column w-100">
                  <input
                     type="text"
                     id="InputName"
                     data-ph="Nome do Produto"
                     placeholder="Nome do Produto"
                     className="input text-title w-100"
                     // value = {props.name}
                  />
               </div>

               <div className="my-4 responsive-register w-100 flex jc-sb">

                  <select name="TypeProduct" id="TypeProduct" className='select text-title w-30'>
                     <option value="#">Escolha o Tipo</option>
                     <option value="Alimentos">Alimentos</option>
                     <option value="Bebidas">Bebidas</option>
                     <option value="Outros">Outros</option>
                  </select>

                  <input
                     type="text"
                     id="InputQTD"
                     placeholder="Quantidade"
                     className="input text-title ml-1 w-30"
                     // value={}
                  />

                  <input
                     type="text"
                     id="InputPrice"
                     placeholder="R$ Preço"
                     className="input text-title ml-1 w-30"
                  />

               </div>

            </form>

            <div className="flex jc-a btns-group-edit w-100">

               <div className="flex btn-group-edit-1">
                  <Button
                     btnType="btn btn-success btn1 mr-2"
                     content="Atualizar"
                     icon={faCircleCheck}
                     function={() => updateProduct(id)}
                  />

                  <Button
                     btnType="btn btn-info ml-1 flex"
                     content="Limpar"
                     customIcon={<FaBroom w='18' h='18' className="ml-1" iconColor="#212529" />}
                     function={() => clearInput()}
                  />
               </div>


               <div className="flex btn-group-edit-2">

                  <div className="flex btn-back ">
                     <Link to="/" className="back-responsive-edit flex ">
                        <Button
                           btnType="btn btn-warning mr-2 w-100"
                           content="Voltar para Home"
                           customIcon={<FaHouse w='18' h='18' className='ml-1' iconColor='#212529' />}
                        />
                     </Link>
                  </div>

                  <div className="flex btn-edit-list ml-1">
                     <Link to='/list'>
                        <Button btnType="btn btn-info" content="Listagem dos Produtos" icon={faListAlt}/>
                     </Link>
                  </div>
               </div>

            </div>

            {/* 
                  <div className="flex mb-4 btn-group">
                     <Button
                        btnType="btn btn-success mr-4 btn1"
                        content="Atualizar"
                        icon={faCircleCheck}
                        function={productForEdit}
                     />

                     <Button
                        btnType="btn btn-info flex"
                        content="Limpar"
                        customIcon={<FaBroom w='18' h='18' className="ml-1" iconColor="#212529" />}
                        function={clearInput}
                     />
               </div>


               <div className="btn-group">

                  <div className="flex btn-back w-100">
                     <Link to="/" className="back-responsive-edit flex mx-3">
                        <Button
                           btnType="btn btn-warning w-100"
                           content="Voltar para Home"
                           customIcon={<FaHouse w='18' h='18' className='ml-1' iconColor='#212529' />}
                        />
                     </Link>

                  </div>

                  <div className="flex btn-back w-100">
                     <Link to='/list'>
                        <Button btnType="btn btn-info" content="Listagem dos Produtos" icon={faListAlt}/>
                     </Link>
                  </div>
               </div> 
            */}

         </div>

      </>
   )
}