import React, { Component } from "react";
import API from "../../api/API";
import { Table } from "semantic-ui-react";
import Moment from "react-moment";
import Loader from "react-loader-spinner";

export class TabSingleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: null,
    };
  }

  componentDidMount() {
    API.get(`/user/showallsinglesearch/${this.props.userid}`).then(
      (response) => {
          console.log(response.data)
        this.setState({
          datas: response.data.datas,
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
                <Table.HeaderCell>Domain</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.datas.map((data) => {
                return (
                  <Table.Row key={data._id}>
                    <Table.Cell>
                        <span className="text-black">{data.domain}</span>
                    </Table.Cell>
                    
                    <Table.Cell>
                        <span className="text-black">
                          <Moment format="YYYY-MM-DD">{data.createdAt}</Moment>
                        </span>
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

export default TabSingleSearch;
