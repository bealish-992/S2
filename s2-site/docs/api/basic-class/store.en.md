---
title: Store
order: 3
---
Function description: store some information. [details](https://github.com/antvis/S2/blob/master/packages/s2-core/src/common/store/index.ts)

```ts
s2.store.get('key') // 获取
s2.store.set('key', value) // 存储
```

| parameter                | illustrate                                                          | type                                                             |
| ------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| scrollX                  | horizontal scroll offset                                            | `number`                                                         |
| scrollX                  | vertical scroll offset                                              | `number`                                                         |
| hRowScrollX              | vertical header scroll offset                                       | `number`                                                         |
| sortParam                | Column header sorting configuration                                 | [SortParam](/zh/docs/api/components/sheet-component/#sortparams) |
| drillDownIdPathMap       | Drill down node id and corresponding generated path addressing path | `Map<string, number[][]>`                                        |
| drillDownNode            | current drill-down node                                             | [node](/zh/docs/api/basic-class/node)                            |
| drillItemsNum            | Control the number of drill-down data                               | `number`                                                         |
| interactionStateInfo     | Current Interaction Status Information                              | `number`                                                         |
| drillDownFieldInLevel    | Drill down to node level information                                | [PartDrillDownInfo\[\]](#partdrilldowninfo)                      |
| originalDataCfg          | Raw Data Configuration                                              | [S2DataConfig](/zh/docs/api/general/S2DataConfig)                |
| panelBBox                | Visual area wrapping box model                                      | [BBox](/zh/docs/api/basic-class/spreadsheet/#bbox)               |
| activeResizeArea         | current resizing region group                                       | [Group](https://g.antv.vision/zh/docs/api/group)                 |
| valueRanges              | conditional format value range                                      | [ValueRanges](#valueranges)                                      |
| initColumnLeafNodes      | The column header leaf node when it is first rendered               | [Node\[\]](/zh/docs/api/basic-class/node)                        |
| hiddenColumnsDetail      | Hidden column header details                                        | [HiddenColumnsInfo\[\]](#hiddencolumnsinfo)                      |
| lastRenderedColumnFields | The column header configuration of the last render                  | `string[]`                                                       |
| resized                  | Whether to manually adjust the width and height                     | `boolean`                                                        |
| visibleActionIcons       | The icon cache displayed by hover                                   | `GuiIcon[]`                                                      |
| lastClickedCell          | last clicked cell                                                   | `S2CellType<ViewMeta>`                                           |
| initOverscrollBehavior   | initial scroll chain state                                          | \`\`auto'                                                        |
| sortMethodMap            | sort by                                                             | `Record<string, SortMethod>`                                     |
| \[key: string]           | Any other field                                                     | `unknown`                                                        |

## HiddenColumnsInfo

```ts
interface HiddenColumnsInfo {
  // 当前显示的兄弟节点之前所隐藏的节点
  hideColumnNodes: Node[];
  // 当前隐藏列所对应展示展开按钮的兄弟节点
  displaySiblingNode: Node;
}
```

## PartDrillDownInfo

```ts
interface PartDrillDownInfo {
  // 下钻数据
  drillData: Record<string, string | number>[];
  // 下钻字段
  drillField: string;
}
```

## ValueRanges

```ts
export interface ValueRange {
  minValue?: number;
  maxValue?: number;
}

export type ValueRanges = Record<string, ValueRange>;
```
