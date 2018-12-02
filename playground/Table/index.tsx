import * as React from "react";
import * as ReactDOM from "react-dom";
import Table from "../../src/Table";
import cc from "classcat";
import {name,finance} from 'faker';

const arr = [];

for (var i = 0; i < 1e3; i++) {
	arr.push({ index: i, name: name.firstName(), amount:`$${finance.amount()}` });
}
const header = ["Index", "Name", "Amount"];

const CODE = `
const data = [{ a: 0, b: "foo", bar: false }];
const header = ["a", "b", "bar"];

class App extends React.Component {
  renderRow = (rowIndex, currentIndex, col) => {
    return <tr key={UNIQUE_KEY}>{col}</tr>;
  };

  renderHeader = item => {
    return item;
  };
  renderRowColumn = (i, j) => {
    var getRowColumn = data[i][header[j]];
    return <td key={UNIQUE_KEY}>{getRowColumn}</td>;
  };
  render() {
    return (
      <Table
        header={header}
        renderHeader={this.renderHeader}
        renderRow={this.renderRow}
        columnCount={3}
        count={data.length}
        visibleCount={5}
        rowHeight={50}
        renderRowColumn={this.renderRowColumn}
      />
    );
  }
}
`

class App extends React.Component {
	state = { arr: arr };
	public renderRow = (rowIndex, currentIndex, col) => {
		return (
			<tr
				key={Math.random()}
				className={cc({
					row: true,
					highlight: currentIndex === rowIndex,
				})}
			>
				{col}
			</tr>
		);
	};
	public renderHeader = item => {
		return item;
	};
	public renderRowColumn = (i, j) => {
		var get = this.state.arr[i][(header[j] as string).toLowerCase()];
		return <td key={Math.random()}>{get}</td>;		
	};
	public render() {
		return (
			<React.Fragment>
				<Table
				dom={{className:"Table"}}
					header={header}
					renderHeader={this.renderHeader}
					renderRow={this.renderRow}
					columnCount={3}
					count={this.state.arr.length}
					visibleCount={5}
					rowHeight={50}
					renderRowColumn={this.renderRowColumn}
				/>
				<div className="info">
					<h4>Basic usage</h4>
					<a href="https://github.com/vaheqelyan/react-keyview#table">Table props</a>
					<pre>
						<code>{CODE}</code>
					</pre>
				</div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
