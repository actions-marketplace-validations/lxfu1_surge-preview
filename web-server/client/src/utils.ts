/**
 * 适用于多个构建产物，配置也麻烦，直接内置
 * 1: order 为加载优先级，0 表示最高优先级，会在前面加载完成
 * 2: order 相同的会同时加载
 * 3: 没有 order 的会在 order 加载完成后一次全量加载
 */
export const getMultiUrls = (
  tag: string
): {
  [key: string]: {
    online: Array<{ src: string; order?: number }>;
    local: Array<{ src: string; order?: number }>;
    styles?: string[];
  };
} => {
  return {
    G: {
      online: [
        {
          src: `https://unpkg.com/@antv/g@${tag}`,
          order: 0,
        },
        {
          src: `https://unpkg.com/@antv/g-webgl@${tag}`,
          order: 1,
        },
        {
          src: `https://unpkg.com/@antv/g-plugin-webgl-renderer@${tag}`,
          order: 2,
        },
        {
          src: `https://unpkg.com/stats.js@latest`,
        },
        {
          src: `https://unpkg.com/hammerjs@latest`,
        },
        {
          src: `https://unpkg.com/interactjs@latest`,
        },
        {
          src: `https://unpkg.com/dat.gui@latest`,
        },
        {
          src: `https://unpkg.com/@antv/g-components@latest`, // next 有 bug
        },
        {
          src: `https://unpkg.com/@antv/g-plugin-control@${tag}`,
        },
        {
          src: `https://unpkg.com/@antv/g-plugin-css-select@${tag}`,
        },
        {
          src: `https://unpkg.com/@antv/g-canvas@${tag}`,
        },
        {
          src: `https://unpkg.com/@antv/g-svg@${tag}`,
        },
        {
          src: `https://unpkg.com/@antv/g-plugin-3d@${tag}`,
        },
      ],
      local: [
        {
          src: `/g/index.umd.js`,
          order: 0,
        },
        {
          src: `/g-webgl/index.umd.js`,
          order: 1,
        },
        {
          src: `/g-plugin-webgl-renderer/index.umd.js`,
          order: 2,
        },
        {
          src: `https://unpkg.com/stats.js@latest`,
        },
        {
          src: `https://unpkg.com/hammerjs@latest`,
        },
        {
          src: `https://unpkg.com/interactjs@latest`,
        },
        {
          src: `https://unpkg.com/dat.gui@latest`,
        },
        {
          src: `/g-components/index.umd.js`,
        },
        {
          src: `/g-plugin-control/index.umd.js`,
        },
        {
          src: `/g-plugin-css-select/index.umd.js`,
        },
        {
          src: `/g-canvas/index.umd.js`,
        },
        {
          src: `/g-svg/index.umd.js`,
        },
        {
          src: `/g-plugin-3d/index.umd.js`,
        },
      ],
    },
    'ANT-DESIGN-CHARTS': {
      // 样式使用同一套
      styles: [
        'https://unpkg.com/browse/antd@4/dist/antd.css',
        'https://unpkg.com/@ant-design/charts@latest/dist/index.css',
      ],
      online: [
        {
          src: `https://unpkg.com/@ant-design/charts@${tag}`,
        },
        {
          src: 'https://unpkg.com/@antv/data-set@latest',
        },
      ],
      local: [
        {
          src: `/dist/charts.min.js`,
        },
      ],
    },
  };
};
