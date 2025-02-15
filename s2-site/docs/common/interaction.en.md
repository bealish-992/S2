---
title: Interaction
order: 5
---

## Interaction

| parameter              | illustrate                                                                                                                                                                                                                                                   | type                                           | Defaults                                              |  required |
| :--------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------- | :---------------------------------------------------- | :-------: |
| linkFields             | The mark field is a link style, which is used for external link jumps                                                                                                                                                                                        | `string[]`                                     |                                                       |           |
| selectedCellsSpotlight | Whether to enable the selected highlight spotlight effect                                                                                                                                                                                                    | `boolean`                                      | `false`                                               |           |
| hoverHighlight         | Highlight the current cell, and the corresponding row and column headers when the mouse hovers                                                                                                                                                               | `boolean`                                      | `true`                                                |           |
| hoverFocus             | After the mouse hovers over the current cell for more than the default 800ms, it will keep the current highlight and display the tooltip. The hovering time is controlled by setting the `duration`                                                          | \`boolean                                      | {duration: number}\`                                  |   `true`  |
| hiddenColumnFields     | It is used to configure the columns that are hidden by default. The pivot table needs to configure the unique id of the column header, and the detail table can be configured with the field field of the column header.                                     | `string[]`                                     |                                                       |           |
| enableCopy             | Whether to allow copying                                                                                                                                                                                                                                     | `boolean`                                      | `false`                                               |           |
| copyWithHeader         | Whether to copy data with header information                                                                                                                                                                                                                 | `boolean`                                      | `false`                                               |           |
| copyWithFormat         | Whether to use the field format format to copy                                                                                                                                                                                                               | `boolean`                                      | `false`                                               |           |
| customInteractions     | Customize interaction [details](/zh/docs/manual/advanced/interaction/custom)                                                                                                                                                                                 | [CustomInteraction\[\]](#custominteraction)    |                                                       |           |
| scrollSpeedRatio       | Used to control the scroll rate, divided into horizontal and vertical directions, the default is 1                                                                                                                                                           | [ScrollSpeedRatio](#scrollspeedratio)          |                                                       |           |
| autoResetSheetStyle    | Used to control whether to reset the interactive state when clicking the area outside the table and pressing the esc key                                                                                                                                     | `boolean`                                      | `true`                                                |           |
| resize                 | Used to control whether the resize hotspot is displayed                                                                                                                                                                                                      | `boolean` \\                                   | [ResizeInteractionOptions](#resizeinteractionoptions) |   `true`  |
| brushSelection         | Whether to allow cells (including row headers, column headers, and value cells) to be selected. Row header, column header selection only supports pivot tables                                                                                               | `boolean \| [BrushSelection](#brushSelection)` | `true`                                                |           |
| multiSelection         | Whether to allow multiple selection (including row headers, column headers, and value cells)                                                                                                                                                                 | `boolean`                                      | `true`                                                |           |
| rangeSelection         | Whether to allow quick multiple selection of intervals                                                                                                                                                                                                       | `boolean`                                      | `true`                                                |           |
| scrollbarPosition      | Used to control whether the scroll bar is displayed on the edge of the content area or the edge of the canvas                                                                                                                                                | `content` \\                                   | `canvas`                                              | `content` |
| eventListenerOptions   | [Optional configuration](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) of the event listening function `addEventListener` , which can control whether the event is triggered from the bubbling phase or the capturing phase | `false`                                        |                                                       |           |
| selectedCellHighlight  | Whether to highlight the column header where the grid is located                                                                                                                                                                                             | `boolean`                                      | `false`                                               |           |
| overscrollBehavior     | Controls the behavior of scrolling to bounds, which disables the browser's default scrolling behavior. [details](/zh/docs/manual/advanced/interaction/basic/#%E4%BF%AE%E6%94%B9%E6%BB%9A%E5%8A%A8%E8%87%B3%E8%BE%B9%E7%95%8C%E8%A1%8C%E4%B8%BA)              | `auto` \\                                      | `contain` \\                                          | `none` \\ |

### CustomInteraction

Function description: custom interaction, inherit baseEvent: [concrete example](/zh/docs/manual/advanced/interaction/custom)

| parameter   | illustrate                            | type                                                                                   | Defaults | required |
| ----------- | ------------------------------------- | -------------------------------------------------------------------------------------- | -------- | :------: |
| key         | unique identifier for the interaction | `string`                                                                               |          |     ✓    |
| interaction |                                       | [Interaction Constructor](/zh/docs/api/basic-class/interaction#interactionconstructor) |          |     ✓    |

### ScrollSpeedRatio

```js
interface ScrollSpeedRatio {
  horizontal?: number; // 水平滚动速率，默认为 1
  vertical?: number; // 垂直滚动速率，默认为 1
}
```

### ResizeInteractionOptions

| parameter            | illustrate                                                                                                                                                       | type                                                                                       | Defaults | required |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------- | :------: |
| rowCellVertical      | Whether to open the line header vertical resize hot zone                                                                                                         | `boolean`                                                                                  | true     |          |
| cornerCellHorizontal | Whether to enable the resize hotspot in the horizontal direction of the corner head                                                                              | `boolean`                                                                                  | true     |          |
| colCellHorizontal    | Whether to enable the horizontal resize hotspot of the column header                                                                                             | `boolean`                                                                                  | true     |          |
| colCellVertical      | Whether to enable the column header vertical resize hot zone (this configuration is invalid when the column header is hidden)                                    | `boolean`                                                                                  | true     |          |
| rowResizeType        | It is used to control whether the row height resize will take effect for all Cells at the same time, or only for the current row. Applies to all rows by default | `all` \| `current`                                                                         | `all`    |          |
| disable              | It is used to control whether the row height resize is effective or not. View example                                                                            | (resizeInfo: [S2CellType](/zh/docs/api/components/sheet-component#resizeinfo) ) => boolean |          |          |
| visible              | Customize whether the current cell displays the resize hotspot                                                                                                   | (cell: [S2CellType](/zh/docs/api/basic-class/base-cell) ) => boolean                       |          |          |

### brushSelection

| parameter | illustrate                                                                 | type      | Defaults | required |
| --------- | -------------------------------------------------------------------------- | --------- | -------- | :------: |
| data      | Whether to allow numerical cell selection                                  | `boolean` | true     |          |
| row       | Whether to allow row header cell selection (only supports pivot tables)    | `boolean` | false    |          |
| col       | Whether to allow column header cell selection (only supports pivot tables) | `boolean` | false    |          |
