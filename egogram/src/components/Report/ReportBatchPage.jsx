import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ReportView } from './ReportPage';

// 단체별 일괄 리포트 — 한 캠페인 전 참여자를 한 화면에 쌓아
// 브라우저 "PDF로 저장"으로 단일 PDF를 뽑는다 (CAMPAIGNS.md §9).
export default function ReportBatchPage() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [rows, setRows] = useState(null); // null=로딩, []=참여자 없음
  const [error, setError] = useState(null);
  const [rendered, setRendered] = useState(0); // 점진 렌더된 인원 수

  // 데이터 로드 (캠페인 단건 + 그 캠페인 응답 전부)
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
      setCampaign(camp || null);
      setRows(resp || []);
    }
    load();
  }, [campaignId]);

  // 점진 렌더 — 한 번에 다 마운트하면 큰 단체(40명+)에서 멈칫.
  // 청크로 나눠 마운트하며 프로그래스 바를 올린다.
  useEffect(() => {
    if (!rows || rows.length === 0 || rendered >= rows.length) return;
    const CHUNK = 2;
    const t = setTimeout(() => {
      setRendered(c => Math.min(c + CHUNK, rows.length));
    }, 16);
    return () => clearTimeout(t);
  }, [rows, rendered]);

  if (error) return <div className="report-error">{error}</div>;
  if (!rows) return <div className="report-loading">불러오는 중...</div>;

  const total = rows.length;
  const ready = rendered >= total;
  const clientName = campaign?.client_name || '캠페인';

  if (total === 0) {
    return (
      <div className="report-batch">
        <div className="report-batch-toolbar">
          <div className="report-batch-info">
            <div className="report-batch-title">{clientName} — 전체 리포트</div>
          </div>
          <div className="report-batch-count">참여자가 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-batch">
      <div className="report-batch-toolbar">
        <div className="report-batch-info">
          <div className="report-batch-title">{clientName} — 전체 리포트</div>
          <div className="report-batch-count">참여 {total}명</div>
        </div>
        <div className="report-batch-actions">
          {!ready ? (
            <div className="report-batch-progress">
              <div className="report-batch-progress-label">리포트 준비 {rendered}/{total}</div>
              <div className="report-batch-progress-track">
                <div
                  className="report-batch-progress-fill"
                  style={{ width: `${(rendered / total) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => window.print()}>
              PDF로 저장 (인쇄)
            </button>
          )}
        </div>
      </div>

      <div className="report-batch-body">
        {rows.slice(0, rendered).map(r => (
          <div key={r.id} className="report-batch-item">
            <ReportView row={r} showToggle={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
