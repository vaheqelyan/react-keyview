import * as React from "react";
import * as ReactDOM from "react-dom";
import List from "../../src/List";
import cc from "classcat";
import { name, internet } from "faker";

const data = [];
for (let x = 1e2; x--; ) data[x] = name.findName();

const CODE = `
import React from "react";
import { List } from "react-keyview";

const data = ["one", "two", "three", "..."];

class App extends React.Component {
  renderRow = (rowIndex, currentIndex) => {
    return (
      <div>
        {rowIndex} {data[rowIndex]} {currentIndex}
      </div>
    );
  };
  render() {
    return (
      <List
        renderRow={this.renderRow}
        count={data.length}
        visibleCount={5}
        rowHeight={50}
        dom={{ className: "YOUR_CLASSNAME" }}
      />
    );
  }
}
`;

class App extends React.Component {
	public renderRow = (rowIndex, currentIndex) => {
		return (
			<div
				className={cc({
					row: true,
					highlight: currentIndex === rowIndex,
				})}
			>
				#{rowIndex} {data[rowIndex]}
			</div>
		);
	};
	public render() {
		return (
			<React.Fragment>
				<List
					renderRow={this.renderRow}
					count={data.length}
					visibleCount={10}
					rowHeight={50}
					dom={{ className: "List" }}
				/>
				<div className="info">
					<h4>Basic usage</h4>
					<a href="https://github.com/vaheqelyan/react-keyview#list">List props</a>
					<pre>
						<code>{CODE}</code>
					</pre>
				</div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
