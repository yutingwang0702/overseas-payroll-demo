/**
 * 海外薪酬系统（MVP）— 各页面渲染函数
 * 约定：本文件仅定义 Pages 对象，不做任何顶层渲染调用；
 *       渲染统一由 app.js 的 hash 路由触发（依赖 data.js 的全局 DB 与 app.js 的全局 App）
 */
'use strict';

const Pages = {};

/* 通用徽章色调映射 */
const TONE = {
  nodeStatus: { '已完成': 'success', '进行中': 'primary', '临期': 'warning', '逾期': 'danger' },
  mode: { '模式A': 'primary', '模式B': 'warning', '模式C': 'purple' },
  changeType: { '入职': 'success', '离职': 'danger', '调薪': 'primary', '外派': 'purple', '补贴变更': 'warning', '银行账户变更': 'gray' },
  changeStatus: { '待确认': 'warning', '已确认': 'primary', '已提交': 'primary', '供应商已受理': 'purple', '已体现在账单': 'primary', '已发放': 'success' },
  risk: { '高': 'danger', '中': 'warning', '低': 'primary', '无': 'gray' },
  reportStatus: { '待审核': 'warning', 'AI预审完成': 'purple', '待审批': 'primary', '已确认': 'success' },
  split: { '已拆分': 'success', '待人工': 'warning' },
  check: { '金额一致': 'success', '不一致': 'danger', '待校验': 'gray' },
  pay: { '已发放': 'success', '已查阅': 'primary', '退信': 'danger', '未发放': 'gray' },
  voucher: { '已归档': 'success', '待上传': 'warning' },
  alert: { '正常': 'success', '临期': 'warning', '逾期': 'danger' },
  contract: { '生效中': 'primary', '90天内到期': 'warning', '30天内到期': 'danger', '已过期': 'danger' },
  regLevel: { 'high': 'danger', 'medium': 'warning', 'low': 'gray' },
  regLevelText: { 'high': '高风险', 'medium': '中风险', 'low': '低风险' },
  trend: { 'up': '上升', 'flat': '持平', 'down': '下降' },
  trendTone: { 'up': 'warning', 'flat': 'gray', 'down': 'success' },
  payAuth: { '待授权': 'warning', '已授权': 'success' },
  payStatus: { '待发送': 'gray', '已发送': 'primary', '已执行': 'success', '失败': 'danger' },
  eorCheck: { '一致': 'success', '多计服务费': 'danger' },
  pushStatus: { '草稿': 'gray', '已推送': 'primary', '已回执': 'success' },
  vchCheck: { '与确认账单一致': 'success', '不一致': 'danger' }
};

/* ============================================================
 * 1. 工作台（#/dashboard）
 * ============================================================ */
Pages.dashboard = function (container) {
  const k = DB.kpi;

  const stepsHTML = DB.flowSteps.map(function (s, i) {
    return '<div class="step ' + s.state + '"><div class="step-dot">' + (i + 1) + '</div>' +
      '<div class="step-label">' + s.name + '</div></div>';
  }).join('');

  container.innerHTML =
    '<div class="kpi-grid">' +
      '<div class="kpi-card"><div class="kpi-icon blue"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg></div>' +
        '<div><div class="kpi-label">本月节点总数</div><div class="kpi-value">' + k.nodesTotal + '</div><div class="kpi-trend">50 国 · 50 主体 · 2026-11 周期</div></div></div>' +
      '<div class="kpi-card"><div class="kpi-icon red"><svg viewBox="0 0 24 24"><path d="M12 3L22 20H2z"/><line x1="12" y1="9" x2="12" y2="14"/><circle cx="12" cy="17" r="0.6"/></svg></div>' +
        '<div><div class="kpi-label">逾期节点</div><div class="kpi-value red">' + k.overdue + '</div><div class="kpi-trend">菲律宾 / 印度 / 墨西哥 CutOff 逾期</div></div></div>' +
      '<div class="kpi-card"><div class="kpi-icon orange"><svg viewBox="0 0 24 24"><path d="M6 2h9l4 4v16H6z"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg></div>' +
        '<div><div class="kpi-label">待审账单</div><div class="kpi-value orange">' + k.reportsPending + '</div><div class="kpi-trend">其中 AI 预审完成 5 份</div></div></div>' +
      '<div class="kpi-card"><div class="kpi-icon green"><svg viewBox="0 0 24 24"><path d="M4 9h13M13 4l5 5-5 5"/><path d="M20 15H7M11 20l-5-5 5-5"/></svg></div>' +
        '<div><div class="kpi-label">待确认异动</div><div class="kpi-value green">' + k.changesPending + '</div><div class="kpi-trend">SF 邮件 9 条 · 手工补录 3 条</div></div></div>' +
    '</div>' +

    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>11 月周期进度</span><span class="title-sub">国际薪酬 11 步月度流程</span></div>' +
      '<div class="progress-note">当前整体进行至第 <b>4 步「审账单」</b>，已完成 3 / 11 步；剩余节点按发薪日历自动推进与提醒。</div>' +
      '<div class="steps">' + stepsHTML + '</div>' +
    '</div>' +

    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>节点状态大盘</span><span class="title-sub">摘自 682 个月度节点的代表性数据</span></div>' +
      '<div class="filter-bar">' +
        App.filterSelect('node-f-country', '国家', ['全部'].concat(App.unique(DB.nodes.map(function (n) { return n.country; }))), '全部') +
        App.filterSelect('node-f-status', '状态', ['全部', '已完成', '进行中', '临期', '逾期'], '全部') +
        '<span class="filter-count" id="node-count"></span>' +
      '</div>' +
      '<div id="node-table"></div>' +
    '</div>';

  let fCountry = '全部';
  let fStatus = '全部';

  function renderTable() {
    const rows = DB.nodes.filter(function (n) {
      return (fCountry === '全部' || n.country === fCountry) && (fStatus === '全部' || n.status === fStatus);
    });
    const cols = [
      { label: '国家', render: function (r) { return App.esc(r.country); } },
      { label: '主体', render: function (r) { return App.esc(r.entity); } },
      { label: '业务类型', render: function (r) { return App.badge(r.mode, TONE.mode[r.mode]); } },
      { label: '薪制', render: function (r) { return r.freq === 'bi-weekly' ? '<span class="badge badge-plain">bi-weekly</span>' : '<span class="badge badge-plain">月薪</span>'; } },
      { label: 'CutOff', cls: 'ta-c', render: function (r) { return r.cutoff; } },
      { label: '发薪日', cls: 'ta-c', render: function (r) { return r.payday; } },
      { label: '状态', cls: 'ta-c', render: function (r) { return App.badge(r.status, TONE.nodeStatus[r.status]); } },
      { label: '负责人', cls: 'ta-c', render: function (r) { return App.esc(r.owner); } }
    ];
    const el = document.getElementById('node-table');
    el.innerHTML = App.table(cols, rows, {
      rowCls: function (r) {
        if (r.status === '逾期') return 'row-danger';
        if (r.status === '临期') return 'row-warn';
        return '';
      }
    });
    document.getElementById('node-count').textContent = '共 ' + rows.length + ' 个节点';
  }

  document.getElementById('node-f-country').addEventListener('change', function (e) { fCountry = e.target.value; renderTable(); });
  document.getElementById('node-f-status').addEventListener('change', function (e) { fStatus = e.target.value; renderTable(); });
  renderTable();
};

/* ============================================================
 * 2. 发薪日历（#/calendar）
 * ============================================================ */
Pages.calendar = function (container) {
  const tplRows = DB.calendarTemplates.map(function (t) {
    return t;
  });

  const tplCols = [
    { label: '国家', render: function (r) { return App.esc(r.country); } },
    { label: '主体', render: function (r) { return App.esc(r.entity); } },
    { label: '业务类型', render: function (r) { return App.badge(r.mode, TONE.mode[r.mode]); } },
    { label: '薪制', render: function (r) { return r.freq === 'bi-weekly' ? '<span class="badge badge-plain">bi-weekly</span>' : '<span class="badge badge-plain">月薪</span>'; } },
    { label: 'CutOff 编码', render: function (r) {
        return '<span class="code-cell"><b>' + r.cutoffCode + '</b><span class="code-note' + (r.cutoffCode.indexOf('-') === 0 ? ' warn' : '') + '">' + r.cutoffNote + '</span></span>';
      } },
    { label: '发薪日编码', render: function (r) {
        return '<span class="code-cell"><b>' + r.payCode + '</b><span class="code-note' + (r.payCode.indexOf('-') === 0 ? ' warn' : '') + '">' + r.payNote + '</span></span>';
      } },
    { label: '发薪方', render: function (r) { return App.esc(r.payer); } },
    { label: '供应商 / 代理', render: function (r) { return App.esc(r.vendor); } },
    { label: '对接人', render: function (r) { return App.esc(r.contact); } }
  ];

  const remindCols = [
    { label: '节点', render: function (r) { return App.esc(r.node); } },
    { label: '截止时间', render: function (r) { return App.esc(r.deadline); } },
    { label: '提前提醒配置', render: function (r) { return '<span class="badge badge-plain">' + App.esc(r.cfg) + '</span>'; } },
    { label: '状态', cls: 'ta-c', render: function (r) { return App.badge(r.status, TONE.nodeStatus[r.status] || 'gray'); } }
  ];

  container.innerHTML =
    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>日历模板</span><span class="title-sub">国家 × 主体 × 业务类型 · 日期编码：正数=当月 N 日，100+N=次月 N 日，-N=月末前 N 天</span></div>' +
      App.table(tplCols, tplRows) +
    '</div>' +
    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>本月提醒计划</span><span class="title-sub">即将到期节点 · 提醒渠道：站内 + 邮件 + IM</span></div>' +
      App.table(remindCols, DB.reminders, {
        rowCls: function (r) {
          if (r.status === '逾期') return 'row-danger';
          if (r.status === '进行中') return 'row-warn';
          return '';
        }
      }) +
    '</div>';
};

/* ============================================================
 * 3. 异动管理（#/changes）
 * ============================================================ */
