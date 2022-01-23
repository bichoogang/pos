import { delProduct, editProduct, getcategory, getProduct, postProduct } from 'action/product'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiFillEdit } from "react-icons/ai";
import { Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineSearch, AiFillDelete } from "react-icons/ai";
import Pusher from 'pusher-js'
import { IoIosAddCircle } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';

function Products() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [modaldata, setmodatadata] = useState({
        name: "", code: "", altcode: "", category: "new", stock: "", costPrice: "", sellPrice: "", tax: "", description: "", barcode: ""
    })
    const [pic, setpic] = useState("")
    const [word, setword] = useState("")
    const [result, setresult] = useState()
    const [ck, setck] = useState()
    const [addpdt, setaddpdt] = useState(false)
    const [editpdt, seteditpdt] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const cathdata = useSelector(state => state.acart.category)
    const error = useSelector(state => state.error)
    const success = useSelector(state => state.succes)
    const del = useSelector(state => state?.acart?.delcategory)
    useEffect(() => {
        const pusher = new Pusher('30b83b9b426488afe28c', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('pdtupdate');
        channel.bind('update', function (data) {
            setck(JSON.stringify(data))



        });
    }, [])
    useEffect(() => {
        const pusher = new Pusher('30b83b9b426488afe28c', {
            cluster: 'ap2'
        });
        const channel = pusher.subscribe('pdtinsert');
        channel.bind('insert', function (data) {
            setck(JSON.stringify(data))
        });
    }, [])
    useEffect(() => {
        const pusher = new Pusher('30b83b9b426488afe28c', {
            cluster: 'ap2'
        });
        const channel = pusher.subscribe('pdtdelete');
        channel.bind('delete', function (data) {
            setck(JSON.stringify(data))
        });
    }, [])
    console.log('cv', ck)
    useEffect(() => {
        // alert('kl')
        dispatch(getProduct())
        dispatch(getcategory())
    }, [ck, dispatch])
    const alldata = useSelector(state => state.product)
    console.log('allaa', modaldata)
    useEffect(() => {
        if (word !== "") {
            // console.log('aaa', word)
            const newlist = alldata.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
            })

            setresult(newlist)

            // console.log("slist",newlist)
        } else {
            setresult(alldata)
            // console.log("slist",alldata)
        }

    }, [word, ck, alldata])
    console.log('allaares', result)
    const update = () => {
        if (pic) {
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
                    console.log('vid', data)

                    dispatch(editProduct({ ...modaldata, img: data.url }))
                    setShow(false)
                    // clear()
                }).catch(err => console.log(err))
        } else {
            dispatch(editProduct(modaldata))
            setShow(false)
        }

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
        if (del?.length > 0) {
            setShow(false)
        }


    }, [del])
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
            setShow(false)


        }

    }, [success])
    const addpdtclk = () => {
        setaddpdt(true)
        setShow(true)
        setmodatadata({
            name: "", code: "", category: "", stock: "", costPrice: "", sellPrice: "", tax: "", description: "", barcode: ""
        })
        seteditpdt(false)
    }
    const editpdtclk = () => {
        seteditpdt(true)
        setaddpdt(false)
        setShow(true)
    }
    const addpdtone = () => {
        console.log('mooo', modaldata)
        if (modaldata.name && modaldata.sellPrice && modaldata.tax && modaldata.code && modaldata.stock && modaldata.description && modaldata.barcode && modaldata.costPrice && modaldata.category) {
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

                    dispatch(postProduct({ ...modaldata, img: data.url }))
                    // clear()
                }).catch(err => console.log(err))

        } else {
            toast.error('Pls fill all the field')
        }




    }
    return (
        <div className="products">
            <div className="container">
                <div className="row pdtrow">
                    <div className='col-md-8 col-12 px-5'>
                        <div className='inputcard'>
                            <AiOutlineSearch />
                            <input type='text' placeholder='search' onChange={(e) => setword(e.target.value)} />
                        </div>
                    </div>
                    <div className='col-md-4 col-12 inputcard1'>
                        <button onClick={addpdtclk}>Add Product</button>

                    </div>
                    <div className="col-12">

                        <table id="customers" >
                            <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Code</th>
                                    <th>Alternate Code</th>
                                    <th>BarCode</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Cost Price</th>
                                    <th>Selling Price</th>
                                    <th>Tax</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result?.map((v, i) => {
                                        return <tr>
                                            <td data-label="Sl.No" >{i + 1}</td>
                                            <td data-label="Name" >{v?.name}</td>
                                            <td data-label="Image"><img src={v?.img} className="img-fluid" style={{ width: '50px', height: '50px' }} /></td>
                                            <td data-label="Code">{v?.code}</td>
                                            <td data-label="Alternate Code">{v?.altcode}</td>
                                            <td data-label="Barcode">{v?.barcode}</td>
                                            <td data-label="Description">{v?.description}</td>
                                            <td data-label="Category">{v?.category}</td>
                                            <td data-label="Stock">{v?.stock}</td>
                                            <td data-label="Cost Price">₹ {v?.costPrice}</td>
                                            <td data-label="Sell Price">₹ {v?.sellPrice}</td>
                                            <td data-label="Tax">{v?.tax} %</td>
                                            <td data-label="Edit">
                                                <button className='shadow' style={{ border: 'none', outline: 'none', backgroundColor: '#58418' }}>
                                                    <AiFillEdit onClick={() => {
                                                        setmodatadata(v)
                                                        editpdtclk()

                                                    }} />

                                                </button>
                                            </td>
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
                    <Modal.Title>
                        {
                            addpdt ? "Add Product" : "Edit Product"
                        }

                    </Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-md-12 col-12'>
                                {
                                    editpdt ?
                                        <><p>Image</p>
                                            <img src={modaldata?.img} className="img-fluid" style={{ width: '100px', height: '100px' }} />
                                        </> : null
                                }
                            </div>
                            <div className='col-md-6 col-12'>
                                <p>Name</p>

                                <input type="text" placeholder="Name" value={modaldata?.name} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, name: e.target.value })} />

                            </div>

                            <div className='col-md-6 col-12'>
                                <p>{editpdt ? "Change Image" : "Image"}</p>
                                <input type="file" style={{width:'100%'}} onChange={(e) => setpic(e.target.files[0])} required />
                                

                            </div>
                            <div className='col-md-6 col-12'>

                                <p>Code</p>
                                <input type="text" placeholder="Code" value={modaldata?.code} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, code: e.target.value })} />
                            </div>
                            <div className='col-md-6 col-12'>

                                <p>Alternate Code</p>
                                <input type="text" placeholder="Alternate Code" value={modaldata?.altcode} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, altcode: e.target.value })} />
                            </div>
                            <div className='col-md-6 col-12'>

                                <p>BarCode</p>
                                <input type="text" placeholder="BarCode" value={modaldata?.barcode} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, barcode: e.target.value })} />
                            </div>
                            
                
                            <div className='col-md-6 col-12'>

                                <p>category</p>
                                <select name="category" id="cath" value={modaldata?.category} className="w-100" onChange={(e) => setmodatadata({ ...modaldata, category: e.target.value })}>
                                    <option value="">Choose Category</option>
                                    {
                                        cathdata?.map((v) => {
                                            return <option value={v?.category}>{v?.category}</option>
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-md-6 col-12'>

                                <p>Stock</p>
                                <input type="number" placeholder="Stock" value={modaldata?.stock} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, stock: e.target.value })} />
                            </div>
                            <div className='col-md-6 col-12'>

                                <p>Cost Price</p>
                                <input type="number" placeholder="Cost Price" value={modaldata?.costPrice} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, costPrice: e.target.value })} />
                            </div>
                            <div className='col-md-6 col-12'>

                                <p>Selling Price</p>
                                <input type="number" placeholder="selling price" value={modaldata?.sellPrice} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, sellPrice: e.target.value })} />
                            </div>
                            <div className='col-md-6 col-12'>

                                <p>Tax</p>
                                <input type="number" placeholder="tax" value={modaldata?.tax} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, tax: e.target.value })} />
                            </div>
                            <div className='col-md-12 col-12'>

                                <p>Description</p>
                                <input type="text" placeholder="Code" value={modaldata?.description} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, description: e.target.value })} />
                            </div>

                        </div>
















                    </Modal.Body>
                </form>
                <Modal.Footer>
                    
                    
                    {
                        !editpdt ? <Button className='btnadd' onClick={addpdtone} ><IoIosAddCircle/> Add</Button> : <Button className='btnadd' variant="primary" onClick={update}>Update</Button> 
                           
                    }
                    <Button variant="danger" onClick={() => {
                        dispatch(delProduct(modaldata?._id))
                        setShow((false))
                    }}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            <ToastContainer />

        </div>
    )
}

export default Products
