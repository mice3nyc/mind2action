-- MIND2ACTION 에고그램 스키마 — 보험판 (Supabase 프로젝트 Mind2Action)
-- 2026-10-20 라이브 대조로 갱신. 그 전 판은 5월 초판 그대로라 RLS가 「전면 개방」이고 campaigns가 없었다.
--   대조 방법: 라이브 SQL Editor에서 information_schema.columns · pg_policies · pg_proc 읽기 전용 조회.
--   열 이름·타입·널 허용·기본값과 정책·함수가 아래와 같다. (실제로 쌓인 경로 = CAMPAIGNS.md · ADMIN-SECURITY.md)
-- 일반 조직판은 별도 파일 supabase-org-schema.sql (삭제 권한만 다르다).

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  client_name text not null,
  target text,
  status text not null default 'active',
  period_start date,
  period_end date,
  education_date date,
  expected_count int,
  memo text,
  created_at timestamptz default now()
);

create table if not exists responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  campaign_id uuid references campaigns(id),
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

-- 관리자 = 공유 계정 하나(admin@mind2action.kr). 로그인했으면 전부 읽고 지운다.
alter table campaigns enable row level security;
create policy "Authenticated manage campaigns" on campaigns
  for all to authenticated using (true) with check (true);

alter table responses enable row level security;
create policy "Anyone can insert responses" on responses
  for insert with check (true);
create policy "Authenticated can read responses" on responses
  for select to authenticated using (true);
create policy "Authenticated can delete responses" on responses
  for delete to authenticated using (true);

-- 설문 진입용: code 단건만 anon 조회 (전체 목록 비노출)
create or replace function get_campaign_by_code(p_code text)
returns table (id uuid, client_name text, status text, period_start date, period_end date)
language sql security definer stable
as $$
  select id, client_name, status, period_start, period_end
  from campaigns where code = p_code;
$$;
grant execute on function get_campaign_by_code(text) to anon, authenticated;
