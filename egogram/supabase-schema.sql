-- MIND2ACTION 에고그램 스키마
-- Supabase SQL Editor에서 실행

-- 설문 결과 테이블
create table if not exists responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  group_name text not null,
  name text not null,
  birth_date text,
  career_months text,
  company text,
  department text,
  job_type text,
  income_range text,
  recruit_count text,
  score_cp integer not null,
  score_np integer not null,
  score_a integer not null,
  score_fc integer not null,
  score_ac integer not null,
  total integer not null,
  top1 text not null,
  top2 text not null,
  bottom text not null,
  grades jsonb
);

-- 누구나 insert 가능 (설문 참여자)
alter table responses enable row level security;

create policy "Anyone can insert responses"
  on responses for insert
  with check (true);

-- 누구나 select 가능 (관리자 화면 — Phase 2에서 인증 추가 시 정교화)
create policy "Anyone can read responses"
  on responses for select
  using (true);

-- 삭제는 인증된 사용자만 (지금은 열어둠, Phase 2에서 제한)
create policy "Anyone can delete responses"
  on responses for delete
  using (true);
