import React from 'react'
import {Table, Button, Modal} from 'semantic-ui-react'
import { FiEye } from "react-icons/fi";

export default function TableRowViewForView({data}) {
    const [open, setOpen] = React.useState(false)
    

    var finalemails=[];

    // console.log(data)
    var emailste=data.domainemails;
   


    //check email is correct or not
    function ValidateEmail(mail)
    {

        if (mail.match(/\.(jpe?g|png|pdf|jpg|js|css|io)$/)){
            return false;
          }else{
            return true;
          }
        // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        // {
        //     if(mail.slice(-3)==='jpg'){
        //     return false;
        //     }else if (mail.slice(-3)==='png') {
        //     return false;
        //     }else if (mail.slice(-3)==='gif') {
        //     return false;
        //     }else if (mail.slice(-3)==='css') {
        //     return false;
        //     }else if (mail.slice(-4)==='html') {
        //     return false;
        //     }else if (mail.slice(-11)==='example.com') {
        //     return false;
        //     }else if (mail.slice(-9)==='email.com') {
        //     return false;
        //     }else if (mail.slice(-9)==='sentry.io') {
        //     return false;
        //     }else if (mail.slice(-2)==='js') {
        //     return false;
        //     }else if (mail.slice(-4)==='jpeg') {
        //     return false;
        //     }else{
        //     return true;
        //     }
        // }else {
        //     return false;
        // }
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
        <Table.Row>
                <Table.Cell>{data.domainname}</Table.Cell>
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
                    {data.domainphones===undefined
                    ?<>-</>
                    :
                    data.domainphones.length>2
                        ?
                        <>
                            {data.domainphones[0]}, {data.domainphones[1]} and {data.domainphones.length-2} more...
                        </>
                        :
                            data.domainphones.map((ds)=>{
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
                    {/* <Modal.Header>Domain Details</Modal.Header> */}
                    <Modal.Content>
                        <Modal.Description>
                            <p className="domainmodal"><b className='modal_head'>Domain:</b> <br /> <span>{data.domainname}</span></p>
                            {/* <p className="domainmodal"><b>Title:</b> <br /> <span>{data.domaintitle}</span></p> */}
                            <p className="domainmodal">
                                <b className='modal_head'>Emails:</b>  <br />
                                <span>
                                    {finalemails.length===0
                                    ?<>-</>
                                    :
                                    finalemails.map((ds)=>{
                                        return(
                                            <>
                                            {ds},<br/>
                                            </>
                                        )
                                    })
                                    }
                                </span>
                            </p>

                            <p className="domainmodal">
                                <b className='modal_head'>Phone:</b>  <br />
                                <span>
                                    {data.domainphones===undefined
                                    ?<>-</>
                                    :
                                        data.domainphones.length>0
                                        ?
                                            data.domainphones.map((dt)=>{
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
                                    {data.domainfacebook===undefined
                                    ?<>-</>
                                    :
                                        data.domainfacebook.length>0
                                        ?
                                            data.domainfacebook.map((dt)=>{
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
                                    {data.domaininstagram===undefined
                                    ?<>-</>
                                    :
                                        data.domaininstagram.length>0
                                        ?
                                            data.domaininstagram.map((dt)=>{
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
                                    {data.domaintlinkedin===undefined
                                    ?<>-</>
                                    :
                                        data.domaintlinkedin.length>0
                                        ?
                                            data.domaintlinkedin.map((dt)=>{
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
                                    {data.domaintwitter===undefined
                                    ?<>-</>
                                    :
                                        data.domaintwitter.length>0
                                        ?
                                            data.domaintwitter.map((dt)=>{
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
                                    {data.domaingoogleplus===undefined
                                    ?<>-</>
                                    :
                                        data.domaingoogleplus.length>0
                                        ?
                                            data.domaingoogleplus.map((dt)=>{
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
                                    {data.domainyoutube===undefined
                                    ?<>-</>
                                    :
                                        data.domainyoutube.length>0
                                        ?
                                            data.domainyoutube.map((dt)=>{
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
                                    {data.domainwhatsapp===undefined
                                    ?<>-</>
                                    :
                                        data.domainwhatsapp.length>0
                                        ?
                                            data.domainwhatsapp.map((dt)=>{
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
                                <b className='modal_head'>Printrest:</b> <br />
                                <span>
                                    {data.domainwprintrest===undefined
                                    ?<>-</>
                                    :
                                        data.domainwprintrest.length>0
                                        ?
                                            data.domainwprintrest.map((dt)=>{
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
                                <b className='modal_head'>Skype:</b> <br />
                                <span>
                                    {data.domainskype===undefined
                                    ?<>-</>
                                    :
                                        data.domainskype.length>0
                                        ?
                                            data.domainskype.map((dt)=>{
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
    )
}
