import React from 'react'
import {Table, Button, Modal} from 'semantic-ui-react'
import { FiEye } from "react-icons/fi";

export default function TableRowViewForView({data}) {
    const [open, setOpen] = React.useState(false)

    return (
        <Table.Row>
                <Table.Cell>{data.domainname}</Table.Cell>
                <Table.Cell> 
                    {data.domainemails===undefined
                    ?<>-</>
                    :
                        data.domainemails.length>2
                        ?
                        <>
                            {data.domainemails[0]}, {data.domainemails[1]} and {data.domainemails.length-2} more...
                        </>
                        :
                            data.domainemails.map((ds)=>{
                            return(
                                <>
                                {ds}, &nbsp;
                                </>
                            )
                        })
                    
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
                            <p className="domainmodal"><b>Domain:</b> <br /> <span>{data.domainname}</span></p>
                            <p className="domainmodal"><b>Title:</b> <br /> <span>{data.domaintitle}</span></p>
                            <p className="domainmodal">
                                <b>Emails:</b>  <br />
                                <span>
                                    {data.domainemails===undefined
                                    ?<>-</>
                                    :
                                        data.domainemails.length>0
                                        ?
                                            data.domainemails.map((dt)=>{
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
                                <b>Phone:</b>  <br />
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
                                <b>Facebook:</b> <br />
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
                                <b>Instagram:</b> <br />
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
                                <b>LinkedIn:</b> <br />
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
                                <b>Twitter:</b> <br />
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
                                <b>GooglePlus:</b> <br />
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
                                <b>YouTube:</b> <br />
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
                                <b>WhatsApp:</b> <br />
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
