import { AnnualReportData } from '../types';

/**
 * 完整的测试数据
 * 用于本地开发和测试
 */
export const mockUserData: AnnualReportData = {
    // 基本信息
    XingMing: "张三",
    GongHao: "20210001",
    NianFen: "2025",
    GangWei: "高级软件工程师",
    BiYeYX: "清华大学",
    XiaoYou: "李明;王芳;赵强",
    XiaoYouSh: 15,

    // 在岗数据
    ZaiGangZSC: 2180,        // 在岗总时长（小时）
    ZaiGangTB: 120,          // 在岗同比
    ZaiGangPX: 85,           // 在岗排序
    DengLuCS: 245,           // 登录次数
    DengLuTB: 15,            // 登录同比
    DengLuPX: 78,            // 登录排序
    RiZuiCZG: 14.5,          // 日最长在岗
    RiZuiCZG_Date: "2025-03-15T00:00:00",
    ZuiZaoSX: "2025-01-08T06:30:00",  // 最早上线
    ZuiWanXX: "2025-06-20T23:45:00",  // 最晚下线
    QianDao: "2025-01-08T08:30:00",   // 签到时间示例
    QianTui: "2025-01-08T18:00:00",   // 签退时间示例

    // 司龄数据
    GongLingN: 4,            // 工龄（年）
    GongLingT: 1460,         // 工龄（天）
    GongLingPX: 65,          // 工龄排序

    // 排序数据
    ChuLiSCPX: 72,           // 处理时长排序

    // 效能数据
    Apm: 125680,             // 总操作数
    Apmpx: 92,               // 操作数排序（击败92%用户）
    Client_APM: 98500,       // 客户端操作数
    App_APM: 27180,          // App操作数
    YiBanSL: "856",          // 已办数量
    YiBanTB: 45,             // 已办同比
    ChuLiL: 96,              // 处理率
    PingJunCLSC: 180,        // 平均处理时长（分钟）
    ZuiDuoYW: "项目管理系统",

    // 同比数据
    RiZaiGTB: 25,            // 日在岗同比
    ChuLiSCTB: 10,           // 处理时长同比
    CaoZuoSTB: 35,           // 操作数同比

    // 出差数据
    ChuChaiCS: 12,           // 出差次数
    ChuChaiTS: 45,           // 出差天数
    ChuChaiCity: "北京,上海,深圳,杭州,成都",

    // 请假数据
    NianJia: 5,              // 年假
    QingJiaTS: 3,            // 请假天数

    // 学习数据
    ExamCiShu: 28,           // 考试次数
    MaxScore: 98,            // 最高分
    TimuShu: 1250,           // 题目数

    // 互动数据
    Readcnt: 1580,           // 总阅读数
    Zancnt: 89,              // 总点赞数
    YueDuTB: 25,             // 阅读同比
    FuJianSL: 156,           // 附件数量
    XinWenCS: 45,            // 新闻次数
    R_rsdt: 450,             // 人事大厅阅读
    R_zsfx: 680,             // 知识分享阅读
    R_zt: 280,               // 专题阅读
    R_qt: 170,               // 其他阅读
    N_rsdt: 25,              // 人事大厅点赞
    N_zsfx: 38,              // 知识分享点赞
    N_zt: 18,                // 专题点赞
    N_qt: 8,                 // 其他点赞

    // 奖励数据
    JiangLiS: 3,             // 奖励数量
    JiangLi: "年度优秀员工,技术创新奖,项目突出贡献奖"
};

/**
 * 另一个测试数据示例（数据较少的情况）
 */
export const mockUserDataMinimal: AnnualReportData = {
    XingMing: "李四",
    GongHao: "20220015",
    NianFen: "2025",
    GangWei: "产品经理",
    BiYeYX: "北京大学",
    XiaoYou: "陈华;刘洋",
    XiaoYouSh: 8,

    ZaiGangZSC: 1850,
    ZaiGangTB: 80,
    ZaiGangPX: 65,
    DengLuCS: 198,
    DengLuTB: 10,
    DengLuPX: 60,
    RiZuiCZG: 12,
    RiZuiCZG_Date: "2025-04-10T00:00:00",
    ZuiZaoSX: "2025-02-15T07:15:00",
    ZuiWanXX: "2025-08-25T22:30:00",
    QianDao: "2025-02-15T09:00:00",
    QianTui: "2025-02-15T18:30:00",

    GongLingN: 2,
    GongLingT: 730,
    GongLingPX: 45,

    ChuLiSCPX: 55,

    Apm: 68500,
    Apmpx: 75,
    Client_APM: 52000,
    App_APM: 16500,
    YiBanSL: "425",
    YiBanTB: 20,
    ChuLiL: 88,
    PingJunCLSC: 240,
    ZuiDuoYW: "审批流程",

    RiZaiGTB: 15,
    ChuLiSCTB: 5,
    CaoZuoSTB: 18,

    ChuChaiCS: 5,
    ChuChaiTS: 18,
    ChuChaiCity: "上海,广州,武汉",

    NianJia: 3,
    QingJiaTS: 2,

    ExamCiShu: 15,
    MaxScore: 85,
    TimuShu: 680,

    Readcnt: 850,
    Zancnt: 42,
    YueDuTB: 12,
    FuJianSL: 78,
    XinWenCS: 22,
    R_rsdt: 280,
    R_zsfx: 350,
    R_zt: 150,
    R_qt: 70,
    N_rsdt: 15,
    N_zsfx: 18,
    N_zt: 7,
    N_qt: 2,

    JiangLiS: 1,
    JiangLi: "优秀新人奖"
};
