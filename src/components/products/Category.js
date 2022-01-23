import { getcategory, getcuscategory, delcuscath, delprocath,addcategory, editProductcath } from 'action/product'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiFillDelete ,AiFillEdit} from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineSearch} from "react-icons/ai";
import { Modal, Button } from 'react-bootstrap'
import Pusher from 'pusher-js'



function Category() {
    const dispatch = useDispatch()
    const cathdata = useSelector(state => state.acart.category)
    const cathuser = useSelector(state => state.normal.allcath)
    const del = useSelector(state => state?.acart?.delcategory)
    const error = useSelector(state => state.error)
    const success = useSelector(state => state.succes)
    const [active, setactive] = useState("pdt")
    const[category, setcategory] = useState({
        _id:'', category:''
    })
    const [ck, setck] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [word,setword] = useState("")
    const [result, setresult] = useState()
    useEffect(() => {
        dispatch(getcategory())
    }, [del,success])
    console.log('cc',success)
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
    useEffect(() => {
        if (del?.length > 0) {
            toast(del, {
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

    }, [del])
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
    const [addpdt, setaddpdt] = useState(false)
    const [editpdt, seteditpdt] = useState(false)
    const addcate =() =>{
        setShow(true)
        setaddpdt(true)
        seteditpdt(false)
    }
    const update = () =>{
        dispatch(editProductcath(category))
        // console.log(category)

    }
    const addpdtone = () =>{
        if(category){
            dispatch(addcategory({ category: category?.category }))
        }else{
            toast.error('fill the field')
        }

    }
    const editcath = () =>{
        setShow(true)
        setaddpdt(false)
        seteditpdt(true)
    }


    console.log('cmm', del)
    useEffect(() => {
        if (word !== "") {
            // console.log('aaa', word)
            const newlist = cathdata?.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
            })
            
            setresult(newlist)
        
            // console.log("slist",newlist)
        } else {
            setresult(cathdata)
            // console.log("slist",alldata)
        }

    }, [word,cathdata?.length,success])
    console.log("carh",cathdata)
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
                    <button onClick={addcate} >Add Product</button>
                    
                </div>
                <div className="col-12">

                    <table id="customers" >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                               

                            </tr>
                        </thead>
                        <tbody>
                            {
                                result?.map((v,i) => {
                                    return <tr>
                                        <td data-label="No" >{i+1}</td>
                                        <td data-label="Name" >{v?.category}</td>
                                        
                                        <td data-label="Edit">
                                            <button className='shadow' style={{border:'none',outline:'none',backgroundColor:'#58418'}}>
                                            <AiFillEdit onClick={() => {
                                                setcategory(v)
                                                editcath()
                                            // setmodatadata(v)
                                            // editpdtclk()

                                        }} />
                                            </button>
                                            
                                            </td>
                                            <td data-label="Delete">
                                            <button className='shadow' style={{border:'none',outline:'none',backgroundColor:'#58418'}}>
                                            <AiFillDelete onClick={() => {
                                                dispatch(delprocath(v?._id))
                                            // setmodatadata(v)
                                            // editpdtclk()

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
                        addpdt ? "Add Customer Category" : "Edit Customer Category"
                    }

                </Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body>
                    
                    <p>Category</p>
                    <input type="text" placeholder="Category" value={category?.category} className="w-100 my-2" onChange={(e) => setcategory({...category,category: e.target.value} )} />
                   
                    
                </Modal.Body>
            </form>
            <Modal.Footer>
                
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {
                    editpdt ? <Button variant="primary" onClick={update}>Update</Button> :
                        <Button variant="primary" onClick={addpdtone} >Add</Button>
                }

            </Modal.Footer>
        </Modal>
        <ToastContainer />
    </div>
    )
}

export default Category
