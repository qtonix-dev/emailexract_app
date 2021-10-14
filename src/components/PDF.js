import React from "react";
import Pdf from "react-to-pdf";
import { Grid, Table } from 'semantic-ui-react'


const ref = React.createRef();



export default function PDF() {
    return (
        <div className="App">
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div ref={ref}>
        
        <Grid>
            <Grid.Column mobile={12}>
            <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Notes</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row active>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Selected</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell active>Jill</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
            </Grid.Column>
            <Grid.Column mobile={4}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus provident delectus doloribus deserunt harum asperiores voluptatum vel ea excepturi aspernatur accusamus commodi quis quas ad eos atque, hic autem! Id!
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
}
