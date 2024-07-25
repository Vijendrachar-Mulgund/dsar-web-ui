import { useParams } from "react-router-dom";

export function CaseDetail() {
  const { caseId } = useParams();

  return <div>CaseDetail: {caseId}</div>;
}