Pages.changes = function (container) {
  const types = ['全部'].concat(App.unique(DB.changes.map(function (c) { return c.type; })));
  const statuses = ['全部', '待确认', '已确认', '已提交', '供应商已受理', '已体现在账单', '已发放'];

  container.innerHTML =
    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>异动列表</span><span class="title-sub">SF 触发邮件为唯一可信异动源 · 点击行查看详情</span></div>' +
      '<div class="filter-bar">' +
        App.filterSelect('chg-f-type', '异动类型', types, '全部') +
        App.filterSelect('chg-f-status', '状态', statuses, '全部') +
        '<span class="filter-count" id="chg-count"></span>' +
      '</div>' +
      '<div id="chg-table"></div>' +
    '</div>';

  let fType = '全部';
  let fStatus = '全部';

  function visibleRows() {
    return DB.changes.filter(function (c) {
      return (fType === '全部' || c.type === fType) && (fStatus === '全部' || c.status === fStatus);
    });
  }

  function renderTable() {
    const rows = visibleRows();
    const cols = [
      { label: '异动编号', render: function (r) { return '<b>' + App.esc(r.id) + '</b>'; } },
      { label: '员工', render: function (r) { return App.esc(r.emp); } },
      { label: '国家', render: function (r) { return App.esc(r.country); } },
      { label: '主体', render: function (r) { return App.esc(r.entity); } },
      { label: '类型', render: function (r) { return App.badge(r.type, TONE.changeType[r.type]); } },
      { label: '来源', render: function (r) {
          return r.source === 'SF邮件'
            ? '<span class="badge badge-primary">SF邮件</span><span class="code-note">可信源</span>'
            : '<span class="badge badge-gray">手工</span>';
        } },
      { label: '生效日', cls: 'ta-c', render: function (r) { return r.eff; } },
      { label: 'Retro', cls: 'ta-c', render: function (r) { return r.retro ? '<span class="badge badge-warning">Retro</span>' : '<span class="hint-text">—</span>'; } },
      { label: '状态', render: function (r) { return App.badge(r.status, TONE.changeStatus[r.status]); } },
      { label: 'CutOff 风险', cls: 'ta-c', render: function (r) { return App.badge(r.risk, TONE.risk[r.risk]); } }
    ];
    const el = document.getElementById('chg-table');
    el.innerHTML = App.table(cols, rows, { rowClick: true });
    document.getElementById('chg-count').textContent = '共 ' + rows.length + ' 条异动';
  }

  document.getElementById('chg-f-type').addEventListener('change', function (e) { fType = e.target.value; renderTable(); });
  document.getElementById('chg-f-status').addEventListener('change', function (e) { fStatus = e.target.value; renderTable(); });
  renderTable();

  /* 行点击 → 详情抽屉 */
  document.getElementById('chg-table').addEventListener('click', function (e) {
    const tr = e.target.closest('tr[data-idx]');
    if (!tr) return;
    openDrawer(visibleRows()[Number(tr.getAttribute('data-idx'))]);
  });
};

/** 异动详情抽屉（含字段明细 + 状态时间线 + 提交供应商操作） */
function openChangeDrawer(c, onUpdated) {
  function drawerBody(c) {
    const fields = Object.keys(c.detail).map(function (k) {
      return '<div class="detail-item"><div class="dl">' + App.esc(k) + '</div><div class="dv">' + App.esc(c.detail[k]) + '</div></div>';
    }).join('');
    const tl = c.timeline.map(function (t, i) {
      const cls = (i === c.timeline.length - 1) ? 'now' : 'done';
      return '<div class="tl-item ' + cls + '"><div class="tl-dot"></div>' +
        '<div class="tl-title">' + App.esc(t.s) + '</div><div class="tl-meta">' + App.esc(t.t) + ' · ' + App.esc(t.who) + '</div></div>';
    }).join('');
    return '<div class="section-title">异动字段明细</div><div class="detail-grid">' + fields + '</div>' +
      '<div class="section-title">状态流转时间线</div><div class="timeline">' + tl + '</div>';
  }

  function drawerFooter(c) {
    if (c.status === '待确认' || c.status === '已确认') {
      return '<button class="btn btn-primary" id="btn-submit-change">确认提交供应商</button>';
    }
    return '<span class="hint-text">当前状态：' + App.esc(c.status) +
      (c.batch ? ' · 批次号：' + App.esc(c.batch) : '') + '</span>';
  }

  const ov = App.drawer({
    title: '异动详情 · ' + c.id,
    body: drawerBody(c),
    footer: drawerFooter(c),
    width: 620
  });

  const btn = ov.querySelector('#btn-submit-change');
  if (btn) {
    btn.addEventListener('click', function () {
      const now = '2026-11-23 ' + new Date().toTimeString().slice(0, 5);
      if (c.status === '待确认') {
        c.timeline.push({ s: '已确认', t: now, who: '赖泳成' });
      }
      if (!c.batch) {
        c.batch = 'BATCH-2026-11-' + c.id.slice(-3) + '-NEW';
      }
      c.timeline.push({ s: '已提交', t: now, who: '赖泳成（批次 ' + c.batch + '）' });
      c.status = '已提交';
      App.toast('异动 ' + c.id + ' 已确认并提交供应商，批次号 ' + c.batch, 'success');
      /* 刷新抽屉与底层表格 */
      ov.querySelector('.drawer-body').innerHTML = drawerBody(c);
      ov.querySelector('.drawer-foot').innerHTML = drawerFooter(c);
      const btn2 = ov.querySelector('#btn-submit-change');
      if (btn2) btn2.addEventListener('click', function () { /* 已提交，无操作 */ });
      if (onUpdated) onUpdated();
    });
  }
}

/* changes 页行点击绑定（延迟到 DOM 就绪后由 Pages.changes 内部绑定） */
function openDrawer(c) {
  openChangeDrawer(c, function () {
    /* 重新渲染列表以反映状态变化：触发一次无变化的 filter 重绘 */
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', true, false);
    document.getElementById('chg-f-type').dispatchEvent(evt);
  });
}

/* ============================================================
 * 4. 外派档案（#/expat）
 * ============================================================ */
Pages.expat = function (container) {
  container.innerHTML =
    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>外派员工双薪酬档案</span><span class="title-sub">总部档案（名义工资）+ 派驻国档案（实发工资）· 税负平衡多退少补</span></div>' +
      '<div class="expat-grid">' + DB.expat.map(expatCardHTML).join('') + '</div>' +
      '<div class="hint-text mt8">双档案唯一性：同一自然人在同一主体同一周期内只有一个活动档案参与发薪；成本归集时按自然人合并展示两线成本。</div>' +
    '</div>';
};

function expatCardHTML(p) {
  const homeRows = [
    ['归属主体', p.home.entity],
    ['名义工资（Notional）', p.home.notional],
    ['假设税（Hypothetical Tax）', p.home.hypoTax],
    ['薪制 / 币种', p.home.payFreq + ' · ' + p.home.currency],
    ['税负平衡', p.home.equalization ? '参与（Tax Equalization）' : '不参与']
  ].map(function (r) {
    return '<div class="profile-row"><span class="k">' + r[0] + '</span><span class="v">' + App.esc(r[1]) + '</span></div>';
  }).join('') + '<div class="hint-text mt8">' + App.esc(p.home.note) + '</div>';

  const hostRows = [
    ['归属主体', p.host.entity],
    ['实发工资（Net Pay）', p.host.net],
    ['毛薪（Gross）', p.host.gross],
    ['补贴', p.host.allowances],
    ['当地个税', p.host.tax],
    ['当地社保（个人）', p.host.ss]
  ].map(function (r) {
    return '<div class="profile-row"><span class="k">' + r[0] + '</span><span class="v">' + App.esc(r[1]) + '</span></div>';
  }).join('');

  let settlementHTML = '';
  if (p.settlement) {
    const rows = p.settlement.rows.map(function (r) {
      const cls = r.kind === 'diff' ? ' style="font-weight:700;color:#2F54EB"' : (r.kind === 'result' ? ' style="color:#2F54EB;font-weight:700"' : '');
      return '<tr><td>' + App.esc(r.label) + '</td><td class="ta-r"' + cls + '>' + App.esc(r.value) + '</td></tr>';
    }).join('');
    settlementHTML =
      '<div class="section-title">' + App.esc(p.settlement.caption) + '</div>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>结算项</th><th class="ta-r">金额</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
  }

  const initial = p.name.charAt(0);

  return '<div class="expat-card">' +
    '<div class="expat-head">' +
      '<div class="expat-avatar">' + App.esc(initial) + '</div>' +
      '<div><div class="expat-name">' + App.esc(p.name) + ' <span class="badge badge-gray">' + App.esc(p.gid) + '</span></div>' +
      '<div class="expat-route">' + App.esc(p.from) + ' → ' + App.esc(p.to) + ' · ' + App.esc(p.type) + ' · ' + p.start + ' ~ ' + p.end + '</div></div>' +
      (p.home.equalization ? '<span class="badge badge-purple" style="margin-left:auto;flex-shrink:0">税负平衡</span>' : '<span class="badge badge-gray" style="margin-left:auto;flex-shrink:0">非平衡</span>') +
    '</div>' +
    '<div class="profile-2col">' +
      '<div class="profile-box home"><div class="profile-box-title">总部档案（HOME）</div>' + homeRows + '</div>' +
      '<div class="profile-box host"><div class="profile-box-title">派驻国档案（HOST）</div>' + hostRows + '</div>' +
    '</div>' +
    settlementHTML +
  '</div>';
}

/* ============================================================
 * 5. 账单中心（#/reports）与审核详情（#/reports/:id）
 * ============================================================ */
