import * as React from "react";

import * as ReactDOM from "react-dom";
import Grid from "../../src/Grid";
import cc from "classcat";

const CODE = `
import React from "react";
import { Grid } from "react-keyview";

class App extends React.Component {
  renderer = ({ rowIndex, columnIndex, yIndex, xIndex }) => {
    return (
      <td>
        Item {columnIndex},{rowIndex}
      </td>
    );
  };
  render() {
    return (
      <Grid
        renderer={this.renderer}
        visibleRows={6}
        rowCount={100}
        rowWidth={30}
        columnCount={100}
        visibleColumns={6}
        columnHeight={50}
      />
    );
  }
}


`;

class App extends React.Component {
	public renderer = ({ rowIndex, columnIndex, yIndex, xIndex }) => {
		return (
			<td
				className={cc({
					h: rowIndex === xIndex && columnIndex === yIndex,
					// x:rowIndex === xIndex,
					// y:columnIndex === yIndex,
					both: rowIndex === xIndex || columnIndex === yIndex,
				})}
			>
				Item {columnIndex},{rowIndex}
			</td>
		);
	};
	public render() {
		return (
			<React.Fragment>
				<Grid
					dom={{ className: "Grid" }}
					renderer={this.renderer}
					visibleRows={6}
					rowCount={100}
					rowWidth={30}
					columnCount={100}
					visibleColumns={6}
					columnHeight={50}
				/>

				<div className="info">
					<h4>Basic usage</h4>
					<a href="https://github.com/vaheqelyan/react-keyview#grid">Grid props</a>
					<pre>
						<code>{CODE}</code>
					</pre>
				</div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
