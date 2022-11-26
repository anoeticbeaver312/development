import { useEffect, useState } from "react";
import styles from "./PieChart.module.css";

interface PieChartProps {
  // the name of the metric, e.g., "auth signatures"
  metricName: string;
  // a map of segment names, e.g., "signed cards", to the raw number associated with that segment,
  // e.g., 220 signatures
  segments: Map<string, { num: number, color: string }>;
}

function PieChart(props: PieChartProps) {
  const [total, setTotal] = useState(0);
  // map segment names to their corresponding stroke dash array
  const [percentages, setPercentages] = useState<Map<string, string>>(new Map());

  const radius = 50;
  const circumference = 2 * Math.PI * (radius / 2);

  useEffect(() => {
    setTotal([...props.segments.values()].reduce((prev: number, curr: { num: number, color: string }) => prev + curr.num, 0));
  }, [props.segments])

  useEffect(() => {
    const newPercentages = new Map();
    // track how far along the circle we are
    let cumulativeArcLength = 0;
    for (const [key, value] of props.segments) {
      const percentage = value.num / total;
      const arcLength = percentage * circumference;
      newPercentages.set(key, `${cumulativeArcLength + arcLength} ${circumference}`);
      cumulativeArcLength += arcLength;
    }
    setPercentages(newPercentages);
  }, [total, props.segments])

  return (
    <svg className={styles.svg} viewBox="0 0 100 100">
      {[...percentages.keys()]
        .reverse().map((key: string, index: number) =>
          <circle className={styles.circle} key={index} cx="50" cy="50" r={radius / 2}
            fill="none" stroke={props.segments.get(key)?.color}
            strokeWidth={radius / 2} strokeDasharray={percentages.get(key)}></circle>)}
    </svg>
  )
}

export default PieChart;
