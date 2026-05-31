import { useState, useEffect } from 'react';
import { getCampaignByCode } from '../../lib/campaigns';

// 링크는 survey.mind2action.kr/?g=code (해시 앞 쿼리)
function getCodeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('g');
}

// 로컬(클라) 기준 오늘 'YYYY-MM-DD' — 이 포맷은 사전식 == 시간순이라 문자열 비교로 충분
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// 'YYYY-MM-DD' → 'M.D'
function fmtDate(s) {
  if (!s) return '';
  const [, m, d] = s.split('-');
  return `${Number(m)}.${Number(d)}`;
}

// 참여기간 표시 문구
function fmtRange(start, end) {
  if (start && end) return `${fmtDate(start)} ~ ${fmtDate(end)}`;
  if (start) return `${fmtDate(start)}부터`;
  if (end) return `${fmtDate(end)}까지`;
  return '';
}

export default function LandingPage({ onEnter }) {
  // loading / ready / nolink / invalid / closed / notstarted / ended
  const [state, setState] = useState('loading');
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const code = getCodeFromUrl();
    if (!code) {
      setState('nolink');
      return;
    }
    getCampaignByCode(code.trim()).then(c => {
      if (!c) {
        setState('invalid');
      } else if (c.status !== 'active') {
        // [마감] 등 수동 상태가 날짜보다 우선 (즉시 오버라이드)
        setState('closed');
      } else {
        // 참여기간 자동 차단 (클라 today 기준, period_*는 'YYYY-MM-DD' 또는 null)
        const today = todayStr();
        if (c.period_start && today < c.period_start) {
          setCampaign(c);
          setState('notstarted');
        } else if (c.period_end && today > c.period_end) {
          setCampaign(c);
          setState('ended');
        } else {
          setCampaign(c);
          setState('ready');
        }
      }
    });
  }, []);

  if (state === 'loading') {
    return (
      <section className="landing-section">
        <p className="landing-desc">설문을 불러오는 중...</p>
      </section>
    );
  }

  if (state === 'nolink' || state === 'invalid') {
    return (
      <section className="landing-section">
        <h1>설문 링크를<br />확인해 주세요</h1>
        <p className="landing-desc">
          발급된 설문 링크로만 참여할 수 있습니다.<br />
          링크가 올바른지 확인해 주세요.
        </p>
      </section>
    );
  }

  if (state === 'closed') {
    return (
      <section className="landing-section">
        <h1>설문이<br />종료되었습니다</h1>
        <p className="landing-desc">현재 진행 중인 설문이 아닙니다.</p>
      </section>
    );
  }

  if (state === 'notstarted') {
    return (
      <section className="landing-section">
        {campaign?.client_name && <div className="intro-group-badge">소속: {campaign.client_name}</div>}
        <h1>아직 설문<br />기간이 아닙니다</h1>
        <p className="landing-desc">
          설문 참여 기간이 시작되면 다시 접속해 주세요.
          {(campaign?.period_start || campaign?.period_end) && (
            <><br />참여 기간 {fmtRange(campaign.period_start, campaign.period_end)}</>
          )}
        </p>
      </section>
    );
  }

  if (state === 'ended') {
    return (
      <section className="landing-section">
        {campaign?.client_name && <div className="intro-group-badge">소속: {campaign.client_name}</div>}
        <h1>설문 기간이<br />종료되었습니다</h1>
        <p className="landing-desc">
          설문 참여 기간이 지났습니다.
          {(campaign?.period_start || campaign?.period_end) && (
            <><br />참여 기간 {fmtRange(campaign.period_start, campaign.period_end)}</>
          )}
        </p>
      </section>
    );
  }

  // ready
  return (
    <section className="landing-section">
      <div className="intro-group-badge">소속: {campaign.client_name}</div>
      <h1>나를 알면 행동이 바뀝니다</h1>
      <p className="landing-desc">
        50문항 성향 진단 설문입니다.<br />
        약 5~10분 소요됩니다. 아래 버튼을 눌러 시작하세요.
      </p>
      <button type="button" className="btn btn-primary btn-full" onClick={() => onEnter(campaign)}>
        시작하기
      </button>
    </section>
  );
}
