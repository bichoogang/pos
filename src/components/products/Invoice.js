import React, { useEffect, useState } from 'react'
import { SiAddthis } from "react-icons/si";
import { AiOutlineSearch, AiFillDelete, AiOutlineFileSearch, AiFillCreditCard } from "react-icons/ai";
import { GiCash } from "react-icons/gi";
import { useSelector, useDispatch } from 'react-redux'
import { getProduct, postorder } from 'action/product';
import easyinvoice from 'easyinvoice'
import { Modal, Button } from 'react-bootstrap'
import { IoIosAddCircle } from "react-icons/io";
import succes from 'reducers/succes';
import { getcustomer } from 'action/user';
// import niceInvoice from 'nice-invoice'
// import fs from 'fs'

function Invoice() {
    const dispatch = useDispatch()
    const ordersuc = useSelector(state => state.ordersuccess)
    useEffect(() => {
        dispatch(getProduct())
        dispatch(getcustomer())
    }, [ordersuc])
    const [findata, setfindata] = useState()
    const [distime, setdistime] = useState()
    const [paymode, setpaymode] = useState("cash")
    const alldata = useSelector(state => state.product)
    const alluser = useSelector(state => state.normal?.allcustomer)
    // console.log('all',alluser)
    const [filcus, setfilcus] =useState('a')
    const [invoice, setinvoice] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () =>{
         setShow(false)
         window.location.reload()
        };
    const handleShow = () => setShow(true);
    
    console.log('ordersucc', invoice)
    // console.log('cc',alldata?.map(v=>{
    //     return(
    //         {
    //             "quantity": "2",
    //             "description": "Test1",
    //             "pricx": 20,
    //             "tax": 6,
    //             "price": 33.87
    //         }
    //     )
    // }))
    const [code, setcode] = useState()
    const [scus, setscus] = useState()
    const cusfind = async () => {
        console.log('ffinfxxx',alluser)
        const find = await alluser?.find(p => p.mobile == scus )
        console.log('ffinf',find)
        setscus(find?find:"no")

    }
    const codefind = async () => {
        const find = await alldata?.find(p => p.code === code || p.barcode === code)
        // console.log('ffinf', find)
        setfindata(find)

    }
    
    const [invoicedata, setinvoicedata] = useState([])
    const [qyt, setqyt] = useState(1)
    console.log('cc', scus)
    const delin = async (e) => {
        const filter = await invoicedata?.filter(p => p._id !== e)
        setinvoicedata(filter)

    }
    useEffect(() => {
        setinvoice(ordersuc)
        if(ordersuc){
            setShow(true)
            setinvoicedata()
        }
    }, [ordersuc])
    const saveinvoice =() =>{
        downloadInvoice()

    }

    const downloadInvoice = async () => {
        //See documentation for all data properties
        const data = getSampleData();
        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download('myInvoice.pdf', result.pdf);
        //	you can download like this as well:
        //	easyinvoice.download();
        //	easyinvoice.download('myInvoice.pdf');  	
    }
    const gettotal = () => {
        return invoicedata?.reduce((price, item) => (Number(item?.sellPrice) * Number(item?.qyt) + ((Number(item?.sellPrice) * Number(item?.qyt)) * Number(item?.tax) / 100)) + price, 0)
    }
    const getcost = () => {
        return invoicedata?.reduce((price, item) => ((Number(item?.costPrice)) * Number(item?.qyt)) + price, 0)
    }
    const getqyt = () => {
        return invoicedata?.reduce((price, item) => (Number(item?.qyt)) + price, 0)
    }
    // console.log('taoatl', gettotal())
    const order = () => {
        dispatch(postorder({ data: invoicedata, sell: gettotal(), cost: getcost() ,customer:scus}))
    }
    // console.log('invoice',invoicedata)
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
            "invoiceNumber": invoice?._id,
            "invoiceDate": invoice?.date,
            "products": invoice?.order?.map(v=>{
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
    //   const invoiceDetail = {
    //     shipping: {
    //       name: "Micheal",
    //       address: "1234 Main Street",
    //       city: "Dubai",
    //       state: "Dubai",
    //       country: "UAE",
    //       postal_code: 94111
    //     },
    //     items: [
    //       {
    //         item: "Chair",
    //         description: "Wooden chair",
    //         quantity: 1,
    //         price: 50.00, 
    //         tax: "10%"
    //       },
    //       {
    //         item: "Watch",
    //         description: "Wall watch for office",
    //         quantity: 2,
    //         price: 30.00,
    //         tax: "10%"
    //       },
    //       {
    //         item: "Water Glass Set",
    //         description: "Water glass set for office",
    //         quantity: 1,
    //         price: 35.00,
    //         tax: ""
    //       }
    //     ],
    //     subtotal: 156,
    //     total: 156,
    //     order_number: 1234222,
    //     header:{
    //         company_name: "Nice Invoice",
    //         company_logo: "logo.png",
    //         company_address: "Nice Invoice. 123 William Street 1th Floor New York, NY 123456"
    //     },
    //     footer:{
    //       text: "This is footer - you can add any text here"
    //     },
    //     currency_symbol:"$", 
    //     date: {
    //       billing_date: "08 August 2020",
    //       due_date: "10 September 2020",
    //     }
    // };
    // const downloadInvoice1 = () =>{
    //     niceInvoice(invoiceDetail, 'your-invoice-name.pdf');

    // }



    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const time = new Date().toLocaleString()
    //         // console.log('date',time)
    //         setdistime(time)
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="invoice">
            <div className="container">
                {/* <div className="row">
                    <div className="col-md-6">
                        <p></p> 
                    </div>
                </div> */}
                <div className='row'>
                    <div className='col-md-6 col-12'>
                        <div className='findc'>
                            <input type="number" placeholder="Search By Mobile no " onChange={(e)=>setscus(e.target.value)} />
                            <AiOutlineSearch onClick={cusfind} />
                        </div>
                        <div className='cusd my-1'>
                            <div className='row'>
                                <div className='col-6'>
                                <p>Name: {scus?.name}</p>
                                </div>
                                <div className='col-6'>
                                <p>Code: {scus?.code}</p>
                                </div>
                                <div className='col-6'>
                                <p>Mobile: {scus?.mobile}</p>
                                </div>
                                <div className='col-6'>
                                <p>Address1: {scus?.address1}</p>
                                </div>
                                <div className='col-6'>
                                <p>Address2: {scus?.address2}</p>
                                </div>
                                {
                                    scus==="no"?
                                    <>
                                    <p style={{color:"red"}}>No Customer Found</p>
                                    <a href='/customers'>Register customer</a>
                                    </>:null
                                }
                            </div>
                           
                            




                        </div>

                    </div>
                    <div className='col-md-6 col-12' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p>{distime}</p>
                    </div>
                </div>
                <div className="row">

                    {/* <div className="col-12 col-md-12">
                        <ul class="responsive-table">
                            <li class="table-header">
                                <div class="col col-1">Code</div>
                                <div class="col col-2">Product Name</div>
                                <div class="col col-3">Quantity</div>
                                <div class="col col-4">Price</div>
                                <div class="col col-5">Tax</div>
                                <div class="col col-6">Total</div>
                                <div class="col col-7">Add</div>
                            </li>

                            {
                                invoicedata?.map((v, i) => {
                                    return <li class="table-row">
                                        <div class="col col-1" data-label="Code">{v?.code}</div>
                                        <div class="col col-2" data-label="Product Name">{v?.name}</div>
                                        <div class="col col-3" data-label="Quantity">{v?.qyt}</div>
                                        <div class="col col-4" data-label="Price">₹ {v?.sellPrice}</div>
                                        <div class="col col-5" data-label="Price">{v?.tax} %</div>
                                        <div class="col col-6" data-label="Total">₹ {(Number(v?.sellPrice) * v?.qyt) + ((Number(v?.sellPrice) * v?.qyt) * (Number(v?.tax) / 100))} </div>
                                        <div class="col col-7" data-label="Add"><AiFillDelete onClick={() => delin(v?._id)} /></div>
                                    </li>
                                })
                            }

                            <li class="table-row">
                                <div class="col col-1" data-label="Code"><input placeholder="code" value={code} className="w-75" onChange={(e) => setcode(e.target.value)} /><AiOutlineSearch onClick={codefind} /></div>
                                <div class="col col-2" data-label="Product Name">{findata?.name}</div>
                                <div class="col col-3" data-label="Quantity"><input type="number" value={qyt} placeholder="qyt" max={findata?.stock} value={qyt} className="w-50" onChange={(e) => setqyt(e.target.value)} /></div>
                                <div class="col col-4" data-label="Price">₹ {findata?.sellPrice}</div>
                                <div class="col col-5" data-label="Price">{findata?.tax} %</div>
                                <div class="col col-6" data-label="Total">₹ {(Number(findata?.sellPrice) * qyt) + ((Number(findata?.sellPrice) * qyt) * (Number(findata?.tax) / 100))} </div>
                                <div class="col col-7" data-label="Add"><SiAddthis onClick={() => {
                                    setinvoicedata([...invoicedata, { ...findata, qyt }])
                                    setfindata('')
                                    setcode('')
                                    setqyt(1)
                                }} /></div>
                            </li>


                        </ul>
                    </div> */}
                    <div className="col-12">

                        <table id="customers" style={{ tableLayout: 'fixed' }} >
                            <thead>
                                <tr>
                                    <th style={{ width: '30%' }}>Code</th>
                                    <th>Product Name</th>
                                    <th>Stock</th>
                                    <th>Quantity</th>
                                    <th >Price</th>
                                    <th>Tax</th>
                                    <th>Total</th>
                                    <th>Add</th>


                                </tr>

                            </thead>
                            <tbody>
                                {
                                    invoicedata?.map((v, i) => {
                                        return <tr>
                                            <td class="col col-1" data-label="Code">{v?.code}</td>
                                            <td class="col col-2" data-label="Product Name">{v?.name}</td>
                                            <td class="col col-3" data-label="Stock">{v?.stock}</td>
                                            <td class="col col-3" data-label="Quantity">{v?.qyt}</td>
                                            <td class="col col-4" data-label="Price">₹ {v?.sellPrice}</td>
                                            <td class="col col-5" data-label="Price">{v?.tax} %</td>
                                            <td class="col col-6" data-label="Total">₹ {(Number(v?.sellPrice) * v?.qyt) + ((Number(v?.sellPrice) * v?.qyt) * (Number(v?.tax) / 100))} </td>
                                            <td class="col col-7" data-label="Add"><AiFillDelete onClick={() => delin(v?._id)} /></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <tbody style={{ borderSpacing: '15px' }}>
                                <tr>
                                    <td class="col col-1" data-label="Code" ><input placeholder="code/alternate code/ barcode" value={code} className="w-75" onChange={(e) => setcode(e.target.value)} /> <AiOutlineSearch style={{ fontSize: '25px' }} onClick={codefind} /></td>
                                    <td class="col col-2" data-label="Product Name">{findata?.name}</td>
                                    <td class="col col-3" data-label="Stock">{findata?.stock}</td>
                                    <td class="col col-3" data-label="Quantity"><input type="number" value={qyt} placeholder="qyt" max={findata?.stock} value={qyt} className="w-100" onChange={(e) => setqyt(e.target.value)} /></td>

                                    <td class="col col-4" data-label="Price">₹ {findata?.sellPrice}</td>
                                    <td class="col col-5" data-label="Price">{findata?.tax} %</td>
                                    <td class="col col-6" data-label="Total">₹ {(Number(findata?.sellPrice) * qyt) + ((Number(findata?.sellPrice) * qyt) * (Number(findata?.tax) / 100))} </td>
                                    <td class="col col-7" data-label="Add"><SiAddthis onClick={() => {
                                        setinvoicedata([...invoicedata, { ...findata, qyt }])
                                        setfindata('')
                                        setcode('')
                                        setqyt(1)
                                    }} /></td>
                                </tr>
                            </tbody>




                        </table>
                    </div>
                    <div className="col-12 col-md-12 mt-3 total">
                        <div className="card">
                            <p>Mode Of Payment</p>
                            <div className="item d-flex justify-content-around">
                                <div className={paymode === "card" ? 'text-center totalbtnact' : 'text-center totalbtn totalbtn'} onClick={() => setpaymode('card')}>
                                    <AiFillCreditCard style={{ fontSize: "30px" }} />
                                    <p>Card</p>

                                </div>
                                <div className={paymode === "cash" ? 'text-center totalbtnact' : 'text-center totalbtn totalbtn'} onClick={() => setpaymode('cash')}>
                                    <GiCash style={{ fontSize: "30px" }} />
                                    <p>Cash</p>

                                </div>

                                {/* <GiCash/> */}

                            </div>
                            <div className="item d-flex justify-content-between mt-3">
                                <h4>Total items:</h4>
                                <h4>{getqyt()}</h4>

                            </div>
                            <div className="item mt-3 d-flex justify-content-between">
                                <h4>Total Price:</h4>
                                <h4>₹ {gettotal()}</h4>

                            </div>
                            {/* <button onClick={() => downloadInvoice()}>Download</button> */}
                            {
                                invoicedata?.length > 0 ? <button className='mt-3' onClick={() => order()}>Place Order</button> :
                                    <button className='mt-3' className='btndact'>Place Order</button>
                            }


                        </div>
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
                    <Modal.Title>
                       

                    </Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div className='row'>
                           
<h2>Order Placed Sucessfully</h2>
                        </div>
















                    </Modal.Body>
                </form>
                <Modal.Footer>
                    
                    
                    
                     <Button className='btnadd' onClick={saveinvoice} ><IoIosAddCircle/> Download Invoice</Button>
                           
                    
                   
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Invoice
