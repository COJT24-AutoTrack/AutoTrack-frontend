// ===== 定数マッピング =====
const plateCategoryMap: Record<string, string> = {
	A: "小板・2枚・ペイント 希望",
	B: "大板・2枚・ペイント 希望",
	C: "小板・1枚・ペイント 希望",
	D: "大板・1枚・ペイント 希望",
	E: "小板・2枚・字光 希望",
	F: "大板・2枚・字光 希望",
	G: "小板・1枚・字光 希望",
	H: "大板・1枚・字光 希望",
	"1": "小板・2枚・ペイント 希望以外",
	"2": "大板・2枚・ペイント 希望以外",
	"3": "小板・1枚・ペイント 希望以外",
	"4": "大板・1枚・ペイント 希望以外",
	"5": "小板・2枚・字光 希望以外",
	"6": "大板・2枚・字光 希望以外",
	"7": "小板・1枚・字光 希望以外",
	"8": "大板・1枚・字光 希望以外",
	"-": "番号指示キー無し又は転入抹消番号",
};

const KcarPlateCategoryMap: Record<string, string> = {
	A: "中板・2枚・ペイント 希望",
	B: "小板・2枚・ペイント 希望",
	C: "中板・1枚・ペイント 希望",
	D: "小板・1枚・ペイント 希望",
	E: "中板・2枚・字光 希望",
	F: "小板・2枚・字光 希望",
	G: "中板・1枚・字光 希望",
	H: "小板・1枚・字光 希望",
	"1": "中板・2枚・ペイント 希望以外",
	"2": "小板・2枚・ペイント 希望以外",
	"3": "中板・1枚・ペイント 希望以外",
	"4": "小板・1枚・ペイント 希望以外",
	"5": "中板・2枚・字光 希望以外",
	"6": "小板・2枚・字光 希望以外",
	"7": "中板・1枚・字光 希望以外",
	"8": "小板・1枚・字光 希望以外",
	"-": "番号指示キー無し又は転入抹消番号",
};

const fuelTypeMap: Record<string, string> = {
	"01": "ガソリン",
	"02": "軽油",
	"03": "LPG",
	"04": "灯油",
	"05": "電気",
	"06": "ガソリン・LPG",
	"07": "ガソリン・灯油",
	"08": "メタノール",
	"09": "CNG",
	"11": "LNG",
	"12": "ANG",
	"13": "圧縮水素",
	"14": "ガソリン・電気",
	"15": "LPG・電気",
	"16": "軽油・電気",
	"17": "ガソリン・LPG(切替式)",
	"18": "ガソリン・灯油(切替式)",
	"99": "その他",
	"00": "-",
	"--": "-",
};

const convertAxleWeight = (value: string): string => {
	const numericValue = parseInt(value, 10) * 10;
	return isNaN(numericValue) ? "-" : `${numericValue}kg`;
};

const getFuelType = (type: string): string => {
	return fuelTypeMap[type] || "-";
};

const getPlateCategory = (category: string): string => {
	return plateCategoryMap[category] || "-";
};

const getKcarPlateCategory = (category: string): string => {
	return KcarPlateCategoryMap[category] || "-";
};

const formatDate = (dateString: string): string => {
	if (!/^\d{6}$/.test(dateString)) return "-";
	if (dateString === "999999") return "-";

	const yearPart = parseInt(dateString.substring(0, 2), 10);
	const month = dateString.substring(2, 4);
	const day = dateString.substring(4, 6);

	const currentYear = new Date().getFullYear();
	let year = 2000 + yearPart;

	if (year > currentYear) {
		year -= 100;
	}

	return `${year}/${month}/${day}`;
};

const formatYearMonth = (yearMonthString: string): string => {
	if (!/^\d{4}$/.test(yearMonthString)) return "-";
	if (yearMonthString === "999999") return "-";

	const yearPart = parseInt(yearMonthString.substring(0, 2), 10);
	const month = yearMonthString.substring(2, 4);

	const currentYear = new Date().getFullYear();
	let year = 2000 + yearPart;

	if (year > currentYear) {
		year -= 100;
	}

	return `${year}/${month}`;
};

// ===== ヘッダ配列 =====
export const StandardCarheaders = [
	"バージョン情報",
	"車台番号打刻位置",
	"型式指定番号・類別区分番号",
	"有効期間の満了する日",
	"初度登録年月",
	"型式",
	"軸重(前前)",
	"軸重(前後)",
	"軸重(後前)",
	"軸重(後後)",
	"騒音規制",
	"近接排気騒音規制値",
	"駆動方式",
	"オパシメータ測定車",
	"NOx・PM測定モード",
	"NOx値",
	"PM値",
	"保安基準適用年月日",
	"燃料の種類コード",
	"バージョン情報",
	"自動車登録番号および車両番号",
	"標板の枚数・大きさ・希望番号の識別",
	"車台番号",
	"原動機型式",
	"帳票種別",
];

export const KCarHeaders = [
	"システムID",
	"バージョン番号",
	"車台番号打刻位置",
	"型式指定番号・類別区分番号",
	"有効期間満了日",
	"初度検査年月",
	"型式",
	"軸重(前前)",
	"軸重(前後)",
	"軸重(後前)",
	"軸重(後後)",
	"騒音規制",
	"近接排気騒音規制値",
	"駆動方式",
	"オパシメータ測定車",
	"NOx・PM測定モード",
	"NOx値",
	"PM値",
	"燃料の種類コード",
	"予備項目",
	"システムID",
	"バージョン情報",
	"自動車登録番号および車両番号",
	"標板の枚数・大きさ・希望番号の識別",
	"車台番号",
	"原動機型式",
	"帳票種別",
];

export const getDisplayValue = (
	isKcar: boolean,
	idx: number,
	val: string,
): string => {
	if (isKcar) {
		// 軽自動車向け処理
		switch (idx) {
			case 4:
				return formatDate(val);
			case 5:
				return formatYearMonth(val);
			case 7:
			case 8:
			case 9:
			case 10:
				return convertAxleWeight(val);
			case 11:
				return `平成${val}年騒音規制適合車`;
			case 12:
				return `${parseInt(val, 10)} dB`;
			case 18:
				// 999999 は「-」扱い
				return val === "999999" ? "-" : val;
			case 19:
				return getFuelType(val);
			case 23:
				return getKcarPlateCategory(val);
			default:
				return val;
		}
	} else {
		// 普通車向け処理
		switch (idx) {
			case 3:
				return formatDate(val);
			case 4:
				return formatYearMonth(val);
			case 6:
			case 7:
			case 8:
			case 9:
				return convertAxleWeight(val);
			case 10:
				return `平成${val}年騒音規制適合車`;
			case 11:
				return `${parseInt(val, 10)} dB`;
			case 17:
				return val === "999999" ? "-" : val;
			case 18:
				return getFuelType(val);
			case 21:
				return getPlateCategory(val);
			default:
				return val;
		}
	}
};
