import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faListAlt, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import FaListCheck from "../../components/icons/fa-list-check";
import FaPentoSquare from "../../components/icons/fa-pen-to-square";

export default function ListOfProducts() {
   // let test = axios.get('http://localhost:3001/products', (req, res) => {
   //    const { name } = req.body
   //    const { type } = req.body
   //    const { qtd } = req.body
   //    const { price } = req.body
   // }).then(res => console.log(res))

   const [product, setProduct] = useState([]) // Recebera a lista de Produtos

   useEffect(() => {
      axios.get('http://localhost:3001/products')
         // .then(result => console.log(result.data))
         .then(response => setProduct(response.data)) // Insere o resultado
   }, [])

   return(
      <>
   
         <div className="container flex column">
            <h1 className="text-title flex mb-4">
                  Lista de Produtos
                  <FaListCheck w="40" h="40" iconColor="#C1C7E0" className="ml-1 faListCheck"/>
            </h1>
   
            <table>
               <thead className="text-title">
                  <tr>  
                     <td>Nome</td>
                     <td>Tipo</td>
                     <td>Quantidade</td>
                     <td colSpan={2}>R$ Preço</td>
                  </tr>
               </thead>
   
               <tbody className="bold italic">
                  {/* <Product name={`${name}`} type={`${type}`} qtd={`${qtd}`} price={`${price}`} /> */}
   
                  {product.map((p) => {
                     return(
                        <tr key={p.id}>
                           <td>{p.pdt_name}</td>
                           <td>{p.pdt_type}</td>
                           <td>{p.pdt_qtd}</td>
                           <td>{p.pdt_price}</td>
                           <td className="flex">
                              <div className="edit-container">
                                 <Link to='/edit'>
                                    <FaPentoSquare w="30" h="30" iconColor="#FFC107" className="penToSquare"/>
                                 </Link>
   
                                 <Link to='/delete'>
                                    <FontAwesomeIcon icon={faTrashCan} className="text-danger faTrashCan"/>
                                 </Link>
                              </div>
                           </td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
   
            <div className="flex mt-3 responsive">
               <Link to='/' className="back-link">
                  <Button btnType="btn btn-warning back" content="Voltar para Home" icon={faArrowAltCircleLeft} />
               </Link>
   
               <Button btnType="btn btn-info" content="Listagem dos Produtos" icon={faListAlt}/>
            </div>
   
         </div>
      </>
   )
}
