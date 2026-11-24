/**
 * 海外薪酬系统（MVP）— 全部 mock 数据
 * 周期统一 2026-11，币种 ISO 4217，日期编码规则：
 *   正数 N(1-31) = 当月 N 日；100+N = 次月 N 日；-N = 月末前 N 天
 */
'use strict';

const DB = {

  meta: {
    period: '2026-11',
    today: '2026-11-23',
    currentUser: '赖泳成',
    fx: '月度汇率：1 CNY = 3,520 VND = 0.135 USD = 0.129 EUR = 0.77 BRL = 11.9 INR'
  },

  /* ================= 工作台 ================= */

  kpi: {
    nodesTotal: 682,      // 本月节点总数
    overdue: 3,           // 逾期节点
    reportsPending: 8,    // 待审账单
    changesPending: 12    // 待确认异动
  },

  /** 11 步月度流程（当前整体进度：第 4 步 审账单） */
  flowSteps: [
    { name: '启发薪', state: 'done' },
    { name: '提异动', state: 'done' },
    { name: '收账单', state: 'done' },
    { name: '审账单', state: 'current' },
    { name: '确账单', state: 'pending' },
    { name: '提工资', state: 'pending' },
    { name: '提个税', state: 'pending' },
    { name: '提社保', state: 'pending' },
    { name: '入账', state: 'pending' },
    { name: '工资单', state: 'pending' },
    { name: '成本', state: 'pending' }
  ],

  /** 节点状态大盘（25 行代表性数据，摘自 50 国约 682 个月度节点） */
  nodes: [
    { country: '美国', entity: 'Ruijie USA Inc.', mode: '模式A', freq: 'bi-weekly', cutoff: '11-09', payday: '11-20', status: '已完成', owner: '赖泳成' },
    { country: '美国', entity: 'Ruijie USA Inc.', mode: '模式A', freq: 'bi-weekly', cutoff: '10-31', payday: '11-11', status: '已完成', owner: '赖泳成' },
    { country: '越南', entity: 'BIPO EOR Vietnam', mode: '模式C', freq: '月薪', cutoff: '11-10', payday: '11-13', status: '已完成', owner: '丁笑冰' },
    { country: '越南', entity: 'Gonex EOR Vietnam', mode: '模式C', freq: '月薪', cutoff: '11-10', payday: '11-13', status: '已完成', owner: '丁笑冰' },
    { country: '德国', entity: 'Ruijie Germany GmbH', mode: '模式A', freq: '月薪', cutoff: '11-10', payday: '12-05', status: '进行中', owner: '高菁' },
    { country: '巴西', entity: 'BIPO EOR Brazil', mode: '模式C', freq: '月薪', cutoff: '11-10', payday: '12-07', status: '进行中', owner: '丁笑冰' },
    { country: '新加坡', entity: 'Ruijie Singapore Pte. Ltd.', mode: '模式B', freq: '月薪', cutoff: '11-12', payday: '12-07', status: '进行中', owner: '赖泳成' },
    { country: '日本', entity: 'Ruijie Japan K.K.', mode: '模式A', freq: '月薪', cutoff: '11-15', payday: '11-30', status: '进行中', owner: '高菁' },
    { country: '菲律宾', entity: 'TMF EOR Philippines', mode: '模式C', freq: '月薪', cutoff: '11-15', payday: '12-08', status: '进行中', owner: '丁笑冰' },
    { country: '印度', entity: 'Gonex EOR India', mode: '模式C', freq: '月薪', cutoff: '11-12', payday: '12-07', status: '进行中', owner: '高菁' },
    { country: '墨西哥', entity: 'Remoly EOR Mexico', mode: '模式C', freq: '月薪', cutoff: '11-15', payday: '12-15', status: '进行中', owner: '赖泳成' },
    { country: '英国', entity: 'Ruijie UK Ltd.', mode: '模式A', freq: '月薪', cutoff: '11-15', payday: '12-25', status: '进行中', owner: '高菁' },
    { country: '印度尼西亚', entity: 'GoGlobal EOR Indonesia', mode: '模式C', freq: '月薪', cutoff: '11-13', payday: '12-08', status: '进行中', owner: '赖泳成' },
    { country: '泰国', entity: 'CCLEE EOR Thailand', mode: '模式C', freq: '月薪', cutoff: '11-15', payday: '12-07', status: '进行中', owner: '丁笑冰' },
    { country: '马来西亚', entity: '悦然国际 EOR Malaysia', mode: '模式C', freq: '月薪', cutoff: '11-14', payday: '12-25', status: '进行中', owner: '高菁' },
    { country: '阿联酋', entity: 'GT EOR UAE', mode: '模式C', freq: '月薪', cutoff: '11-12', payday: '12-25', status: '进行中', owner: '赖泳成' },
    { country: '波兰', entity: 'ICB EOR Poland', mode: '模式C', freq: '月薪', cutoff: '11-10', payday: '11-30', status: '进行中', owner: '高菁' },
    { country: '德国', entity: 'Ruijie Germany GmbH', mode: '模式A', freq: '月薪', cutoff: '11-25', payday: '12-15', status: '进行中', owner: '高菁' },
    { country: '美国', entity: 'Ruijie USA Inc.', mode: '模式A', freq: 'bi-weekly', cutoff: '11-28', payday: '12-09', status: '临期', owner: '赖泳成' },
    { country: '越南', entity: 'BIPO EOR Vietnam', mode: '模式C', freq: '月薪', cutoff: '11-25', payday: '12-05', status: '临期', owner: '丁笑冰' },
    { country: '日本', entity: 'Ruijie Japan K.K.', mode: '模式A', freq: '月薪', cutoff: '11-26', payday: '12-10', status: '临期', owner: '高菁' },
    { country: '巴西', entity: 'BIPO EOR Brazil', mode: '模式C', freq: '月薪', cutoff: '11-26', payday: '12-07', status: '临期', owner: '丁笑冰' },
    { country: '菲律宾', entity: 'TMF EOR Philippines', mode: '模式C', freq: '月薪', cutoff: '11-14', payday: '12-08', status: '逾期', owner: '丁笑冰' },
    { country: '印度', entity: 'Gonex EOR India', mode: '模式C', freq: '月薪', cutoff: '11-12', payday: '12-07', status: '逾期', owner: '高菁' },
    { country: '墨西哥', entity: 'Remoly EOR Mexico', mode: '模式C', freq: '月薪', cutoff: '11-10', payday: '12-15', status: '逾期', owner: '赖泳成' }
  ],

  /* ================= 发薪日历 ================= */

  /** 日历模板（国家 × 主体 × 业务类型），含日期编码解析旁注 */
  calendarTemplates: [
    { country: '美国', entity: 'Ruijie USA Inc.', mode: '模式A', freq: 'bi-weekly', cutoffCode: '-7', cutoffNote: '月末前7天', payCode: '7', payNote: '当月7日', payer: '自有 Payroll', vendor: '当地 Payroll 团队', contact: 'Mike Johnson' },
    { country: '德国', entity: 'Ruijie Germany GmbH', mode: '模式A', freq: '月薪', cutoffCode: '20', cutoffNote: '当月20日', payCode: '105', payNote: '次月5日', payer: '自有 Payroll', vendor: 'TMF Germany', contact: 'Anna Schmidt' },
    { country: '越南', entity: 'BIPO EOR Vietnam', mode: '模式C', freq: '月薪', cutoffCode: '25', cutoffNote: '当月25日', payCode: '105', payNote: '次月5日', payer: 'EOR（BIPO）', vendor: 'BIPO Vietnam', contact: '陈氏梅' },
    { country: '越南', entity: 'Gonex EOR Vietnam', mode: '模式C', freq: '月薪', cutoffCode: '10', cutoffNote: '当月10日', payCode: '113', payNote: '次月13日', payer: 'EOR（Gonex）', vendor: 'Gonex Vietnam', contact: 'Nguyễn Văn Hùng' },
    { country: '巴西', entity: 'BIPO EOR Brazil', mode: '模式C', freq: '月薪', cutoffCode: '23', cutoffNote: '当月23日', payCode: '107', payNote: '次月7日', payer: 'EOR（BIPO）', vendor: 'BIPO Brazil', contact: 'Carlos Silva' },
    { country: '新加坡', entity: 'Ruijie Singapore Pte. Ltd.', mode: '模式B', freq: '月薪', cutoffCode: '25', cutoffNote: '当月25日', payCode: '107', payNote: '次月7日', payer: '代理发薪（knit）', vendor: 'knit Singapore', contact: 'Tan Wei Ming' },
    { country: '日本', entity: 'Ruijie Japan K.K.', mode: '模式A', freq: '月薪', cutoffCode: '25', cutoffNote: '当月25日', payCode: '110', payNote: '次月10日', payer: '自有 Payroll', vendor: 'TMF Japan', contact: '佐藤健一' },
    { country: '菲律宾', entity: 'TMF EOR Philippines', mode: '模式C', freq: '月薪', cutoffCode: '20', cutoffNote: '当月20日', payCode: '108', payNote: '次月8日', payer: 'EOR（TMF）', vendor: 'TMF Philippines', contact: 'Maria Santos' },
    { country: '印度', entity: 'Gonex EOR India', mode: '模式C', freq: '月薪', cutoffCode: '22', cutoffNote: '当月22日', payCode: '107', payNote: '次月7日', payer: 'EOR（Gonex）', vendor: 'Gonex India', contact: 'Priya Menon' },
    { country: '墨西哥', entity: 'Remoly EOR Mexico', mode: '模式C', freq: '月薪', cutoffCode: '20', cutoffNote: '当月20日', payCode: '115', payNote: '次月15日', payer: 'EOR（Remoly）', vendor: 'Remoly Mexico', contact: 'José García' },
    { country: '英国', entity: 'Ruijie UK Ltd.', mode: '模式A', freq: '月薪', cutoffCode: '25', cutoffNote: '当月25日', payCode: '125', payNote: '次月25日', payer: '自有 Payroll', vendor: '内部 Payroll', contact: 'Emma Wilson' },
    { country: '印度尼西亚', entity: 'GoGlobal EOR Indonesia', mode: '模式C', freq: '月薪', cutoffCode: '23', cutoffNote: '当月23日', payCode: '128', payNote: '次月28日', payer: 'EOR（GoGlobal）', vendor: 'GoGlobal Indonesia', contact: 'Dewi Lestari' },
    { country: '泰国', entity: 'CCLEE EOR Thailand', mode: '模式C', freq: '月薪', cutoffCode: '25', cutoffNote: '当月25日', payCode: '107', payNote: '次月7日', payer: 'EOR（CCLEE）', vendor: 'CCLEE Thailand', contact: 'Somchai Jaidee' },
    { country: '马来西亚', entity: '悦然国际 EOR Malaysia', mode: '模式C', freq: '月薪', cutoffCode: '24', cutoffNote: '当月24日', payCode: '125', payNote: '次月25日', payer: 'EOR（悦然国际）', vendor: '悦然国际', contact: 'Lim Chong Wei' },
    { country: '阿联酋', entity: 'GT EOR UAE', mode: '模式C', freq: '月薪', cutoffCode: '-3', cutoffNote: '月末前3天', payCode: '125', payNote: '次月25日', payer: 'EOR（GT）', vendor: 'GT UAE', contact: 'Omar Al-Farsi' }
  ],

  /** 本月提醒计划（即将到期节点） */
  reminders: [
    { node: '菲律宾 · TMF EOR Philippines · 提异动 CutOff', deadline: '2026-11-14 23:59（马尼拉时区）', cfg: 'T-5 / T-3 / T-1 / T-0', status: '逾期' },
    { node: '印度 · Gonex EOR India · 账单回收', deadline: '2026-11-24 18:00', cfg: 'CutOff 后超时 1 天自动催办', status: '进行中' },
    { node: '德国 · Ruijie Germany GmbH · 审账单', deadline: '2026-11-25 18:00', cfg: 'T-3 / T-1', status: '进行中' },
    { node: '日本 · Ruijie Japan K.K. · 提异动 CutOff', deadline: '2026-11-26 23:59（东京时区）', cfg: 'T-5 / T-3 / T-1 / T-0', status: '待触发' },
    { node: '巴西 · BIPO EOR Brazil · 提异动 CutOff', deadline: '2026-11-26 23:59（圣保罗时区）', cfg: 'T-5 / T-3 / T-1 / T-0', status: '待触发' },
    { node: '越南 · BIPO EOR Vietnam · 个税申报', deadline: '2026-12-05 18:00', cfg: 'T-3 / T-1', status: '待触发' },
    { node: '美国 · Ruijie USA Inc. · bi-weekly 发薪', deadline: '2026-12-09', cfg: 'Pay Date 前 3 / 1 / 0 天', status: '待触发' },
    { node: '英国 · Ruijie UK Ltd. · 工资单发放', deadline: '2026-12-22', cfg: 'Pay Date 前 3 天', status: '待触发' }
  ],

  /* ================= 异动管理 ================= */

  changes: [
    {
      id: 'CHG-2026-11-001', emp: 'Nguyễn Minh Anh', country: '越南', entity: 'BIPO EOR Vietnam', type: '入职', source: 'SF邮件',
      eff: '2026-11-01', retro: false, status: '已发放', risk: '无', batch: 'BATCH-2026-11-VN-BIPO-01',
      detail: { 岗位: 'Junior QA Engineer', 月薪: 'VND 52,000,000', 入职日期: '2026-11-01', 发薪主体: 'BIPO EOR Vietnam（模式C）', 备注: '13薪 资格自入职月起按比例计算' },
      timeline: [
        { s: '待确认', t: '2026-11-02 09:12', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-11-02 14:30', who: '丁笑冰' },
        { s: '已提交', t: '2026-11-03 10:05', who: '丁笑冰（批次 BATCH-2026-11-VN-BIPO-01）' },
        { s: '供应商已受理', t: '2026-11-03 15:42', who: 'BIPO · 陈氏梅' },
        { s: '已体现在账单', t: '2026-11-12 11:20', who: '系统 · 账单解析勾稽' },
        { s: '已发放', t: '2026-11-13 09:00', who: 'BIPO（发薪日 09-13）' }
      ]
    },
    {
      id: 'CHG-2026-11-002', emp: '张伟', country: '美国', entity: 'Ruijie USA Inc.', type: '调薪', source: 'SF邮件',
      eff: '2026-10-01', retro: true, status: '已体现在账单', risk: '无', batch: 'BATCH-2026-10-US-01',
      detail: { 调前月薪: 'USD 8,500（bi-weekly $3,923.08）', 调后月薪: 'USD 9,200', 生效日期: '2026-10-01', 口径: 'MONTHLY 月薪口径标注', 备注: '10 月已按旧标准发放，11 月周期生成 RETRO_PAY 补差' },
      timeline: [
        { s: '待确认', t: '2026-10-28 10:02', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-10-28 11:15', who: '赖泳成' },
        { s: '已提交', t: '2026-10-28 16:40', who: '赖泳成（批次 BATCH-2026-10-US-01）' },
        { s: '供应商已受理', t: '2026-10-29 09:20', who: '当地 Payroll · Mike Johnson' },
        { s: '已体现在账单', t: '2026-11-11 14:00', who: '系统 · 账单解析勾稽' }
      ]
    },
    {
      id: 'CHG-2026-11-003', emp: '陈静', country: '德国', entity: 'Ruijie Germany GmbH', type: '离职', source: 'SF邮件',
      eff: '2026-11-15', retro: false, status: '已提交', risk: '中', batch: 'BATCH-2026-11-DE-01',
      detail: { 最后工作日: '2026-11-30', 最后发薪日: '2026-10-05（次月5日）', 未休年假折算: '8 天（折算金额约 EUR 1,960）', 多付款冲抵: '无', 备注: '受德国法定最后付薪期限约束' },
      timeline: [
        { s: '待确认', t: '2026-11-08 08:45', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-11-08 10:30', who: '高菁' },
        { s: '已提交', t: '2026-11-09 09:10', who: '高菁（批次 BATCH-2026-11-DE-01）' }
      ]
    },
    {
      id: 'CHG-2026-11-004', emp: 'Lucas Ferreira', country: '巴西', entity: 'BIPO EOR Brazil', type: '补贴变更', source: 'SF邮件',
      eff: '2026-11-10', retro: false, status: '供应商已受理', risk: '无', batch: 'BATCH-2026-11-BR-BIPO-01',
      detail: { 变更项目: '住房补贴', 调前: 'BRL 1,800 /月', 调后: 'BRL 2,200 /月', 生效日期: '2026-11-10', 备注: '搬迁至圣保罗市区，补贴标准上调' },
      timeline: [
        { s: '待确认', t: '2026-11-05 11:00', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-11-05 15:20', who: '丁笑冰' },
        { s: '已提交', t: '2026-11-06 09:30', who: '丁笑冰（批次 BATCH-2026-11-BR-BIPO-01）' },
        { s: '供应商已受理', t: '2026-11-06 14:05', who: 'BIPO · Carlos Silva' }
      ]
    },
    {
      id: 'CHG-2026-11-005', emp: '山田裕子', country: '日本', entity: 'Ruijie Japan K.K.', type: '调薪', source: 'SF邮件',
      eff: '2026-10-01', retro: true, status: '已发放', risk: '无', batch: 'BATCH-2026-10-JP-01',
      detail: { 调前月薪: 'JPY 680,000', 调后月薪: 'JPY 740,000', 生效日期: '2026-10-01', 备注: '10 月按旧标准发放，11 月周期一次性补发差额' },
      timeline: [
        { s: '待确认', t: '2026-10-10 09:00', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-10-10 10:12', who: '高菁' },
        { s: '已提交', t: '2026-10-10 14:00', who: '高菁（批次 BATCH-2026-10-JP-01）' },
        { s: '供应商已受理', t: '2026-10-11 09:30', who: 'TMF Japan · 佐藤健一' },
        { s: '已体现在账单', t: '2026-11-10 16:00', who: '系统 · 账单解析勾稽' },
        { s: '已发放', t: '2026-11-10 09:00', who: 'TMF Japan' }
      ]
    },
    {
      id: 'CHG-2026-11-006', emp: 'Priya Sharma', country: '印度', entity: 'Gonex EOR India', type: '入职', source: 'SF邮件',
      eff: '2026-11-07', retro: false, status: '待确认', risk: '中', batch: '',
      detail: { 岗位: 'Software Engineer I', 月薪: 'INR 185,000', 入职日期: '2026-11-07', 发薪主体: 'Gonex EOR India（模式C）', 备注: 'CutOff 11-12 前需确认并提交' },
      timeline: [
        { s: '待确认', t: '2026-11-07 10:20', who: '系统 · SF 邮件自动抓取' }
      ]
    },
    {
      id: 'CHG-2026-11-007', emp: '王芳', country: '新加坡', entity: 'Ruijie Singapore Pte. Ltd.', type: '银行账户变更', source: 'SF邮件',
      eff: '2026-11-05', retro: false, status: '已确认', risk: '低', batch: '',
      detail: { 原账户: 'DBS 012-8-XXXXXX（旧）', 新账户: 'UOB 385-3-XXXXXX', 生效日期: '2026-11-05', 备注: '模式B：代理 knit 按异动清单执行，需在下一发薪前提交' },
      timeline: [
        { s: '待确认', t: '2026-11-05 14:22', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-11-06 09:40', who: '赖泳成' }
      ]
    },
    {
      id: 'CHG-2026-11-008', emp: 'José Hernández', country: '墨西哥', entity: 'Remoly EOR Mexico', type: '入职', source: 'SF邮件',
      eff: '2026-11-10', retro: false, status: '待确认', risk: '中', batch: '',
      detail: { 岗位: 'Sales Representative', 月薪: 'MXN 48,000', 入职日期: '2026-11-10', 发薪主体: 'Remoly EOR Mexico（模式C）', 备注: 'CutOff 11-15 前需确认（临期）' },
      timeline: [
        { s: '待确认', t: '2026-11-10 16:05', who: '系统 · SF 邮件自动抓取' }
      ]
    },
    {
      id: 'CHG-2026-11-009', emp: '李婷', country: '德国', entity: 'Ruijie Germany GmbH', type: '外派', source: 'SF邮件',
      eff: '2026-11-01', retro: false, status: '供应商已受理', risk: '无', batch: 'BATCH-2026-11-DE-01',
      detail: { 派出国: '中国（总部）', 派驻国: '德国', 外派起始日: '2026-11-01', 预计结束日: '2027-12-31', 税负平衡: '参与（Tax Equalization）', 备注: '建立双薪酬档案：总部名义工资 + 德国实发' },
      timeline: [
        { s: '待确认', t: '2026-10-25 09:30', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-10-25 11:00', who: '高菁' },
        { s: '已提交', t: '2026-10-26 09:00', who: '高菁（批次 BATCH-2026-11-DE-01）' },
        { s: '供应商已受理', t: '2026-10-26 13:15', who: 'TMF Germany · Anna Schmidt' }
      ]
    },
    {
      id: 'CHG-2026-11-010', emp: 'Anucha Wong', country: '泰国', entity: 'CCLEE EOR Thailand', type: '离职', source: '手工',
      eff: '2026-11-20', retro: false, status: '待确认', risk: '高', batch: '',
      detail: { 最后工作日: '2026-11-20', 最后发薪日: '2026-10-07（次月7日）', 未休年假折算: '5 天', 多付款冲抵: '无', 备注: '来源非 SF 邮件（供应商口头通知手工补录），需补邮件存证' },
      timeline: [
        { s: '待确认', t: '2026-11-13 10:00', who: '丁笑冰 · 手工补录' }
      ]
    },
    {
      id: 'CHG-2026-11-011', emp: 'Emma Thompson', country: '英国', entity: 'Ruijie UK Ltd.', type: '调薪', source: 'SF邮件',
      eff: '2026-11-01', retro: false, status: '已提交', risk: '无', batch: 'BATCH-2026-11-UK-01',
      detail: { 调前月薪: 'GBP 5,200', 调后月薪: 'GBP 5,600', 生效日期: '2026-11-01', 备注: '当期生效调薪，自生效日起分段计算' },
      timeline: [
        { s: '待确认', t: '2026-11-01 09:15', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-11-01 14:00', who: '高菁' },
        { s: '已提交', t: '2026-11-02 10:30', who: '高菁（批次 BATCH-2026-11-UK-01）' }
      ]
    },
    {
      id: 'CHG-2026-11-012', emp: 'Dewi Rahma', country: '印度尼西亚', entity: 'GoGlobal EOR Indonesia', type: '补贴变更', source: '手工',
      eff: '2026-11-12', retro: false, status: '待确认', risk: '中', batch: '',
      detail: { 变更项目: '生活费补贴（COLA）', 调前: 'IDR 3,500,000 /月', 调后: 'IDR 4,000,000 /月', 生效日期: '2026-11-12', 备注: '雅加达生活成本调整，供应商邮件通知手工录入' },
      timeline: [
        { s: '待确认', t: '2026-11-13 11:30', who: '赖泳成 · 手工补录' }
      ]
    },
    {
      id: 'CHG-2026-11-013', emp: 'Michelle Lim', country: '马来西亚', entity: '悦然国际 EOR Malaysia', type: '银行账户变更', source: 'SF邮件',
      eff: '2026-11-08', retro: false, status: '已确认', risk: '低', batch: '',
      detail: { 原账户: 'Maybank 5140-XXXX-XXXX', 新账户: 'CIMB 7601-XXXX-XXXX', 生效日期: '2026-11-08', 备注: '下周期发薪前生效' },
      timeline: [
        { s: '待确认', t: '2026-11-08 09:50', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-11-09 10:10', who: '高菁' }
      ]
    },
    {
      id: 'CHG-2026-11-014', emp: 'Piotr Nowak', country: '波兰', entity: 'ICB EOR Poland', type: '入职', source: 'SF邮件',
      eff: '2026-11-14', retro: false, status: '待确认', risk: '中', batch: '',
      detail: { 岗位: 'Field Application Engineer', 月薪: 'PLN 22,000', 入职日期: '2026-11-14', 发薪主体: 'ICB EOR Poland（模式C）', 备注: '首月按计薪天数比例计算比例工资' },
      timeline: [
        { s: '待确认', t: '2026-11-14 08:30', who: '系统 · SF 邮件自动抓取' }
      ]
    },
    {
      id: 'CHG-2026-11-015', emp: '周雪', country: '巴西', entity: 'BIPO EOR Brazil', type: '外派', source: 'SF邮件',
      eff: '2026-11-01', retro: false, status: '已确认', risk: '中', batch: '',
      detail: { 派出国: '中国（总部）', 派驻国: '巴西', 外派起始日: '2026-11-01', 预计结束日: '2028-08-31', 税负平衡: '参与（Tax Equalization）', 备注: '关注巴西 13薪 与当地个税 IRRF 口径' },
      timeline: [
        { s: '待确认', t: '2026-11-01 10:00', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-11-01 15:40', who: '丁笑冰' }
      ]
    },
    {
      id: 'CHG-2026-11-016', emp: 'Nguyễn Thị Lan', country: '越南', entity: 'BIPO EOR Vietnam', type: '调薪', source: 'SF邮件',
      eff: '2026-10-01', retro: true, status: '供应商已受理', risk: '低', batch: 'BATCH-2026-11-VN-BIPO-01',
      detail: { 调前月薪: 'VND 68,000,000', 调后月薪: 'VND 74,000,000', 生效日期: '2026-10-01', 备注: '10 月已按旧标准发放，11 月周期补发差额（账单差异归因依据）' },
      timeline: [
        { s: '待确认', t: '2026-10-26 09:20', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-10-26 10:05', who: '丁笑冰' },
        { s: '已提交', t: '2026-10-27 10:05', who: '丁笑冰（批次 BATCH-2026-11-VN-BIPO-01）' },
        { s: '供应商已受理', t: '2026-10-27 15:42', who: 'BIPO · 陈氏梅' }
      ]
    },
    {
      id: 'CHG-2026-11-017', emp: 'Trần Văn Bình', country: '越南', entity: 'BIPO EOR Vietnam', type: '补贴变更', source: 'SF邮件',
      eff: '2026-11-01', retro: false, status: '已体现在账单', risk: '中', batch: 'BATCH-2026-11-VN-BIPO-01',
      detail: { 变更项目: '电脑补贴（本币定价）', 标准: 'CNY 90 /月（按月度汇率折算 VND 316,800）', 生效日期: '2026-11-01', 备注: '审账单发现该员工社保个人部分为 0，已生成差异沟通函' },
      timeline: [
        { s: '待确认', t: '2026-11-01 11:00', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-11-01 13:30', who: '丁笑冰' },
        { s: '已提交', t: '2026-11-03 10:05', who: '丁笑冰（批次 BATCH-2026-11-VN-BIPO-01）' },
        { s: '供应商已受理', t: '2026-11-03 15:42', who: 'BIPO · 陈氏梅' },
        { s: '已体现在账单', t: '2026-11-12 11:20', who: '系统 · 账单解析勾稽' }
      ]
    },
    {
      id: 'CHG-2026-11-018', emp: 'Lukas Weber', country: '德国', entity: 'Ruijie Germany GmbH', type: '调薪', source: 'SF邮件',
      eff: '2026-10-16', retro: true, status: '已提交', risk: '低', batch: 'BATCH-2026-11-DE-01',
      detail: { 调前月薪: 'EUR 6,300', 调后月薪: 'EUR 6,900', 生效日期: '2026-10-16', 备注: '追溯区间 10-16 至 10-31，按比例补差并触发税率跳档' },
      timeline: [
        { s: '待确认', t: '2026-11-02 09:40', who: '系统 · SF 邮件自动抓取' },
        { s: '已确认', t: '2026-11-02 10:20', who: '高菁（确认追溯对话框）' },
        { s: '已提交', t: '2026-11-09 09:10', who: '高菁（批次 BATCH-2026-11-DE-01）' }
      ]
    },
    {
      id: 'CHG-2026-11-019', emp: '佐藤美咲', country: '日本', entity: 'Ruijie Japan K.K.', type: '离职', source: 'SF邮件',
      eff: '2026-11-30', retro: false, status: '待确认', risk: '中', batch: '',
      detail: { 最后工作日: '2026-11-30', 最后发薪日: '2026-10-10（次月10日）', 未休年假折算: '3 天', 多付款冲抵: '无', 备注: '离职异动需在 CutOff 11-15 前提交（临期）' },
      timeline: [
        { s: '待确认', t: '2026-11-14 15:10', who: '系统 · SF 邮件自动抓取' }
      ]
    },
    {
      id: 'CHG-2026-11-020', emp: 'Raj Patel', country: '印度', entity: 'Gonex EOR India', type: '调薪', source: '手工',
      eff: '2026-11-16', retro: false, status: '待确认', risk: '中', batch: '',
      detail: { 调前月薪: 'INR 210,000', 调后月薪: 'INR 232,000', 生效日期: '2026-11-16', 备注: '供应商邮件通知的调薪，手工补录，SF 流程后补' },
      timeline: [
        { s: '待确认', t: '2026-11-14 17:25', who: '高菁 · 手工补录' }
      ]
    }
  ],

  /* ================= 外派档案 ================= */

  expat: [
    {
      name: '王强', gid: 'GID-000231', from: '中国', to: '美国',
      start: '2024-03-01', end: '2027-02-28', type: '长期外派',
      home: {
        entity: '锐捷网络（总部）', currency: 'CNY', payFreq: '月薪',
        notional: '¥45,000 /月', hypoTax: '¥9,800 /月', equalization: true,
        note: '名义工资为税负平衡基准'
      },
      host: {
        entity: 'Ruijie USA Inc.', currency: 'USD', payFreq: 'bi-weekly',
        gross: '$11,800 /月', net: '$8,200 /月',
        allowances: '住房 $2,000 · 生活费 $800 · 电脑补贴 $12.64（¥90×当月汇率）',
        tax: '$2,150 /月（联邦+州）', ss: '$620 /月（FICA）'
      },
      settlement: {
        caption: '税负平衡结算表（Tax Equalization Settlement · 2026-11）',
        rows: [
          { label: '名义工资（总部口径）', value: '¥45,000 /月', kind: 'calc' },
          { label: '减：假设税（Hypothetical Tax）', value: '¥9,800 /月', kind: 'calc' },
          { label: '平衡后可得（Notional Net）', value: '¥35,200 /月', kind: 'result' },
          { label: '折算美元（月度汇率 1 USD = 7.12 CNY）', value: '$4,944 /月', kind: 'calc' },
          { label: '派驻国实发 + 公司承担税负部分', value: '$4,890 /月', kind: 'calc' },
          { label: '差额（Equalization 多退少补，公司补付）', value: '+$54 /月', kind: 'diff' }
        ]
      }
    },
    {
      name: '李婷', gid: 'GID-000487', from: '中国', to: '德国',
      start: '2025-01-01', end: '2027-12-31', type: '长期外派',
      home: {
        entity: '锐捷网络（总部）', currency: 'CNY', payFreq: '月薪',
        notional: '¥38,000 /月', hypoTax: '¥7,600 /月', equalization: true,
        note: '外派异动 CHG-2026-11-009 于 2026-11-01 生效'
      },
      host: {
        entity: 'Ruijie Germany GmbH', currency: 'EUR', payFreq: '月薪',
        gross: '€6,300 /月', net: '€3,980 /月',
        allowances: '住房 €1,200 · 生活费 €450 · 子女教育 €300 · 电脑补贴 €11.6（¥90×当月汇率）',
        tax: '€1,420 /月（Lohnsteuer）', ss: '€1,170 /月（个人部分）'
      },
      settlement: null
    },
    {
      name: 'Michael Chen', gid: 'GID-000712', from: '美国', to: '日本',
      start: '2025-06-01', end: '2027-05-31', type: '长期外派',
      home: {
        entity: 'Ruijie USA Inc.', currency: 'USD', payFreq: 'bi-weekly',
        notional: '$13,500 /月', hypoTax: '$3,820 /月', equalization: true,
        note: '美方名义工资，按总部口径平衡'
      },
      host: {
        entity: 'Ruijie Japan K.K.', currency: 'JPY', payFreq: '月薪',
        gross: '¥1,850,000 /月', net: '¥1,320,000 /月',
        allowances: '住房 ¥280,000 · 生活费 ¥90,000 · 电脑补贴 ¥1,395（¥90×当月汇率）',
        tax: '¥310,000 /月（所得税+住民税）', ss: '¥180,000 /月（健康+年金）'
      },
      settlement: null
    },
    {
      name: '赵磊', gid: 'GID-000834', from: '中国', to: '新加坡',
      start: '2026-07-01', end: '2027-06-30', type: '短期外派（1年）',
      home: {
        entity: '锐捷网络（总部）', currency: 'CNY', payFreq: '月薪',
        notional: '¥32,000 /月', hypoTax: '¥5,900 /月', equalization: false,
        note: '短期外派不参与税负平衡，按派驻国口径据实'
      },
      host: {
        entity: 'Ruijie Singapore Pte. Ltd.', currency: 'SGD', payFreq: '月薪',
        gross: 'S$7,800 /月', net: 'S$6,950 /月',
        allowances: '住房 S$2,600 · 生活费 S$700 · 电脑补贴 S$16.6（¥90×当月汇率）',
        tax: 'S$320 /月（IRAS 预估）', ss: 'S$0（外国人不缴 CPF）'
      },
      settlement: null
    }
  ],

  /* ================= 账单中心 ================= */

  reports: [
    {
      id: 'BILL-2026-11-VN-01', period: '2026-11', country: '越南', entity: 'BIPO EOR Vietnam', vendor: 'BIPO',
      version: 'V2', total: 1856400000, currency: 'VND', headcount: 28, receivedAt: '2026-11-12 10:32',
      aiSummary: '3 处差异：1 项合理 / 2 项疑似异常', status: '待审核',
      file: 'BIPO_VN_Payroll_202611_V2.xlsx', fileNote: '修正版 V2，声明替代 V1（V1 头数统计口径错误）',
      dims: [
        { dim: '总额', base: 1821500000, report: 1856400000, threshold: '±2%', conclusion: 'pass' },
        { dim: '人头', base: 28, report: 28, threshold: '0', conclusion: 'pass' },
        { dim: '个税', base: 121300000, report: 118900000, threshold: '±5%', conclusion: 'pass' },
        { dim: '社保', base: 96800000, report: 101200000, threshold: '±5%', conclusion: 'pass' },
        { dim: '汇率折算', base: 8870400, report: 8934500, threshold: '±0.5%', conclusion: 'warn' }
      ],
      diffs: [
        {
          dim: '总额', amount: '+34,900,000 VND', level: 'ok', confidence: '96%', handled: true, hasLetter: false,
          reason: '调薪追溯补差（retro）：员工 Nguyễn Thị Lan 调薪 10 月 1 日生效，11 月周期补发 10 月差额 VND 34,900,000，属合理差异。',
          action: '接受并留痕（AI 自动归因通过）'
        },
        {
          dim: '社保', amount: '+4,400,000 VND', level: 'error', confidence: '88%', handled: false, hasLetter: true,
          reason: '员工 Trần Văn Bình（工号 VN-0127）社保个人部分为 0，且非双边社保互免场景，疑似漏缴或算薪错误。',
          action: '生成差异沟通函，发 BIPO 对接人确认'
        },
        {
          dim: '汇率折算', amount: '+64,100 VND', level: 'warn', confidence: '62%', handled: false, hasLetter: false,
          reason: '电脑补贴折算差异 0.72%，超过 0.5% 阈值；疑未按当月度汇率（1 CNY = 3,520 VND）折算，账单数据不全，需人工核对。',
          action: '人工核对汇率取值与补贴折算明细'
        }
      ],
      letter: {
        to: 'BIPO Vietnam · 陈氏梅（chen.thi.mai@bipo.com）',
        subject: '【差异沟通函】2026-11 周期越南算薪账单（V2）社保差异确认',
        body: '陈女士，您好：\n\n我方对贵司 2026-11 周期算薪账单（版本 V2，2026-11-12 接收）完成 AI 预审，发现以下差异需贵司确认：\n\n一、差异项：社保总额\n  · 我方基准值：VND 96,800,000\n  · 贵司账单值：VND 101,200,000\n  · 差异：+VND 4,400,000（+4.55%，在 ±5% 阈值内但勾稽异常）\n\n二、疑点：员工 Trần Văn Bình（工号 VN-0127）社保个人部分为 0，且该员工非双边社保互免适用人员。\n\n请贵司在 2 个工作日内核实并回复：\n（1）该员工社保是否已按越南当地法定费率申报缴纳；\n（2）若为算薪错误，请提供修正版账单并在文件中声明被替代版本。\n\n随函附：差异明细对照表、该员工账单行项目截图。\n\n顺颂商祺\n锐捷网络 海外薪酬团队\n2026-11-23'
      }
    },
    {
      id: 'BILL-2026-11-DE-01', period: '2026-11', country: '德国', entity: 'Ruijie Germany GmbH', vendor: 'TMF',
      version: 'V1', total: 486300, currency: 'EUR', headcount: 35, receivedAt: '2026-11-13 16:48',
      aiSummary: '2 处差异：1 项合理 / 1 项疑似异常', status: 'AI预审完成',
      file: 'TMF_DE_Payroll_202611.pdf', fileNote: 'PDF 账单，LLM 辅助抽取关键字段',
      dims: [
        { dim: '总额', base: 479200, report: 486300, threshold: '±2%', conclusion: 'pass' },
        { dim: '人头', base: 35, report: 35, threshold: '0', conclusion: 'pass' },
        { dim: '个税', base: 98400, report: 116100, threshold: '±5%', conclusion: 'error' },
        { dim: '社保', base: 82300, report: 82650, threshold: '±5%', conclusion: 'pass' },
        { dim: '汇率折算', base: 399, report: 399, threshold: '±0.5%', conclusion: 'pass' }
      ],
      diffs: [
        {
          dim: '个税', amount: '+17,700 EUR（+18.0%）', level: 'ok', confidence: '94%', handled: true, hasLetter: false,
          reason: '本月 2 名员工（Lukas Weber、Anna Neumann）因调薪追溯（生效日回溯至上月）产生补税并触发税率跳档，判定为合理差异。',
          action: '接受并留痕（AI 自动归因通过）'
        },
        {
          dim: '社保', amount: '个人部分 0 EUR', level: 'error', confidence: '90%', handled: false, hasLetter: true,
          reason: '员工 Lukas Weber 社保个人部分为 0，且非互免场景（德中社保协定不适用其岗位情形），疑似异常。',
          action: '生成差异沟通函，发 TMF 对接人确认'
        }
      ],
      letter: {
        to: 'TMF Germany · Anna Schmidt（a.schmidt@tmf-group.com）',
        subject: '【差异沟通函】2026-11 周期德国算薪账单（V1）社保异常确认',
        body: 'Frau Schmidt，您好：\n\n我方对贵司 2026-11 周期算薪账单（版本 V1，2026-11-13 接收）完成 AI 预审，发现以下异常需贵司确认：\n\n一、疑点：员工 Lukas Weber（工号 DE-0053）社保个人部分（Sozialversicherung）扣缴金额为 0。\n\n二、我方核对：\n  · 该员工本期调薪追溯异动（CHG-2026-11-018）仅影响个税，不影响社保参保状态；\n  · 该员工非中德社保互免协定适用人员。\n\n请贵司在 2 个工作日内核实并回复：\n（1）该员工社保是否正常申报缴纳，扣缴为 0 的原因；\n（2）若为算薪错误，请提供修正版账单（声明被替代版本）。\n\n随函附：差异明细对照表、该员工账单行项目截图。\n\n顺颂商祺\n锐捷网络 海外薪酬团队\n2026-11-23'
      }
    },
    {
      id: 'BILL-2026-11-US-01', period: '2026-11', country: '美国', entity: 'Ruijie USA Inc.', vendor: '当地 Payroll',
      version: 'V3', total: 402800, currency: 'USD', headcount: 42, receivedAt: '2026-11-14 09:15',
      aiSummary: '无差异（五维全部通过）', status: '已确认', file: 'US_Payroll_202611_biweekly_V3.csv', hasDetail: false
    },
    {
      id: 'BILL-2026-11-JP-01', period: '2026-11', country: '日本', entity: 'Ruijie Japan K.K.', vendor: 'TMF',
      version: 'V2', total: 28960000, currency: 'JPY', headcount: 18, receivedAt: '2026-11-14 14:02',
      aiSummary: '1 处差异：1 项合理', status: '待审批', file: 'TMF_JP_Payroll_202611_V2.pdf', hasDetail: false
    },
    {
      id: 'BILL-2026-11-SG-01', period: '2026-11', country: '新加坡', entity: 'Ruijie Singapore Pte. Ltd.', vendor: 'knit',
      version: 'V1', total: 168500, currency: 'SGD', headcount: 12, receivedAt: '2026-11-15 08:40',
      aiSummary: 'AI 预审进行中', status: '待审核', file: 'knit_SG_Payroll_202611_V1.xlsx', hasDetail: false
    }
  ],

  /* ================= 工资单中心 ================= */

  payslipStats: { total: 487, splitRate: '96%', pass: 484, abnormal: 3 },

  payslips: [
    {
      emp: 'Nguyễn Minh Anh', country: '越南', entity: 'BIPO EOR Vietnam', period: '2026-11',
      file: 'payslip_VN_NMA_202611.pdf', split: '已拆分', check: '金额一致', pay: '已发放',
      lines: [
        { k: '基本工资', v: 'VND 52,000,000', note: '' },
        { k: '电脑补贴（¥90 × 3,520）', v: 'VND 316,800', note: '本币定价 · 月度汇率折算' },
        { k: '13薪', v: 'VND 52,000,000', note: '越南法定 13薪' },
        { k: 'Retro 追溯补差', v: 'VND 4,000,000', note: '追溯期间：2026-10（入职首月差额）' },
        { k: '个税', v: '-VND 6,850,000', note: '' },
        { k: '社保个人', v: '-VND 4,680,000', note: '' }
      ],
      net: 'VND 106,786,000'
    },
    {
      emp: '张伟', country: '美国', entity: 'Ruijie USA Inc.', period: '2026-11',
      file: 'payslip_US_ZW_202611_biweekly.pdf', split: '已拆分', check: '金额一致', pay: '已发放',
      lines: [
        { k: '基本工资（bi-weekly）', v: 'USD 4,230.77', note: '年薪口径拆分 26 期' },
        { k: 'Retro 追溯补差', v: 'USD 1,538.46', note: '追溯期间：2026-10（调薪差额）' },
        { k: '电脑补贴（¥90 × 0.135）', v: 'USD 12.15', note: '本币定价 · 月度汇率折算' },
        { k: '联邦+州个税', v: '-USD 1,206.00', note: '' },
        { k: 'FICA 社保医保（个人）', v: '-USD 348.60', note: '' },
        { k: '401(k) 个人缴存', v: '-USD 211.54', note: '' }
      ],
      net: 'USD 4,007.24'
    },
    {
      emp: '陈静', country: '德国', entity: 'Ruijie Germany GmbH', period: '2026-11',
      file: 'payslip_DE_CJ_202611.pdf', split: '已拆分', check: '金额一致', pay: '已查阅',
      lines: [
        { k: '基本工资', v: 'EUR 5,600.00', note: '' },
        { k: '比例工资调整', v: 'EUR 0.00', note: '11-15 离职，末月全额' },
        { k: '未休年假折算（8 天）', v: 'EUR 1,960.00', note: '离职异动 CHG-2026-11-003' },
        { k: '电脑补贴（¥90 × 0.129）', v: 'EUR 11.61', note: '本币定价 · 月度汇率折算' },
        { k: '个税（Lohnsteuer）', v: '-EUR 1,462.00', note: '' },
        { k: '社保个人', v: '-EUR 1,089.00', note: '' }
      ],
      net: 'EUR 5,020.61'
    },
    {
      emp: 'Trần Văn Bình', country: '越南', entity: 'BIPO EOR Vietnam', period: '2026-11',
      file: 'payslip_VN_TVB_202611.pdf', split: '已拆分', check: '不一致', pay: '已发放',
      checkNote: '工资单净额 VND 38,200,000 ≠ 确认版账单净额 VND 39,050,000',
      lines: [
        { k: '基本工资', v: 'VND 46,000,000', note: '' },
        { k: '电脑补贴（¥90 × 3,520）', v: 'VND 316,800', note: '本币定价 · 月度汇率折算' },
        { k: '个税', v: '-VND 3,120,000', note: '' },
        { k: '社保个人', v: 'VND 0', note: '疑似异常：账单中个人部分为 0（见差异沟通函）' }
      ],
      net: 'VND 43,196,800（PDF 净额显示 VND 38,200,000，不一致）'
    },
    {
      emp: 'Anucha Wong', country: '泰国', entity: 'CCLEE EOR Thailand', period: '2026-11',
      file: 'payslip_TH_AW_202611.pdf', split: '待人工', check: '待校验', pay: '未发放',
      checkNote: '整包 PDF 拆分失败：姓名水印遮挡，进入人工处理队列',
      lines: [
        { k: '基本工资', v: 'THB 85,000', note: '' },
        { k: '个税', v: '-THB 5,200', note: '' },
        { k: '社保个人（SSF）', v: '-THB 750', note: '' }
      ],
      net: 'THB 79,050'
    },
    {
      emp: 'Priya Sharma', country: '印度', entity: 'Gonex EOR India', period: '2026-11',
      file: 'payslip_IN_PS_202611.pdf', split: '已拆分', check: '金额一致', pay: '已发放',
      lines: [
        { k: '基本工资', v: 'INR 185,000', note: '新入职（11-07），全额月' },
        { k: '电脑补贴（¥90 × 11.9）', v: 'INR 1,071', note: '本币定价 · 月度汇率折算' },
        { k: '个税（TDS）', v: '-INR 12,400', note: '' },
        { k: '社保个人（EPF+ESI）', v: '-INR 8,300', note: '' }
      ],
      net: 'INR 165,371'
    },
    {
      emp: 'Emma Thompson', country: '英国', entity: 'Ruijie UK Ltd.', period: '2026-11',
      file: 'payslip_UK_ET_202611.pdf', split: '已拆分', check: '金额一致', pay: '已发放',
      lines: [
        { k: '基本工资', v: 'GBP 5,600.00', note: '11 月调薪生效' },
        { k: 'Retro 追溯补差', v: 'GBP 0.00', note: '当期生效，无追溯' },
        { k: '电脑补贴（¥90 × 0.109）', v: 'GBP 9.81', note: '本币定价 · 月度汇率折算' },
        { k: '个税（PAYE）', v: '-GBP 1,168.00', note: '' },
        { k: '国民保险 NI（个人）', v: '-GBP 372.00', note: '' }
      ],
      net: 'GBP 4,069.81'
    },
    {
      emp: '山田裕子', country: '日本', entity: 'Ruijie Japan K.K.', period: '2026-11',
      file: 'payslip_JP_YY_202611.pdf', split: '已拆分', check: '金额一致', pay: '已查阅',
      lines: [
        { k: '基本工资', v: 'JPY 740,000', note: '10 月调薪后标准' },
        { k: 'Retro 追溯补差', v: 'JPY 120,000', note: '追溯期间：2026-10（调薪差额）' },
        { k: '电脑补贴（¥90 × 20.5）', v: 'JPY 1,845', note: '本币定价 · 月度汇率折算' },
        { k: '所得税+住民税', v: '-JPY 68,500', note: '' },
        { k: '社保个人（健康+年金）', v: '-JPY 88,800', note: '' }
      ],
      net: 'JPY 704,545'
    },
    {
      emp: 'Lucas Ferreira', country: '巴西', entity: 'BIPO EOR Brazil', period: '2026-11',
      file: 'payslip_BR_LF_202611.pdf', split: '已拆分', check: '金额一致', pay: '已发放',
      lines: [
        { k: '基本工资', v: 'BRL 7,700.00', note: '' },
        { k: '13薪预付（50%）', v: 'BRL 3,850.00', note: '巴西 13薪第一期，随 11 月工资发放' },
        { k: '住房补贴（调整后）', v: 'BRL 2,200.00', note: '异动 CHG-2026-11-004' },
        { k: '电脑补贴（¥90 × 0.77）', v: 'BRL 69.30', note: '本币定价 · 月度汇率折算' },
        { k: '个税（IRRF）', v: '-BRL 1,485.00', note: '' },
        { k: '社保个人（INSS）', v: '-BRL 812.00', note: '' }
      ],
      net: 'BRL 11,522.30'
    },
    {
      emp: '周雪', country: '巴西', entity: 'BIPO EOR Brazil', period: '2026-11',
      file: 'payslip_BR_ZX_202611.pdf', split: '已拆分', check: '金额一致', pay: '退信',
      checkNote: '员工邮箱退信（mailbox unreachable），已转人工补发',
      lines: [
        { k: '基本工资', v: 'BRL 12,500.00', note: '' },
        { k: '住房补贴', v: 'BRL 3,200.00', note: '外派补贴' },
        { k: '生活费补贴（COLA）', v: 'BRL 1,100.00', note: '外派补贴' },
        { k: '电脑补贴（¥90 × 0.77）', v: 'BRL 69.30', note: '本币定价 · 月度汇率折算' },
        { k: '个税（IRRF）', v: '-BRL 2,640.00', note: '' },
        { k: '社保个人（INSS）', v: '-BRL 950.00', note: '' }
      ],
      net: 'BRL 13,279.30'
    }
  ],

  /* ================= 个税社保 ================= */

  compliance: [
    { country: '美国', entity: 'Ruijie USA Inc.', period: '2026-11', taxType: '个税', executor: '当地 Payroll', deadline: '2026-11-24', voucher: '已归档', alert: '正常' },
    { country: '德国', entity: 'Ruijie Germany GmbH', period: '2026-11', taxType: '个税', executor: '代理（TMF）', deadline: '2026-11-25', voucher: '已归档', alert: '正常' },
    { country: '越南', entity: 'BIPO EOR Vietnam', period: '2026-11', taxType: '个税', executor: 'EOR（BIPO）', deadline: '2026-12-05', voucher: '待上传', alert: '正常' },
    { country: '新加坡', entity: 'Ruijie Singapore Pte. Ltd.', period: '2026-11', taxType: '个税', executor: '代理（knit）', deadline: '2026-11-26', voucher: '待上传', alert: '临期' },
    { country: '日本', entity: 'Ruijie Japan K.K.', period: '2026-11', taxType: '社保', executor: '代理（TMF）', deadline: '2026-11-28', voucher: '待上传', alert: '临期' },
    { country: '巴西', entity: 'BIPO EOR Brazil', period: '2026-11', taxType: '社保', executor: 'EOR（BIPO）', deadline: '2026-11-30', voucher: '已归档', alert: '正常' },
    { country: '印度', entity: 'Gonex EOR India', period: '2026-11', taxType: '个税', executor: 'EOR（Gonex）', deadline: '2026-12-01', voucher: '已归档', alert: '正常' },
    { country: '菲律宾', entity: 'TMF EOR Philippines', period: '2026-11', taxType: '个税', executor: 'EOR（TMF）', deadline: '2026-12-03', voucher: '已归档', alert: '正常' },
    { country: '墨西哥', entity: 'Remoly EOR Mexico', period: '2026-11', taxType: '社保', executor: 'EOR（Remoly）', deadline: '2026-12-04', voucher: '已归档', alert: '正常' },
    { country: '英国', entity: 'Ruijie UK Ltd.', period: '2026-11', taxType: '个税', executor: '当地 Payroll', deadline: '2026-12-08', voucher: '待上传', alert: '正常' },
    { country: '印度尼西亚', entity: 'GoGlobal EOR Indonesia', period: '2026-11', taxType: '社保', executor: 'EOR（GoGlobal）', deadline: '2026-11-27', voucher: '已归档', alert: '正常' },
    { country: '泰国', entity: 'CCLEE EOR Thailand', period: '2026-11', taxType: '个税', executor: 'EOR（CCLEE）', deadline: '2026-11-30', voucher: '已归档', alert: '正常' }
  ],

  /* ================= 成本分析 ================= */

  cost: {
    totalCNY: 28456300,
    totalNote: '按 2026-11 月度汇率折算人民币 · 环比 +2.0% · 同比 +4.1%',
    /** 国家成本排行 Top 8（折算人民币） */
    ranking: [
      { country: '美国', value: 6120000 },
      { country: '德国', value: 4380000 },
      { country: '越南', value: 2890000 },
      { country: '巴西', value: 2760000 },
      { country: '新加坡', value: 2540000 },
      { country: '日本', value: 2410000 },
      { country: '印度', value: 1880000 },
      { country: '英国', value: 1720000 }
    ],
    othersCNY: 3756300,
    /** EOR 成本三要素（模式C：成本 = 服务费 + 实发薪酬 + 当地税费） */
    eorCost: [
      { entity: 'Gonex EOR India', cur: 'INR', net: 4850000, tax: 1120000, fee: 350000 },
      { entity: 'BIPO EOR Brazil', cur: 'BRL', net: 385000, tax: 132000, fee: 28000 },
      { entity: 'TMF EOR Philippines', cur: 'PHP', net: 2860000, tax: 890000, fee: 210000 },
      { entity: 'Remoly EOR Mexico', cur: 'MXN', net: 1240000, tax: 385000, fee: 92000 },
      { entity: 'GoGlobal EOR Indonesia', cur: 'IDR', net: 1850000000, tax: 520000000, fee: 138000000 }
    ],
    /** 近 6 个月人力成本趋势（人民币） */
    trend: [
      { m: '2026-06', v: 26120000 },
      { m: '2026-07', v: 26580000 },
      { m: '2026-08', v: 27980000 },
      { m: '2026-09', v: 27350000 },
      { m: '2026-10', v: 27890000 },
      { m: '2026-11', v: 28456300 }
    ]
  },

  /* ================= 合同管理 ================= */

  contracts: [
    { emp: 'Nguyễn Minh Anh', entity: 'BIPO EOR Vietnam', etype: 'EOR', ctype: '固定期限（1年）', signed: '2025-11-20', expiry: '2026-11-20', days: -3, status: '已过期' },
    { emp: 'Anucha Wong', entity: 'CCLEE EOR Thailand', etype: 'EOR', ctype: '固定期限（1年）', signed: '2025-12-05', expiry: '2026-12-05', days: 12, status: '30天内到期' },
    { emp: 'Priya Sharma', entity: 'Gonex EOR India', etype: 'EOR', ctype: '固定期限（1年）', signed: '2025-12-15', expiry: '2026-12-15', days: 22, status: '30天内到期' },
    { emp: '陈静', entity: 'Ruijie Germany GmbH', etype: '子公司', ctype: '固定期限（2年）', signed: '2025-01-31', expiry: '2027-01-31', days: 69, status: '90天内到期' },
    { emp: 'Lukas Weber', entity: 'Ruijie Germany GmbH', etype: '子公司', ctype: '固定期限（2年）', signed: '2025-02-15', expiry: '2027-02-15', days: 84, status: '90天内到期' },
    { emp: 'Emma Thompson', entity: 'Ruijie UK Ltd.', etype: '子公司', ctype: '无固定期限', signed: '2023-03-01', expiry: '—', days: null, status: '生效中' },
    { emp: '张伟', entity: 'Ruijie USA Inc.', etype: '子公司', ctype: '无固定期限', signed: '2022-06-15', expiry: '—', days: null, status: '生效中' },
    { emp: '山田裕子', entity: 'Ruijie Japan K.K.', etype: '子公司', ctype: '无固定期限', signed: '2021-04-01', expiry: '—', days: null, status: '生效中' },
    { emp: 'Lucas Ferreira', entity: 'BIPO EOR Brazil', etype: 'EOR', ctype: '固定期限（1年）', signed: '2026-03-01', expiry: '2027-03-01', days: 98, status: '生效中' },
    { emp: 'Dewi Rahma', entity: 'GoGlobal EOR Indonesia', etype: 'EOR', ctype: '固定期限（1年）', signed: '2026-02-25', expiry: '2027-02-25', days: 94, status: '生效中' },
    { emp: 'Michelle Lim', entity: '悦然国际 EOR Malaysia', etype: 'EOR', ctype: '固定期限（1年）', signed: '2026-03-20', expiry: '2027-03-20', days: 117, status: '生效中' },
    { emp: 'Piotr Nowak', entity: 'ICB EOR Poland', etype: 'EOR', ctype: '固定期限（1年）', signed: '2026-03-15', expiry: '2027-03-15', days: 112, status: '生效中' },
    { emp: '王强', entity: 'Ruijie USA Inc.', etype: '子公司', ctype: '外派派遣协议', signed: '2024-03-01', expiry: '2027-02-28', days: 97, status: '生效中' },
    { emp: '李婷', entity: 'Ruijie Germany GmbH', etype: '子公司', ctype: '外派派遣协议', signed: '2025-01-01', expiry: '2027-12-31', days: 403, status: '生效中' },
    { emp: 'José Hernández', entity: 'Remoly EOR Mexico', etype: 'EOR', ctype: '固定期限（1年）', signed: '2026-08-01', expiry: '2027-08-01', days: 251, status: '生效中' }
  ],

  /* ================= 资金支付 ================= */

  /** 支付指令（模式A/B=当地工资账户或供应商代付账户；模式C=EOR账单付款）金额折算 ¥ 按当月月度汇率 */
  payments: [
    { id: 'PAY-202611-US-001', country: '美国', entity: 'Ruijie USA Inc.', mode: '模式A', payee: '当地工资账户（Ruijie USA Payroll Account）', amount: 168500, currency: 'USD', cny: 1247000, auth: '已授权', payStatus: '已执行' },
    { id: 'PAY-202611-US-002', country: '美国', entity: 'Ruijie USA Inc.', mode: '模式A', payee: '当地工资账户（Ruijie USA Payroll Account）', amount: 172300, currency: 'USD', cny: 1275000, auth: '已授权', payStatus: '已执行' },
    { id: 'PAY-202611-DE-001', country: '德国', entity: 'Ruijie Germany GmbH', mode: '模式A', payee: '当地工资账户（Deutsche Bank 工资户）', amount: 486300, currency: 'EUR', cny: 3770000, auth: '已授权', payStatus: '已发送' },
    { id: 'PAY-202611-JP-001', country: '日本', entity: 'Ruijie Japan K.K.', mode: '模式A', payee: '当地工资账户（三菱UFJ 工资户）', amount: 28960000, currency: 'JPY', cny: 1412000, auth: '已授权', payStatus: '已发送' },
    { id: 'PAY-202611-SG-001', country: '新加坡', entity: 'Ruijie Singapore Pte. Ltd.', mode: '模式B', payee: '供应商代付账户（knit Singapore 代付户）', amount: 168500, currency: 'SGD', cny: 904000, auth: '待授权', payStatus: '待发送' },
    { id: 'PAY-202611-SG-002', country: '新加坡', entity: 'Ruijie Singapore Pte. Ltd.', mode: '模式B', payee: '供应商代付账户（knit · 个税 / CPF 代缴户）', amount: 18400, currency: 'SGD', cny: 98700, auth: '待授权', payStatus: '待发送' },
    { id: 'PAY-202611-VN-001', country: '越南', entity: 'BIPO EOR Vietnam', mode: '模式C', payee: 'EOR账单付款（BIPO 账单 BILL-VN-202611）', amount: 1856400000, currency: 'VND', cny: 527400, auth: '已授权', payStatus: '已执行' },
    { id: 'PAY-202611-BR-001', country: '巴西', entity: 'BIPO EOR Brazil', mode: '模式C', payee: 'EOR账单付款（BIPO 账单 BILL-BR-202611）', amount: 545000, currency: 'BRL', cny: 707800, auth: '已授权', payStatus: '待发送' },
    { id: 'PAY-202611-PH-001', country: '菲律宾', entity: 'TMF EOR Philippines', mode: '模式C', payee: 'EOR账单付款（TMF 账单 BILL-PH-202611）', amount: 3960000, currency: 'PHP', cny: 495000, auth: '已授权', payStatus: '失败' },
    { id: 'PAY-202611-IN-001', country: '印度', entity: 'Gonex EOR India', mode: '模式C', payee: 'EOR账单付款（Gonex 账单 BILL-IN-202611）', amount: 6320000, currency: 'INR', cny: 531100, auth: '待授权', payStatus: '待发送' }
  ],

  /** EOR 账单三要素核对（模式C：账单 = 服务费 + 实发薪酬 + 当地税费，与系统记录勾稽） */
  paymentsEor: [
    { entity: 'BIPO EOR Vietnam', cur: 'VND', billFee: 68000000, billNet: 1708000000, billTax: 80400000, sysFee: 68000000, sysNet: 1708000000, sysTax: 80400000, conclusion: '一致' },
    { entity: 'BIPO EOR Brazil', cur: 'BRL', billFee: 31500, billNet: 385000, billTax: 132000, sysFee: 28000, sysNet: 385000, sysTax: 132000, conclusion: '多计服务费' },
    { entity: 'TMF EOR Philippines', cur: 'PHP', billFee: 210000, billNet: 2860000, billTax: 890000, sysFee: 210000, sysNet: 2860000, sysTax: 890000, conclusion: '一致' },
    { entity: 'Gonex EOR India', cur: 'INR', billFee: 350000, billNet: 4850000, billTax: 1120000, sysFee: 350000, sysNet: 4850000, sysTax: 1120000, conclusion: '一致' },
    { entity: 'Remoly EOR Mexico', cur: 'MXN', billFee: 92000, billNet: 1240000, billTax: 385000, sysFee: 92000, sysNet: 1240000, sysTax: 385000, conclusion: '一致' }
  ],

  /* ================= 总账凭证 ================= */

  /**
   * 总账凭证（本位币人民币，按 2026-11 月度汇率折算）
   * entries: { dc: '借'|'贷', account: 会计科目, amount: 金额（¥）, note: 摘要 }
   */
  vouchers: [
    {
      id: 'VCH-202611-001', period: '2026-11', country: '美国', entity: 'Ruijie USA Inc.',
      pushStatus: '已回执', oracleNo: 'ORA-773410', checkStatus: '与确认账单一致',
      entries: [
        { dc: '借', account: '薪酬费用-美国', amount: 1247000, note: '2026-11 bi-weekly 两期工资总额' },
        { dc: '借', account: '管理费用-社保公司', amount: 96000, note: 'FICA 雇主部分' },
        { dc: '贷', account: '应付工资', amount: 1045000, note: '净额部分' },
        { dc: '贷', account: '应交税费-个税', amount: 186000, note: '联邦+州代扣' },
        { dc: '贷', account: '应付职工薪酬-社保', amount: 112000, note: 'FICA 个人+雇主部分' }
      ]
    },
    {
      id: 'VCH-202611-002', period: '2026-11', country: '德国', entity: 'Ruijie Germany GmbH',
      pushStatus: '已回执', oracleNo: 'ORA-773428', checkStatus: '与确认账单一致',
      entries: [
        { dc: '借', account: '薪酬费用-德国', amount: 3281000, note: '确认版账单工资总额（含调薪追溯）' },
        { dc: '借', account: '管理费用-社保公司', amount: 489000, note: '法定社保雇主部分' },
        { dc: '贷', account: '应付工资', amount: 2743000, note: '净额部分' },
        { dc: '贷', account: '应交税费-个税', amount: 901000, note: 'Lohnsteuer 代扣' },
        { dc: '贷', account: '应付职工薪酬-社保', amount: 126000, note: '社保个人代扣部分' }
      ]
    },
    {
      id: 'VCH-202611-003', period: '2026-11', country: '日本', entity: 'Ruijie Japan K.K.',
      pushStatus: '已推送', oracleNo: '', checkStatus: '与确认账单一致',
      entries: [
        { dc: '借', account: '薪酬费用-日本', amount: 1284000, note: '工资总额（含 retro 补差）' },
        { dc: '借', account: '管理费用-社保公司', amount: 128000, note: '健康保险+年金雇主部分' },
        { dc: '贷', account: '应付工资', amount: 1076000, note: '净额部分' },
        { dc: '贷', account: '应交税费-个税', amount: 158000, note: '所得税+住民税' },
        { dc: '贷', account: '应付职工薪酬-社保', amount: 178000, note: '社保个人代扣部分' }
      ]
    },
    {
      id: 'VCH-202611-004', period: '2026-11', country: '新加坡', entity: 'Ruijie Singapore Pte. Ltd.',
      pushStatus: '已推送', oracleNo: '', checkStatus: '与确认账单一致',
      entries: [
        { dc: '借', account: '薪酬费用-新加坡', amount: 862000, note: '代理发薪（knit）工资总额' },
        { dc: '贷', account: '应付工资', amount: 796000, note: '净额部分（外国人无 CPF）' },
        { dc: '贷', account: '应交税费-个税', amount: 41000, note: 'IRAS 预估代扣' },
        { dc: '贷', account: '其他应付款-代理（knit）', amount: 25000, note: '代理服务费代垫' }
      ]
    },
    {
      id: 'VCH-202611-005', period: '2026-11', country: '越南', entity: 'BIPO EOR Vietnam',
      pushStatus: '草稿', oracleNo: '', checkStatus: '不一致',
      checkNote: '确认账单社保总额 VND 101,200,000 ≠ 系统基准 VND 96,800,000（差异沟通函在途），凭证暂挂待差异闭环',
      entries: [
        { dc: '借', account: '薪酬费用-越南', amount: 508100, note: 'EOR 账单实发薪酬折算' },
        { dc: '借', account: 'EOR服务费', amount: 19300, note: 'BIPO 服务费折算' },
        { dc: '贷', account: '应付工资', amount: 431000, note: '净额部分' },
        { dc: '贷', account: '应交税费-个税', amount: 34400, note: '越南 PIT 代扣' },
        { dc: '贷', account: '应付职工薪酬-社保', amount: 42700, note: '社保公司+个人部分' },
        { dc: '贷', account: '应付-EOR服务费', amount: 19300, note: 'BIPO 应付服务费' }
      ]
    },
    {
      id: 'VCH-202611-006', period: '2026-11', country: '巴西', entity: 'BIPO EOR Brazil',
      pushStatus: '草稿', oracleNo: '', checkStatus: '与确认账单一致',
      entries: [
        { dc: '借', account: '薪酬费用-巴西', amount: 500300, note: 'EOR 账单实发薪酬折算（含 13薪 第一期）' },
        { dc: '借', account: 'EOR服务费', amount: 21500, note: 'BIPO 服务费折算（按合同费率）' },
        { dc: '贷', account: '应付工资', amount: 381000, note: '净额部分' },
        { dc: '贷', account: '应交税费-个税', amount: 67400, note: 'IRRF 代扣' },
        { dc: '贷', account: '应付职工薪酬-社保', amount: 51900, note: 'INSS 公司+个人部分' },
        { dc: '贷', account: '应付-EOR服务费', amount: 21500, note: 'BIPO 应付服务费' }
      ]
    },
    {
      id: 'VCH-202611-007', period: '2026-11', country: '印度', entity: 'Gonex EOR India',
      pushStatus: '草稿', oracleNo: '', checkStatus: '与确认账单一致',
      entries: [
        { dc: '借', account: '薪酬费用-印度', amount: 456000, note: 'EOR 账单实发薪酬折算' },
        { dc: '借', account: 'EOR服务费', amount: 29400, note: 'Gonex 服务费折算' },
        { dc: '贷', account: '应付工资', amount: 340800, note: '净额部分' },
        { dc: '贷', account: '应交税费-个税', amount: 94100, note: 'TDS 代扣' },
        { dc: '贷', account: '应付职工薪酬-社保', amount: 21100, note: 'EPF+ESI 部分' },
        { dc: '贷', account: '应付-EOR服务费', amount: 29400, note: 'Gonex 应付服务费' }
      ]
    },
    {
      id: 'VCH-202611-008', period: '2026-11', country: '英国', entity: 'Ruijie UK Ltd.',
      pushStatus: '已推送', oracleNo: '', checkStatus: '与确认账单一致',
      entries: [
        { dc: '借', account: '薪酬费用-英国', amount: 1302000, note: '工资总额（9 月调薪生效）' },
        { dc: '借', account: '管理费用-社保公司', amount: 195000, note: 'Class 1 NI 雇主部分' },
        { dc: '贷', account: '应付工资', amount: 1067000, note: '净额部分' },
        { dc: '贷', account: '应交税费-个税', amount: 306000, note: 'PAYE 代扣' },
        { dc: '贷', account: '应付职工薪酬-社保', amount: 124000, note: 'NI 个人代扣部分' }
      ]
    }
  ],

  /* ================= 国别配置 ================= */

  /**
   * 国别配置包（10 国）：一切国别规则进配置不进代码，新增国家 = 新增配置包 + 日历模板，零代码发布
   * payCycle: MONTHLY | BI_WEEKLY；has13：是否有法定/惯例 13薪
   */
  countryConfigs: [
    {
      country: '美国', version: 'v3.2', effDate: '2026-07-01',
      payCycle: 'BI_WEEKLY', has13: false, rule13: '—',
      minWage: 'USD 1,160 /周（联邦底线，州标准更高时从高）',
      ssRate: '公司 7.65% + 个人 7.65%（OASDI + Medicare）',
      pitFreq: '月度', annualFiling: 'W-2（次年 1-31 前）',
      offsetCap: '30%（默认）',
      finalPay: '多数州要求离职后下一个常规发薪日结清',
      ssa: '日本、德国、英国、智利等（双边社保协定）',
      lang: '英语',
      rsuTax: 'RSU 归属日按公允市价并入工资计联邦+州个税；NSO 行权价差同口径',
      eor: '不适用（模式A · 子公司自有 Payroll）',
      contractNote: 'At-will 雇佣为主，书面 Offer + Handbook',
      fxRule: '月度汇率折算（1 CNY = 0.135 USD）'
    },
    {
      country: '德国', version: 'v2.7', effDate: '2026-01-01',
      payCycle: 'MONTHLY', has13: false, rule13: '—',
      minWage: 'EUR 12.82 /小时（法定最低工资）',
      ssRate: '公司 20.6% + 个人 20.6%（养老/医疗/失业/护理保险）',
      pitFreq: '月度', annualFiling: '年度电子工资税证明（Elektronische Lohnsteuerbescheinigung）',
      offsetCap: '20%（比默认更严）',
      finalPay: '合同终止日所在周期末，不得晚于次月发薪日',
      ssa: '中国、日本、美国、英国等（双边社保协定）',
      lang: '德语',
      rsuTax: 'RSU 适用 §19a EStG 属地化规则，归属收益可分 5 年计税',
      eor: '不适用（模式A · 子公司）',
      contractNote: '书面雇佣合同强制（Nachweisgesetz 备案义务）',
      fxRule: '月度汇率折算（1 CNY = 0.129 EUR）'
    },
    {
      country: '越南', version: 'v4.1', effDate: '2026-07-01',
      payCycle: 'MONTHLY', has13: true, rule13: '一次（年末随 12 月工资发放）',
      minWage: 'VND 5,258,000 /月（一区，2026-07 起上调 6%）',
      ssRate: '公司 21.5% + 个人 10.5%（养老/医疗/失业/工伤）',
      pitFreq: '月度', annualFiling: '年度汇算清缴（次年 3-31 前，若适用）',
      offsetCap: '30%（默认）',
      finalPay: '离职后 7 个工作日内结清',
      ssa: '—（与中国暂无生效双边社保协定）',
      lang: '越南语',
      rsuTax: 'RSU 归属日按属地原则分类计税（外籍员工 20%）',
      eor: 'BIPO / Gonex（模式C）',
      contractNote: '越/英双语书面合同，劳动部门备案',
      fxRule: '月度汇率折算（1 CNY = 3,520 VND）'
    },
    {
      country: '巴西', version: 'v3.0', effDate: '2026-03-01',
      payCycle: 'MONTHLY', has13: true, rule13: '拆两次（第一期随 11 月工资 50%，第二期 12-20 前）',
      minWage: 'BRL 1,518 /月（2026 年法定最低工资）',
      ssRate: '公司 28% 起 + 个人 7.5%~14%（INSS 累进）',
      pitFreq: '月度', annualFiling: '年度申报（IRPF 汇算）',
      offsetCap: '30%（默认）',
      finalPay: '离职后 10 个工作日内结清（含 FGTS）',
      ssa: '日本（双边社保协定）',
      lang: '葡萄牙语（巴葡）',
      rsuTax: 'RSU 归属收益并入 IRRF 按全额累计税率扣缴',
      eor: 'BIPO（模式C）',
      contractNote: 'CLT 注册合同（Carteira de Trabalho 登记）',
      fxRule: '月度汇率折算（1 CNY = 0.77 BRL）'
    },
    {
      country: '新加坡', version: 'v2.2', effDate: '2026-06-01',
      payCycle: 'MONTHLY', has13: false, rule13: '—（无 13薪 法定要求，AWS 酌情）',
      minWage: '—（无法定最低工资，本地员工适用本地工资标准 LQS）',
      ssRate: '公司 17% + 个人 20%（CPF，仅公民/PR；外国人 0）',
      pitFreq: '年度', annualFiling: 'IR8A（次年 3-1 前）',
      offsetCap: '30%（默认）',
      finalPay: '最后工作日结清（CPF 次月 14 日前缴纳）',
      ssa: '—（无适用双边社保协定）',
      lang: '英语',
      rsuTax: 'RSU 归属并入就业收入按累进税率估税',
      eor: '不适用（模式B · 代理发薪 knit）',
      contractNote: '书面雇佣合同（一式两份，MOM 强制）',
      fxRule: '月度汇率折算（1 CNY = 0.184 SGD）'
    },
    {
      country: '日本', version: 'v3.5', effDate: '2026-04-01',
      payCycle: 'MONTHLY', has13: false, rule13: '—（夏冬赏与按公司惯例，非法定 13薪）',
      minWage: 'JPY 1,121 /小时（全国加权平均）',
      ssRate: '公司 约15% + 个人 约15%（健康保险+年金+雇用保险）',
      pitFreq: '月度', annualFiling: '年末调整（12 月）',
      offsetCap: '30%（默认）',
      finalPay: '原则上离职后 7 个工作日内结清',
      ssa: '中国、美国、德国、英国等（双边社保协定）',
      lang: '日语',
      rsuTax: 'RSU 归属按公允市价源泉徴収',
      eor: '不适用（模式A · 子公司）',
      contractNote: '书面雇佣契约（劳动条件通知书义务）',
      fxRule: '月度汇率折算（1 CNY = 20.5 JPY）'
    },
    {
      country: '菲律宾', version: 'v2.8', effDate: '2026-05-01',
      payCycle: 'BI_WEEKLY', has13: true, rule13: '拆两次（上/下半年各 50%，分别不晚于 5-31 与 11-30，末期不晚于 12-24）',
      minWage: 'PHP 645 /日（NCR 非农业 2026）',
      ssRate: '公司 约10% + 个人 约5%（SSS + PhilHealth + Pag-IBIG）',
      pitFreq: '月度', annualFiling: 'BIR 2316（年度）',
      offsetCap: '30%（默认）',
      finalPay: '离职后 30 天内结清',
      ssa: '—（与中国无生效双边社保协定）',
      lang: '菲律宾语 / 英语',
      rsuTax: 'RSU 归属按公允价计税，次年初申报',
      eor: 'TMF（模式C）',
      contractNote: '书面合同（符合劳工部第 39 号令合同化用工要求）',
      fxRule: '月度汇率折算（1 CNY = 8.0 PHP）'
    },
    {
      country: '印度', version: 'v3.1', effDate: '2026-08-01',
      payCycle: 'MONTHLY', has13: false, rule13: '—（惯例年终奖 / Gratuity，非 13薪 制）',
      minWage: 'INR 21,000 /月（全国底线，邦别差异大）',
      ssRate: '公司 12% + 个人 12%（EPF）；ESI 公司 3.25% + 个人 0.75%',
      pitFreq: '月度', annualFiling: 'Form 16（次年 6-15 前）',
      offsetCap: '30%（默认）',
      finalPay: '离职后 2 个月内结清（含公积金转移）',
      ssa: '—（与中国社保协定谈判中）',
      lang: '英语 / 印地语',
      rsuTax: 'RSU 归属按公允市价计 TDS（102B 条款争议按全额口径）',
      eor: 'Gonex（模式C）',
      contractNote: '书面雇佣合同（Shops & Establishments 登记要求）',
      fxRule: '月度汇率折算（1 CNY = 11.9 INR）'
    },
    {
      country: '墨西哥', version: 'v2.4', effDate: '2026-02-01',
      payCycle: 'BI_WEEKLY', has13: true, rule13: '一次（Aguinaldo 年终奖，12-20 前发放至少 15 天工资）',
      minWage: 'MXN 279 /日（2026 一般区）',
      ssRate: '公司 约30% + 个人 约3%（IMSS / Infonavit）',
      pitFreq: '月度', annualFiling: '年度扣缴凭证（Constancia de Retenciones）',
      offsetCap: '30%（默认）',
      finalPay: '离职后 5 个工作日内结清',
      ssa: '—（无适用双边社保协定）',
      lang: '西班牙语',
      rsuTax: 'RSU 归属按市价并入应税所得（SAT 口径）',
      eor: 'Remoly（模式C）',
      contractNote: '书面合同一式两份 + 履行登记（Profedet 备案）',
      fxRule: '月度汇率折算（1 CNY = 2.85 MXN）'
    },
    {
      country: '英国', version: 'v3.6', effDate: '2026-04-01',
      payCycle: 'MONTHLY', has13: false, rule13: '—',
      minWage: 'GBP 12.21 /小时（21 岁以上 NLW）',
      ssRate: '公司 15% + 个人 8%（Class 1 NI，2026/27 税年）',
      pitFreq: '月度', annualFiling: 'P60（次年 5-31 前）',
      offsetCap: '30%（默认）',
      finalPay: '离职日结清（含未休年假折算）',
      ssa: '中国、日本、美国、德国等（双边社保协定）',
      lang: '英语',
      rsuTax: 'RSU 归属按市价计 PAYE 个税 + 雇主 NIC（2024 起适用）',
      eor: '不适用（模式A · 子公司）',
      contractNote: '书面雇佣声明（Section 1 Statement，入职 2 个月内交付）',
      fxRule: '月度汇率折算（1 CNY = 0.109 GBP）'
    }
  ],

  /* ================= AI 助手 ================= */

  ai: {
    regulations: [
      {
        id: 'REG-2026-0828', country: '越南', title: '最低工资上调 6%', date: '2026-08-28', level: 'high',
        content: '越南劳动荣军社会部公告：自 2026-07-01 起区域最低工资上调约 6%（一区 VND 4,960,000 → VND 5,258,000/月）。',
        impact: '涉及 12 名员工（Gonex EOR Vietnam 7 名、BIPO EOR Vietnam 5 名），其中 3 名员工当前工资低于新标准',
        action: '建议在 7 月周期向供应商发出调薪指令，并补发差额（retro）'
      },
      {
        id: 'REG-2026-1102', country: '德国', title: '2027 年法定养老保险费率上调', date: '2026-11-02', level: 'medium',
        content: '德国联邦劳工部公布：2027 年法定养老保险费率计划由 18.6% 上调至 18.9%，雇主与雇员各半承担。',
        impact: '涉及 Ruijie Germany GmbH 35 名员工，预计月度社保成本增加约 EUR 1,050',
        action: '更新国别配置社保费率表（生效日 2027-01-01），并纳入 2027 年成本预测'
      },
      {
        id: 'REG-2026-1105', country: '巴西', title: '13薪 第二期支付时限确认', date: '2026-11-05', level: 'medium',
        content: '巴西 2026 年度 13薪（13º salário）第二期须在 2026-12-20 前支付；个税 IRRF 按全额累计税率在第二期扣缴。',
        impact: '涉及 BIPO EOR Brazil 22 名员工，预计 12 月现金流出增加约 BRL 84,700',
        action: '确认 BIPO 拆分发放时点与代扣口径，并纳入 12 月资金计划'
      },
      {
        id: 'REG-2026-1110', country: '新加坡', title: 'IR21 离职税务申报时限收紧', date: '2026-11-10', level: 'low',
        content: '新加坡税务局（IRAS）执法趋严：员工离职 IR21 申报须在最后工作日前至少 1 个月提交，否则将按估税处理。',
        impact: '影响新加坡主体离职异动流程（当前有 1 名员工离职异动在途）',
        action: '联动异动管理离职校验：离职生效日距今不足 1 个月时自动预警'
      }
    ],

    /** 预置历史消息（含葡语员工问 13薪 示例） */
    chat: [
      { role: 'user', who: 'Lucas Ferreira（巴西 · BIPO EOR Brazil）', text: 'Por que o meu salário deste mês tem um item de adiantamento do 13º salário?' },
      { role: 'ai', text: '您好 Lucas，关于您咨询的 13薪 预付款项说明如下：\n\n根据巴西劳动法（CLT）及公司薪酬政策，13薪（13º salário）分两期发放：\n· 第一期：相当于 13薪 的 50%，随 11 月工资一并支付；\n· 第二期：将于 2026-12-20 前支付。\n\n引用您的 2026-11 工资单：\n· 13薪 预付（50%）：BRL 3,850.00\n· 计算口径：月基本工资 BRL 7,700.00 × 50%\n\n如您对金额有疑问，可随时向我提问或申请人工复核。' },
      { role: 'user', who: 'Lucas Ferreira（巴西 · BIPO EOR Brazil）', text: 'Obrigado! Está claro agora.' },
      { role: 'ai', text: '不客气！如有其他薪酬问题（工资单明细、个税社保口径、发薪时间等），欢迎随时咨询。\n\n超出我能力范围的问题（如个案申诉、金额争议）将自动转人工工单，专员预计在 1 个工作日内回复。' }
    ],

    forecast: {
      rows: [
        { country: '美国', cur: '¥6,120,000', m1: '¥6,180,000', m2: '¥6,350,000', m3: '¥6,520,000', trend: 'up', note: 'bi-weekly 薪制，12 月含 3 个发薪节点' },
        { country: '德国', cur: '¥4,380,000', m1: '¥4,420,000', m2: '¥4,460,000', m3: '¥4,510,000', trend: 'up', note: '12 月含圣诞补贴（惯例）' },
        { country: '越南', cur: '¥2,890,000', m1: '¥5,760,000', m2: '¥2,960,000', m3: '¥2,930,000', trend: 'up', note: '12 月为 13薪 发放月，成本翻倍' },
        { country: '巴西', cur: '¥2,760,000', m1: '¥4,050,000', m2: '¥2,790,000', m3: '¥2,790,000', trend: 'up', note: '11 月 13薪 第一期（本月）、12 月第二期' },
        { country: '新加坡', cur: '¥2,540,000', m1: '¥2,550,000', m2: '¥2,560,000', m3: '¥2,580,000', trend: 'flat', note: '名单稳定' },
        { country: '日本', cur: '¥2,410,000', m1: '¥2,400,000', m2: '¥2,390,000', m3: '¥2,410,000', trend: 'down', note: '1 名员工 11 月底离职' },
        { country: '印度', cur: '¥1,880,000', m1: '¥1,940,000', m2: '¥2,010,000', m3: '¥2,060,000', trend: 'up', note: '在途 offer 2 人，12 月入职' },
        { country: '英国', cur: '¥1,720,000', m1: '¥1,720,000', m2: '¥1,730,000', m3: '¥1,730,000', trend: 'flat', note: '名单稳定' }
      ],
      sensitivity: {
        note: '汇率敏感性口径：非人民币成本敞口约占总成本 78%（USD / EUR 敞口已部分由远期锁汇对冲；VND、BRL、INR 敞口未对冲）。预测按当月月度汇率为基准，给出 ±5% / ±10% 情景区间。',
        rows: [
          { s: '汇率 -10%', v: '¥25,610,670', delta: '-¥2,845,630', note: 'VND / BRL / INR 对 CNY 同步贬值情景' },
          { s: '汇率 -5%', v: '¥27,033,485', delta: '-¥1,422,815', note: '温和贬值情景' },
          { s: '基准（当月汇率）', v: '¥28,456,300', delta: '—', note: 'CNY/VND 3,520 · CNY/USD 0.135 · CNY/EUR 0.129 · CNY/BRL 0.77 · CNY/INR 11.9' },
          { s: '汇率 +5%', v: '¥29,879,115', delta: '+¥1,422,815', note: '温和升值情景' },
          { s: '汇率 +10%', v: '¥31,301,930', delta: '+¥2,845,630', note: 'VND / BRL / INR 对 CNY 同步升值情景' }
        ]
      }
    }
  }
};