Pages.reports = function (container) {
  const cols = [
    { label: '账单编号', render: function (r) { return '<b>' + App.esc(r.id) + '</b>'; } },
    { label: '周期', cls: 'ta-c', render: function (r) { return r.period; } },
    { label: '国家', render: function (r) { return App.esc(r.country); } },
    { label: '主体', render: function (r) { return App.esc(r.entity); } },
    { label: '供应商', cls: 'ta-c', render: function (r) { return App.esc(r.vendor); } },
    { label: '版本', cls: 'ta-c', render: function (r) { return r.version; } },
    { label: '总额（当地币）', cls: 'ta-r', render: function (r) { return '<span class="num">' + App.money(r.total, r.currency) + '</span>'; } },
    { label: '人头数', cls: 'ta-r', render: function (r) { return r.headcount; } },
    { label: '接收时间', render: function (r) { return r.receivedAt; } },
    { label: 'AI 预审结论', render: function (r) {
        const hasAI = r.aiSummary && r.aiSummary.indexOf('进行中') < 0;
        return hasAI
          ? '<span class="badge badge-purple">AI</span> ' + App.esc(r.aiSummary)
          : '<span class="hint-text">' + App.esc(r.aiSummary || '—') + '</span>';
      } },
    { label: '审核状态', cls: 'ta-c', render: function (r) { return App.badge(r.status, TONE.reportStatus[r.status]); } },
    { label: '操作', cls: 'ta-c', render: function () { return '<span class="btn btn-sm">查看详情</span>'; } }
  ];

  container.innerHTML =
    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>算薪账单列表</span><span class="title-sub">点击行进入审核详情（演示版含 BIPO-越南 / TMF-德国 完整审核流）</span></div>' +
      '<div id="rpt-table">' + App.table(cols, DB.reports, { rowClick: true }) + '</div>' +
    '</div>';

  document.getElementById('rpt-table').addEventListener('click', function (e) {
    const tr = e.target.closest('tr[data-idx]');
    if (!tr) return;
    const r = DB.reports[Number(tr.getAttribute('data-idx'))];
    if (r.hasDetail === false) {
      App.toast('演示版仅提供 BIPO-越南 与 TMF-德国 两份账单的完整审核详情', 'info');
      return;
    }
    location.hash = '#/reports/' + r.id;
  });
};

Pages.reportDetail = function (container, id) {
  const r = DB.reports.find(function (x) { return x.id === id; });
  if (!r || !r.dims) {
    container.innerHTML = '<div class="card notfound"><h2>未找到账单</h2><p>账单 ' + App.esc(String(id)) + ' 不存在或演示数据未包含其详情。</p><p class="mt8"><a class="btn btn-primary" href="#/reports">返回账单列表</a></p></div>';
    return;
  }

  function unhandled() {
    return r.diffs.filter(function (d) { return d.level !== 'ok' && !d.handled; });
  }

  function render() {
    const dimRows = r.dims.map(function (d) {
      const isHead = d.dim === '人头';
      const diff = d.report - d.base;
      const rate = d.base !== 0 ? (diff / d.base * 100).toFixed(2) + '%' : '—';
      const diffStr = (diff > 0 ? '+' : '') + (isHead ? String(diff) : App.money(diff, r.currency));
      const concText = { pass: '通过', warn: '警告', error: '异常' }[d.conclusion];
      const concTone = { pass: 'success', warn: 'warning', error: 'danger' }[d.conclusion];
      const cellCls = { pass: 'dim-cell-pass', warn: 'dim-cell-warn', error: 'dim-cell-error' }[d.conclusion];
      return '<tr>' +
        '<td><b>' + App.esc(d.dim) + '</b></td>' +
        '<td class="ta-r num">' + (isHead ? d.base : App.money(d.base, r.currency)) + '</td>' +
        '<td class="ta-r num">' + (isHead ? d.report : App.money(d.report, r.currency)) + '</td>' +
        '<td class="ta-r num">' + diffStr + '</td>' +
        '<td class="ta-r num">' + rate + '</td>' +
        '<td class="ta-c">' + App.esc(d.threshold) + '</td>' +
        '<td class="ta-c"><span class="' + cellCls + '">' + concText + '</span> <span class="badge badge-' + concTone + '">' + concText + '</span></td>' +
      '</tr>';
    }).join('');

    const diffCards = r.diffs.map(function (d, i) {
      const levelText = { ok: '合理差异', error: '疑似异常', warn: '低置信度' }[d.level];
      const levelTone = { ok: 'success', error: 'danger', warn: 'warning' }[d.level];
      let actions = '';
      if (d.level !== 'ok' && !d.handled) {
        actions += '<button class="btn btn-sm btn-primary" data-act="handle" data-i="' + i + '">标记已处理</button>';
      }
      if (d.hasLetter) {
        actions += '<button class="btn btn-sm btn-purple" data-act="letter" data-i="' + i + '">生成差异沟通函</button>';
      }
      return '<div class="diff-card ' + d.level + '">' +
        '<div class="diff-head">' +
          '<span class="diff-dim">维度：' + App.esc(d.dim) + '</span>' +
          '<span class="diff-amount ' + d.level + '">' + App.esc(d.amount) + '</span>' +
          App.badge(levelText, levelTone) +
          (d.handled ? App.badge('已处理', 'success') : '') +
        '</div>' +
        '<div class="diff-reason">' + App.esc(d.reason) + '</div>' +
        '<div class="diff-meta"><span>置信度：' + App.esc(d.confidence) + '</span><span>建议动作：' + App.esc(d.action) + '</span></div>' +
        (actions ? '<div class="diff-actions">' + actions + '</div>' : '') +
      '</div>';
    }).join('');

    const pending = unhandled().length;
    const approved = r.status === '待审批' || r.status === '已确认';
    const submitBtn = approved
      ? '<button class="btn btn-lg" disabled>' + (r.status === '已确认' ? '账单已确认' : '已提交审批') + '</button>'
      : '<button class="btn btn-primary btn-lg" id="btn-approve">提交审批</button>';
    const abNote = approved
      ? '审批摘要：总额 ' + App.money(r.total, r.currency) + ' · 人头 ' + r.headcount + ' · AI 预审 ' + App.esc(r.aiSummary)
      : '疑似异常与低置信度项全部处理完成后方可提交审批（当前未处理 <b style="color:#F5222D">' + pending + '</b> 项）';

    container.innerHTML =
      '<a class="back-link" href="#/reports">← 返回账单列表</a>' +
      '<div class="card">' +
        '<div class="card-title"><span><span class="title-bar"></span>' + App.esc(r.id) + ' · 审核详情</span>' + App.badge(r.status, TONE.reportStatus[r.status]) + '</div>' +
        '<div class="report-header-info">' +
          '<div class="detail-item"><div class="dl">周期</div><div class="dv">' + r.period + '</div></div>' +
          '<div class="detail-item"><div class="dl">国家 / 主体</div><div class="dv">' + App.esc(r.country) + ' · ' + App.esc(r.entity) + '</div></div>' +
          '<div class="detail-item"><div class="dl">供应商</div><div class="dv">' + App.esc(r.vendor) + '</div></div>' +
          '<div class="detail-item"><div class="dl">版本 / 接收时间</div><div class="dv">' + r.version + ' · ' + r.receivedAt + '</div></div>' +
          '<div class="detail-item"><div class="dl">总额（当地币）</div><div class="dv">' + App.money(r.total, r.currency) + '</div></div>' +
          '<div class="detail-item"><div class="dl">人头数</div><div class="dv">' + r.headcount + ' 人</div></div>' +
          '<div class="detail-item"><div class="dl">原始文件</div><div class="dv">' + App.esc(r.file) + '</div></div>' +
          '<div class="detail-item"><div class="dl">AI 预审结论</div><div class="dv"><span class="badge badge-purple">AI</span> ' + App.esc(r.aiSummary) + '</div></div>' +
        '</div>' +
        (r.fileNote ? '<div class="hint-text mt8">' + App.esc(r.fileNote) + '</div>' : '') +
      '</div>' +

      '<div class="card">' +
        '<div class="card-title"><span><span class="title-bar"></span>五维自动比对</span><span class="title-sub">总额 / 人头 / 个税 / 社保 / 汇率折算</span></div>' +
        '<div class="table-wrap"><table class="table"><thead><tr>' +
          '<th>维度</th><th class="ta-r">基准值</th><th class="ta-r">账单值</th><th class="ta-r">差异</th><th class="ta-r">差异率</th><th class="ta-c">阈值</th><th class="ta-c">结论</th>' +
        '</tr></thead><tbody>' + dimRows + '</tbody></table></div>' +
      '</div>' +

      '<div class="card">' +
        '<div class="card-title"><span><span class="title-bar"></span>AI 预审差异清单</span><span class="title-sub">合理差异标绿 · 疑似异常标红 · 低置信度标黄</span></div>' +
        diffCards +
      '</div>' +

      '<div class="card">' +
        '<div class="action-bar"><div class="ab-note">' + abNote + '</div>' + submitBtn + '</div>' +
      '</div>';

    /* 交互绑定 */
    container.querySelectorAll('button[data-act]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const i = Number(btn.getAttribute('data-i'));
        const d = r.diffs[i];
        if (btn.getAttribute('data-act') === 'handle') {
          d.handled = true;
          App.toast('差异项「' + d.dim + '」已标记处理：' + d.action, 'success');
          render();
        } else if (btn.getAttribute('data-act') === 'letter') {
          openLetterModal(r, d, render);
        }
      });
    });

    const approveBtn = container.querySelector('#btn-approve');
    if (approveBtn) {
      approveBtn.addEventListener('click', function () {
        const left = unhandled();
        if (left.length > 0) {
          App.toast('还有 ' + left.length + ' 项疑似异常 / 低置信度差异未处理，处理完成后方可提交审批', 'error');
          return;
        }
        r.status = '待审批';
        App.toast('账单 ' + r.id + ' 已提交薪酬主管审批，确认凭证已生成', 'success');
        render();
      });
    }
  }

  render();
};

/** 差异沟通函预览弹窗 */
function openLetterModal(r, d, onUpdated) {
  const letter = r.letter;
  App.modal({
    title: '差异沟通函预览 · ' + r.id,
    width: 720,
    body: '<pre class="letter-pre">收件人：' + App.esc(letter.to) + '\n主题：' + App.esc(letter.subject) + '\n\n' + App.esc(letter.body) + '</pre>',
    footer: '<button class="btn" id="letter-close">关闭</button><button class="btn btn-primary" id="letter-send">发送给供应商</button>'
  });
  document.getElementById('letter-close').addEventListener('click', App.closeOverlay);
  document.getElementById('letter-send').addEventListener('click', function () {
    App.closeOverlay();
    App.toast('差异沟通函已发送至 ' + letter.to + '，要求 2 个工作日内回复', 'success');
    d.handled = true;
    if (onUpdated) onUpdated();
  });
}

/* ============================================================
 * 6. 工资单中心（#/payslips）
 * ============================================================ */
