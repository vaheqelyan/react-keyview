import * as React from "react";
import KEY_CODE from "../keyboard/keyCodes";
import { isGreaterEnd, isLessStart } from "../keyboard/comparison";

export interface ITableProps {
	dom?: React.HTMLProps<HTMLTableElement>;
	count: number;
	visibleCount: number;
	rowHeight: number;
	columnCount: number;
	renderRow: (rowIndex: number, currentIndex: number, col: JSX.Element[]) => JSX.Element;
	renderHeader: (value: string, index: number) => any;
	header: string[];
	renderRowColumn: (rowIndex: number, headerIndex) => JSX.Element;
}

export interface ITableState {
	currentIndex: number;
	start: number;
	end: number;
}

export default class Table extends React.Component<ITableProps, ITableState> {
	constructor(props: ITableProps) {
		super(props);
		this.state = {
			currentIndex: 0,
			start: 0,
			end: props.visibleCount,
		};
	}
	private up = () => {
		const { currentIndex } = this.state;
		if (currentIndex > 0) {
			this.setState(({ currentIndex, start, end }) => {
				const comp = isLessStart(currentIndex, start);
				return {
					currentIndex: currentIndex - 1,
					start: comp ? start - 1 : start,
					end: comp ? end - 1 : end,
				};
			});
		}
	};

	private down = () => {
		if (this.state.currentIndex + 1 < this.props.count) {
			this.setState(({ currentIndex, start, end }) => {
				const comp = isGreaterEnd(currentIndex, end);
				return {
					currentIndex: currentIndex + 1,
					end: comp ? end + 1 : end,
					start: comp ? start + 1 : start,
				};
			});
		}
	};
	private onKeyDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
		switch (event.keyCode) {
			case KEY_CODE.ARROW_DOWN:
				this.down();
				break;

			case KEY_CODE.ARROW_UP:
				this.up();
				break;
		}
	};
	public render() {
		const { start, end, currentIndex } = this.state;
		const { renderRow, renderRowColumn, count, visibleCount, rowHeight, header } = this.props;
		var result = [];
		for (var i = start; i < end; i++) {
			if (i + 1 <= count) {
				var col: JSX.Element[] = [];
				for (var j = 0; j < header.length; j++) {
					col.push(renderRowColumn(i, j));
				}
				result.push(renderRow(i, currentIndex, col));
			} else {
				break;
			}
		}

		return (
			<table {...this.props.dom} onKeyDown={this.onKeyDown} tabIndex={0}>
				<tbody>
					<tr>
						{this.props.header.map((value, index) => (
							<th key={index}>{this.props.renderHeader(value, index)}</th>
						))}
					</tr>
					{result}
				</tbody>
			</table>
		);
	}
}
