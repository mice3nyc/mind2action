import { useState } from 'react';
import LandingPage from '../components/Landing/LandingPage';
import SurveyIntro from '../components/Survey/SurveyIntro';
import SurveyForm from '../components/Survey/SurveyForm';
import ResultPage from '../components/Result/ResultPage';
import { saveResult } from '../lib/storage';

export default function SurveyApp() {
  const [stage, setStage] = useState('landing');
  const [group, setGroup] = useState(null);
  const [profile, setProfile] = useState(null);
  const [result, setResult] = useState(null);

  function handleCodeEnter(groupName) {
    setGroup(groupName);
    setStage('intro');
  }

  function handleProfileSubmit(data) {
    setProfile({ ...data, group });
    setStage('survey');
  }

  function handleSurveyComplete(resultData) {
    const fullProfile = { ...profile, group };
    saveResult(fullProfile, resultData);
    setResult(resultData);
    setStage('result');
  }

  function handleRestart() {
    setStage('landing');
    setGroup(null);
    setProfile(null);
    setResult(null);
  }

  return (
    <>
      {stage === 'landing' && <LandingPage onEnter={handleCodeEnter} />}
      {stage === 'intro' && <SurveyIntro group={group} onSubmit={handleProfileSubmit} />}
      {stage === 'survey' && <SurveyForm onComplete={handleSurveyComplete} />}
      {stage === 'result' && <ResultPage result={result} profile={profile} onRestart={handleRestart} />}
    </>
  );
}
