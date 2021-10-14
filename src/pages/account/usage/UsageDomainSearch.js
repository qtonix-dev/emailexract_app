import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import Body from '../../../components/Body'
import { Grid,Table } from 'semantic-ui-react'
import AccountSidenav from '../../../components/account/AccountSidenav'
import API from '../../../api/API'
import cookie from 'react-cookies'
import Moment from 'react-moment';


export const UsageDomainSearch = (props) => {

    const [datas,setDatas] = useState(null);


    useEffect(() => {
        API.get(`/user/view/countsearch/${cookie.load('qtonixemailextractweb_userid')}/domainsearch`)
        .then(response=>{
            setDatas(response.data.datas)
        })
        
    }, [])

    return (
        <Body>
               <Grid>
                    <Grid.Column mobile={16} tablet={6} computer={4}>
                        <AccountSidenav />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={12}>
                    <section>
                    <div className="accountcontainer">
                        <Grid>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <h3>Domain Search</h3>
                                    <p style={{marginTop:'-17px',marginBottom:'20px'}}>
                                    {props.navbarprogress===null || props.navbarprogress===undefined
                                        ?<></>
                                        :
                                        props.navbarprogress.packageinfo.type==='Monthly'
                                        ?
                                        <>
                                            <Moment format="MMMM DD YYYY">{props.navbarprogress.userinfo.packagestartdate}</Moment>
                                            &nbsp;-&nbsp; 
                                            <Moment format="MMMM DD YYYY">{props.navbarprogress.userinfo.packageenddate}</Moment> 
          
                                        </>
                                        :  
                                        <>

                                        </>  
                                    }
                                    </p>
                                </Grid.Column>
                                <Grid.Column>
                                <Table  basic='very'>
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Domain</Table.HeaderCell>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {datas===null
                                        ?<></>
                                        :
                                        datas.map((data)=>{
                                            return(
                                                <Table.Row key={data._id}>
                                                    <Table.Cell>{data.domain}</Table.Cell>
                                                    <Table.Cell><Moment format="MMMM DD YYYY | HH:mm:ss | dddd">{data.createdAt}</Moment></Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                        }
                                        
                                    </Table.Body>
                                </Table>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    </section>
                    </Grid.Column>
                </Grid>

            </Body>
    )
}

const mapStateToProps = (state) => ({
    navbarprogress:state.navbarprogress
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UsageDomainSearch)
