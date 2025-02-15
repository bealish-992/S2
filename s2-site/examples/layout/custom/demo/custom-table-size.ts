import { TableSheet } from '@antv/s2';

fetch('https://assets.antv.antgroup.com/s2/basic.json')
  .then((res) => res.json())
  .then((data) => {
    // 详情请查看: https://s2.antv.vision/zh/docs/manual/advanced/custom/cell-size
    const container = document.getElementById('container');
    const s2DataConfig = {
      fields: {
        columns: ['type', 'province', 'city', 'price', 'cost'],
      },
      meta: [
        {
          field: 'province',
          name: '省份',
        },
        {
          field: 'city',
          name: '城市',
        },
        {
          field: 'type',
          name: '商品类别',
        },
        {
          field: 'price',
          name: '价格',
        },
        {
          field: 'cost',
          name: '成本',
        },
      ],
      data,
    };

    const s2Options = {
      width: 600,
      height: 480,
      style: {
        // 列头宽度始终和数值单元格一致
        cellCfg: {
          width: 200,
          height: 50,
        },
        colCfg: {
          height: 50,
        },
        // 每一行根据指标单独设置
        rowCfg: {
          heightByField: {
            '1': 130,
            '3': 60,
            '10': 80,
            '15': 20,
          },
        },
      },
    };
    const s2 = new TableSheet(container, s2DataConfig, s2Options);

    s2.render();
  });
