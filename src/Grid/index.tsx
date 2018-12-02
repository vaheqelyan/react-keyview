import * as React from "react";
import KEY_CODE from "../keyboard/keyCodes";
import { isGreaterEnd, isLessStart } from "../keyboard/comparison";

interface IRendererArgs {
	rowIndex: number;
	columnIndex: number;
	yIndex: number;
	xIndex: number;
}

export interface IGridProps {
	dom?: React.HTMLProps<HTMLTableElement>;
	columnCount: number;
	rowCount: number;
	visibleColumns: number;
	visibleRows: number;
	rowWidth: number;
	columnHeight: number;
	renderer: (arg: IRendererArgs) => JSX.Element;
}

export interface IGridState {
	rowStart: number;
	rowEnd: number;
	columnStart: number;
	columnEnd: number;
	xIndex: number;
	yIndex: number;
}

export default class Grid extends React.Component<IGridProps, IGridState> {
	constructor(props: IGridProps) {
		super(props);
		this.state = {
			columnStart: 0,
			columnEnd: props.visibleColumns,
			yIndex: 0,
			rowStart: 0,
			rowEnd: props.visibleRows,
			xIndex: 0,
		};
	}
	private right = () => {
		if (this.state.xIndex + 1 < this.props.rowCount) {
			this.setState(({ xIndex, rowStart, rowEnd }) => {
				const comp = isGreaterEnd(xIndex, rowEnd);
				return {
					xIndex: xIndex + 1,
					rowEnd: comp ? rowEnd + 1 : rowEnd,
					rowStart: comp ? rowStart + 1 : rowStart,
				};
			});
		}
	};
	private left = () => {
		const { xIndex } = this.state;
		if (xIndex > 0) {
			this.setState(({ xIndex, rowStart, rowEnd }) => {
				const comp = isLessStart(xIndex, rowStart);
				return {
					xIndex: xIndex - 1,
					rowStart: comp ? rowStart - 1 : rowStart,
					rowEnd: comp ? rowEnd - 1 : rowEnd,
				};
			});
		}
	};
	private down = () => {
		if (this.state.yIndex + 1 < this.props.columnCount) {
			this.setState(({ yIndex, columnStart, columnEnd }) => {
				const comp = isGreaterEnd(yIndex, columnEnd);
				return {
					yIndex: yIndex + 1,
					columnEnd: comp ? columnEnd + 1 : columnEnd,
					columnStart: comp ? columnStart + 1 : columnStart,
				};
			});
		}
	};
	private up = () => {
		if (this.state.yIndex > 0) {
			this.setState(({ yIndex, columnStart, columnEnd }) => {
				const comp = isLessStart(yIndex, columnStart);
				return {
					yIndex: yIndex - 1,
					columnStart: comp ? columnStart - 1 : columnStart,
					columnEnd: comp ? columnEnd - 1 : columnEnd,
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
			case KEY_CODE.ARROW_LEFT:
				this.left();
				break;
			case KEY_CODE.ARROW_RIGHT:
				this.right();
				break;
		}
	};
	public render() {
		const { rowStart, rowEnd, columnStart, columnEnd, xIndex, yIndex } = this.state;
		const { rowWidth, visibleRows, renderer, rowCount, columnCount } = this.props;
		var result = [];
		for (var i = columnStart; i < columnEnd; i++) {
			var row = [];
			for (var j = rowStart; j < rowEnd; j++) {
				row.push(
					renderer({
						rowIndex: j,
						columnIndex: i,
						yIndex,
						xIndex,
					}),
				);
			}
			result.push(<tr>{row}</tr>);
		}
		return (
			<table tabIndex={0} onKeyDown={this.onKeyDown} {...this.props.dom}>
				<tbody>{result}</tbody>
			</table>
		);
	}
}