Pages.payslips = function (container) {
  const s = DB.payslipStats;

  container.innerHTML =
    '<div class="card">' +
      '<div class="stat-strip">' +
        '<div class="stat-cell"><div class="sl">本月工资单总数</div><div class="sv">' + s.total + ' 张</div></div>' +
        '<div class="stat-cell"><div class="sl">自动拆分成功率</div><div class="sv blue">' + s.splitRate + '</div></div>' +
        '<div class="stat-cell"><div class="sl">金额校验通过</div><div class="sv green">' + s.pass + ' 张</div></div>' +
        '<div class="stat-cell"><div class="sl">校验异常</div><div class="sv red">' + s.abnormal + ' 张</div></div>' +
      '</div>' +
      '<div class="hint-text mt8">校验口径：工资单 PDF 净额与确认版账单该员工净额比对；点击行查看单人工资单预览。</div>' +
    '</div>' +
    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>工资单列表</span><span class="title-sub">拆分 / 校验 / 发放状态跟踪</span></div>' +
      '<div id="ps-table"></div>' +
    '</div>';

  const cols = [
    { label: '员工', render: function (r) { return '<b>' + App.esc(r.emp) + '</b>'; } },
    { label: '国家', render: function (r) { return App.esc(r.country); } },
    { label: '主体', render: function (r) { return App.esc(r.entity); } },
    { label: '周期', cls: 'ta-c', render: function (r) { return r.period; } },
    { label: '文件名', render: function (r) { return '<span class="hint-text">' + App.esc(r.file) + '</span>'; } },
    { label: '拆分状态', cls: 'ta-c', render: function (r) { return App.badge(r.split, TONE.split[r.split]); } },
    { label: '校验结果', cls: 'ta-c', render: function (r) { return App.badge(r.check, TONE.check[r.check]); } },
    { label: '发放状态', cls: 'ta-c', render: function (r) { return App.badge(r.pay, TONE.pay[r.pay]); } }
  ];

  const el = document.getElementById('ps-table');
  el.innerHTML = App.table(cols, DB.payslips, {
    rowClick: true,
    rowCls: function (r) { return r.check === '不一致' ? 'row-danger' : ''; }
  });

  el.addEventListener('click', function (e) {
    const tr = e.target.closest('tr[data-idx]');
    if (!tr) return;
    openPayslipModal(DB.payslips[Number(tr.getAttribute('data-idx'))]);
  });
};

/** 单人工资单预览弹窗 */
function openPayslipModal(p) {
  const lines = p.lines.map(function (l) {
    return '<tr><td>' + App.esc(l.k) + '</td><td class="ta-r num">' + App.esc(l.v) + '</td><td class="hint-text">' + App.esc(l.note || '') + '</td></tr>';
  }).join('');

  App.modal({
    title: '工资单预览 · ' + p.emp + ' · ' + p.period,
    width: 640,
    body:
      '<div class="detail-grid">' +
        '<div class="detail-item"><div class="dl">员工</div><div class="dv">' + App.esc(p.emp) + '</div></div>' +
        '<div class="detail-item"><div class="dl">国家 / 主体</div><div class="dv">' + App.esc(p.country) + ' · ' + App.esc(p.entity) + '</div></div>' +
        '<div class="detail-item"><div class="dl">文件名</div><div class="dv">' + App.esc(p.file) + '</div></div>' +
        '<div class="detail-item"><div class="dl">校验结果</div><div class="dv">' + App.badge(p.check, TONE.check[p.check]) + ' ' + App.badge(p.pay, TONE.pay[p.pay]) + '</div></div>' +
      '</div>' +
      (p.checkNote ? '<div class="hint-text mt8" style="color:#F5222D">' + App.esc(p.checkNote) + '</div>' : '') +
      '<div class="table-wrap mt16"><table class="table"><thead><tr><th>薪项</th><th class="ta-r">金额</th><th>备注</th></tr></thead><tbody>' + lines + '</tbody></table></div>' +
      '<div class="payslip-net"><span class="label">净额（Net Pay）</span><span class="value">' + App.esc(p.net) + '</span></div>',
    footer: '<button class="btn" id="ps-close">关闭</button><button class="btn btn-primary" id="ps-resend">重新发放</button>'
  });

  document.getElementById('ps-close').addEventListener('click', App.closeOverlay);
  document.getElementById('ps-resend').addEventListener('click', function () {
    App.closeOverlay();
    App.toast(p.emp + ' 的 ' + p.period + ' 工资单已按配置渠道重新发放', 'success');
  });
}

/* ============================================================
 * 7. 个税社保（#/compliance）
 * ============================================================ */
Pages.compliance = function (container) {
  const executorTone = function (v) {
    if (v.indexOf('EOR') === 0) return 'purple';
    if (v.indexOf('代理') === 0) return 'warning';
    return 'primary';
  };
  const cols = [
    { label: '国家', render: function (r) { return App.esc(r.country); } },
    { label: '主体', render: function (r) { return App.esc(r.entity); } },
    { label: '周期', cls: 'ta-c', render: function (r) { return r.period; } },
    { label: '税种', cls: 'ta-c', render: function (r) { return r.taxType === '个税' ? App.badge('个税', 'primary') : App.badge('社保', 'purple'); } },
    { label: '执行方', render: function (r) { return App.badge(r.executor, executorTone(r.executor)); } },
    { label: '申报截止日', cls: 'ta-c', render: function (r) { return r.deadline; } },
    { label: '凭证状态', cls: 'ta-c', render: function (r) { return App.badge(r.voucher, TONE.voucher[r.voucher]); } },
    { label: '逾期预警', cls: 'ta-c', render: function (r) { return App.badge(r.alert, TONE.alert[r.alert]); } }
  ];

  container.innerHTML =
    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>个税 / 社保申报跟踪</span><span class="title-sub">按模式标记执行方（当地 Payroll / 代理 / EOR），总部为监督与存档方</span></div>' +
      App.table(cols, DB.compliance, {
        rowCls: function (r) { return r.alert === '临期' ? 'row-warn' : ''; }
      }) +
    '</div>';
};

/* ============================================================
 * 8. 成本分析（#/cost）
 * ============================================================ */
Pages.cost = function (container) {
  const c = DB.cost;
  const maxVal = c.ranking[0].value;

  const barRows = c.ranking.map(function (r) {
    const pct = Math.max(2, Math.round(r.value / maxVal * 100));
    return '<div class="bar-row">' +
      '<span class="bar-label">' + App.esc(r.country) + '</span>' +
      '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div>' +
      '<span class="bar-val">' + App.wan(r.value) + '</span>' +
    '</div>';
  }).join('') +
    '<div class="bar-row">' +
      '<span class="bar-label">其他</span>' +
      '<div class="bar-track"><div class="bar-fill others" style="width:' + Math.max(2, Math.round(c.othersCNY / maxVal * 100)) + '%"></div></div>' +
      '<span class="bar-val">' + App.wan(c.othersCNY) + '</span>' +
    '</div>';

  const eorRows = c.eorCost.map(function (r) {
    const total = r.net + r.tax + r.fee;
    return '<tr>' +
      '<td>' + App.esc(r.entity) + '</td>' +
      '<td class="ta-r num">' + App.money(r.net, r.cur) + '</td>' +
      '<td class="ta-r num">' + App.money(r.tax, r.cur) + '</td>' +
      '<td class="ta-r num">' + App.money(r.fee, r.cur) + '</td>' +
      '<td class="ta-r num"><b>' + App.money(total, r.cur) + '</b></td>' +
    '</tr>';
  }).join('');

  container.innerHTML =
    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>本月海外人力总成本</span><span class="title-sub">阿米巴口径 · 次月 3 个工作日内自动出具</span></div>' +
      '<div class="cost-total"><span class="big">' + App.money(c.totalCNY, 'CNY') + '</span><span class="sub">' + App.esc(c.totalNote) + '</span></div>' +
      '<div class="hint-text mt8">' + App.esc(DB.meta.fx) + '</div>' +
    '</div>' +

    '<div class="two-col">' +
      '<div class="card" style="margin-bottom:16px">' +
        '<div class="card-title"><span><span class="title-bar"></span>国家成本排行（Top 8）</span></div>' +
        barRows +
      '</div>' +
      '<div class="card" style="margin-bottom:16px">' +
        '<div class="card-title"><span><span class="title-bar"></span>EOR 成本三要素</span><span class="title-sub">模式C</span></div>' +
        '<div class="hint-text mb16">公式：EOR 成本 = 服务费 + 实发薪酬 + 当地税费（个税 + 社保公司部分 + 其他法定费用）</div>' +
        '<div class="table-wrap"><table class="table"><thead><tr><th>主体</th><th class="ta-r">实发薪酬</th><th class="ta-r">当地税费</th><th class="ta-r">服务费</th><th class="ta-r">合计</th></tr></thead><tbody>' + eorRows + '</tbody></table></div>' +
      '</div>' +
    '</div>' +

    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>月度人力成本趋势（近 6 个月 · 人民币）</span></div>' +
      '<div class="trend-svg-wrap">' + trendSVG(c.trend) + '</div>' +
    '</div>';
};

