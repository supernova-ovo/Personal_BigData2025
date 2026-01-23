
export interface AnnualReportData {
  // Basic Info
  XingMing: string;      // 姓名
  GongHao: string;       // 工号
  GangWei: string;       // 岗位
  NianFen: string;       // 年份
  BiYeYX: string;        // 毕业学校
  XiaoYou: string;       // 校友 (Names separated by ;)
  XiaoYouSh: number;     // 校友数

  // Tenure & Attendance
  GongLingN: number;     // 工龄年
  GongLingT: number;     // 工龄天
  ZaiGangZSC: number;    // 在岗总时长
  RiZuiCZG: number;      // 日最长在岗
  RiZuiCZG_Date: string; // 最长在岗日
  DengLuCS: number;      // 登录次数
  ZuiZaoSX: string;      // 最早上线
  ZuiWanXX: string;      // 最晚下线
  QianDao: string;       // 签到时间 example
  QianTui: string;       // 签退时间 example
  NianJia: number;       // 年假
  QingJiaTS: number;     // 请假天数

  // Ranks (Percentiles)
  GongLingPX: number;    // 工龄排行
  ZaiGangPX: number;     // 在岗排行
  DengLuPX: number;      // 登录排行
  ChuLiSCPX: number;     // 处理时长排行
  Apmpx: number | null;  // 操作数排序

  // Work & Efficiency
  YiBanSL: string;       // 已办数量 (Note: string in JSON, needs parsing if used as number)
  ChuLiL: number;        // 处理率
  PingJunCLSC: number;   // 平均处理时长
  ZuiDuoYW: string;      // 最常用业务
  Apm: number;           // 总操作数
  App_APM: number;       // App操作数
  Client_APM: number;    // 客户端操作数

  // Comparisons (Year over Year)
  ZaiGangTB: number | null;
  RiZaiGTB: number | null;
  DengLuTB: number | null;
  YiBanTB: number | null;
  ChuLiSCTB: number | null;
  YueDuTB: number | null;
  CaoZuoSTB: number | null;

  // Travel
  ChuChaiCS: number;     // 出差次数
  ChuChaiTS: number;     // 出差天数
  ChuChaiCity: string | null; // 出差城市

  // Learning / Exams
  ExamCiShu: number;     // 答题次数
  TimuShu: number;       // 题目数
  MaxScore: number;      // 最高分

  // Engagement
  Readcnt: number;       // 总阅读数
  Zancnt: number;        // 总点赞数
  FuJianSL: number;      // 附件浏览量
  XinWenCS: number | null; // 新闻次数

  // Breakdown
  R_rsdt: number; R_zsfx: number; R_zt: number; R_qt: number;
  N_rsdt: number; N_zsfx: number; N_zt: number; N_qt: number;

  // Awards
  JiangLiS: number;      // 奖励数
  JiangLi: string;       // 奖励 (Comma separated)
}

export enum SectionType {
  INTRO = 'INTRO',
  DEDICATION = 'DEDICATION', // Work Habits / Attendance
  EFFICIENCY = 'EFFICIENCY', // APM / Tasks
  TRAVEL = 'TRAVEL',
  LEARNING = 'LEARNING',
  ENGAGEMENT = 'ENGAGEMENT',
  AWARDS = 'AWARDS',
  SUMMARY = 'SUMMARY', // New Section for Keyword/Radar
  AI_SUMMARY = 'AI_SUMMARY'
}

export interface WorkStats {
  tasksCompleted: number;
  earliestLogin: string;
  latestLogin: string;
  totalLogins: number;
}

export interface CompanyStats {
  revenueGrowth: string;
  marketRank: number | string;
  totalEmployees: number | string;
  newOffices: number;
}

export interface Milestone {
  quarter: string;
  title: string;
  description: string;
}

export interface CompanyMilestones {
  highlights: Milestone[];
}

export interface MeetingStats {
  totalHours: number;
  hostedCount: number;
  externalMeetings: number;
  busiestMonth: string;
}
