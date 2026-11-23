/**
 * 海外薪酬系统（MVP）— 路由 + 通用组件（表格 / 徽章 / 抽屉 / 弹窗 / toast）
 * 加载顺序：data.js → pages.js → app.js（本文件最后加载并触发首次渲染）
 */
'use strict';

const App = {

  /** HTML 转义 */
  esc: function (s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  /** 金额格式化：千分位 + 币种代码（ISO 4217） */
  money: function (v, cur) {
    const neg = v < 0;
    const s = Math.abs(v).toLocaleString('en-US', { maximumFractionDigits: 2 });
    return (neg ? '-' : '') + s + (cur ? ' ' + cur : '');
  },

  /** 人民币万元简写（用于图表轴标签） */
  wan: function (v) {
    return '¥' + (v / 10000).toLocaleString('en-US', { maximumFractionDigits: 0 }) + '万';
  },

  /** 状态徽章：tone = success | warning | danger | primary | purple | gray | plain */
  badge: function (text, tone) {
    return '<span class="badge badge-' + (tone || 'gray') + '">' + App.esc(text) + '</span>';
  },

  /** 数组去重（保序） */
  unique: function (arr) {
    const seen = {};
    const out = [];
    arr.forEach(function (x) {
      if (!seen[x]) { seen[x] = true; out.push(x); }
    });
    return out;
  },

  /**
   * 通用表格
   * cols: [{ label, cls?, render?(row) }]；opts: { rowClick, rowCls?(row) }
   */
  table: function (cols, rows, opts) {
    opts = opts || {};
    let h = '<div class="table-wrap"><table class="table"><thead><tr>';
    cols.forEach(function (c) { h += '<th class="' + (c.cls || '') + '">' + App.esc(c.label) + '</th>'; });
    h += '</tr></thead><tbody>';
    if (!rows || !rows.length) {
      h += '<tr><td class="empty" colspan="' + cols.length + '">暂无符合条件的数据</td></tr>';
    } else {
      rows.forEach(function (r, i) {
        const clickable = opts.rowClick ? 'row-click' : '';
        const extra = opts.rowCls ? (' ' + opts.rowCls(r)) : '';
        h += '<tr class="' + (clickable + extra).trim() + '" data-idx="' + i + '">';
        cols.forEach(function (c) {
          h += '<td class="' + (c.cls || '') + '">' + (c.render ? c.render(r, i) : App.esc(r[c.key])) + '</td>';
        });
        h += '</tr>';
      });
    }
    h += '</tbody></table></div>';
    return h;
  },

  /** 筛选下拉框 */
  filterSelect: function (id, label, options, value) {
    const opts = options.map(function (o) {
      return '<option value="' + App.esc(o) + '"' + (o === value ? ' selected' : '') + '>' + App.esc(o) + '</option>';
    }).join('');
    return '<label class="filter-item">' + App.esc(label) +
      ' <select id="' + App.esc(id) + '">' + opts + '</select></label>';
  },

  /** 右侧抽屉：cfg = { title, body, footer?, width? }，返回 overlay 元素 */
  drawer: function (cfg) {
    const root = document.getElementById('overlay-root');
    root.innerHTML = '';
    const ov = document.createElement('div');
    ov.className = 'overlay drawer-align';
    ov.innerHTML =
      '<div class="drawer" style="width:' + (cfg.width || 640) + 'px">' +
        '<div class="drawer-head"><div class="drawer-title">' + cfg.title + '</div>' +
          '<button class="close-x" title="关闭" aria-label="关闭">×</button></div>' +
        '<div class="drawer-body">' + (cfg.body || '') + '</div>' +
        (cfg.footer ? '<div class="drawer-foot">' + cfg.footer + '</div>' : '') +
      '</div>';
    root.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) App.closeOverlay(); });
    ov.querySelector('.close-x').addEventListener('click', App.closeOverlay);
    return ov;
  },

  /** 居中弹窗：cfg = { title, body, footer?, width? }，返回 overlay 元素 */
  modal: function (cfg) {
    const root = document.getElementById('overlay-root');
    root.innerHTML = '';
    const ov = document.createElement('div');
    ov.className = 'overlay modal-align';
    ov.innerHTML =
      '<div class="modal" style="width:' + (cfg.width || 720) + 'px">' +
        '<div class="modal-head"><div class="modal-title">' + cfg.title + '</div>' +
          '<button class="close-x" title="关闭" aria-label="关闭">×</button></div>' +
        '<div class="modal-body">' + (cfg.body || '') + '</div>' +
        (cfg.footer ? '<div class="modal-foot">' + cfg.footer + '</div>' : '') +
      '</div>';
    root.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) App.closeOverlay(); });
    ov.querySelector('.close-x').addEventListener('click', App.closeOverlay);
    return ov;
  },

  /** 关闭弹层 */
  closeOverlay: function () {
    document.getElementById('overlay-root').innerHTML = '';
  },

  /** toast 提示：type = success | warning | error | info */
  toast: function (msg, type) {
    const root = document.getElementById('toast-root');
    const t = document.createElement('div');
    t.className = 'toast toast-' + (type || 'info');
    t.textContent = msg;
    root.appendChild(t);
    setTimeout(function () { t.classList.add('fading'); }, 2600);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 3000);
  }
};

/* ============================================================
 * Hash 路由
 * ============================================================ */

const ROUTES = [
  { path: '/dashboard', title: '工作台', page: 'dashboard' },
  { path: '/calendar', title: '发薪日历', page: 'calendar' },
  { path: '/changes', title: '异动管理', page: 'changes' },
  { path: '/expat', title: '外派档案', page: 'expat' },
  { path: '/reports', title: '报告中心', page: 'reports' },
  { path: '/payslips', title: '工资单中心', page: 'payslips' },
  { path: '/compliance', title: '个税社保', page: 'compliance' },
  { path: '/payments', title: '资金支付', page: 'payments' },
  { path: '/cost', title: '成本分析', page: 'cost' },
  { path: '/vouchers', title: '总账凭证', page: 'vouchers' },
  { path: '/contracts', title: '合同管理', page: 'contracts' },
  { path: '/config', title: '国别配置', page: 'config' },
  { path: '/ai', title: 'AI 助手', page: 'ai' }
];

function currentPath() {
  const h = (location.hash || '').replace(/^#/, '');
  return h || '/dashboard';
}

function renderRoute() {
  const path = currentPath();
  let title = '';
  let fn = null;
  let arg = null;
  let navPath = path;

  /* 报告详情：#/reports/:id */
  const m = path.match(/^\/reports\/(.+)$/);
  if (m) {
    title = '报告审核详情';
    fn = Pages.reportDetail;
    arg = decodeURIComponent(m[1]);
    navPath = '/reports';
  } else {
    const route = ROUTES.find(function (r) { return r.path === path; });
    if (route) {
      title = route.title;
      fn = Pages[route.page];
    }
  }

  document.getElementById('page-title').textContent = title || '海外薪酬系统';

  /* 侧边导航高亮 */
  document.querySelectorAll('#side-nav .nav-item').forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('data-path') === navPath);
  });

  App.closeOverlay();

  const container = document.getElementById('app');
  container.innerHTML = '';
  if (typeof fn === 'function') {
    fn(container, arg);
  } else {
    container.innerHTML =
      '<div class="card notfound"><h2>页面不存在</h2>' +
      '<p>未找到路由 ' + App.esc(path) + '，请从左侧导航进入。</p>' +
      '<p class="mt16"><a class="btn btn-primary" href="#/dashboard">返回工作台</a></p></div>';
  }
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', renderRoute);

/* 首次渲染 */
renderRoute();
