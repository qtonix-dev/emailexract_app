import React, { Component } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdVerifiedUser, MdErrorOutline } from "react-icons/md";
// import API from '../../api/API'
import API2 from '../../api/API2';

export class ShowFoundUrls extends Component {

    constructor(props){
        super(props)
        this.state={
            hideLinks:true,
            data:props.data,
            isVerified:false,
            totalURL:[],
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
       
        //Not working properly********
        API2.get(`/googlelinkfinder/${this.props.data}`)
        .then(response=>{
            this.setState({totalURL:response.data.datas})
        })

        API2.get(`/emailverifychecknow/${this.props.data}`)
        .then(response=>{
            if(response.data.deliverable){
                this.setState({isVerified:true})
            }else{
                this.setState({isVerified:false})
            }
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
                
                {this.state.isVerified
                ?<span className="foundLink_verifiedemail"><MdVerifiedUser /></span>
                :
                <>
                <span className="foundLink_invalidemail"><MdErrorOutline /></span>
                </>}


                {this.state.hideLinks
                    ?<span onClick={()=>this.showHideLinks(false)}>{this.state.totalURL===null?this.state.totalURL.length:this.state.totalURL.length} Sources<span><MdKeyboardArrowDown /></span></span>
                    :<span onClick={()=>this.showHideLinks(true)}>{this.state.totalURL===null?this.state.totalURL.length:this.state.totalURL.length} Sources<span><MdKeyboardArrowUp /></span></span>
                }




                </h5>

                {this.state.hideLinks
                    ?<></>
                    :
                    <>
                    {this.state.totalURL.length===0
                        ?<></>
                        :
                        <>
                        {this.state.totalURL.map((url,key)=>{
                                return(
                                        <p key={key}>  <a href={url.link} target="_blank" rel="noreferrer" >{this.truncate(url.link)}</a> </p>
                                    )
                                })}
                                </>
                                }
                                
                        </>}

                                
            </div>
        )
    }
}

export default ShowFoundUrls
