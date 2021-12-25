import React from 'react'
import { Table, Button, Modal } from 'semantic-ui-react'
import { FiEye } from "react-icons/fi";


export default function TableRowView({data,key}) {
    const [open, setOpen] = React.useState(false)
    // console.log(data);
    var finalemails=[];

    // console.log(data)
    var emailste=data.response.emails;


    console.log(emailste);
   


    //check email is correct or not
    function ValidateEmail(mail)
    {
        if (mail.match(/\.(jpe?g|png|pdf|jpg|js|css|io)$/)){
            return false;
          }else{
            return true;
          }
    }



    if(emailste===undefined){
        // console.log('no emails')
    }else{
        emailste.forEach(element => {

            if(ValidateEmail(element)){
                if(element!==null){
                    finalemails.push(element)
                }
            }else{

            }

        });
    }

    return (
        <>
        <Table.Row>
                <Table.Cell> {key} {data.response.domain}</Table.Cell>

                <Table.Cell> 
                {finalemails.length===0
                                    ?<>-</>
                                    :
                                    <>
                                        {
                                            finalemails.length>2
                                            ?
                                            <>
                                                {finalemails[0]}, {finalemails[1]} and {finalemails.length-2} more...
                                            </>
                                            :
                                            finalemails.map((ds)=>{
                                                return(
                                                    <>
                                                    {ds}, &nbsp;
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                    }

                </Table.Cell>
                <Table.Cell> 
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
                <Table.Cell>
                
                    
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
                    {/* <Modal.Actions>
                        
                    </Modal.Actions> */}
                </Modal>
                </Table.Cell>
        </Table.Row>

        </>
    )
}