/** 纯 SVG 折线图 */
function trendSVG(trend) {
  const W = 680, H = 250, padL = 76, padR = 24, padT = 26, padB = 34;
  const vals = trend.map(function (t) { return t.v; });
  const min = Math.min.apply(null, vals) * 0.98;
  const max = Math.max.apply(null, vals) * 1.02;
  const n = trend.length;
  const x = function (i) { return padL + i * (W - padL - padR) / (n - 1); };
  const y = function (v) { return padT + (max - v) * (H - padT - padB) / (max - min); };

  let grid = '';
  let ylabels = '';
  const ticks = 4;
  for (let g = 0; g <= ticks; g++) {
    const v = min + (max - min) * g / ticks;
    const gy = y(v).toFixed(1);
    grid += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" stroke="#EDF0F3" stroke-width="1"/>';
    ylabels += '<text x="' + (padL - 8) + '" y="' + (+gy + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#94A3B8">' + App.wan(v) + '</text>';
  }

  const pts = trend.map(function (t, i) { return x(i).toFixed(1) + ',' + y(t.v).toFixed(1); }).join(' ');
  const area = padL + ',' + (H - padB) + ' ' + pts + ' ' + (W - padR) + ',' + (H - padB);

  let dots = '';
  let xlabels = '';
  let vlabels = '';
  trend.forEach(function (t, i) {
    const cx = x(i).toFixed(1), cy = y(t.v).toFixed(1);
    dots += '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="#fff" stroke="#2F54EB" stroke-width="2"/>';
    xlabels += '<text x="' + cx + '" y="' + (H - 10) + '" text-anchor="middle" font-size="11" fill="#64748B">' + t.m + '</text>';
    vlabels += '<text x="' + cx + '" y="' + (+cy - 10).toFixed(1) + '" text-anchor="middle" font-size="11" fill="#2F54EB" font-weight="600">' + App.wan(t.v) + '</text>';
  });

  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="月度人力成本趋势">' +
    grid + ylabels +
    '<polygon points="' + area + '" fill="rgba(47,84,235,0.07)"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="#2F54EB" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
    dots + xlabels + vlabels +
  '</svg>';
}

/* ============================================================
 * 9. 合同管理（#/contracts）
 * ============================================================ */
Pages.contracts = function (container) {
  const cols = [
    { label: '员工', render: function (r) { return '<b>' + App.esc(r.emp) + '</b>'; } },
    { label: '主体', render: function (r) {
        return App.esc(r.entity) + ' ' + (r.etype === 'EOR' ? App.badge('EOR', 'purple') : App.badge('子公司', 'primary'));
      } },
    { label: '合同类型', render: function (r) { return App.esc(r.ctype); } },
    { label: '签署日', cls: 'ta-c', render: function (r) { return r.signed; } },
    { label: '到期日', cls: 'ta-c', render: function (r) { return r.expiry; } },
    { label: '剩余天数', cls: 'ta-r', render: function (r) {
        if (r.days === null) return '<span class="hint-text">—</span>';
        const tone = r.days < 0 ? 'danger' : (r.days <= 30 ? 'danger' : (r.days <= 90 ? 'warning' : 'gray'));
        return '<span class="badge badge-' + tone + '">' + (r.days < 0 ? '已过期 ' + Math.abs(r.days) + ' 天' : r.days + ' 天') + '</span>';
      } },
    { label: '状态', cls: 'ta-c', render: function (r) { return App.badge(r.status, TONE.contract[r.status]); } },
    { label: '操作', cls: 'ta-c', render: function (r, i) { return '<button class="btn btn-sm" data-renew="' + App.esc(r.emp) + '">发起续签</button>'; } }
  ];

  container.innerHTML =
    '<div class="card">' +
      '<div class="card-title"><span><span class="title-bar"></span>海外合同台账</span><span class="title-sub">到期前 90 / 60 / 30 天自动预警 · 部分国家无合同不得继续发薪</span></div>' +
      '<div id="ct-table"></div>' +
    '</div>';

  const el = document.getElementById('ct-table');
  el.innerHTML = App.table(cols, DB.contracts, {
    rowCls: function (r) {
      if (r.status === '已过期' || r.status === '30天内到期') return 'row-danger';
      if (r.status === '90天内到期') return 'row-warn';
      return '';
    }
  });

  el.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-renew]');
    if (!btn) return;
    App.toast('已发起 ' + btn.getAttribute('data-renew') + ' 的合同续签流程，续签工单已派发至主体对接人', 'success');
  });
};

/* ============================================================
 * 10. AI 助手（#/ai）
 * ============================================================ */
Pages.ai = function (container) {
  let tab = 'reg';
  let chatMsgs = DB.ai.chat.map(function (m) { return { role: m.role, who: m.who, text: m.text }; });

  container.innerHTML =
    '<div class="card">' +
      '<div class="tabs">' +
        '<button class="tab" data-tab="reg">法规监测<span class="ai-dot"></span></button>' +
        '<button class="tab" data-tab="chat">薪酬问答<span class="ai-dot"></span></button>' +
        '<button class="tab" data-tab="forecast">成本预测<span class="ai-dot"></span></button>' +
      '</div>' +
      '<div id="ai-tab-body"></div>' +
    '</div>';

  function renderTabs() {
    container.querySelectorAll('.tab').forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-tab') === tab);
    });
  }

  function renderTab() {
    renderTabs();
    const body = document.getElementById('ai-tab-body');
    if (tab === 'reg') renderRegulation(body);
    else if (tab === 'chat') renderChat(body);
    else renderForecast(body);
  }

  /* ---- Tab 1：法规监测 ---- */
  function renderRegulation(body) {
    const cards = DB.ai.regulations.map(function (rg) {
      return '<div class="reg-card">' +
        '<div class="reg-head">' +
          '<span class="badge badge-purple">AI 监测</span>' +
          '<span class="reg-title">' + App.esc(rg.title) + '</span>' +
          App.badge(TONE.regLevelText[rg.level], TONE.regLevel[rg.level]) +
          '<span class="hint-text">' + rg.date + ' · ' + App.esc(rg.country) + ' · ' + rg.id + '</span>' +
        '</div>' +
        '<div class="reg-body">' + App.esc(rg.content) + '</div>' +
        '<div class="reg-line"><span class="k">影响面</span>' + App.esc(rg.impact) + '</div>' +
        '<div class="reg-line"><span class="k">建议动作</span>' + App.esc(rg.action) + '</div>' +
        '<div class="reg-actions">' +
          '<button class="btn btn-sm btn-purple" data-reg-suggest="' + App.esc(rg.id) + '">生成配置变更建议</button>' +
          '<button class="btn btn-sm" data-reg-source="' + App.esc(rg.id) + '">查看原文链接</button>' +
        '</div>' +
      '</div>';
    }).join('');

    body.innerHTML =
      '<div class="hint-text mb16">AI 定时任务每日抓取约 50 国法规信息源，命中薪酬相关变动才推送（无命中静默）。以下为最近命中的监测结果：</div>' +
      cards;

    body.querySelectorAll('button[data-reg-suggest]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        App.toast('配置变更建议草稿已生成（' + btn.getAttribute('data-reg-suggest') + '），已进入 M14 配置审批流待人工确认', 'success');
      });
    });
    body.querySelectorAll('button[data-reg-source]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        App.toast('演示环境未接入外部原文链接，正式版将跳转法规原文出处', 'info');
      });
    });
  }

  /* ---- Tab 2：薪酬问答 ---- */
  function chatBubbles() {
    return chatMsgs.map(function (m) {
      if (m.role === 'user') {
        return '<div class="msg user"><div><div class="msg-who">' + App.esc(m.who || '我') + '</div><div class="bubble">' + App.esc(m.text) + '</div></div></div>';
      }
      return '<div class="msg ai"><div><div class="ai-tag"><span class="badge badge-purple">AI</span>薪酬问答助手</div><div class="bubble">' + App.esc(m.text) + '</div></div></div>';
    }).join('');
  }

  function renderChat(body) {
    body.innerHTML =
      '<div class="chat-box" id="chat-box">' + chatBubbles() + '</div>' +
      '<div class="chat-input-bar">' +
        '<input id="chat-input" type="text" placeholder="请输入问题，如：13薪什么时候发？ / 为什么这个月工资少了？ / 汇率是怎么折算的？">' +
        '<button class="btn btn-primary" id="chat-send">发送</button>' +
      '</div>';

    const box = document.getElementById('chat-box');
    box.scrollTop = box.scrollHeight;

    function send() {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      chatMsgs.push({ role: 'user', who: '我（演示账号）', text: text });
      box.insertAdjacentHTML('beforeend',
        '<div class="msg user"><div><div class="msg-who">我（演示账号）</div><div class="bubble">' + App.esc(text) + '</div></div></div>');
      box.scrollTop = box.scrollHeight;
      const reply = aiReply(text);
      setTimeout(function () {
        chatMsgs.push({ role: 'ai', text: reply });
        box.insertAdjacentHTML('beforeend',
          '<div class="msg ai"><div><div class="ai-tag"><span class="badge badge-purple">AI</span>薪酬问答助手</div><div class="bubble">' + App.esc(reply) + '</div></div></div>');
        box.scrollTop = box.scrollHeight;
      }, 450);
    }

    document.getElementById('chat-send').addEventListener('click', send);
    document.getElementById('chat-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') send();
    });
  }

  /* ---- Tab 3：成本预测 ---- */
  function renderForecast(body) {
    const f = DB.ai.forecast;
    const rows = f.rows.map(function (r) {
      return '<tr>' +
        '<td>' + App.esc(r.country) + '</td>' +
        '<td class="ta-r num">' + r.cur + '</td>' +
        '<td class="ta-r num">' + r.m1 + '</td>' +
        '<td class="ta-r num">' + r.m2 + '</td>' +
        '<td class="ta-r num">' + r.m3 + '</td>' +
        '<td class="ta-c">' + App.badge(TONE.trend[r.trend], TONE.trendTone[r.trend]) + '</td>' +
        '<td class="hint-text">' + App.esc(r.note) + '</td>' +
      '</tr>';
    }).join('');

    const srows = f.sensitivity.rows.map(function (r) {
      const isBase = r.s.indexOf('基准') === 0;
      return '<tr' + (isBase ? ' style="background:#F0F5FF"' : '') + '>' +
        '<td><b>' + App.esc(r.s) + '</b></td>' +
        '<td class="ta-r num">' + r.v + '</td>' +
        '<td class="ta-r num">' + App.esc(r.delta) + '</td>' +
        '<td class="hint-text">' + App.esc(r.note) + '</td>' +
      '</tr>';
    }).join('');

    body.innerHTML =
      '<div class="hint-text mb16">基于历史确认成本、在途名单与已知异动，输出未来 3 个月滚动预测（12 / 1 / 2 月）；13薪 与年终奖季节项已纳入模型。</div>' +
      '<div class="table-wrap"><table class="table"><thead><tr>' +
        '<th>国家</th><th class="ta-r">本月实际</th><th class="ta-r">预测 M+1（12月）</th><th class="ta-r">预测 M+2（1月）</th><th class="ta-r">预测 M+3（2月）</th><th class="ta-c">趋势</th><th>备注</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="section-title">汇率敏感性分析</div>' +
      '<div class="hint-text mb16">' + App.esc(f.sensitivity.note) + '</div>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>情景</th><th class="ta-r">预测总额</th><th class="ta-r">较基准</th><th>说明</th></tr></thead><tbody>' + srows + '</tbody></table></div>';
  }

  container.querySelectorAll('.tab').forEach(function (t) {
    t.addEventListener('click', function () {
      tab = t.getAttribute('data-tab');
      renderTab();
    });
  });

  renderTab();
};

