import { PortfolioBadgeData } from "@/models/PortfolioData";
import { getCsvText } from "@/util/Converter";

const csvFileName = process.env.NEXT_PUBLIC_CSV_FILE_NAME as string;

export const downloadCsvForPortfolio = ({
  columnName1,
  categories,
  portfolioBadges,
}: {
  columnName1: string;
  categories: string[];
  portfolioBadges: PortfolioBadgeData[];
}) => {
  const v = portfolioBadges[0];

  const text = getCsvText(columnName1, categories, portfolioBadges);
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, text], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = getCsvFileName(v.consumer_name, v.framework_name, v.stage_name);
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

function getCsvFileName(cosumerName: string, frameworkName: string, stageName: string): string {
  var fileName = csvFileName;
  if (cosumerName?.trim()) {
    fileName += `_${cosumerName.trim()}`;
  }
  if (frameworkName?.trim()) {
    fileName += `_${frameworkName.trim()}`;
  }
  if (stageName?.trim()) {
    fileName += `_${stageName.trim()}`;
  }
  fileName += ".csv";
  // 禁則文字の削除
  var newFileName = fileName.replace(/[\\\/:\*\?\"<>\|]/g, "");
  return newFileName;
}
