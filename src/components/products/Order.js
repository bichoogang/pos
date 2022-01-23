import { getallorder } from 'action/product'
import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { GrView } from "react-icons/gr";
import easyinvoice from 'easyinvoice'
function Order() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch(
        useEffect(()=>{
            dispatch(getallorder())

        },[])
    )
    const allorder = useSelector(state=>state?.normal?.allorder)
    console.log('mmm',allorder)
    const [ moddata, setmoddata] = useState()
    console.log('mmmpd',moddata)
    const downloadInvoice = async () => {
        //See documentation for all data properties
        const data = getSampleData();
        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`${moddata?._id}Invoice.pdf`, result.pdf);
        //	you can download like this as well:
        //	easyinvoice.download();
        //	easyinvoice.download('myInvoice.pdf');  	
    }

    const getSampleData = () => {
        return {
            //"documentTitle": "RECEIPT", //Defaults to INVOICE

            //"locale": "de-DE", 
            //Defaults to en-US. List of locales: https://datahub.io/core/language-codes/r/3.html 

            "currency": "INR",
            //Defaults to no currency. List of currency codes: https://www.iban.com/currency-codes

            "taxNotation": "gst", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
            // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64
            "sender": {
                "company": "Sample Corp",
                "address": "Sample Street 123",
                "zip": "1234 AB",
                "city": "Sampletown",
                "country": "Samplecountry"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            "client": {
                "company": "Client Corp",
                "address": "Clientstreet 456",
                "zip": "4567 CD",
                "city": "Clientcity",
                "country": "Clientcountry"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            "invoiceNumber": moddata?._id,
            "invoiceDate": moddata?.date,
            "products": moddata?.order?.map(v=>{
                return(
                    {
                        "quantity": v?.qyt,
                        "description": v?.name,
                        "pricx": v?.sellPrice,
                        "tax": v?.tax,
                        "price": v?.sellPrice
                    }
                )
            }),
            // "bottomNotice": "Kindly pay your invoice within 15 days.",
            //Used for translating the headers to your preferred language
            //Defaults to English. Below example is translated to Dutch
            // "translate": { 
            //     "invoiceNumber": "Factuurnummer",
            //     "invoiceDate": "Factuurdatum",
            //     "products": "Producten", 
            //     "quantity": "Aantal", 
            //     "price": "Prijs",
            //     "subtotal": "Subtotaal",
            //     "total": "Totaal" 
            // }
        };
    }
    
    return (
        <div className="order">
        <div className="container">
            <div className="row pdtrow">
                <div className="col-12">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Customer Name</th>
                                <th>Items</th>
                                <th>Date</th>
                                <th>View</th>
                                {/* <th>Cost Price</th>
                                <th>Selling Price</th>
                                <th>Tax</th>
                                <th>Edit</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {
                                allorder?.map((v) => {
                                    return <tr>
                                        <td data-label="Invoice ID" >{v?._id}</td>
                                        <td data-label="Customer" >{v?.cus?.name}</td>
                                        <td data-label="Items">{v?.order?.length} items</td>
                                        <td data-label="Date">{v?.date}</td>
                                        <td style={{cursor:'pointer'}} data-label="View" onClick={()=> {
                                            setmoddata(v)
                                            setShow(true)}}><GrView/></td>
                                       
                                    </tr>
                                })
                            }
                        </tbody>



                    </table>
                </div>
            </div>

        </div>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                {/* <Modal.Title>Modal title</Modal.Title> */}
                {
                      <div className='row'>
                          <h5>Customer Detail:</h5>
                      <div className='col-6'>
                      <p>Name: {moddata?.cus?.name}</p>
                      </div>
                      <div className='col-6'>
                      <p>Code: {moddata?.cus?.code}</p>
                      </div>
                      <div className='col-6'>
                      <p>Mobile: {moddata?.cus?.mobile}</p>
                      </div>
                      <div className='col-6'>
                      <p>Address1: {moddata?.cus?.address1}</p>
                      </div>
                      <div className='col-6'>
                      <p>Address2: {moddata?.cus?.address2}</p>
                      </div>
                      
                  </div>
                }
            </Modal.Header>
            <form>
                <Modal.Body>
                    <h5>Ordered Items:</h5>
                    {
                        moddata?.order?.map((v)=>{
                            return <>
                            <p>Name : {v?.name}</p>
                            <p>Code : {v?.code}</p>
                            <p>QYT : {v?.qyt}</p>
                            </>
                        })
                    }
                    {/* <lable>Name</lable>

                    <input type="text" placeholder="Name"  className="w-100 my-2" />
                    <lable>Code</lable>
                    <input type="text" placeholder="Code"  className="w-100 my-2" /> */}
             
                  
                </Modal.Body>
            </form>
            <Modal.Footer>
            <Button variant="primary" onClick={downloadInvoice}>
                    Invoice
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* <Button variant="primary" >Update</Button> */}
            </Modal.Footer>
        </Modal>
        {/* <ToastContainer /> */}
    </div>
    )
}

export default Order