/** 薪酬问答脚本化回复 */
function aiReply(text) {
  const t = String(text).toLowerCase();

  const has13 = t.indexOf('13薪') >= 0 || t.indexOf('13º') >= 0 || t.indexOf('13°') >= 0 ||
    t.indexOf('décimo') >= 0 || t.indexOf('13th') >= 0;
  const salaryWord = t.indexOf('工资') >= 0 || t.indexOf('薪水') >= 0 || t.indexOf('salary') >= 0 || t.indexOf('salário') >= 0 || t.indexOf('pagamento') >= 0;
  const diffWord = t.indexOf('少') >= 0 || t.indexOf('多发') >= 0 || t.indexOf('为什么') >= 0 || t.indexOf('差异') >= 0 ||
    t.indexOf('why') >= 0 || t.indexOf('diferen') >= 0 || t.indexOf('变化') >= 0;
  const fxWord = t.indexOf('汇率') >= 0 || t.indexOf('折算') >= 0 || t.indexOf('exchange') >= 0 || t.indexOf('câmbio') >= 0;

  if (has13) {
    return '关于 13薪 的计算与发放规则说明如下：\n\n1. 适用范围：越南、菲律宾、印尼、泰国、马来西亚、巴西等国有法定或惯例 13薪；美国 bi-weekly 薪制不适用。\n2. 计算口径：13薪 = 月基本工资 × 1；中途入离职按实际计薪月数比例折算。\n3. 拆分发放：菲律宾惯例上下半年各发放 50%；巴西分两期（第一期随 11 月工资，第二期 12 月 20 日前）。\n\n引用示例（2026-11 周期 · 越南）：\n· 员工 Nguyễn Minh Anh 工资单含 13薪 VND 52,000,000（= 月基本工资）\n\n如需查询您本人的 13薪 金额与发放时点，请告知您的工号，我将引用您的工资单数据回答。';
  }
  if (salaryWord && diffWord) {
    return '关于本期与上期工资差异的逐项解释（基于工资单数据）：\n\n1. 新入职比例工资：首月按计薪天数 / 当月天数比例计算，通常低于标准月薪；\n2. Retro 追溯补差：调薪生效日早于当期时，差额以独立行项目补发（示例：越南员工 Nguyễn Thị Lan 10 月生效调薪，11 月补差 VND 34,900,000）；\n3. 汇率影响的补贴折算：本币定价补贴（如电脑补贴 ¥90/月）按当月度汇率折算当地币，汇率波动会导致该项小幅变化；\n4. 13薪预付：适用国家会在规定月份出现一次性 13薪 项目（如巴西 11 月含第一期 50%）。\n\n若核对后仍有疑问，我将为您转人工工单（预计 1 个工作日内响应），专员会收到附带差异分析的工单。';
  }
  if (fxWord) {
    return '关于月度汇率折算口径的说明：\n\n1. 汇率来源：每月一套月度汇率（币种对 × 月份唯一），来源与取值日由财务口径统一指定（如上月末中间价），月内统一、不逐日波动；\n2. 应用场景：本币定价补贴折算（电脑补贴 ¥90/月 × 当月汇率）、成本折算人民币、Oracle 凭证折算；\n3. 审核阈值：汇率相关项比对差异阈值默认 0.5%，超出触发人工核对。\n\n示例：2026-11 月度汇率 1 CNY = 3,520 VND，电脑补贴 ¥90 折算为 VND 316,800，与供应商账单值比对。';
  }
  return '您好，您咨询的问题涉及个案具体情况，为保证准确性，我已为您创建人工工单（编号 SR-2026-' + Math.floor(1000 + Math.random() * 9000) + '），海外薪酬专员将在 1 个工作日内与您联系。\n\n您也可以补充说明具体情况（如所在国家、工资周期），我会先为您做初步分析。\n\n小提示：我可以直接回答这些常见问题——13薪规则、工资单差异解释（新入职比例工资 / retro 补差 / 汇率折算）、月度汇率折算口径。';
}

/* ============================================================
 * 11. 资金支付（#/payments）
 * ============================================================ */
Pages.payments = function (container) {

  function stats() {
    const list = DB.payments;
    const pendingAuth = list.filter(function (p) { return p.auth === '待授权'; }).length;
    const pendingSend = list.filter(function (p) { return p.payStatus === '待发送'; }).length;
    const executedCNY = list.filter(function (p) { return p.payStatus === '已执行'; })
      .reduce(function (s, p) { return s + p.cny; }, 0);
    return { total: list.length, pendingAuth: pendingAuth, pendingSend: pendingSend, executedCNY: executedCNY };
  }

  function render() {
    const st = stats();

    const cols = [
      { label: '指令编号', render: function (r) { return '<b>' + App.esc(r.id) + '</b>'; } },
      { label: '国家', render: function (r) { return App.esc(r.country); } },
      { label: '主体', render: function (r) { return App.esc(r.entity); } },
      { label: '业务模式', cls: 'ta-c', render: function (r) { return App.badge(r.mode, TONE.mode[r.mode]); } },
      { label: '金额（当地币）', cls: 'ta-r', render: function (r) { return '<span class="num">' + App.money(r.amount, r.currency) + '</span><span class="code-note">≈ ' + App.money(r.cny, 'CNY') + '</span>'; } },
      { label: '收款方', render: function (r) { return App.esc(r.payee); } },
      { label: '授权状态', cls: 'ta-c', render: function (r) { return App.badge(r.auth, TONE.payAuth[r.auth]); } },
      { label: '支付状态', cls: 'ta-c', render: function (r) { return App.badge(r.payStatus, TONE.payStatus[r.payStatus]); } },
      { label: '操作', cls: 'ta-c', render: function (r) {
          if (r.auth === '待授权') return '<button class="btn btn-sm btn-primary" data-act="auth" data-id="' + App.esc(r.id) + '">资金授权</button>';
          if (r.payStatus === '失败') return '<button class="btn btn-sm btn-danger" data-act="retry" data-id="' + App.esc(r.id) + '">重试</button>';
          return '<span class="hint-text">—</span>';
        } }
    ];

    const eorCols = [
      { label: '主体', render: function (r) { return '<b>' + App.esc(r.entity) + '</b>'; } },
      { label: '账单服务费', cls: 'ta-r', render: function (r) { return '<span class="num">' + App.money(r.billFee, r.cur) + '</span>'; } },
      { label: '账单实发薪酬', cls: 'ta-r', render: function (r) { return '<span class="num">' + App.money(r.billNet, r.cur) + '</span>'; } },
      { label: '账单当地税费', cls: 'ta-r', render: function (r) { return '<span class="num">' + App.money(r.billTax, r.cur) + '</span>'; } },
      { label: '账单合计', cls: 'ta-r', render: function (r) { return '<span class="num"><b>' + App.money(r.billFee + r.billNet + r.billTax, r.cur) + '</b></span>'; } },
      { label: '系统记录合计', cls: 'ta-r', render: function (r) { return '<span class="num"><b>' + App.money(r.sysFee + r.sysNet + r.sysTax, r.cur) + '</b></span>'; } },
      { label: '勾稽结论', cls: 'ta-c', render: function (r) { return App.badge(r.conclusion, TONE.eorCheck[r.conclusion]); } },
      { label: '操作', cls: 'ta-c', render: function (r, i) {
          return r.conclusion === '一致'
            ? '<span class="hint-text">—</span>'
            : '<button class="btn btn-sm btn-purple" data-act="eorletter" data-i="' + i + '">生成对账差异函</button>';
        } }
    ];

    container.innerHTML =
      '<div class="kpi-grid">' +
        '<div class="kpi-card"><div class="kpi-icon blue"><svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/></svg></div>' +
          '<div><div class="kpi-label">本月支付指令数</div><div class="kpi-value">' + st.total + '</div><div class="kpi-trend">模式A 4 · 模式B 2 · 模式C 4</div></div></div>' +
        '<div class="kpi-card"><div class="kpi-icon orange"><svg viewBox="0 0 24 24"><path d="M12 3l8 2v6c0 5-3.5 7.8-8 9-4.5-1.2-8-4-8-9V5z"/><path d="M8.8 12l2.2 2.2L15.5 9.5"/></svg></div>' +
          '<div><div class="kpi-label">待授权笔数</div><div class="kpi-value orange">' + st.pendingAuth + '</div><div class="kpi-trend">资金授权后进入待发送队列</div></div></div>' +
        '<div class="kpi-card"><div class="kpi-icon green"><svg viewBox="0 0 24 24"><path d="M4 12h13M13 6l6 6-6 6"/></svg></div>' +
          '<div><div class="kpi-label">待发送笔数</div><div class="kpi-value green">' + st.pendingSend + '</div><div class="kpi-trend">已授权 · 待银行通道执行</div></div></div>' +
        '<div class="kpi-card"><div class="kpi-icon red"><svg viewBox="0 0 24 24"><line x1="2" y1="20" x2="22" y2="20"/><rect x="4" y="10" width="4" height="10"/><rect x="10" y="5" width="4" height="15"/><rect x="16" y="13" width="4" height="7"/></svg></div>' +
          '<div><div class="kpi-label">已执行金额（折算 ¥）</div><div class="kpi-value">' + App.money(st.executedCNY, '') + '</div><div class="kpi-trend">按 2026-11 月度汇率折算</div></div></div>' +
      '</div>' +

      '<div class="card">' +
        '<div class="card-title"><span><span class="title-bar"></span>支付指令</span><span class="title-sub">模式A/B = 当地工资账户或供应商代付账户 · 模式C = EOR 账单付款</span></div>' +
        '<div id="pay-table"></div>' +
      '</div>' +

      '<div class="card">' +
        '<div class="card-title"><span><span class="title-bar"></span>EOR 账单三要素核对</span><span class="title-sub">模式C 专属 · 勾稽口径：账单 = 服务费 + 实发薪酬 + 当地税费</span></div>' +
        '<div id="eor-table"></div>' +
      '</div>';

    document.getElementById('pay-table').innerHTML = App.table(cols, DB.payments, {
      rowCls: function (r) { return r.payStatus === '失败' ? 'row-danger' : ''; }
    });
    document.getElementById('eor-table').innerHTML = App.table(eorCols, DB.paymentsEor, {
      rowCls: function (r) { return r.conclusion === '一致' ? '' : 'row-danger'; }
    });

    /* 操作：资金授权 / 重试 / 生成对账差异函 */
    container.querySelectorAll('button[data-act]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const act = btn.getAttribute('data-act');
        if (act === 'auth') {
          const p = DB.payments.find(function (x) { return x.id === btn.getAttribute('data-id'); });
          if (!p) return;
          p.auth = '已授权';
          App.toast('支付指令 ' + p.id + '（' + p.entity + '）资金授权完成，已进入待发送队列', 'success');
          render();
        } else if (act === 'retry') {
          const p = DB.payments.find(function (x) { return x.id === btn.getAttribute('data-id'); });
          if (!p) return;
          p.payStatus = '已发送';
          App.toast('支付指令 ' + p.id + ' 重试成功，已重新发送至银行通道', 'success');
          render();
        } else if (act === 'eorletter') {
          openEorLetterModal(DB.paymentsEor[Number(btn.getAttribute('data-i'))]);
        }
      });
    });
  }

  render();
};

