import React from 'react'
import { Table } from 'semantic-ui-react'
// import { FiEye } from "react-icons/fi";


export default function TableRowView({data,key,extractPhone,extractSocial}) {
    // const [open, setOpen] = React.useState(false)
    

    return (
        <>
        <Table.Row>
                <Table.Cell> <b>{data.domain}</b></Table.Cell>

                <Table.Cell style={{textTransform:'lowercase'}}> 
                {data.emails.length===0
                                    ?<>-</>
                                    :
                                    <>
                                        {
                                            data.emails.length>2
                                            ?
                                            <>
                                                {data.emails[0]} and {data.emails.length-1} more...
                                            </>
                                            :
                                            data.emails.join(", ")
                                        }
                                    </>
                                    }

                </Table.Cell>
                <Table.Cell >
                    <div style={{float:'right'}}>
                    {data.emails.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluency/20/000000/email.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}

                                              {extractPhone
                                              ?
                                              <>
                                              {data.tel.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluency/20/000000/call.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                              </>
                                                :<></>}


                                                {extractSocial
                                                ?
                                                <>
                                                {data.facebook.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluency/20/000000/facebook.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                              {data.googleplus.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluent/20/google-plus-squared.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                              {data.instagram.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluent/20/instagram-new.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                              {data.linkedin.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluency/20/000000/linkedin.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                              {data.printrest.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluency/20/000000/pinterest.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                              {data.skype.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluency/20/000000/skype.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                              {data.twitter.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluency/20/000000/twitter.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                              {data.whatsapp.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluency/20/000000/whatsapp.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                              {data.youtube.length > 0 ? (
                                                <>
                                                  <span>
                                                    <img src="https://img.icons8.com/fluency/20/000000/youtube.png" alt='iconimage' />
                                                  </span>{" "}
                                                  &nbsp;&nbsp;
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                                </>
                                                :<></>}
                                              
                    </div>
                
                </Table.Cell>
                {/* <Table.Cell> 
                    {data.response.tel===undefined
                    ?<>-</>
                    :
                    data.response.tel.length>0
                        ?
                        <>
                            {data.response.tel[0]}, {data.response.tel[1]} and {data.response.tel.length-2} more...
                        </>
                        :
                            data.response.tel.map((ds)=>{
                            return(
                                <>
                                {ds}, &nbsp;
                                </>
                            )
                        })
                    }
                </Table.Cell> 
                {/* <Table.Cell>
                
                    
                    <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size='tiny'
                    trigger={<FiEye />}
                    >
                  
                    <Modal.Content>
                        <Modal.Description>
                            <p className="domainmodal"><b className='modal_head' >Domain:</b> <br /> <span>{data.response.domain}</span></p>
                            <p className="domainmodal">
                                <b className='modal_head'>Emails:</b>  <br />
                                <span>
                                {finalemails.length===0
                                    ?<>-</>
                                    :
                                    
                                            finalemails.map((ds)=>{
                                                return(
                                                    <>
                                                    {ds}, <br/>
                                                    </>
                                                )
                                            })
                                        }
                                 
                                    

                                </span>
                            </p>

                            <p className="domainmodal">
                                <b className='modal_head'>Tel:</b>  <br />
                                <span>
                                    {data.response.tel===undefined
                                    ?<>-</>
                                    :
                                        data.response.tel.length>0
                                        ?
                                            data.response.tel.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>

                            <p className="domainmodal">
                                <b className='modal_head'>Facebook:</b> <br />
                                <span>
                                    {data.response.facebook===undefined
                                    ?<>-</>
                                    :
                                        data.response.facebook.length>0
                                        ?
                                            data.response.facebook.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>

                            <p className="domainmodal">
                                <b className='modal_head'>Instagram:</b> <br />
                                <span>
                                    {data.response.instagram===undefined
                                    ?<>-</>
                                    :
                                        data.response.instagram.length>0
                                        ?
                                            data.response.instagram.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>

                            <p className="domainmodal">
                                <b className='modal_head'>LinkedIn:</b> <br />
                                <span>
                                    {data.response.linkedin===undefined
                                    ?<>-</>
                                    :
                                        data.response.linkedin.length>0
                                        ?
                                            data.response.linkedin.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>

                            <p className="domainmodal">
                                <b className='modal_head'>Twitter:</b> <br />
                                <span>
                                    {data.twitter===undefined
                                    ?<>-</>
                                    :
                                        data.response.twitter.length>0
                                        ?
                                            data.response.twitter.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>

                            <p className="domainmodal">
                                <b className='modal_head'>GooglePlus:</b> <br />
                                <span>
                                    {data.googleplus===undefined
                                    ?<>-</>
                                    :
                                        data.googleplus.length>0
                                        ?
                                            data.response.googleplus.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>

                            <p className="domainmodal">
                                <b className='modal_head'>YouTube:</b> <br />
                                <span>
                                    {data.response.youtube===undefined
                                    ?<>-</>
                                    :
                                        data.response.youtube.length>0
                                        ?
                                            data.response.youtube.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>

                            <p className="domainmodal">
                                <b className='modal_head'>skype:</b> <br />
                                <span>
                                    {data.response.skype===undefined
                                    ?<>-</>
                                    :
                                        data.response.skype.length>0
                                        ?
                                            data.response.skype.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>
                            <p className="domainmodal">
                                <b className='modal_head'>WhatsApp:</b> <br />
                                <span>
                                    {data.response.whatsapp===undefined
                                    ?<>-</>
                                    :
                                        data.response.whatsapp.length>0
                                        ?
                                            data.response.whatsapp.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>
                            <p className="domainmodal">
                                <b className='modal_head'>printrest:</b> <br />
                                <span>
                                    {data.response.printrest===undefined
                                    ?<>-</>
                                    :
                                        data.response.printrest.length>0
                                        ?
                                            data.response.printrest.map((dt)=>{
                                                return(
                                                    <>
                                                    {dt} <br />
                                                    </>
                                                )
                                            })
                                        :
                                        <>-</>
                                    }
                                </span>
                            </p>




                            
                            <br />
                            <Button color='black' size='mini' className="float-right" onClick={() => setOpen(false)}>
                            Close
                            </Button>
                            <br />
                        </Modal.Description>
                    </Modal.Content>
                    
                </Modal>
                </Table.Cell> */}
        </Table.Row>

        </>
    )
}
