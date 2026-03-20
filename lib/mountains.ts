export type MountainType = "百岳" | "小百岳" | "中級山" | "高山" | "郊山";

export interface Mountain {
  id: string;
  name: string;
  height: number;
  type: MountainType;
  lat: number;
  lng: number;
}

export const MOUNTAIN_TYPES: MountainType[] = [
  "百岳",
  "小百岳",
  "中級山",
  "高山",
  "郊山",
];

export const MOUNTAIN_TYPE_COLORS: Record<MountainType, string> = {
  百岳: "#ef4444",
  小百岳: "#22c55e",
  中級山: "#3b82f6",
  高山: "#a855f7",
  郊山: "#6b7280",
};

export const MOUNTAIN_TYPE_LABELS: Record<MountainType, string> = {
  百岳: "Hundred Peaks",
  小百岳: "Small Hundred",
  中級山: "Intermediate",
  高山: "High Mountain",
  郊山: "Suburban",
};

export const mountains: Mountain[] = [
  { id: "001", name: "磺嘴山", height: 912, type: "中級山", lat: 25.168, lng: 121.574 },
  { id: "002", name: "大屯山", height: 1092, type: "小百岳", lat: 25.176, lng: 121.521 },
  { id: "003", name: "七星山", height: 1120, type: "小百岳", lat: 25.17, lng: 121.545 },
  { id: "004", name: "觀音山", height: 616, type: "小百岳", lat: 25.137, lng: 121.423 },
  { id: "005", name: "基隆山", height: 587, type: "小百岳", lat: 25.119, lng: 121.846 },
  { id: "006", name: "獅仔頭山", height: 858, type: "小百岳", lat: 24.908, lng: 121.503 },
  { id: "007", name: "北插天山", height: 1727, type: "中級山", lat: 24.792, lng: 121.448 },
  { id: "008", name: "阿玉山", height: 1420, type: "中級山", lat: 24.789, lng: 121.603 },
  { id: "009", name: "鳥嘴山", height: 1749, type: "中級山", lat: 24.577, lng: 121.282 },
  { id: "010", name: "塔曼山", height: 2130, type: "中級山", lat: 24.707, lng: 121.436 },
  { id: "011", name: "李崠山", height: 1914, type: "小百岳", lat: 24.646, lng: 121.3 },
  { id: "012", name: "巴博庫魯山", height: 2101, type: "中級山", lat: 24.673, lng: 121.47 },
  { id: "013", name: "雪白山", height: 2444, type: "中級山", lat: 24.611, lng: 121.373 },
  { id: "014", name: "霞喀羅大山", height: 2234, type: "中級山", lat: 24.567, lng: 121.233 },
  { id: "015", name: "仙山", height: 967, type: "小百岳", lat: 24.545, lng: 120.948 },
  { id: "016", name: "加里山", height: 2220, type: "小百岳", lat: 24.516, lng: 121.033 },
  { id: "017", name: "鹿場大山", height: 2360, type: "中級山", lat: 24.498, lng: 121.05 },
  { id: "018", name: "虎山", height: 1492, type: "中級山", lat: 24.467, lng: 120.983 },
  { id: "019", name: "大霸尖山", height: 3492, type: "百岳", lat: 24.464, lng: 121.258 },
  { id: "020", name: "東洗水山", height: 2248, type: "中級山", lat: 24.408, lng: 120.983 },
  { id: "021", name: "桃山", height: 3325, type: "百岳", lat: 24.417, lng: 121.3 },
  { id: "022", name: "品田山", height: 3529, type: "百岳", lat: 24.428, lng: 121.267 },
  { id: "023", name: "穆特勒布山", height: 3626, type: "高山", lat: 24.417, lng: 121.25 },
  { id: "024", name: "雪山", height: 3886, type: "百岳", lat: 24.383, lng: 121.233 },
  { id: "025", name: "火炎山", height: 602, type: "小百岳", lat: 24.363, lng: 120.73 },
  { id: "026", name: "馬那邦山", height: 1407, type: "小百岳", lat: 24.367, lng: 120.917 },
  { id: "027", name: "南湖東峰", height: 3632, type: "百岳", lat: 24.364, lng: 121.441 },
  { id: "028", name: "南湖大山", height: 3742, type: "百岳", lat: 24.358, lng: 121.433 },
  { id: "029", name: "中央尖山", height: 3705, type: "百岳", lat: 24.317, lng: 121.4 },
  { id: "030", name: "稍來山", height: 2307, type: "小百岳", lat: 24.233, lng: 120.967 },
  { id: "031", name: "白姑大山", height: 3341, type: "百岳", lat: 24.204, lng: 121.107 },
  { id: "032", name: "東卯山", height: 1690, type: "中級山", lat: 24.183, lng: 120.933 },
  { id: "033", name: "合歡北峰", height: 3422, type: "百岳", lat: 24.181, lng: 121.283 },
  { id: "034", name: "八仙山", height: 2366, type: "中級山", lat: 24.167, lng: 121.017 },
  { id: "035", name: "合歡山", height: 3417, type: "百岳", lat: 24.142, lng: 121.272 },
  { id: "036", name: "守城大山", height: 2420, type: "中級山", lat: 24.067, lng: 121.083 },
  { id: "037", name: "能高山", height: 3262, type: "百岳", lat: 24.033, lng: 121.283 },
  { id: "038", name: "馬海濮富士山", height: 2617, type: "中級山", lat: 24.017, lng: 121.183 },
  { id: "039", name: "能高南峰", height: 3349, type: "百岳", lat: 24.0, lng: 121.283 },
  { id: "040", name: "九份二山", height: 1174, type: "小百岳", lat: 23.95, lng: 120.833 },
  { id: "041", name: "干卓萬山", height: 3284, type: "百岳", lat: 23.9, lng: 121.133 },
  { id: "042", name: "安東軍山", height: 3068, type: "百岳", lat: 23.867, lng: 121.267 },
  { id: "043", name: "集集大山", height: 1392, type: "小百岳", lat: 23.85, lng: 120.817 },
  { id: "044", name: "水社大山", height: 2059, type: "中級山", lat: 23.842, lng: 120.95 },
  { id: "045", name: "治茆山", height: 2909, type: "中級山", lat: 23.8, lng: 120.983 },
  { id: "046", name: "鳳凰山", height: 1698, type: "小百岳", lat: 23.7, lng: 120.817 },
  { id: "047", name: "東郡大山", height: 3619, type: "百岳", lat: 23.683, lng: 121.05 },
  { id: "048", name: "石壁山", height: 1752, type: "小百岳", lat: 23.608, lng: 120.717 },
  { id: "049", name: "丹大山", height: 3325, type: "百岳", lat: 23.633, lng: 121.183 },
  { id: "050", name: "雲嘉大尖山", height: 1304, type: "小百岳", lat: 23.583, lng: 120.617 },
  { id: "051", name: "郡大山", height: 3265, type: "百岳", lat: 23.583, lng: 120.95 },
  { id: "052", name: "大塔山", height: 2663, type: "小百岳", lat: 23.533, lng: 120.8 },
  { id: "053", name: "馬利加南山", height: 3546, type: "百岳", lat: 23.517, lng: 121.117 },
  { id: "054", name: "馬博拉斯山", height: 3785, type: "百岳", lat: 23.517, lng: 121.067 },
  { id: "055", name: "秀姑巒山", height: 3805, type: "百岳", lat: 23.5, lng: 121.05 },
  { id: "056", name: "玉山北峰", height: 3858, type: "百岳", lat: 23.485, lng: 120.953 },
  { id: "057", name: "大水窟山", height: 3642, type: "百岳", lat: 23.467, lng: 121.05 },
  { id: "058", name: "玉山", height: 3952, type: "百岳", lat: 23.47, lng: 120.957 },
  { id: "059", name: "玉穗山", height: 1578, type: "中級山", lat: 23.233, lng: 120.817 },
  { id: "060", name: "大凍山", height: 1241, type: "小百岳", lat: 23.317, lng: 120.5 },
  { id: "061", name: "向陽山", height: 3602, type: "百岳", lat: 23.283, lng: 120.983 },
  { id: "062", name: "關山", height: 3666, type: "百岳", lat: 23.267, lng: 120.917 },
  { id: "063", name: "石山", height: 2818, type: "中級山", lat: 23.117, lng: 120.783 },
  { id: "064", name: "卑南主山", height: 3295, type: "百岳", lat: 23.083, lng: 120.867 },
  { id: "065", name: "尾寮山", height: 1427, type: "小百岳", lat: 22.867, lng: 120.633 },
  { id: "066", name: "大母母山", height: 2424, type: "中級山", lat: 22.75, lng: 120.75 },
  { id: "067", name: "知本主山", height: 2230, type: "中級山", lat: 22.717, lng: 120.933 },
  { id: "068", name: "井步山", height: 2066, type: "中級山", lat: 22.733, lng: 120.733 },
  { id: "069", name: "霧頭山", height: 2736, type: "中級山", lat: 22.683, lng: 120.783 },
  { id: "070", name: "壽山", height: 356, type: "小百岳", lat: 22.65, lng: 120.267 },
  { id: "071", name: "北大武山", height: 3092, type: "百岳", lat: 22.628, lng: 120.76 },
  { id: "072", name: "南大武山", height: 2841, type: "中級山", lat: 22.567, lng: 120.75 },
  { id: "073", name: "里龍山", height: 1062, type: "小百岳", lat: 22.183, lng: 120.717 },
  { id: "074", name: "烘爐地山", height: 1166, type: "中級山", lat: 24.85, lng: 121.733 },
  { id: "075", name: "三星山", height: 2352, type: "小百岳", lat: 24.517, lng: 121.567 },
  { id: "076", name: "飯包山", height: 1857, type: "中級山", lat: 24.5, lng: 121.683 },
  { id: "077", name: "清水大山", height: 2408, type: "中級山", lat: 24.233, lng: 121.617 },
  { id: "078", name: "三角錐山", height: 2607, type: "中級山", lat: 24.2, lng: 121.567 },
  { id: "079", name: "塔山", height: 2449, type: "中級山", lat: 24.15, lng: 121.533 },
  { id: "080", name: "佐久間山", height: 2809, type: "中級山", lat: 24.117, lng: 121.517 },
  { id: "081", name: "奇萊北峰", height: 3607, type: "百岳", lat: 24.114, lng: 121.333 },
  { id: "082", name: "太魯閣大山", height: 3283, type: "百岳", lat: 24.083, lng: 121.433 },
  { id: "083", name: "鯉魚山", height: 601, type: "小百岳", lat: 23.933, lng: 121.517 },
  { id: "084", name: "木瓜山", height: 2427, type: "中級山", lat: 23.9, lng: 121.467 },
  { id: "085", name: "針山", height: 2340, type: "中級山", lat: 23.867, lng: 121.367 },
  { id: "086", name: "南二子山", height: 2454, type: "中級山", lat: 23.833, lng: 121.417 },
  { id: "087", name: "王武塔山", height: 2022, type: "中級山", lat: 23.75, lng: 121.383 },
  { id: "088", name: "阿屘那來山", height: 3061, type: "高山", lat: 23.717, lng: 121.3 },
  { id: "089", name: "八里灣山", height: 924, type: "小百岳", lat: 23.533, lng: 121.517 },
  { id: "090", name: "馬西山", height: 3443, type: "百岳", lat: 23.417, lng: 121.183 },
  { id: "091", name: "玉里山", height: 2157, type: "中級山", lat: 23.367, lng: 121.283 },
  { id: "092", name: "新康山", height: 3331, type: "百岳", lat: 23.333, lng: 121.133 },
  { id: "093", name: "成廣澳山", height: 1598, type: "中級山", lat: 23.167, lng: 121.35 },
  { id: "094", name: "新港山", height: 1682, type: "中級山", lat: 23.133, lng: 121.317 },
  { id: "095", name: "美奈田主山", height: 2931, type: "中級山", lat: 22.95, lng: 120.933 },
  { id: "096", name: "都蘭山", height: 1190, type: "小百岳", lat: 22.883, lng: 121.183 },
  { id: "097", name: "火燒山", height: 280, type: "郊山", lat: 22.667, lng: 121.483 },
  { id: "098", name: "太麻里山", height: 1340, type: "小百岳", lat: 22.633, lng: 120.967 },
  { id: "099", name: "紅頭山", height: 552, type: "小百岳", lat: 22.05, lng: 121.55 },
  { id: "100", name: "太武山", height: 253, type: "小百岳", lat: 24.461, lng: 118.426 },
];

export function getMountainStats() {
  const stats: Record<MountainType, number> = {
    百岳: 0,
    小百岳: 0,
    中級山: 0,
    高山: 0,
    郊山: 0,
  };

  mountains.forEach((m) => {
    stats[m.type]++;
  });

  return stats;
}

export function getHighestMountain() {
  return mountains.reduce((prev, curr) =>
    prev.height > curr.height ? prev : curr
  );
}

export function getTotalMountains() {
  return mountains.length;
}
