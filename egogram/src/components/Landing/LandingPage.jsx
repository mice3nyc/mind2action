import { useState, useEffect } from 'react';
import { getCampaignByCode } from '../../lib/campaigns';

// 링크는 survey.mind2action.kr/?g=code (해시 앞 쿼리)
function getCodeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('g');
}

export default function LandingPage({ onEnter }) {
  // loading / ready / nolink / invalid / closed
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
        setState('closed');
      } else {
        setCampaign(c);
        setState('ready');
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
        <div className="landing-badge">EGOGRAM</div>
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
        <div className="landing-badge">EGOGRAM</div>
        <h1>설문이<br />종료되었습니다</h1>
        <p className="landing-desc">현재 진행 중인 설문이 아닙니다.</p>
      </section>
    );
  }

  // ready
  return (
    <section className="landing-section">
      <div className="landing-badge">EGOGRAM</div>
      <div className="intro-group-badge">{campaign.client_name}</div>
      <h1>나를 알면<br />행동이 바뀝니다</h1>
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