/** EOR 对账差异函预览弹窗 */
function openEorLetterModal(r) {
  const billTotal = r.billFee + r.billNet + r.billTax;
  const sysTotal = r.sysFee + r.sysNet + r.sysTax;
  const diff = billTotal - sysTotal;
  const body =
    '收件人：' + r.entity + ' · 账单对接人\n' +
    '主题：【对账差异函】2026-11 周期 EOR 账单三要素核对差异确认\n\n' +
    '您好：\n\n' +
    '我方对贵司 2026-11 周期 EOR 账单完成三要素勾稽核对，发现以下差异需贵司确认：\n\n' +
    '一、账单三要素（贵司账单口径）\n' +
    '  · 服务费：' + App.money(r.billFee, r.cur) + '\n' +
    '  · 实发薪酬：' + App.money(r.billNet, r.cur) + '\n' +
    '  · 当地税费：' + App.money(r.billTax, r.cur) + '\n' +
    '  · 账单合计：' + App.money(billTotal, r.cur) + '\n\n' +
    '二、系统记录（我方确认版口径）\n' +
    '  · 服务费：' + App.money(r.sysFee, r.cur) + '\n' +
    '  · 实发薪酬：' + App.money(r.sysNet, r.cur) + '\n' +
    '  · 当地税费：' + App.money(r.sysTax, r.cur) + '\n' +
    '  · 系统合计：' + App.money(sysTotal, r.cur) + '\n\n' +
    '三、差异：' + (diff > 0 ? '多计' : '少计') + ' ' + App.money(Math.abs(diff), r.cur) +
    '（勾稽结论：' + r.conclusion + '）\n\n' +
    '请贵司在 2 个工作日内核实服务费取值是否符合合同约定费率口径，并回复修正版账单（声明被替代版本）。\n\n' +
    '随函附：账单三要素核对表、支付指令明细。\n\n' +
    '顺颂商祺\n锐捷网络 海外薪酬团队\n2026-11-23';

  App.modal({
    title: '对账差异函预览 · ' + r.entity,
    width: 720,
    body: '<pre class="letter-pre">' + App.esc(body) + '</pre>',
    footer: '<button class="btn" id="eorletter-close">关闭</button><button class="btn btn-primary" id="eorletter-send">发送给 EOR</button>'
  });
  document.getElementById('eorletter-close').addEventListener('click', App.closeOverlay);
  document.getElementById('eorletter-send').addEventListener('click', function () {
    App.closeOverlay();
    App.toast('对账差异函已发送至 ' + r.entity + '，要求 2 个工作日内回复修正版账单', 'success');
  });
}

/* ============================================================
 * 12. 总账凭证（#/vouchers）
 * ============================================================ */
Pages.vouchers = function (container) {

  function render() {
    const list = DB.vouchers;
    const pushed = list.filter(function (v) { return v.pushStatus === '已推送'; }).length;
    const receipt = list.filter(function (v) { return v.pushStatus === '已回执'; });
    const receiptLatest = receipt.length ? receipt[receipt.length - 1].oracleNo : '—';
    const abnormal = list.filter(function (v) { return v.checkStatus === '不一致'; }).length;

    const cols = [
      { label: '凭证号', render: function (r) { return '<b>' + App.esc(r.id) + '</b>'; } },
      { label: '周期', cls: 'ta-c', render: function (r) { return r.period; } },
      { label: '国家', render: function (r) { return App.esc(r.country); } },
      { label: '主体', render: function (r) { return App.esc(r.entity); } },
      { label: '分录笔数', cls: 'ta-c', render: function (r) { return r.entries.length + ' 笔'; } },
      { label: '本位币金额', cls: 'ta-r', render: function (r) {
          const total = r.entries.filter(function (e) { return e.dc === '借'; })
            .reduce(function (s, e) { return s + e.amount; }, 0);
          return '<span class="num"><b>' + App.money(total, 'CNY') + '</b></span>';
        } },
      { label: '推送状态', cls: 'ta-c', render: function (r) {
          return App.badge(r.pushStatus, TONE.pushStatus[r.pushStatus]) +
            (r.oracleNo ? '<span class="code-note">' + App.esc(r.oracleNo) + '</span>' : '');
        } },
      { label: '勾稽状态', cls: 'ta-c', render: function (r) { return App.badge(r.checkStatus, TONE.vchCheck[r.checkStatus]); } },
      { label: '操作', cls: 'ta-c', render: function (r) {
          if (r.pushStatus === '已回执') return '<span class="hint-text">已入账</span>';
          if (r.pushStatus === '已推送') return '<span class="btn btn-sm" disabled>已推送</span>';
          return '<button class="btn btn-sm btn-primary" data-push="' + App.esc(r.id) + '">推送 Oracle</button>';
        } }
    ];

    container.innerHTML =
      '<div class="card">' +
        '<div class="stat-strip">' +
          '<div class="stat-cell"><div class="sl">本月凭证数</div><div class="sv">' + list.length + ' 张</div></div>' +
          '<div class="stat-cell"><div class="sl">已推送</div><div class="sv blue">' + pushed + ' 张</div></div>' +
          '<div class="stat-cell"><div class="sl">已回执（Oracle 凭证号）</div><div class="sv green">' + receipt.length + ' 张</div><div class="hint-text">最新回执：' + App.esc(receiptLatest) + '</div></div>' +
          '<div class="stat-cell"><div class="sl">勾稽异常数</div><div class="sv red">' + abnormal + ' 张</div></div>' +
        '</div>' +
        '<div class="hint-text mt8">勾稽口径：凭证借贷分录合计与确认版账单总额（按月度汇率折算）比对，不一致禁止推送 Oracle；点击行查看凭证分录预览。</div>' +
      '</div>' +
      '<div class="card">' +
        '<div class="card-title"><span><span class="title-bar"></span>总账凭证列表</span><span class="title-sub">周期 2026-11 · 本位币人民币 · 借贷平衡校验通过</span></div>' +
        '<div id="vch-table"></div>' +
      '</div>';

    const el = document.getElementById('vch-table');
    el.innerHTML = App.table(cols, list, {
      rowClick: true,
      rowCls: function (r) { return r.checkStatus === '不一致' ? 'row-danger' : ''; }
    });

    /* 推送 Oracle */
    el.querySelectorAll('button[data-push]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const v = list.find(function (x) { return x.id === btn.getAttribute('data-push'); });
        if (!v) return;
        if (v.checkStatus === '不一致') {
          App.toast('勾稽不一致，禁止推送（' + v.id + '：' + (v.checkNote || '凭证与确认账单金额不一致') + '）', 'error');
          return;
        }
        v.pushStatus = '已推送';
        App.toast('凭证 ' + v.id + ' 已推送 Oracle，等待回执...', 'info');
        render();
        setTimeout(function () {
          v.pushStatus = '已回执';
          v.oracleNo = 'ORA-' + Math.floor(100000 + Math.random() * 900000);
          App.toast('Oracle 回执：凭证 ' + v.id + ' 入账成功，凭证号 ' + v.oracleNo + ' 已回写', 'success');
          render();
        }, 900);
      });
    });

    /* 行点击 → 凭证预览 */
    el.addEventListener('click', function (e) {
      if (e.target.closest('button')) return;
      const tr = e.target.closest('tr[data-idx]');
      if (!tr) return;
      openVoucherModal(list[Number(tr.getAttribute('data-idx'))]);
    });
  }

  render();
};

/** 凭证预览弹层（借贷分录明细） */
function openVoucherModal(v) {
  const rows = v.entries.map(function (en) {
    return '<tr>' +
      '<td class="ta-c">' + (en.dc === '借' ? App.badge('借', 'primary') : App.badge('贷', 'warning')) + '</td>' +
      '<td>' + App.esc(en.account) + '</td>' +
      '<td class="ta-r num">' + App.money(en.amount, 'CNY') + '</td>' +
      '<td class="hint-text">' + App.esc(en.note || '') + '</td>' +
    '</tr>';
  }).join('');
  const debit = v.entries.filter(function (en) { return en.dc === '借'; }).reduce(function (s, en) { return s + en.amount; }, 0);
  const credit = v.entries.filter(function (en) { return en.dc === '贷'; }).reduce(function (s, en) { return s + en.amount; }, 0);

  App.modal({
    title: '凭证预览 · ' + v.id,
    width: 720,
    body:
      '<div class="detail-grid">' +
        '<div class="detail-item"><div class="dl">周期 / 国家 / 主体</div><div class="dv">' + v.period + ' · ' + App.esc(v.country) + ' · ' + App.esc(v.entity) + '</div></div>' +
        '<div class="detail-item"><div class="dl">推送状态</div><div class="dv">' + App.badge(v.pushStatus, TONE.pushStatus[v.pushStatus]) + (v.oracleNo ? ' <span class="code-note">' + App.esc(v.oracleNo) + '</span>' : '') + '</div></div>' +
        '<div class="detail-item"><div class="dl">勾稽状态</div><div class="dv">' + App.badge(v.checkStatus, TONE.vchCheck[v.checkStatus]) + '</div></div>' +
        '<div class="detail-item"><div class="dl">借贷平衡</div><div class="dv">借 ' + App.money(debit, 'CNY') + ' = 贷 ' + App.money(credit, 'CNY') + '</div></div>' +
      '</div>' +
      (v.checkNote ? '<div class="hint-text mt8" style="color:#F5222D">' + App.esc(v.checkNote) + '</div>' : '') +
      '<div class="table-wrap mt16"><table class="table"><thead><tr>' +
        '<th class="ta-c">方向</th><th>会计科目</th><th class="ta-r">金额（¥）</th><th>摘要</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="hint-text mt8">折算汇率：按 2026-11 月度汇率折算本位币（' + App.esc(DB.meta.fx) + '）。差异科目规则：折算尾差计入「汇兑损益-薪酬折算差」；Retro 追溯补差计入「薪酬费用-追溯调整」；EOR 服务费单列「EOR服务费」科目。</div>',
    footer: '<button class="btn" id="vch-close">关闭</button>'
  });
  document.getElementById('vch-close').addEventListener('click', App.closeOverlay);
}

