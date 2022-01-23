import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { delcustomer, getcustomer, updatecustomer } from 'action/user';
import { AiFillEdit } from "react-icons/ai";
import { Modal, Button } from 'react-bootstrap'
import { getcuscategory } from 'action/product';
import { AiOutlineSearch } from "react-icons/ai";
import { addcustomer as custom } from 'action/user'
import { ToastContainer, toast } from 'react-toastify';
import Pusher from 'pusher-js'
function Customers() {
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const success = useSelector(state => state.succes)
    const add = useSelector(state => state.add)
    const [addpdt, setaddpdt] = useState(false)
    const [ck, setck] = useState()
    const [editpdt, seteditpdt] = useState(false)
    const [word, setword] = useState("")
    const [result, setresult] = useState()

    useEffect(() => {
        dispatch(getcustomer())
        dispatch(getcuscategory())

    }, [success, ck])

    const [show, setShow] = useState(false);
    const [modaldata, setmodatadata] = useState({
        name: "", code: "",altcode: "", paymentterms: "", creditlimitdays: "", category: "", barcode: "", cusstatus: "", creditlimit: "", mobile: "", address1: "", address2: ""
    })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const alluser = useSelector(state => state.normal?.allcustomer)
    console.log(alluser)
    const cathuser = useSelector(state => state.normal.allcath)
    const update = () => {
        dispatch(updatecustomer(modaldata))
        setShow(false)
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
            setShow(false)


        }

    }, [success])
    const addpdtclk = () => {
        setaddpdt(true)
        setShow(true)
        setmodatadata({
            name: "", code: "", paymentterms: "", creditlimitdays: "", category: "", barcode: "", cusstatus: "", creditlimit: "", mobile: "", address1: "", address2: ""
        })
        seteditpdt(false)
    }
    const editpdtclk = () => {
        seteditpdt(true)
        setaddpdt(false)
        setShow(true)
    }
    const addcustomer = () => {
        if (modaldata.name && modaldata.code && modaldata.paymentterms && modaldata.creditlimitdays && modaldata.category && modaldata.barcode && modaldata.cusstatus && modaldata.creditlimit && modaldata.mobile && modaldata.address1 && modaldata.address2) {

            dispatch(custom(modaldata))
        } else {
            toast.error('fill all the details')
        }
    }
    useEffect(() => {
        if (word !== "") {
            // console.log('aaa', word)
            const newlist = alluser.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
            })

            setresult(newlist)

            // console.log("slist",newlist)
        } else {
            setresult(alluser)
            // console.log("slist",alldata)
        }

    }, [word, alluser, ck, success])
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
    return (
        <div className="customers">
            <div className="container">
                <div className="row">
                    <div className='col-md-8 col-12 px-5'>
                        <div className='inputcard'>
                            <AiOutlineSearch />
                            <input type='text' placeholder='search' onChange={(e) => setword(e.target.value)} />
                        </div>
                    </div>
                    <div className='col-md-4 col-12 inputcard1'>
                        <button onClick={addpdtclk}>Add Customer</button>
                    </div>
                    <div className="col-12">
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Alternate Code</th>
                                    <th>Mobile</th>
                                    <th>Address1</th>
                                    <th>Address2</th>
                                    <th>Payment Terms</th>
                                    <th>Barcode</th>
                                    <th>Credit Limits</th>
                                    <th>Credit Limits Days</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Edit</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result?.map((v, i) => {
                                        return <tr>
                                            <td data-label="Sl.No" >{i + 1}</td>
                                            <td data-label="Name" >{v.name}</td>
                                            <td data-label="Code">{v.code}</td>
                                            <td data-label="Alternate Code">{v.altcode}</td>
                                            <td data-label="Mobile">{v.mobile}</td>
                                            <td data-label="Address1">{v.address1}</td>
                                            <td data-label="Address2">{v.address2}</td>
                                            <td data-label="Payment Terms">{v.paymentterms}</td>
                                            <td data-label="Barcode">{v.barcode}</td>
                                            <td data-label="Credit Limits">{v.creditlimit}</td>
                                            <td data-label="Credit Limits Days">{v.creditlimitdays}</td>
                                            <td data-label="Category">{v.category}</td>
                                            <td data-label="Status">{v.cusstatus}</td>
                                            <td data-label="Edit"><AiFillEdit onClick={() => {
                                                setmodatadata(v)
                                                editpdtclk()

                                            }} /></td>

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
                    <Modal.Title>{editpdt ? "Edit Customer" : "Add Customer"} </Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <p>Name</p>

                                <input type="text" placeholder="Name" value={modaldata?.name} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, name: e.target.value })} />

                            </div>
                            <div className='col-md-6 col-12'>

                                <p>Code</p>
                                <input type="text" placeholder="Code" value={modaldata?.code} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, code: e.target.value })} />
                            </div>
                            <div className='col-md-6 col-12'>

                                <p>Alternate Code</p>
                                <input type="text" placeholder="Alt Code" value={modaldata?.altcode} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, altcode: e.target.value })} />
                            </div>
                            <div className='col-md-6 col-12'>

                                <p>Barcode</p>
                                <input type="text" placeholder="Barcode" value={modaldata?.barcode} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, barcode: e.target.value })} />

                            </div>
                            <div className='col-md-6 col-12'>
                                <p>Mobile</p>
                                <input type="number" placeholder="Mobile" value={modaldata?.mobile} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, mobile: e.target.value })} />


                            </div>
                            <div className='col-md-6 col-12'>
                                <p>Address1</p>
                                <input type="text" placeholder="Address1" value={modaldata?.address1} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, address1: e.target.value })} />

                            </div>
                            <div className='col-md-6 col-12'>
                                <p>Address2</p>
                                <input type="text" placeholder="Address2" value={modaldata?.address2} className="w-100 my-2" onChange={(e) => setmodatadata({ ...modaldata, address2: e.target.value })} />

                            </div>
                            <div className='col-md-6 col-12'>
                                <p for="cars">Payments Terms</p>

                                <select name="category" id="cath" className="w-100" value={modaldata.paymentterms} onChange={(e) => setmodatadata({ ...modaldata, paymentterms: e.target.value })}>
                                    <option value="">Choose Payments Terms</option>
                                    <option value="credit">Credit</option>
                                    <option value="cash">Cash</option>
                                    <option value="temporary credit">Temporary Credit</option>
                                    <option value="temporary cash">Temporary Cash</option>
                                    <option value="temporary cheque">Temporary Cheque</option>

                                </select>

                            </div>
                            <div className='col-md-6 col-12'>
                                <p>Credit Limit</p>
                                <input type="number" placeholder="Credit Limit" value={modaldata.creditlimit} className="w-100" onChange={(e) => setmodatadata({ ...modaldata, creditlimit: e.target.value })} />

                            </div>
                            <div className='col-md-6 col-12'>
                                <p for="cars">Category</p>
                                <select name="category" id="cath" value={modaldata?.category} className="w-100" onChange={(e) => setmodatadata({ ...modaldata, category: e.target.value })}>
                                    <option value="">Choose Category</option>
                                    {
                                        cathuser?.map((v) => {
                                            return <option value={v?.category}>{v?.category}</option>
                                        })
                                    }

                                </select>

                            </div>
                            <div className='col-md-6 col-12'>
                                <p>Credit Limit Days</p>
                                <input type="number" placeholder="Credit Limit Days" value={modaldata.creditlimitdays} className="w-100" onChange={(e) => setmodatadata({ ...modaldata, creditlimitdays: e.target.value })} />

                            </div>
                            <div className='col-md-6 col-12'>
                                <p for="cars">Customer Status</p>

                                <select name="category" id="cath" className="w-100" value={modaldata?.cusstatus} onChange={(e) => setmodatadata({ ...modaldata, cusstatus: e.target.value })}>
                                    <option value="">Choose Customer Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>


                                </select>
                            </div>
                        </div>















                    </Modal.Body>
                </form>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        dispatch(delcustomer(modaldata?._id))
                        setShow(false)
                    }} >
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        editpdt ? <Button className='btnadd' onClick={update} >Update</Button> :
                            <Button className='btnadd' onClick={addcustomer} >Add</Button>
                    }

                </Modal.Footer>
            </Modal>
            <ToastContainer />

        </div>
    )
}

export default Customers
