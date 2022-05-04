import React, { Component } from "react";
import API from "../../api/API";
import { Table } from "semantic-ui-react";
import Moment from "react-moment";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

export class TabBulk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: null,
    };
  }

  componentDidMount() {
    API.get(`/bulkdomainextract/viewlist/${this.props.userid}`).then(
      (response) => {
        this.setState({
          datas: response.data.data,
        });
      }
    );
  }

  render() {
    return (
      <>
        <br />

        {this.state.datas === null ? (
          <center>
            <br />
            <Loader type="TailSpin" color="#0495fd" height={30} width={30} />
          </center>
        ) : (
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>List</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell style={{ width: "40px" }}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.datas.map((data) => {
                return (
                  <Table.Row key={data._id}>
                    <Table.Cell>
                      <Link
                        exact
                        to={`/bulks/domainextract/view/${data.uuid}`}
                        target="_blank"
                      >
                        <span className="text-black">{data.listname}</span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        exact
                        to={`/bulks/domainextract/view/${data.uuid}`}
                        target="_blank"
                      >
                        <span className="text-black">
                          {data.totaldomains} domains
                        </span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        exact
                        to={`/bulks/domainextract/view/${data.uuid}`}
                        target="_blank"
                      >
                        <span className="text-black">
                          <Moment format="YYYY-MM-DD">{data.createdAt}</Moment>
                        </span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        exact
                        to={`/bulks/domainextract/view/${data.uuid}`}
                        target="_blank"
                      >
                        <span className="text-black">
                          <FiChevronRight />
                        </span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}

        <br />
      </>
    );
  }
}

export default TabBulk;
