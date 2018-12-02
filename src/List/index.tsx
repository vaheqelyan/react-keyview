import * as React from "react";
import KEY_CODE from "../keyboard/keyCodes";
import { isGreaterEnd, isLessStart } from "../keyboard/comparison";

export interface IListProps {
	dom?: React.HTMLProps<HTMLDivElement>;
	count: number;
	visibleCount: number;
	rowHeight: number;
	renderRow: (rowIndex: number, currentIndex: number) => JSX.Element;
}

export interface IListState {
	currentIndex: number;
	start: number;
	end: number;
}

export default class List extends React.Component<IListProps, IListState> {
	constructor(props: IListProps) {
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
			this.setState(({ currentIndex, end, start }) => {
				const comp = isGreaterEnd(currentIndex, end);
				return {
					currentIndex: currentIndex + 1,
					end: comp ? end + 1 : end,
					start: comp ? start + 1 : start,
				};
			});
		}
	};
	private onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
		const { renderRow, count, visibleCount, rowHeight } = this.props;
		var result = [];
		for (var i = start; i < end; i++) {
			if (i + 1 <= count) {
				result.push(renderRow(i, currentIndex));
			} else {
				break;
			}
		}
		return (
			<div style={{ height: visibleCount * rowHeight }} onKeyDown={this.onKeyDown} tabIndex={0} {...this.props.dom}>
				{result}
			</div>
		);
	}
}
