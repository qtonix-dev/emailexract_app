import React from 'react'
import { Table, Button, Modal } from 'semantic-ui-react'


export default function TableRowView({data,key}) {
    const [open, setOpen] = React.useState(false)
    

    return (
        <>
        <Table.Row>
                <Table.Cell> {key} {data.domain}</Table.Cell>
                <Table.Cell> {data.response?<> {data.email.length} </>:<>N/A</>} </Table.Cell>
                <Table.Cell> {data.response?<> {data.facebook.length} </>:<>N/A</>} </Table.Cell>
                <Table.Cell> {data.response?<> {data.instagram.length} </>:<>N/A</>} </Table.Cell>
                <Table.Cell> {data.response?<> {data.twitter.length} </>:<>N/A</>} </Table.Cell>
                <Table.Cell> {data.response?<> {data.linkedin.length} </>:<>N/A</>} </Table.Cell>
                <Table.Cell> {data.response?<> {data.googleplus.length} </>:<>N/A</>} </Table.Cell>
                <Table.Cell> {data.response?<> {data.youtube.length} </>:<>N/A</>} </Table.Cell>
                <Table.Cell> {data.response?<> {data.whatsapp.length} </>:<>N/A</>} </Table.Cell>
                <Table.Cell> {data.response?<> {data.tel.length} </>:<>N/A</>} </Table.Cell>
                <Table.Cell>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size='tiny'
                    trigger={<Button className='ui button float-right bgmblue text-white' size='mini'>I</Button>}
                    >
                    <Modal.Header>Domain Details</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <p>Domain: {data.domain}</p>

                            <p>Emails: <br />
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

                            <p>Facebook: <br />
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

                            <p>Instagram: <br />
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

                            <p>Twitter: <br />
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

                            <p>LinkedIn: <br />
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

                            <p>GooglePlus: <br />
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

                            <p>YouTube: <br />
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

                            <p>WhatsApp: <br />
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

                            <p>Tel: <br />
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

                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' size='mini' onClick={() => setOpen(false)}>
                        Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                </Table.Cell>

                
        </Table.Row>

        </>
    )
}
