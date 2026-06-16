import { useEffect, useState } from 'react';
import { loadCampaignAverage } from '../../lib/storage';
import { MyRadar, GroupRadar, DiffBars, diffHeadline } from './InsightCharts';

// 결과 화면 "성향 인사이트" 팝업 (검토 프로토타입, 26.0616).
//   탭1 내 성향의 모양(레이더) · 탭2 전체 속 내 위치(그룹 평균 비교)
//   campaignId가 있으면 그룹 평균을 라이브 조회, 없으면(프리뷰) fallbackGroupAvg(예시) 사용.
//   라이브 리포트엔 미반영 — 결과 화면에서 열어보고 검토만.

const navBtnStyle = (enabled) => ({
  padding: '6px 14px', fontSize: 13, fontWeight: 700, borderRadius: 8,
  border: '1px solid', borderColor: enabled ? '#0012de' : '#e5e5e5',
  background: '#fff', color: enabled ? '#0012de' : '#ccc',
  cursor: enabled ? 'pointer' : 'default',
});

export default function ResultInsightModal({ open, onClose, result, profile, campaignId, fallbackGroupAvg, position, onPrev, onNext }) {
  const [tab, setTab] = useState('shape');
  const [group, setGroup] = useState(null); // { avg, n } | null
  const [loading, setLoading] = useState(false);
  const [isSample, setIsSample] = useState(false);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    async function run() {
      if (campaignId) {
        setLoading(true);
        const data = await loadCampaignAverage(campaignId);
        if (!alive) return;
        setGroup(data);
        setIsSample(false);
        setLoading(false);
      } else if (fallbackGroupAvg) {
        setGroup({ avg: fallbackGroupAvg, n: null });
        setIsSample(true);
      } else {
        setGroup(null);
      }
    }
    run();
    return () => { alive = false; };
  }, [open, campaignId, fallbackGroupAvg]);

  // 좌우 화살표 키로 이전/다음 사람 이동
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      else if (e.key === 'ArrowRight' && onNext) onNext();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onPrev, onNext, onClose]);

  if (!open) return null;

  const scores = result.scores;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(20,20,30,0.45)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 440,
        maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
        padding: '20px 20px 24px',
      }}>
        {/* 헤더 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{profile?.name}님의 성향 인사이트</h3>
          <button onClick={onClose} aria-label="닫기" style={{
            border: 'none', background: 'none', fontSize: 22, lineHeight: 1, color: '#999', cursor: 'pointer', padding: 4,
          }}>×</button>
        </div>
        <p style={{ margin: '0 0 12px', fontSize: 12, color: '#aaa' }}>검토용 미리보기 (리포트 미반영)</p>

        {/* 이전/다음 사람 이동 (← → 키도 가능) */}
        {(onPrev || onNext || position) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 8 }}>
            <button onClick={onPrev} disabled={!onPrev} style={navBtnStyle(!!onPrev)}>‹ 이전</button>
            <span style={{ fontSize: 12, color: '#999', fontWeight: 600 }}>{position}</span>
            <button onClick={onNext} disabled={!onNext} style={navBtnStyle(!!onNext)}>다음 ›</button>
          </div>
        )}

        {/* 탭 */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          {[['shape', '내 성향의 모양'], ['group', '전체 속 내 위치']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              flex: 1, padding: '9px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              border: '1px solid', borderColor: tab === key ? '#0012de' : '#e0e0e0',
              background: tab === key ? '#0012de' : '#fff', color: tab === key ? '#fff' : '#666',
              borderRadius: 9, transition: 'all 0.12s',
            }}>{label}</button>
          ))}
        </div>

        {/* 탭1: 내 성향의 모양 */}
        {tab === 'shape' && (
          <div>
            <MyRadar scores={scores} jobType={profile?.jobType} />
            <p style={{ textAlign: 'center', fontSize: 12, color: '#888', margin: '6px 0 0' }}>
              <span style={{ display: 'inline-block', width: 14, height: 8, background: '#10b98133', verticalAlign: 'middle', marginRight: 4 }} />
              옅은 영역 = 조율이 필요없는 구간
            </p>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#555', margin: '14px 4px 0', lineHeight: 1.6 }}>
              다섯 성향의 균형이 만드는 <b>나만의 모양</b>입니다. 안쪽으로 들어간 축은
              상황에 따라 의식적으로 끌어올릴 여지가 있는 부분입니다.
            </p>
          </div>
        )}

        {/* 탭2: 전체 속 내 위치 */}
        {tab === 'group' && (
          <div>
            {loading ? (
              <p style={{ textAlign: 'center', color: '#999', padding: '30px 0' }}>그룹 데이터 불러오는 중…</p>
            ) : group ? (
              <>
                {isSample && (
                  <p style={{ textAlign: 'center', fontSize: 12, color: '#c47f00', background: '#fff8e6', borderRadius: 8, padding: '6px 8px', margin: '0 0 12px' }}>
                    예시 데이터입니다 (실제 그룹 미연결)
                  </p>
                )}
                {!isSample && group.n < 5 && (
                  <p style={{ textAlign: 'center', fontSize: 12, color: '#c47f00', background: '#fff8e6', borderRadius: 8, padding: '6px 8px', margin: '0 0 12px' }}>
                    표본 {group.n}명 — 참고용으로만 봐주세요
                  </p>
                )}
                <p style={{ textAlign: 'center', fontSize: 14, color: '#333', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.5 }}>
                  {diffHeadline(scores, group.avg)}
                </p>
                <GroupRadar scores={scores} groupAvg={group.avg} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '4px 0 14px', fontSize: 12, color: '#666' }}>
                  <span><span style={{ display: 'inline-block', width: 14, height: 3, background: '#0012de', verticalAlign: 'middle', marginRight: 4 }} />나</span>
                  <span><span style={{ display: 'inline-block', width: 14, height: 0, borderTop: '2px dashed #9aa0a6', verticalAlign: 'middle', marginRight: 4 }} />그룹 평균{!isSample && group.n ? ` (${group.n}명)` : ''}</span>
                </div>
                <DiffBars scores={scores} groupAvg={group.avg} />
              </>
            ) : (
              <p style={{ textAlign: 'center', color: '#999', padding: '30px 0', fontSize: 14, lineHeight: 1.6 }}>
                아직 비교할 그룹 데이터가 없습니다.<br />같은 캠페인에 응답이 쌓이면 표시됩니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
