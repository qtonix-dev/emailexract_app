import React from 'react'
// import { Table, Button, Modal } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'

// import { FiEye } from "react-icons/fi";


export default function TableRowView({data,key}) {
    // const [open, setOpen] = React.useState(false)
    // console.log(data);
    console.log(data.response)

    return (
        <>
        <Table.Row>
                <Table.Cell> {key} {data.response.domain}</Table.Cell>

                <Table.Cell> 
                    {data.response.status==='Found'
                    ?
                    data.response.emails.length>2
                        ?
                        <>
                            {data.response.emails[0]}, {data.response.emails[1]} and {data.response.emails.length-2} more...
                        </>
                        :
                            data.response.emails.map((ds)=>{
                                return(
                                    <>
                                    {ds}, &nbsp;
                                    </>
                                )
                            })
                    :
                    <>-</>
                    }
                </Table.Cell>

                <Table.Cell> 
                    {/* {data.response
                    ?
                    data.tel.length>2
                        ?
                        <>
                            {data.tel[0]}, {data.tel[1]} and {data.tel.length-2} more...
                        </>
                        :
                            data.tel.map((ds)=>{
                            return(
                                <>
                                {ds}, &nbsp;
                                </>
                            )
                        })
                    :
                    <>-</>
                    } */}
                </Table.Cell>
                <Table.Cell>
                {/* <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size='tiny'
                    trigger={<FiEye />}
                    >
                    <Modal.Content image>
                        <Modal.Description>
                            <p className="domainmodal"><b>Domain:</b> <br /> <span>{data.domain}</span></p>

                            <p className="domainmodal"><b>Emails:</b> <br />
                            {data.response?
                            <>
                                {data.email.map((mm)=>{
                                    return(
                                        <>
                                        {mm}<br/>
                                        </>
                                    )
                                })} 
                            </>
                            :
                            <>N/A</>
                            }
                            </p>

                            <p className="domainmodal"><b>Facebook:</b> <br />
                            {data.response?
                            <>
                                {data.facebook.map((mm)=>{
                                    return(
                                        <>
                                        {mm}<br/>
                                        </>
                                    )
                                })}
                            </>
                            :
                            <>N/A</>
                            } 
                            </p>

                            <p className="domainmodal"><b>Instagram:</b> <br />
                            {data.response?
                            <>
                                {data.instagram.map((mm)=>{
                                    return(
                                        <>
                                        {mm}<br/>
                                        </>
                                    )
                                })}
                            </>
                            :
                            <>N/A</>
                            } 
                            </p>

                            <p className="domainmodal"><b>Twitter:</b> <br />
                            {data.response?
                            <>
                                {data.twitter.map((mm)=>{
                                    return(
                                        <>
                                        {mm}<br/>
                                        </>
                                    )
                                })}
                            </>
                            :
                            <>N/A</>
                            } 
                            </p>

                            <p className="domainmodal"><b>LinkedIn:</b> <br />
                            {data.response?
                            <>
                                {data.linkedin.map((mm)=>{
                                    return(
                                        <>
                                        {mm}<br/>
                                        </>
                                    )
                                })}
                            </>
                            :
                            <>N/A</>
                            } 
                            </p>

                            <p className="domainmodal"><b>GooglePlus:</b> <br />
                            {data.response?
                            <>
                                {data.googleplus.map((mm)=>{
                                    return(
                                        <>
                                        {mm}<br/>
                                        </>
                                    )
                                })}
                            </>
                            :
                            <>N/A</>
                            } 
                            </p>

                            <p className="domainmodal"><b>YouTube:</b> <br />
                            {data.response?
                            <>
                                {data.youtube.map((mm)=>{
                                    return(
                                        <>
                                        {mm}<br/>
                                        </>
                                    )
                                })}
                            </>
                            :
                            <>N/A</>
                            } 
                            </p>

                            <p className="domainmodal"><b>WhatsApp:</b> <br />
                            {data.response?
                            <>
                                {data.whatsapp.map((mm)=>{
                                    return(
                                        <>
                                        {mm}<br/>
                                        </>
                                    )
                                })}
                            </>
                            :
                            <>N/A</>
                            } 
                            </p>

                            <p className="domainmodal"><b>Tel:</b> <br />
                            {data.response?
                            <>
                                {data.tel.map((mm)=>{
                                    return(
                                        <>
                                        {mm}<br/>
                                        </>
                                    )
                                })}
                            </>
                            :
                            <>N/A</>
                            } 
                            </p>
                            <br />
                            <Button color='black' size='mini' className="float-right" onClick={() => setOpen(false)}>
                            Close
                            </Button>
                            <br />

                        </Modal.Description>
                    </Modal.Content>
                </Modal> */}

                </Table.Cell>

                
        </Table.Row>

        </>
    )
}
