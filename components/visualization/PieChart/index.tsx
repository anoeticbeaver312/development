import {useEffect, useState} from "react";
import styles from "./PieChart.module.css";
import Flex from "../../layout/Flex";

interface PieChartProps {
  // the name of the metric, e.g., "auth signatures"
  metricName: string;
  // a map of segment names, e.g., "signed cards", to the raw number associated with that segment,
  // e.g., 220 signatures
  segments: Map<string, { num: number, color: string }>;
}

/**
 * A piechart component that uses SVG and can render an arbitrary number of segments.
 */
function PieChart(props: PieChartProps) {
  // dynamically get the total number of items in the data to calculate percentages
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
      // set the stroke dash array: "<dash segment length> <gap between segments>"
      // subtract from circumference so the SVG circle elements are drawn in the correct order, laying on top of each other
      // correctly (largest first, so it gets covered up by the following segments)
      newPercentages.set(key, `${circumference - cumulativeArcLength} ${circumference}`);
      cumulativeArcLength += arcLength;
    }
    setPercentages(newPercentages);
  }, [circumference, total, props.segments])

  return (
    <div>
      {[...props.segments.keys()].map((segment, i) =>
        <div key={`key-${i}`} style={{color: props.segments.get(segment)?.color}}>{segment}</div>)}
      <svg className={styles.svg} viewBox="0 0 100 100">
        {[...percentages.keys()]
          .map((key: string, index: number) =>
            <circle className={styles.circle} key={index} cx="50" cy="50" r={radius / 2}
                    fill="none" stroke={props.segments.has(key) ? props.segments.get(key)?.color : "none"}
                    strokeWidth={radius / 2} strokeDasharray={percentages.get(key)}></circle>)}
      </svg>
    </div>
  )
}

export default PieChart;
