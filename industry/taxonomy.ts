// 中集安瑞科清洁能源情报分类。类别 key 会进入公开 URL，上线后不要改名。
export const CATEGORIES = [
  { key: "lng", label: "LNG", section: "能源价格", guide: "LNG现货和长协价格、供需、液化与接收站产能、库存、气源、管道气替代及LNG贸易流向。" },
  { key: "methanol", label: "甲醇", section: "能源价格", guide: "传统甲醇、绿色甲醇、生物甲醇和e-methanol的价格、产能、原料成本、认证、交易与船用燃料需求。" },
  { key: "ammonia", label: "氨", section: "能源价格", guide: "合成氨、绿氨、低碳氨的价格、产能、天然气与煤制成本、贸易、裂解、储运及船用燃料需求。" },
  { key: "shipping", label: "航运", section: "航运与贸易", guide: "LNG船、液化气船、化学品船、运价、船期、港口、运河、船用燃料、航线与运力变化。" },
  { key: "geopolitics", label: "国际事件", section: "国际事件", guide: "战争、制裁、关税、出口管制、政局、袭击与外交事件，以及它们对能源供应、航线、保险和价格的影响。" },
  { key: "policy", label: "政策与碳", section: "政策与市场", guide: "能源政策、碳价、绿色燃料标准、补贴、认证、IMO与欧盟规则，以及影响跨境贸易的监管变化。" },
  { key: "projects", label: "项目与装备", section: "项目与装备", guide: "清洁能源项目FID、签约、开工、投产、停产、延期、事故，以及储运、加注、船舶和工程装备订单。" },
  { key: "analysis", label: "研判", section: "市场研判", guide: "围绕价格、供需、成本曲线、贸易流和风险传导的研究、预测与解释。必须有数据或明确因果链，普通转载不归此类。", commentary: true },
] as const satisfies ReadonlyArray<{ key: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

export const RELEASE: { category: string; tag: string; unit: string } | null = null;
export const PLAIN_TERMS: readonly string[] = ["lng", "ttf", "jkm", "henry hub", "mmbtu", "imo", "ets", "fid", "fob", "cif"];

export const ITEM_TYPES = ["price_move", "supply_demand", "geopolitical_event", "shipping_event", "policy_change", "project_milestone", "market_analysis"] as const;

export const CATEGORY_TAGS = ["价格变化", "供需变化", "国际事件", "航运物流", "政策监管", "项目进展", "市场研判", "其他"] as const;
export const TOPIC_TAGS = ["LNG", "天然气", "绿色甲醇", "甲醇", "绿氨", "氨", "氢能", "船用燃料", "运价", "港口与运河", "制裁", "战争冲突", "碳价", "贸易流", "产能", "库存", "原料成本", "低碳认证", "储运装备", "加注装备"] as const;
export const ENTITY_TAGS = ["中集安瑞科", "中集集团", "欧盟", "IMO", "IEA", "EIA", "OPEC", "S&P Global", "Argus", "ICIS"] as const;

export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  价格: "价格变化", 涨价: "价格变化", 跌价: "价格变化", 供给: "供需变化", 需求: "供需变化", 库存: "库存",
  战争: "战争冲突", 冲突: "战争冲突", 制裁: "制裁", 航运: "航运物流", 运费: "运价", 海运: "航运物流",
  监管: "政策监管", 政策: "政策监管", 项目: "项目进展", 投产: "项目进展", 订单: "项目进展", 绿甲醇: "绿色甲醇",
  ammonia: "氨", methanol: "甲醇", lng: "LNG", gas: "天然气", 分析: "市场研判", 预测: "市场研判",
};

export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; otherNames?: string[] }> = {
  enric: { name: "中集安瑞科", displayTag: "中集安瑞科", aliases: ["中集安瑞科", "CIMC Enric", "安瑞科"], otherNames: ["南通中集太平洋海洋工程", "中集圣达因", "中集环科"] },
  cimc: { name: "中集集团", displayTag: "中集集团", aliases: ["中集集团", "CIMC", "中国国际海运集装箱"] },
  eu: { name: "欧盟", displayTag: "欧盟", aliases: ["欧盟", "European Union", "EU", "European Commission"] },
  imo: { name: "国际海事组织", displayTag: "IMO", aliases: ["IMO", "国际海事组织", "International Maritime Organization"] },
  iea: { name: "国际能源署", displayTag: "IEA", aliases: ["IEA", "国际能源署", "International Energy Agency"] },
  eia: { name: "美国能源信息署", displayTag: "EIA", aliases: ["EIA", "美国能源信息署", "U.S. Energy Information Administration"] },
};

export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "enric", name: "中集安瑞科", patterns: [/中集安瑞科|安瑞科|CIMC\s+Enric/i] },
  { id: "cimc", name: "中集集团", patterns: [/中集集团|中国国际海运集装箱|\bCIMC\b/i] },
  { id: "imo", name: "IMO", patterns: [/国际海事组织|\bIMO\b/i] },
  { id: "iea", name: "IEA", patterns: [/国际能源署|\bIEA\b/i] },
  { id: "eia", name: "EIA", patterns: [/美国能源信息署|\bEIA\b/i] },
];

export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "enric", domains: ["enricgroup.com", "cimcsoe.com"] },
  { entityId: "cimc", domains: ["cimc.com", "cimc.com.cn"] },
  { entityId: "imo", domains: ["imo.org"] },
  { entityId: "iea", domains: ["iea.org"] },
  { entityId: "eia", domains: ["eia.gov"] },
];

export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "enric", pattern: /南通中集太平洋|CIMC\s+SOE/i },
];
