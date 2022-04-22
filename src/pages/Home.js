import React, { Component } from "react";
import { connect } from "react-redux";
// import {Link} from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
// import axios from "axios";
import Body from "../components/Body";
import { Grid, Form, Button, Input, Label, Icon } from "semantic-ui-react";
import ShowFoundUrls from "../components/home/ShowFoundUrls";
import API from "../api/API";
import cookie from "react-cookies";
import ReactImageFallback from "react-image-fallback";
import { toast } from "react-toastify";
import { navbarProgressInfo } from "../actions";
import CheckPackageRedirect from "../components/CheckPackageRedirect";
import ShowQuotaReached from "../components/ShowQuotaReached";

// import PDF from '../components/PDF'
// import Stripe from '../components/Stripe'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingBtn: false,
      staus: "waiting",
      domain: "",
      datas: false,
      userid: cookie.load("qtonixemailextractweb_userid"),
      recentsearches: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // if(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(e)) {
    this.setState({
      [e.target.name]: e.target.value,
      datas: false,
      status: "waiting",
    });
  }

  componentDidMount() {
    this.fetchRecentSearches();
  }

  fetchRecentSearches() {
    API.get(`/domainsearch/recentsearches/${this.state.userid}`).then(
      (response) => {
        this.setState({
          recentsearches: response.data.data,
        });
      }
    );
  }

  async handleSetEmail(event) {
    await this.setState({
      domain: event,
      datas: false,
      status: "waiting",
    });
  }

  handleSubmit = (e) => {
    if (/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(this.state.domain)) {
      e.preventDefault();
      this.setState({ loadingBtn: true });
    //   axios
    //     .get(
    //       `https://server-2-bulkextract-getinfo-mi83t.ondigitalocean.app/extract/${this.state.domain}`
    //     )
        API.get(`/domainsearch/finddomain/${this.state.domain}/${this.state.userid}`)
        .then((response) => {
          this.props.navbarProgressInfo();
          if (response.data.response) {

            console.log(response.data)

            this.setState({
                loadingBtn: false,
                status: "found",
                datas: response.data,
            });
            this.fetchRecentSearches();
          } else {
          }
        })
    } else {
      toast.error("invalid domain", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.fetchRecentSearches()
      this.setState({ loadSubmitButton: false });
    }
  };

  handleDelete = (e, f) => {
    API.get(`/domainsearch/delete/${e}`).then((response) => {
      if (response.data.response) {
        this.fetchRecentSearches();
        toast.success(`${f} removed successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };


  render() {
    console.log(this.state.datas)
    return (
      <Body>
        <CheckPackageRedirect />
        <ShowQuotaReached page="home">
          <section>
            {/* {this.state.navbarprogress===undefined
                    ?<></>
                    :
                    <>
                    <div className="upgradewarning">
                    <center>
                    <p>You reached your monthly quota of searches. <Link exact to='/account/subscription/view'><b>Upgrade</b></Link> your subscription to continue.</p>
                    </center>
                    <br />
                    </div>
                    </>
                    } */}
            <div className="cuscontainer">
              <Grid>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <h3>Domain Search </h3>
                  </Grid.Column>
                  <Grid.Column>
                    <Form onSubmit={this.handleSubmit}>
                      <Input
                        type="text"
                        name="domain"
                        value={this.state.domain}
                        onChange={this.handleChange}
                        fluid
                        placeholder="Enter a domain name to find email addresses"
                        action
                        className="input55"
                        required={true}
                      >
                        <input />
                        <Button
                          type="submit"
                          className="btn211"
                          loading={this.state.loadingBtn}
                          disabled={this.state.loadingBtn}
                        >
                          <FiSearch />
                        </Button>
                      </Input>
                      {/* <p>Enter a domain name to find email addresses.</p> */}
                      <br />
                    </Form>
                  </Grid.Column>
                  <Grid.Column>
                    <p className="float-right">
                      {this.state.datas === false ? (
                        <></>
                      ) : (
                        <>{this.state.datas.emails.length} results</>
                      )}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    {this.state.status === "found" ? (
                      <>


                            <ReactImageFallback
                              src={`https://logo.clearbit.com/${this.state.domain}`}
                              fallbackImage="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-logo-png-transparent-background-background-15.png"
                              initialImage={`https://logo.clearbit.com/${this.state.domain}`}
                              alt="cool image should be here"
                              className="my-image"
                              style={{    width: '80px'}}
                            />
                              {this.state.datas.emails.map((data,key) => {
                                return (
                                 
                                  <ShowFoundUrls
                                    key={key}
                                    data={data}
                                    />
                                );
                              })}
                              <br/>
                              <hr/>
                              
                              {this.state.datas.datas.tel.length>0
                              ?
                              <div className="HJJH55qwd">
                                <br />
                                <h6>Tel</h6>
                                {this.state.datas.datas.tel.map((data,key)=>{
                                  return(
                                    <p key={key}>{data}</p>
                                  )
                                })}
                                <br />
                              </div>
                              :
                              <></>}

                          

                              {this.state.datas.datas.facebook.length>0
                              ?
                              <div className="HJJH55qwd">
                                <br />
                                <h6>Facebook</h6>
                                {this.state.datas.datas.facebook.map((data,key)=>{
                                  return(
                                    <p key={key}> <a href={data} target='_blank' rel="noreferrer">{data}</a>  </p>
                                  )
                                })}
                                <br />
                              </div>
                              :
                              <></>}

                        

                              {this.state.datas.datas.instagram.length>0
                              ?
                              <div className="HJJH55qwd">
                                <br />
                                <h6>Instagram</h6>
                                {this.state.datas.datas.instagram.map((data,key)=>{
                                  return(
                                    <p key={key}> <a href={data} target='_blank' rel="noreferrer">{data}</a>  </p>
                                  )
                                })}
                                <br />
                              </div>
                              :
                              <></>}


                                {this.state.datas.datas.twitter.length>0
                                ?
                                <div className="HJJH55qwd">
                                  <br />
                                  <h6>Twitter</h6>
                                  {this.state.datas.datas.twitter.map((data,key)=>{
                                    return(
                                      <p key={key}> <a href={data} target='_blank' rel="noreferrer">{data}</a>  </p>
                                    )
                                  })}
                                  <br />
                                </div>
                                :
                                <></>}

                      

                                {this.state.datas.datas.linkedin.length>0
                                ?
                                <div className="HJJH55qwd">
                                  <br />
                                  <h6>Linkedin</h6>
                                  {this.state.datas.datas.linkedin.map((data,key)=>{
                                    return(
                                      <p key={key}> <a href={data} target='_blank' rel="noreferrer">{data}</a>  </p>
                                    )
                                  })}
                                  <br />
                                </div>
                                :
                                <></>}

                            

                              {this.state.datas.datas.youtube.length>0
                              ?
                              <div className="HJJH55qwd">
                                <br />
                                <h6>YouTube</h6>
                                {this.state.datas.datas.youtube.map((data,key)=>{
                                  return(
                                    <p key={key}> <a href={data} target='_blank' rel="noreferrer">{data}</a>  </p>
                                  )
                                })}
                                <br />
                              </div>
                              :
                              <></>}

                            

                              {this.state.datas.datas.whatsapp.length>0
                              ?
                              <div className="HJJH55qwd">
                                <br />
                                <h6>WhatsApp</h6>
                                {this.state.datas.datas.whatsapp.map((data,key)=>{
                                  return(
                                    <p key={key}> <a href={data} target='_blank' rel="noreferrer">{data}</a>  </p>
                                  )
                                })}
                                <br />
                              </div>
                              :
                              <></>}



                              {this.state.datas.datas.printrest.length>0
                              ?
                              <div className="HJJH55qwd">
                                <br />
                                <h6>Pintrest</h6>
                                {this.state.datas.datas.printrest.map((data,key)=>{
                                  return(
                                    <p key={key}> <a href={data} target='_blank' rel="noreferrer">{data}</a>  </p>
                                  )
                                })}
                                <br />
                              </div>
                              :
                              <></>}


                            {this.state.datas.datas.printrest.skype>0
                              ?
                              <div className="HJJH55qwd">
                                <br />
                                <h6>Skype</h6>
                                {this.state.datas.datas.skype.map((data,key)=>{
                                  return(
                                    <p key={key}> <a href={data} target='_blank' rel="noreferrer">{data}</a>  </p>
                                  )
                                })}
                              </div>
                              :
                              <></>}



                            {this.state.datas.datas.googleplus.length>0
                            ?
                            <div className="HJJH55qwd">
                              <br />
                              <h6>GooglePlus</h6>
                              {this.state.datas.datas.googleplus.map((data,key)=>{
                                return(
                                  <p key={key}> <a href={data} target='_blank' rel="noreferrer">{data}</a>  </p>
                                )
                              })}
                              <br />
                            </div>
                            :
                            <></>}
                              
                              

                
                      </>
                    ) : (
                      <></>
                    )}

                    {/* {this.state.status === "not_found" ? (
                      <>
                        <div>
                          <h3 style={{ color: "red" }}>
                            Oh no! We couldn't find any emails
                          </h3>
                          <p>
                            our trackers are searching the internet for leads of
                            the highest quality, unfortunately we don't have any
                            for this company, YET. but rest assured, we are
                            working on it.
                          </p>
                        </div>
                      </>
                    ) : (
                      <></>
                    )} */}
                    <br />
                  </Grid.Column>

                  <Grid.Column>
                    <div className="recentsearches">
                      {this.state.recentsearches.length === 0 ? (
                        <></>
                      ) : (
                        <>
                          <h4>
                            Recent Searches &nbsp;
                            {this.state.recentsearches.map((rs, key) => {
                              return (
                                <>
                                  <Label as="a" key={key}>
                                    <span
                                      onClick={() =>
                                        this.handleSetEmail(rs.domain)
                                      }
                                    >
                                      {rs.domain}
                                    </span>
                                    <Icon
                                      name="delete"
                                      onClick={() =>
                                        this.handleDelete(rs._id, rs.domain)
                                      }
                                    />
                                  </Label>
                                </>
                              );
                            })}
                          </h4>
                        </>
                      )}
                    </div>
                  </Grid.Column>

                 
                </Grid.Row>
              </Grid>
            </div>
          </section>
        </ShowQuotaReached>

        {/* <PDF /> */}
        {/* <Stripe /> */}
      </Body>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { navbarProgressInfo })(Home);
