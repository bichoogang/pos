import { getcategory, addcategory, postProduct, getcuscategory } from 'action/product'
import { addcustomercath as addcuscath } from 'action/user'
import { addcustomer as custom } from 'action/user'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlusSquare } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addproduct({ loguser }) {
    const [category, setcategory] = useState()
    const [categorycus, setcategorycus] = useState()
    const cathdata = useSelector(state => state.acart.category)
    const error = useSelector(state => state.error)
    const success = useSelector(state => state.succes)
    const add = useSelector(state => state.add)
    console.log('error', success)
    const [showap, setcshowap] = useState(true)
    const [showac, setcshowac] = useState(false)
    const [showcuscath, setcshowcuscath] = useState(false)
    const [showacus, setcshowacus] = useState(false)
    const [pic, setpic] = useState("")
    const [productdata, setproductdata] = useState({
        name: "", code: "", altcode: "", stock: "", costPrice: "", sellPrice: "", category: "", tax: "", description: "", barcode: ""
    })
    const [customerdata, setcustomerdata] = useState({
        name: "", code: "", altcode: "", paymentterms: "", creditlimitdays: "", category: "", barcode: "", cusstatus: "", creditlimit: "", mobile: "", address1: "", address1: ""
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getcategory())
        dispatch(getcuscategory())
    }, [success?.length])

    const addcath = (e) => {
        e.preventDefault()

        dispatch(addcategory({ category: category }))

    }
    useEffect(() => {
        if (error?.length > 0) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }

    }, [error])
    useEffect(() => {
        if (success?.length > 0) {
            toast(success, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setproductdata({ name: "", code: "", stock: "", costPrice: "", sellPrice: "", category: "", tax: "", description: "", barcode: "" })
            setcustomerdata({name: "", code: "", paymentterms: "", creditlimitdays: "", category: "", barcode: "", cusstatus: "", creditlimit: "", mobile: "", address1: "", address1: ""})
            setcategory("")
            setcategorycus("")


        }

    }, [success])
    const addpdt = (e) => {
        e.preventDefault()
        console.log(productdata)
        const data = new FormData()
        data.append("file", pic)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "sannu")
        fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
            method: "post",
            body: data
        }).then(res =>
            res.json())
            .then(data => {

                dispatch(postProduct({ ...productdata, img: data.url }))
                // clear()
            }).catch(err => console.log(err))


    }
    const addcustomer = (e) => {
        e.preventDefault()
        dispatch(custom(customerdata))
    }

    const addcustomercath = (e) => {
        e.preventDefault()
        dispatch(addcuscath({ category: categorycus }))
    }
    console.log('pc', loguser)
    const cathuser = useSelector(state => state.normal.allcath)
    return (
        <div className="addproduct">
            <div className="container">
                <div className="row border-bottom py-3 ">
                    <div className="col-md-3 col-12  px-5 my-2">
                        <div className={showap ? "card cardbtnactive d-flex flex-column justify-content-center align-items-center py-3" : "card cardbtn d-flex flex-column justify-content-center align-items-center py-3"} onClick={() => {
                            setcshowap(!showap)
                            setcshowac(false)
                            setcshowacus(false)
                            setcshowcuscath(false)
                        }}>
                            <FaPlusSquare />
                            <h6 className="py-2 text-center">Add Products</h6>

                        </div>
                    </div>
                    <div className="col-md-3 col-12 px-5 my-2">
                        <div className={showacus ? "card cardbtnactive d-flex flex-column justify-content-center align-items-center py-3" : "card cardbtn d-flex flex-column justify-content-center align-items-center py-3"} onClick={() => {
                            setcshowap(false)
                            setcshowac(false)
                            setcshowacus(!showacus)
                            setcshowcuscath(false)
                        }}>
                            <FaPlusSquare />
                            <h6 className="py-2 text-center">Add Customers</h6>

                        </div>
                    </div>
                    <div className="col-md-3 col-12 px-5 my-2">
                        <div className={showac ? "card cardbtnactive d-flex flex-column justify-content-center align-items-center py-3" : "card cardbtn d-flex flex-column justify-content-center align-items-center py-3"} onClick={() => {
                            setcshowap(false)
                            setcshowac(!showac)
                            setcshowacus(false)
                            setcshowcuscath(false)
                        }}>
                            <FaPlusSquare />
                            <h6 className="py-2 text-center" >Add Category</h6>

                        </div>
                    </div>
                    <div className="col-md-3 col-12 px-5 my-2">
                        <div className={showcuscath ? "card cardbtnactive d-flex flex-column justify-content-center align-items-center py-3" : "card cardbtn d-flex flex-column justify-content-center align-items-center py-3"} onClick={() => {
                            setcshowap(false)
                            setcshowac(false)
                            setcshowacus(false)
                            setcshowcuscath(!showcuscath)
                        }}>
                            <FaPlusSquare />
                            <h6 className="py-2 text-center" >Add Customer Category</h6>

                        </div>
                    </div>
                </div>
                {
                    showac ?

                        <div className="row border-bottom py-3 ">
                            <form onSubmit={addcath}>
                                <div className="col-12 d-flex justify-content-center">
                                    <h4>Add Category </h4>

                                </div>
                                <div className="col-md-12 col-12 d-block px-2">
                                    <label>Category Name</label>
                                    <input type="text" placeholder="Ex:" value={category} className="w-100" onChange={(e) => setcategory(e.target.value)} />
                                </div>
                                <div className="col-12 mt-2 d-flex justify-content-center">
                                    <button type="submit">Add Category</button>
                                </div>
                            </form>




                        </div> :
                        null
                }
                {
                    showcuscath ?

                        <div className="row border-bottom py-3 ">
                            <form onSubmit={addcustomercath}>
                                <div className="col-12 d-flex justify-content-center">
                                    <h4>Add Customer Category </h4>

                                </div>
                                <div className="col-md-12 col-12 d-block px-2">
                                    <label>Customer Category Name</label>
                                    <input type="text" placeholder="Ex:" value={categorycus} className="w-100" onChange={(e) => setcategorycus(e.target.value)} />
                                </div>
                                <div className="col-12 mt-2 d-flex justify-content-center">
                                    <button type="submit">Add Category</button>
                                </div>
                            </form>




                        </div> :
                        null
                }
                {
                    showap ?

                        

                            <form onSubmit={addpdt} className='w-100' >
                                <div className="row px-5 ">


                                <div className="col-12 my-3 d-flex justify-content-center">
                                    <h4>Add Product</h4>
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Product Name</label>
                                    <input type="text" placeholder="Ex:" value={productdata.name} className="w-100" onChange={(e) => setproductdata({ ...productdata, name: e.target.value })} required />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Product Code</label>
                                    <input type="text" placeholder="Ex:" value={productdata.code} className="w-100" onChange={(e) => setproductdata({ ...productdata, code: e.target.value })} required />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Product Barcode</label>
                                    <input type="text" placeholder="Ex:" value={productdata.barcode} className="w-100" onChange={(e) => setproductdata({ ...productdata, barcode: e.target.value })} required />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Product Description</label>
                                    <input type="text" placeholder="Ex:" value={productdata.description} className="w-100" onChange={(e) => setproductdata({ ...productdata, description: e.target.value })} required />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Product Stock</label>
                                    <input type="number" placeholder="Ex:" value={productdata.stock} className="w-100" onChange={(e) => setproductdata({ ...productdata, stock: e.target.value })} required />
                                </div>

                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Cost Price</label>
                                    <input type="number" placeholder="Ex:" value={productdata.costPrice} className="w-100" onChange={(e) => setproductdata({ ...productdata, costPrice: e.target.value })} required />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Selling Price</label>
                                    <input type="number" placeholder="Ex:" value={productdata.sellPrice} className="w-100" onChange={(e) => setproductdata({ ...productdata, sellPrice: e.target.value })} required />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Product Image</label>
                                    <br />
                                    <input type="file" onChange={(e) => setpic(e.target.files[0])} className="w-100" required />
                                </div>
                                
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label for="cars">Category</label>

                                    <select name="category" id="cath" className="w-100" value={productdata.category} onChange={(e) => setproductdata({ ...productdata, category: e.target.value })} required >
                                        <option value="">Choose Category</option>
                                        {
                                            cathdata?.map((v) => {
                                                return <>

                                                    <option value={v?.category}>{v?.category}</option>
                                                </>
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Tax (%)</label>
                                    <input type="number" placeholder="Ex:5%" value={productdata.tax} className="w-100" onChange={(e) => setproductdata({ ...productdata, tax: e.target.value })} required />
                                </div>
                                <div className="col-12 mt-2 d-flex justify-content-center">
                                    <button type="submit">Add Product</button>
                                </div>
                                </div>
                            </form>
                        
                        : null}
                {
                    showacus ?

                        
                            <form onSubmit={addcustomer} className="w-100">
                                <div className="row px-5 " >


                                <div className="col-12 my-3 d-flex justify-content-center">
                                    <h4>Add Customers</h4>
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Name</label>
                                    <input type="text" placeholder="Ex:" value={customerdata.name} className="w-100" onChange={(e) => setcustomerdata({ ...customerdata, name: e.target.value })} />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Code</label>
                                    <input type="text" placeholder="Ex:" value={customerdata.code} className="w-100" onChange={(e) => setcustomerdata({ ...customerdata, code: e.target.value })} />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Barcode</label>
                                    <input type="text" placeholder="Ex:" value={customerdata.barcode} className="w-100" onChange={(e) => setcustomerdata({ ...customerdata, barcode: e.target.value })} />
                                </div>
                                {/* <div className="col-md-6 col-12 d-block px-2">
                                    <label>Payments Terms</label>
                                    <input type="text" placeholder="Ex:" value={customerdata.paymentterms} className="w-100" onChange={(e) => setcustomerdata({ ...customerdata, paymentterms: e.target.value })} />
                                </div> */}
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label for="cars">Payments Terms</label>

                                    <select name="category" id="cath" className="w-100" value={customerdata.paymentterms} onChange={(e) => setcustomerdata({ ...customerdata, paymentterms: e.target.value })}>
                                        <option value="">Choose Payments Terms</option>
                                        <option value="credit">Credit</option>
                                        <option value="cash">Cash</option>
                                        <option value="temporary credit">Temporary Credit</option>
                                        <option value="temporary cash">Temporary Cash</option>
                                        <option value="temporary cheque">Temporary Cheque</option>

                                    </select>
                                </div>


                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Mobile</label>
                                    <input type="number" placeholder="Ex:" value={customerdata.mobile} className="w-100" onChange={(e) => setcustomerdata({ ...customerdata, mobile: e.target.value })} />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Credit Limit</label>
                                    <input type="number" placeholder="Ex:" value={customerdata.creditlimit} className="w-100" onChange={(e) => setcustomerdata({ ...customerdata, creditlimit: e.target.value })} />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Credit Limit Days</label>
                                    <input type="number" placeholder="Ex:" value={customerdata.creditlimitdays} className="w-100" onChange={(e) => setcustomerdata({ ...customerdata, creditlimitdays: e.target.value })} />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label for="cars">Category</label>

                                    <select name="category" id="cath" className="w-100" value={customerdata.category} onChange={(e) => setcustomerdata({ ...customerdata, category: e.target.value })}>
                                        <option value="">Choose Category</option>
                                        {
                                            cathuser?.map((v) => {
                                                return <>

                                                    <option value={v?.category}>{v?.category}</option>
                                                </>
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Address1</label>
                                    <input type="text" placeholder="Ex:" value={customerdata.address1} className="w-100" onChange={(e) => setcustomerdata({ ...customerdata, address1: e.target.value })} />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label>Address2</label>
                                    <input type="text" placeholder="Ex:" value={customerdata.address2} className="w-100" onChange={(e) => setcustomerdata({ ...customerdata, address2: e.target.value })} />
                                </div>
                                <div className="col-md-6 col-12 d-block px-2">
                                    <label for="cars">Customer Status</label>

                                    <select name="category" id="cath" className="w-100" value={customerdata.cusstatus} onChange={(e) => setcustomerdata({ ...customerdata, cusstatus: e.target.value })}>
                                        <option value="">Choose Customer Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>


                                    </select>
                                </div>


                                <div className="col-12 mt-2 d-flex justify-content-center">
                                    <button type="submit">Add Product</button>
                                </div>
                                </div>
                            </form>
                        
                        : null}
            </div>
            <ToastContainer />

        </div>
    )
}

export default Addproduct
