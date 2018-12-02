# react-keyview

![](https://res.cloudinary.com/dmtrk3yns/image/upload/q_auto:best/v1543671214/react-keyview/ezgif-4-8cd8c7d7e66d.gif)

---

### Installation

---

**via NPM**

```code
npm i react-keyview
```

**via Yarn**

```code
yarn add react-keyview
```

**via CDN (unpkg)**

```code
https://unpkg.com/react-keyview@latest
```

UMD library exposed as `ReactKeyView`

```js
const KV = ReactKV;
```

> **Note.** This package does not provide any stylesheet resources, the components are highly customizable. It is also supports Server-side rendering

### Demos

- [List](http://react-keyview.surge.sh/List/dist/)
- [Table](http://react-keyview.surge.sh/Table/dist/)
- [Grid](http://react-keyview.surge.sh/Grid/dist/)

### Usage

You can import any component you want as a named export from 'react-keyview', eg.

```jsx
import { Grid, Table } from "react-keyview";
```

Or you can directly import only the components you need, like so.

```jsx
import Grid from "react-keyview/build/Grid";
import Table from "react-keyview/build/Table";
```

UMD modules has prefix ReactKV, eg.

```jsx
const Grid = ReactKVGrid;
const List = ReactKVList;
```

#### List

---

```jsx
function renderRow(rowIndex, currentIndex) {
  return <div>{rowIndex}</div>;
}

<List renderRow={this.renderRow} count={YOUR_DATA.length} visibleCount={5} rowHeight={50} />;
```

| Prop         |   Type   |                        Description |
| ------------ | :------: | ---------------------------------: |
| renderRow    | Function |               Renders a single row |
| count        |  Number  |                 Number of elements |
| rowHeight    |  Number  |                         Row height |
| visibleCount |  Number  |         The visible elements count |
| dom          |  Object  | Pass attributes to an HTML element |

#### Table

---

```jsx
function renderHeader(item) {
  return item;
}
function renderRowColumn(i, j) {
  var getRowColumn = DATA[i][header[j]];
  return <td key={UNIQUE_KEY}>{getRowColumn}</td>;
}

function renderRow(rowIndex, currentIndex, col) {
  return <tr key={UNIQUE_KEY}>{col}</tr>;
}

<Table
  header={header}
  renderHeader={this.renderHeader}
  renderRow={this.renderRow}
  columnCount={3}
  count={YOUR_DATA.length}
  visibleCount={5}
  rowHeight={50}
  renderRowColumn={this.renderRowColumn}
/>;
```

| Prop            |   Type   |                        Description |
| --------------- | :------: | ---------------------------------: |
| visibleCount    |  Number  |             Number of visible rows |
| count           |  Number  |                     Number of rows |
| header          |  Array   |        Must be an array of strings |
| renderHeader    | Function |          Number of visible columns |
| renderRow       | Function |                        Renders row |
| renderRowColumn | Function |     Renders the columns of the row |
| dom             |  Object  | Pass attributes to an HTML element |

#### Grid

---

```jsx
function renderer({ rowIndex, columnIndex, yIndex, xIndex }) {
  return (
    <td key={UNIQUE_KEY}>
      Item {columnIndex},{rowIndex}
    </td>
  );
}

<Grid
  renderer={this.renderer}
  visibleRows={6}
  rowCount={100}
  rowWidth={30}
  columnCount={100}
  visibleColumns={6}
  columnHeight={50}
/>;
```

| Prop           |   Type   |                        Description |
| -------------- | :------: | ---------------------------------: |
| columnCount    |  Number  |                  Number of columns |
| visibleColumns |  Number  |          Number of visible columns |
| rowCount       |  Number  |                    Number of lines |
| visibleRows    |  Number  |             Number of visible rows |
| renderer       | Function |        Displays the row and column |
| dom            |  Object  | Pass attributes to an HTML element |
