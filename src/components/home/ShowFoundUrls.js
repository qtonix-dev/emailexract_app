import React, { Component } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdVerifiedUser, MdErrorOutline } from "react-icons/md";
import API from '../../api/API'

export class ShowFoundUrls extends Component {

    constructor(props){
        super(props)
        this.state={
            hideLinks:true,
            data:props.data,
            isVerified:null,
            totalURL:null,
        }
        this.showHideLinks=this.showHideLinks.bind(this);
    }

    showHideLinks(e){
        this.setState({
            hideLinks:e
        })
    }

    truncate(line){

        var length = 92;
        var myString = line;
        var myTruncatedString = myString.substring(0,length);

        return myTruncatedString;
    }


    componentDidMount(){
       
        API.get(`/domainsearch/show_url_under_email/${this.props.data}`)
        .then(response=>{
            this.setState({totalURL:response.data.results})
            // alert(123)
        })

        // API.get(`https://emailverification.whoisxmlapi.com/api/v1?apiKey=${process.env.REACT_APP_WHIISXMLAPI}&emailAddress=${this.props.email}`)
        // .then(response=>{
        //     this.setState({isVerified:response.data.smtpCheck})
        // })
    }


    render() {
        return (
            <div className="foundLink">
                <h5>{this.state.data}
                
                {this.state.data.verified
                ?<span className="foundLink_verifiedemail"><MdVerifiedUser /></span>
                :
                <>
                <span className="foundLink_invalidemail"><MdErrorOutline /></span>
                </>}


                {this.state.hideLinks
                    ?<span onClick={()=>this.showHideLinks(false)}>{this.state.totalURL===null?<></>:this.state.totalURL.length} Sources<span><MdKeyboardArrowDown /></span></span>
                    :<span onClick={()=>this.showHideLinks(true)}>{this.state.totalURL===null?<></>:this.state.totalURL.length} Sources<span><MdKeyboardArrowUp /></span></span>
                }




                </h5>

                {this.state.hideLinks
                    ?<></>
                    :
                    <>
                    {this.state.totalURL===null
                        ?<></>
                        :
                        <>
                        {this.state.totalURL.map((url)=>{
                                return(
                                        <p>  <a href={url.link} target="_blank" rel="noreferrer" >{this.truncate(url.link)}</a> </p>
                                    )
                                })}
                                </>
                                }
                                
                        </>}


                
                                      
               
                                {/* <h5>{this.state.email}  
                                
                                        {this.state.isVerified===null
                                        ?<>...</>
                                        :
                                        <>
                                            {this.state.isVerified==='true'
                                            ?<span className="foundLink_verifiedemail"><MdVerifiedUser /></span>
                                            :
                                            <>
                                            <span className="foundLink_invalidemail"><MdErrorOutline /></span>
                                            </>}
                                        </>
                                        }
                                        
                                     
                                        {this.state.hideLinks
                                        ?<span onClick={()=>this.showHideLinks(false)}>10 Sources<span><MdKeyboardArrowDown /></span></span>
                                        :<span onClick={()=>this.showHideLinks(true)}>10 Sources<span><MdKeyboardArrowUp /></span></span>
                                        }
                                          
                                    
                                     </h5>
                                {this.state.hideLinks
                                ?<></>
                                :
                                <>
                                {this.state.totalURL===null
                                ?
                                <>
                                </>
                                :
                                <>
                                {this.state.totalURL.map((url)=>{
                                    return(
                                        <p>  <a href={url.link} target="_blank" rel="noreferrer" >{this.truncate(url.link)}</a> </p>
                                    )
                                })}
                                </>
                                }
                                
                                </>} */}
                                
            </div>
        )
    }
}

export default ShowFoundUrls
