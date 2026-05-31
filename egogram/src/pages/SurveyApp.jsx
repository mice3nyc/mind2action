import { useState } from 'react';
import LandingPage from '../components/Landing/LandingPage';
import SurveyIntro from '../components/Survey/SurveyIntro';
import SurveyForm from '../components/Survey/SurveyForm';
import ResultPage from '../components/Result/ResultPage';
import { saveResult } from '../lib/storage';

export default function SurveyApp() {
  const [stage, setStage] = useState('landing');
  const [campaign, setCampaign] = useState(null);
  const [profile, setProfile] = useState(null);
  const [result, setResult] = useState(null);

  function handleEnter(camp) {
    setCampaign(camp);
    setStage('intro');
  }

  function handleProfileSubmit(data) {
    setProfile({ ...data, group: campaign?.client_name || '' });
    setStage('survey');
  }

  async function handleSurveyComplete(resultData) {
    const fullProfile = { ...profile, group: campaign?.client_name || '' };
    await saveResult(fullProfile, resultData, campaign?.id || null);
    setResult(resultData);
    setStage('result');
  }

  function handleRestart() {
    setStage('landing');
    setProfile(null);
    setResult(null);
  }

  return (
    <>
      {stage === 'landing' && <LandingPage onEnter={handleEnter} />}
      {stage === 'intro' && <SurveyIntro group={campaign?.client_name} onSubmit={handleProfileSubmit} />}
      {stage === 'survey' && <SurveyForm onComplete={handleSurveyComplete} />}
      {stage === 'result' && <ResultPage result={result} profile={profile} onRestart={handleRestart} />}
    </>
  );
}
