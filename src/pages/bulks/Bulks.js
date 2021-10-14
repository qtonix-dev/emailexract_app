import React, { Component } from 'react'
import Body from '../../components/Body'
import { Grid } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import { IoSearchOutline } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";

import CheckPackageRedirect from '../../components/CheckPackageRedirect';

export class Bulks extends Component {
    render() {
        return (
            <Body>
                <CheckPackageRedirect />

                <section>
                    <div className="cuscontainer">
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <h3>Bulks</h3>
                                <h6>Choose what task to do in bulk.</h6>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid columns='equal' className="bulksec">
                                    <Grid.Column>
                                        <center>
                                            <IoSearchOutline className="bulksec_icon" />
                                        </center>
                                    </Grid.Column>
                                    <Grid.Column width={14}>
                                        <div className="bulksec_box">
                                            <Link exact to='/bulks/domainextract'>
                                            <h5 className="text-black">Domain Search  <span><MdChevronRight /></span> </h5>
                                            <p className="text-black">Find email addresses from a list of websites or companies.</p>
                                            </Link>
                                        </div>
                                        
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </div>
                </section>
            </Body>
        )
    }
}

export default Bulks
