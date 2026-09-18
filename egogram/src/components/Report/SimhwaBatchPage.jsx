import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { SimhwaView } from './SimhwaReportView';
import { sortRows, isValidSortKey } from '../../lib/resultLabels';
import { isSimhwaTarget } from '../../lib/reportType';

// 심화코칭 일괄 출력 — 한 캠페인의 심화 대상 전원을 한 화면에 쌓아 PDF 하나로 (SPEC simhwa §23-2).
//   출력한 뒤 고객에게 한 명씩 순서대로 나눠 주는 용도(피터공 9/18). 사람마다 표지부터 새 쪽.
//   뼈대는 성향리포트 일괄(ReportBatchPage)과 같다 — 정렬 승계·청크 점진 렌더·진행 바.
//   대상 = 보험설계사만(심화는 sales 전용). 판정은 관리자 표 심화 버튼과 같은 함수(lib/reportType).
export default function SimhwaBatchPage() {
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();
  const sortKeyParam = searchParams.get('sortKey');
  const sortConfig = isValidSortKey(sortKeyParam)
    ? { key: sortKeyParam, dir: searchParams.get('sortDir') === 'desc' ? 'desc' : 'asc' }
    : null;
  const [campaign, setCampaign] = useState(null);
  const [rows, setRows] = useState(null); // null=로딩, []=대상 없음
  const [allCount, setAllCount] = useState(0);
  const [error, setError] = useState(null);
  const [rendered, setRendered] = useState(0);

  useEffect(() => {
    async function load() {
      const { data: camp } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();
      const { data: resp, error: err } = await supabase
        .from('responses')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: true });
      if (err) {
        setError('응답을 불러오지 못했습니다.');
        return;
      }
      const all = resp || [];
      setCampaign(camp || null);
      setAllCount(all.length);
      setRows(sortRows(all.filter(r => isSimhwaTarget(r.job_type)), sortConfig));
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId]);

  // 점진 렌더 — 심화는 1인 10쪽이라 성향리포트보다 무겁다. 같은 청크 2명.
  useEffect(() => {
    if (!rows || rows.length === 0 || rendered >= rows.length) return;
    const t = setTimeout(() => setRendered(c => Math.min(c + 2, rows.length)), 16);
    return () => clearTimeout(t);
  }, [rows, rendered]);

  if (error) return <div className="report-error">{error}</div>;
  if (!rows) return <div className="report-loading">불러오는 중...</div>;

  const total = rows.length;
  const ready = rendered >= total;
  const clientName = campaign?.client_name || '캠페인';
  const countLabel = total === allCount ? `심화 대상 ${total}명` : `심화 대상 ${total}명 (전체 ${allCount}명 중 보험설계사)`;

  return (
    <div className="report-batch simhwa-batch">
      <div className="report-batch-toolbar">
        <div className="report-batch-info">
          <div className="report-batch-title">{clientName} — 심화코칭 전체</div>
          <div className="report-batch-count">{total === 0 ? '심화 대상(보험설계사)이 없습니다.' : countLabel}</div>
        </div>
        {total > 0 && (
          <div className="report-batch-actions">
            {!ready ? (
              <div className="report-batch-progress">
                <div className="report-batch-progress-label">리포트 준비 {rendered}/{total}</div>
                <div className="report-batch-progress-track">
                  <div className="report-batch-progress-fill" style={{ width: `${(rendered / total) * 100}%` }} />
                </div>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={() => window.print()}>
                PDF로 저장 (인쇄)
              </button>
            )}
          </div>
        )}
      </div>

      <div className="report-batch-body">
        {rows.slice(0, rendered).map(r => (
          <div key={r.id} className="simhwa-batch-item">
            <SimhwaView row={r} />
          </div>
        ))}
      </div>
    </div>
  );
}
