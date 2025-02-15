---
title: Tooltip
order: 7
---

## 简介

通过表格交互透出表格信息以及部分分析功能

<img src="https://gw.alipayobjects.com/zos/antfincdn/tnuTdq%24b2/1a076d70-e836-41be-bd1b-ab0ec0916ea7.png" width = "600"  alt="preview" />

## 注意事项

`@antv/s2` 中只保留了 `tooltip` 的核心显隐逻辑，提供相应数据，**不渲染内容**

`React` 版本 和 `Vue3` 版本中通过 [自定义 Tooltip 类](#自定义-tooltip-类) 的方式渲染 `tooltip` 的内容，包括 `排序下拉菜单`, `单元格选中信息汇总`, `列头隐藏按钮` 等。

查看 `React` 版本的 [具体实现](https://github.com/antvis/S2/blob/master/packages/s2-react/src/components/tooltip/custom-tooltip.tsx) 和 `Vue3` 版本的 [具体实现](https://github.com/antvis/S2/blob/master/packages/s2-vue/src/components/tooltip/custom-tooltip.ts)

- 如果您有 `tooltip` 的需求，您可以直接使用开箱即用的 `@antv/s2-react` `@antv/s2-vue`, 免去你二次封装，使用更加方便
- 如果您不希望依赖框架，或者希望在 `Vue`, `Angular` 框架中使用 `tooltip`, 请参考 [自定义 Tooltip 类](#自定义-tooltip-类) 章节
- 别忘了引入样式

```ts
import "@antv/s2/dist/style.min.css";
```

## 使用

在 `s2Options` 中配置 [tooltip](/zh/docs/api/general/S2Options#tooltip) 字段，默认作用于**所有**单元格

```ts
const s2Options = {
  tooltip: {}
};
```

还可以对不同类型的单元格单独配置：

- `corner`: 角头
- `row`: 行头
- `col`: 列头
- `data`: 数值

```ts
const s2Options = {
  tooltip: {
    corner: {},
    row: {},
    col: {},
    data: {},
  }
};
```

### 显示配置项

通过配置 `showTooltip` 字段控制 `Tooltip` 的显示，默认为 `false`

```ts
const s2Options = {
  tooltip: {
    showTooltip: true,
    row: {
      // 单独设置行头不显示
      showTooltip: false,
    }
  }
};
```

### 操作配置项

通过配置 `operation` 字段在 `Tooltip` 上增加 [操作项](/zh/docs/api/general/S2Options#tooltipoperation), 支持 [自定义](#自定义-tooltip-操作项).

```ts
const s2Options = {
  tooltip: {
    operation: {
      trend: true, // 显示趋势图按钮
      hiddenColumns: true, //开启隐藏列（叶子节点有效）
    },
  }
};

```

<img src="https://gw.alipayobjects.com/mdn/rms_56cbb2/afts/img/A*9MaTR51tXi0AAAAAAAAAAAAAARQnAQ" width = "600"  alt="row" />

<img src="https://gw.alipayobjects.com/mdn/rms_56cbb2/afts/img/A*mcvMTr1Sa8MAAAAAAAAAAAAAARQnAQ" width = "600"  alt="row" />

### 超出指定区域自动调整位置

通过配置 `autoAdjustBoundary` 字段开启：

- `container` : tooltip 超出**表格容器**范围时，自动调整位置，始终在表格内显示
- `body` : tooltip 超出**浏览器窗口**可视范围时，自动调整位置，始终在可视范围内显示
- `null` : 关闭自动调整

```ts
const s2Options = {
  tooltip: {
    autoAdjustBoundary: "container" // 默认 "body"
  }
};

```

### 自定义

#### 自定义 Tooltip 内容

对于 `@antv/s2` 类的使用方式：tooltip 内容 可以是任意 `dom` 节点或者 `字符串`

```ts
const content = document.createElement('div')
content.innerHTML = '我是自定义内容'

const s2Options = {
  tooltip: {
    content,
    // content: '我是字符串'
  },
};
```

对于 `@antv/s2-react` 组件的使用方式：tooltip 内容 可以是任意的 `jsx` 元素

```ts
const content = (
  <div>
    <span>我是自定义内容</span>
  </div>
)

const s2Options = {
  tooltip: {
    content,
  },
};
```

同时，`content` 还支持回调的方式，可以根据 [当前单元格信息](/zh/docs/api/basic-class/interaction) 和 默认 `tooltip` 的详细信息，灵活的自定义内容

```ts
const TooltipContent = (props) => <div>...</div>

const s2Options = {
  tooltip: {
    content: (cell, defaultTooltipShowOptions) => {
      console.log('当前单元格：', cell)
      console.log('默认 tooltip 详细信息：', defaultTooltipShowOptions)
      return <TooltipContent cell={cell} detail={detail} />
    },
  },
};
```

如果需要使用默认 Tooltip, 返回 `null` 即可

```ts
const s2Options = {
  tooltip: {
    content: () => {
      return null
    },
  },
};
```

##### 1. 配置级

对不同的单元格进行配置时，`tooltip.content` 的优先级 小于 `row.content`, `col.content`, `data.content`, `corner.content`

```tsx
const TooltipContent = (
  <div>content</div>
);

const RowTooltipContent = (
  <div>rowTooltip</div>
);

const ColTooltipContent = (
  <div>colTooltip</div>
);

const DataTooltipContent = (
  <div>dataTooltip</div>
);

const s2Options = {
  tooltip: {
    content: TooltipContent,
    row: {
      content: RowTooltipContent,
    },
    col: {
      content: ColTooltipContent
    }
    data: {
      content: DataTooltipContent
    }
  },
};
```

##### 2. 方法级

通过表格实例 可以手动显示 `tooltip`

```ts
const TooltipContent = (
  <div>content</div>
);

s2.showTooltip({
  content: TooltipContent
})

// 或者 s2.tooltip.show({ content: TooltipContent })
```

<Playground path='react-component/tooltip/demo/custom-content.tsx' rid='container-1' height='300'></playground>

##### 3. 内容显示优先级

`方法调用` > `单元格配置` > `基本配置`

<img src="https://gw.alipayobjects.com/mdn/rms_56cbb2/afts/img/A*EwvcRZjOslMAAAAAAAAAAAAAARQnAQ" width="600"  alt="row" />

#### 自定义 Tooltip 操作项

除了默认提供的操作项，还可以配置 `operation.menus` 自定义操作项，支持嵌套，也可以监听各自的 `onClick` 点击事件，可以拿到 当前 `tooltip` 对应的 [单元格信息](/zh/docs/api/basic-class/base-cell)

```ts
const s2Options = {
  tooltip: {
    operation: {
      menus: [
        {
          key: 'custom-a',
          text: '操作 1',
          icon: 'Trend',
          onClick: (cell) => {
            console.log('操作 1 点击');
            console.log('tooltip 对应的单元格：', cell)
          },
          children: [{
            key: 'custom-a-a',
            text: '操作 1-1',
            icon: 'Trend',
            onClick: (cell) => {
              console.log('操作 1-1 点击');
            },
          }]
        },
        {
          key: 'custom-b',
          text: '操作 2',
          icon: 'EyeOutlined',
          onClick: (cell) => {
            console.log('操作 2 点击');
          },
        },
      ],
    },
  },
};
```

还可以通过 `visible` 参数控制当前操作项是否显示，支持传入一个回调，可以根据当前 [单元格信息](/zh/docs/api/basic-class/base-cell) 动态显示

```ts
const s2Options = {
  tooltip: {
    operation: {
      menus: [
        {
          key: 'custom-a',
          text: '操作 1',
          icon: 'Trend',
          visible: false,
        },
        {
          key: 'custom-b',
          text: '操作 2',
          icon: 'EyeOutlined',
          visible: (cell) => {
            // 叶子节点不显示
            const meta = cell.getMeta()
            return meta.isLeaf
          },
        },
      ],
    },
  },
};
```

<Playground path='react-component/tooltip/demo/custom-operation.tsx' rid='container-custom-operations' height='300'></playground>

#### 自定义 Tooltip 挂载节点

默认挂载在 `body` 上，可自定义挂载位置

```html
<div class="container" />
```

```ts
const s2Options = {
  tooltip: {
    getContainer: () => document.querySelector('.container')
  }
}
```

#### 自定义 Tooltip 容器样式

在 `tooltip` 容器中添加额外的 `style` 样式和 `class` 类名，可以更方便的覆盖样式

```ts
const s2Options = {
  tooltip: {
    style: {
      fontSize: '20px'
    },
    className: 'test'
  }
};
```

![preview](https://gw.alipayobjects.com/zos/antfincdn/5Mk9LYotc/bb266a1d-7f8a-4876-b2b4-c633fc44efc2.png)

![preview](https://gw.alipayobjects.com/zos/antfincdn/mGoP8DC5d/db963e35-dfe2-4e46-8866-aec85cbd38da.png)

#### 自定义 Tooltip 类

除了上面讲到的 `自定义 Tooltip 内容` 外，你还可以 `自定义 Tooltip 类` 与任意框架 (`Vue`, `Angular`, `React`) 结合

继承 `BaseTooltip` 基类，可重写 `显示 (show)`, `隐藏 (hide)`, `销毁 (destroy)` 等方法，结合 `this.spreadsheet` 实例，来实现满足你业务的 `tooltip`, 也可以重写 `renderContent` 方法，渲染你封装的任意组件

- [查看 BaseTooltip 基类](/zh/docs/api/basic-class/base-tooltip)
- [查看 React 示例](https://github.com/antvis/S2/blob/master/packages/s2-react/src/components/tooltip/custom-tooltip.tsx)
- [查看 Vue 示例](https://codesandbox.io/s/compassionate-booth-hpm3rf?file=/src/App.vue)

```ts
import { BaseTooltip, SpreadSheet } from '@antv/s2';
// 引入 `tooltip` 样式文件
import "@antv/s2/dist/style.min.css";

export class CustomTooltip extends BaseTooltip {
  constructor(spreadsheet: SpreadSheet) {
    super(spreadsheet);
  }

  renderContent() {}

  clearContent() {}

  show(showOptions) {
    console.log(this.spreadsheet)
  }

  hide() {}

  destroy() {}
}
```

覆盖默认，使用你自定义的 `Tooltip`

```ts
const s2Options = {
  tooltip: {
    showTooltip: true,
    renderTooltip: (spreadsheet: SpreadSheet) => new CustomTooltip(spreadsheet),
  },
}
```

<Playground path='react-component/tooltip/demo/custom-tooltip.tsx' rid='container-2' height='300'></playground>

#### 自定义 Tooltip 显示时机

在 `tooltip` 开启前提下的默认情况：

- 行列头**点击**时显示 `tooltip`, 单元格文字**被省略**时悬停显示 `tooltip`
- 数值单元格悬停超过 **800ms** 显示 `tooltip`

比如想自定义成鼠标悬停行头时显示 `tooltip`, 可通过自定义交互 [详情](/zh/docs/manual/advanced/interaction/custom), 监听行头单元格的 [交互事件](/zh/docs/manual/advanced/interaction/basic#%E4%BA%A4%E4%BA%92%E4%BA%8B%E4%BB%B6) `S2Event.ROW_CELL_HOVER`. [例子](/zh/examples/interaction/custom#row-col-hover-tooltip)

```ts
import { PivotSheet, BaseEvent, S2Event } from '@antv/s2';

class RowHoverInteraction extends BaseEvent {
  bindEvents() {
    this.spreadsheet.on(S2Event.ROW_CELL_HOVER, (event) => {
      this.spreadsheet.tooltip.show({
        position: { x:0, y:0 },
        content: "..."
      })
    })
  }
}

const s2Options = {
  tooltip: {
    showTooltip: true,
  }
  interaction: {
    customInteractions: [
      {
        key: 'RowHoverInteraction',
        interaction: RowHoverInteraction,
      },
    ],
  }
};

```

如果使用的是 `React` 组件，也可以使用 [单元格回调函数](/zh/docs/api/components/sheet-component) 来进行自定义。[例子](/zh/examples/react-component/tooltip#custom-hover-show-tooltip)

```tsx
const CustomColCellTooltip = () => <div>col cell tooltip</div>;

const onRowCellHover = ({ event, viewMeta }) => {
  viewMeta.spreadsheet.tooltip.show({
    position: {
      x: event.clientX,
      y: event.clientY,
    },
    content: <CustomRowCellTooltip />,
  });
};

<SheetComponent onRowCellHover={onRowCellHover} />
```

#### 在 Vue3 中自定义

在 `Vue3` 中可以通过两种方式自定义内容。

[![Edit @antv/s2 Vue3 Tooltip Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/antv-s2-vue3-tooltip-demo-hpm3rf?autoresize=1&fontsize=14&hidenavigation=1&theme=dark)

<img src="https://gw.alipayobjects.com/zos/antfincdn/AphZDgJvY/b4654699-927d-4b58-9da2-a5793f964061.png" width="600"  alt="preview" />

##### `createVNode` 自定义类的方式 （推荐）

```ts
// TooltipContent.vue

<template>
  <div>我是自定义 Tooltip 内容</div>
  <p>当前值：{{ meta?.label ?? meta?.fieldValue }}</p>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TooltipContent',
  props: ['meta']
});
</script>

```

```ts
import { defineCustomElement, render, createVNode } from "vue";
import { BaseTooltip, PivotSheet } from "@antv/s2";
import TooltipContent from "./TooltipContent.vue";
import "@antv/s2/dist/style.min.css";

class CustomTooltip extends BaseTooltip {
  constructor(spreadsheet) {
    super(spreadsheet);
  }

  renderContent() {
    const cell = this.spreadsheet.getCell(this.options.event?.target);
    const meta = cell?.getMeta();

    // 使用 Vue 提供的 `createVNode` 方法将组件渲染成虚拟 DOM
    const tooltipVNode = createVNode(TooltipContent, { meta });
    // 使用  `render` 函数将其挂载在 tooltip 容器上
    render(tooltipVNode, this.container);
  }
}
```

##### `defineCustomElement` 自定义内容的方式 （不推荐）

> 注意，customElements 不能重复注册，否则浏览器会报错

```ts
import { defineCustomElement } from "vue";

// 将 Vue 组件解析成 Web Component
const VueTooltipContent = defineCustomElement({
  props: ["meta"],
  template: `
    <div>我是自定义 Tooltip 内容</div>
    <p>当前值：{{ meta?.label ?? meta?.fieldValue }}</p>
  `
});

// 注册一个 Web Component
customElements.define("vue-tooltip-content", VueTooltipContent);

const s2Options = {
  tooltip: {
    content: (cell, defaultTooltipShowOptions) => {
      const meta = cell.getMeta();
      // 替换 Tooltip 内容
      return new VueTooltipContent({ meta });
    },
  },
};
```

<iframe src="https://codesandbox.io/embed/antv-s2-vue3-tooltip-demo-hpm3rf?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="@antv/s2 Vue3 Tooltip Demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### 重写展示方法

除了上面说到的 `自定义 Tooltip 类` 自定义展示方法外，也可以修改 [表格实例](/zh/docs/api/basic-class/spreadsheet) 上 `Tooltip` 的方法 `spreadsheet.showTooltip()`。[了解如何获取表格实例？](/zh/docs/manual/advanced/get-instance)

```ts
// options 配置 tooltip 显示
tooltip: {
  showTooltip: true,
}
```

```tsx
<SheetComponent
  onMounted={(instance) => {
    instance.showTooltip = (tooltipOptions) => {
      // 可自定义这里的 tooltipOptions
      instance.tooltip.show(tooltipOptions);
    };
  }}
  ...
/>;

```

##### 可自定义显示内容

以下所有显示内容都可覆盖所有单元格和事件，自定义数据具体细节可查看 [TooltipShowOptions](/zh/docs/common/custom-tooltip)

- 显示位置 (position)

  ```tsx
    instance.showTooltip = (tooltipOptions) => {
      const { position } = tooltipOptions;
      instance.tooltip.show({ ...tooltipOptions, position: { x: position.x + 1, y: position.y + 1 } });
    };
  ```

- 展示层数据 (data)

  - 名称

    当前单元格名称，一般只有单元格中文案被省略才会显示

    ```tsx
    instance.showTooltip = (tooltipOptions) => {
      const { data } = tooltipOptions;
      const name = `${data.name} - 测试`;
      instance.tooltip.show({ ...tooltipOptions, data: { ...data, name: data.name ? name : '' } });
    };
    ```

  - 提示

    当前单元格提示信息

    ```tsx
    instance.showTooltip = (tooltipOptions) => {
      const { data } = tooltipOptions;
      const tips = '说明：这是个说明';
      instance.tooltip.show({ ...tooltipOptions, data: { ...data, tips } });
    };
    ```

  - 所选项统计列表（ summaries ）

    所选项统计列表，主要按度量值区分，具体详情可查看 [TooltipSummaryOptions](/zh/docs/common/custom-tooltip#tooltipsummaryoptions)

    ```tsx
    instance.showTooltip = (tooltipOptions) => {
      const { data } = tooltipOptions;
      const customSummaries = (data.summaries || []).map((item) => {
        return { ...item, name: `${item.name} - 测试` };
      });
      instance.tooltip.show({ ...tooltipOptions, data: { ...data, summaries: customSummaries } });
    };
    ```

  - 轴列表（ headInfo ）

    轴列表，在数据单元格中显示 `行/列头` 名称，具体详情可查看 [TooltipHeadInfo](/zh/docs/common/custom-tooltip#tooltipheadinfo)

    ```tsx
    instance.showTooltip = (tooltipOptions) => {
      const { data } = tooltipOptions;
      const { cols = [], rows = [] } = data.headInfo || {};
      const customCols = cols.map(item=> {
        return {...item, value: `${item.value} - 测试`}
      });
      instance.tooltip.show({
        ...tooltipOptions,
        data: {
          ...data,
          headInfo: { rows, cols: customCols }
        }
      });
    };
    ```

  - 数据点明细信息（ details ）

    数据点明细信息，即当前单元格的数据信息，具体详情可查看 [ListItem](/zh/docs/common/custom-tooltip#listitem)

    ```tsx
    instance.showTooltip = (tooltipOptions) => {
      const { data } = tooltipOptions;
      const customDetails = (data.details || []).map((item) => {
        return { name: `${item.name} - 测试`, value: `${item.value} - w` };
      });
      instance.tooltip.show({ ...tooltipOptions, data: { ...data, details: customDetails } });
    };
    ```

  - 底部提示信息（ infos ）

    底部提示信息，一般可用于快捷键操作提示

    ```tsx
    instance.showTooltip = (tooltipOptions) => {
      const { data } = tooltipOptions;
      const infos = '按住 Cmd/Ctrl 或框选，查看多个数据点';
      instance.tooltip.show({ ...tooltipOptions, data: { ...data, infos } });
    };
    ```

  <img src="https://gw.alipayobjects.com/mdn/rms_56cbb2/afts/img/A*4rrAR4HBGFoAAAAAAAAAAAAAARQnAQ" width = "600"  alt="row" />

- 部分配置 ( options )

  `tooltip` 部分配置，具体细节可查看 [TooltipOptions](/zh/docs/common/custom-tooltip#tooltipoptions)

  - 操作栏（ operator ）

    可操作配置，具体细节参考 [TooltipOperatorOptions](/zh/docs/common/custom-tooltip#tooltipoperatoroptions)

    ```tsx
    instance.showTooltip = (tooltipOptions) => {
      const { options } = tooltipOptions;
      const customOperator = {
        onClick: ({ key }) => {
          console.log('任意菜单项点击', key);
        },
        menus: [
          {
            key: 'trend',
            icon: 'trend',
            text: '趋势',
            onClick: () => {
              console.log('当前菜单项点击')
            }
          },
        ],
      };
      instance.tooltip.show({ ...tooltipOptions, options: { ...options, operator: customOperator } });
    };
    ```

<Playground path='react-component/tooltip/demo/custom-show-tooltip.tsx' rid='container-3' height='300'></playground>