/* ============================================================
 * 13. 国别配置（#/config）
 * ============================================================ */
Pages.config = function (container) {
  let fCycle = '全部';
  let f13 = '全部';

  const FIELD_MAP = {
    '薪制默认': 'payCycle',
    '最低工资': 'minWage',
    '社保费率': 'ssRate',
    '个税申报频率': 'pitFreq',
    '多付款冲抵上限': 'offsetCap',
    '13薪规则': 'rule13',
    'RSU 税务处理': 'rsuTax'
  };

  function visibleRows() {
    return DB.countryConfigs.filter(function (c) {
      const cycleLabel = c.payCycle === 'MONTHLY' ? '月薪' : 'bi-weekly';
      const ok13 = f13 === '全部' || (f13 === '有' ? c.has13 : !c.has13);
      return (fCycle === '全部' || cycleLabel === fCycle) && ok13;
    });
  }

  function render() {
    const cols = [
      { label: '国家', render: function (r) { return '<b>' + App.esc(r.country) + '</b>'; } },
      { label: '薪制', cls: 'ta-c', render: function (r) {
          return r.payCycle === 'MONTHLY' ? '<span class="badge badge-plain">月薪</span>' : '<span class="badge badge-plain">bi-weekly</span>';
        } },
      { label: '13薪', cls: 'ta-c', render: function (r) {
          return r.has13
            ? '<span class="badge badge-success">有</span><span class="code-note">' + App.esc(r.rule13.split('（')[0]) + '</span>'
            : '<span class="badge badge-gray">无</span>';
        } },
      { label: '最低工资', render: function (r) { return '<span class="hint-text">' + App.esc(r.minWage) + '</span>'; } },
      { label: '社保费率', render: function (r) { return App.esc(r.ssRate); } },
      { label: '个税申报频率', cls: 'ta-c', render: function (r) { return App.esc(r.pitFreq); } },
      { label: '年度申报', render: function (r) { return '<span class="hint-text">' + App.esc(r.annualFiling) + '</span>'; } },
      { label: '冲抵上限', cls: 'ta-c', render: function (r) {
          return r.offsetCap.indexOf('20%') === 0 ? App.badge(r.offsetCap, 'warning') : App.esc(r.offsetCap);
        } },
      { label: '员工语言', cls: 'ta-c', render: function (r) { return App.esc(r.lang); } },
      { label: '版本', cls: 'ta-c', render: function (r) {
          return '<span class="badge badge-plain">' + App.esc(r.version) + '</span><span class="code-note">' + r.effDate + ' 生效</span>';
        } },
      { label: '操作', cls: 'ta-c', render: function () { return '<span class="btn btn-sm">查看配置</span>'; } }
    ];

    container.innerHTML =
      '<div style="background:#F0F5FF;border:1px solid #ADC6FF;border-radius:8px;padding:12px 16px;margin-bottom:16px;font-size:13.5px;font-weight:500;color:#1D39C4">一切国别规则进配置不进代码 · 新增国家 = 新增配置包 + 日历模板，零代码发布</div>' +
      '<div class="card">' +
        '<div class="card-title"><span><span class="title-bar"></span>国别配置包</span><span class="title-sub">10 国配置 · 点击行查看完整配置（薪制 / 个税 / 社保 / 工资 / 冲抵 / 合同 / 汇率 / 语言 / 股权 / EOR）</span></div>' +
        '<div class="filter-bar">' +
          App.filterSelect('cfg-f-cycle', '薪制', ['全部', '月薪', 'bi-weekly'], '全部') +
          App.filterSelect('cfg-f-13', '13薪', ['全部', '有', '无'], '全部') +
          '<span class="filter-count" id="cfg-count"></span>' +
        '</div>' +
        '<div id="cfg-table"></div>' +
      '</div>';

    const el = document.getElementById('cfg-table');
    el.innerHTML = App.table(cols, visibleRows(), { rowClick: true });
    document.getElementById('cfg-count').textContent = '共 ' + visibleRows().length + ' 个配置包';

    document.getElementById('cfg-f-cycle').addEventListener('change', function (e) { fCycle = e.target.value; render(); });
    document.getElementById('cfg-f-13').addEventListener('change', function (e) { f13 = e.target.value; render(); });

    el.addEventListener('click', function (e) {
      const tr = e.target.closest('tr[data-idx]');
      if (!tr) return;
      openConfigDrawer(visibleRows()[Number(tr.getAttribute('data-idx'))], FIELD_MAP);
    });
  }

  render();
};

/** 配置详情抽屉（分组展示全部配置 + 发起配置变更） */
function openConfigDrawer(c, fieldMap) {
  const groups = [
    { title: '薪制', items: [
      ['薪制默认', c.payCycle === 'MONTHLY' ? '月薪（MONTHLY）' : 'bi-weekly（BI_WEEKLY）'],
      ['13薪', c.has13 ? '有 · ' + c.rule13 : '无'],
      ['最低工资', c.minWage]
    ] },
    { title: '个税', items: [
      ['个税申报频率', c.pitFreq],
      ['年度申报类型', c.annualFiling]
    ] },
    { title: '社保', items: [
      ['社保费率（公司 + 个人）', c.ssRate],
      ['双边社保协定国家', c.ssa]
    ] },
    { title: '工资', items: [
      ['最后付薪期限规则', c.finalPay]
    ] },
    { title: '冲抵', items: [
      ['多付款冲抵上限', c.offsetCap]
    ] },
    { title: '合同', items: [
      ['合同要求', c.contractNote]
    ] },
    { title: '汇率', items: [
      ['折算口径', c.fxRule]
    ] },
    { title: '语言', items: [
      ['员工沟通语言', c.lang]
    ] },
    { title: '股权', items: [
      ['RSU 税务处理', c.rsuTax]
    ] },
    { title: 'EOR', items: [
      ['EOR 适用性', c.eor]
    ] }
  ];

  const body = groups.map(function (g) {
    const items = g.items.map(function (it) {
      return '<div class="detail-item"><div class="dl">' + App.esc(it[0]) + '</div><div class="dv">' + App.esc(it[1]) + '</div></div>';
    }).join('');
    return '<div class="section-title">' + App.esc(g.title) + '</div><div class="detail-grid">' + items + '</div>';
  }).join('');

  const ov = App.drawer({
    title: '国别配置 · ' + c.country + '（' + c.version + ' · ' + c.effDate + ' 生效）',
    body: body,
    footer: '<span class="hint-text">当前版本 ' + App.esc(c.version) + ' · 最近生效日 ' + c.effDate + '</span>' +
      '<button class="btn btn-primary" id="btn-cfg-change">发起配置变更</button>',
    width: 660
  });

  ov.querySelector('#btn-cfg-change').addEventListener('click', function () {
    openCfgChangeModal(c, fieldMap);
  });
}

/** 配置变更表单弹窗（字段 / 旧值 / 新值 / 生效日期 / 依据说明） */
function openCfgChangeModal(c, fieldMap) {
  const fieldOptions = Object.keys(fieldMap).map(function (f) {
    return '<option value="' + App.esc(f) + '">' + App.esc(f) + '</option>';
  }).join('');

  const inputStyle = 'width:100%;padding:6px 10px;border:1px solid #DDE3EC;border-radius:6px;font-size:13px;box-sizing:border-box;font-family:inherit;color:#334155;outline:none';

  App.modal({
    title: '发起配置变更 · ' + c.country + '（' + c.version + '）',
    width: 560,
    body:
      '<div class="detail-grid" style="grid-template-columns:1fr">' +
        '<div class="detail-item"><div class="dl">变更字段</div>' +
          '<select id="cfg-chg-field" style="' + inputStyle + '">' + fieldOptions + '</select></div>' +
        '<div class="detail-item"><div class="dl">旧值</div>' +
          '<input id="cfg-chg-old" readonly style="' + inputStyle + ';background:#F8FAFC;color:#64748B"></div>' +
        '<div class="detail-item"><div class="dl">新值</div>' +
          '<input id="cfg-chg-new" placeholder="请输入新值" style="' + inputStyle + '"></div>' +
        '<div class="detail-item"><div class="dl">生效日期</div>' +
          '<input id="cfg-chg-eff" type="date" value="2026-12-01" style="' + inputStyle + '"></div>' +
        '<div class="detail-item"><div class="dl">依据说明</div>' +
          '<textarea id="cfg-chg-reason" rows="3" placeholder="如：越南劳动荣军社会部公告最低工资上调 6%（REG-2026-0828）" style="' + inputStyle + ';resize:vertical"></textarea></div>' +
      '</div>',
    footer: '<button class="btn" id="cfg-chg-cancel">取消</button><button class="btn btn-primary" id="cfg-chg-submit">提交审批</button>'
  });

  const fieldSel = document.getElementById('cfg-chg-field');
  const oldInput = document.getElementById('cfg-chg-old');

  function fillOld() {
    const key = fieldMap[fieldSel.value];
    oldInput.value = String(c[key]);
  }
  fillOld();
  fieldSel.addEventListener('change', fillOld);

  document.getElementById('cfg-chg-cancel').addEventListener('click', App.closeOverlay);
  document.getElementById('cfg-chg-submit').addEventListener('click', function () {
    const nv = document.getElementById('cfg-chg-new').value.trim();
    if (!nv) {
      App.toast('请填写新值后再提交', 'error');
      return;
    }
    const field = fieldSel.value;
    const eff = document.getElementById('cfg-chg-eff').value || '2026-12-01';
    App.closeOverlay();
    App.toast('「' + c.country + '」' + field + ' 变更（' + oldInput.value + ' → ' + nv + '，' + eff + ' 生效）已提交薪酬主管审批', 'success');
  });
}
