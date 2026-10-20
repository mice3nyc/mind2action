-- MIND2ACTION 일반 조직판 스키마 — SPEC-org-edition §4·§7 (10/20)
-- 새 Supabase 프로젝트의 SQL Editor에서 한 번 실행한다. 보험판 프로젝트에는 실행하지 않는다.
--
-- 보험판 라이브와 같은 모양으로 맞췄다. 근거: 앱 코드가 읽고 쓰는 열(storage.js·campaigns.js)
--   + CAMPAIGNS.md §2·§3 + ADMIN-SECURITY.md §2. 저장소의 supabase-schema.sql은 옛 판이라 쓰지 않는다
--   (RLS가 전면 개방, campaigns 없음).
-- 보험판과 다른 점은 하나 — 삭제는 master만. 계정 구분은 auth.users의 app_metadata.role.

-- ─── 캠페인 ───
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

-- ─── 응답 ───
-- income_range·recruit_count는 일반판 화면에서 안 받지만 앱이 빈 문자열로 넣으므로 열은 둔다
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

-- ─── 계정 역할 ───
-- master = 피터공·애련공, son = 손소장. 역할이 없는 로그인 계정은 아무것도 못 한다.
create or replace function app_role() returns text
language sql stable
as $$ select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') $$;

-- ─── RLS: 캠페인 ───
alter table campaigns enable row level security;

create policy "staff read campaigns" on campaigns
  for select to authenticated using (app_role() in ('master', 'son'));
create policy "staff insert campaigns" on campaigns
  for insert to authenticated with check (app_role() in ('master', 'son'));
create policy "staff update campaigns" on campaigns
  for update to authenticated using (app_role() in ('master', 'son')) with check (app_role() in ('master', 'son'));
create policy "master delete campaigns" on campaigns
  for delete to authenticated using (app_role() = 'master');

-- 설문 진입용: code 단건만 anon 조회 (전체 목록 비노출) — 보험판과 같음
create or replace function get_campaign_by_code(p_code text)
returns table (id uuid, client_name text, status text, period_start date, period_end date)
language sql security definer stable
as $$
  select id, client_name, status, period_start, period_end
  from campaigns where code = p_code;
$$;
grant execute on function get_campaign_by_code(text) to anon, authenticated;

-- ─── RLS: 응답 ───
alter table responses enable row level security;

create policy "anyone insert responses" on responses
  for insert to anon, authenticated with check (true);
create policy "staff read responses" on responses
  for select to authenticated using (app_role() in ('master', 'son'));
create policy "master delete responses" on responses
  for delete to authenticated using (app_role() = 'master');

-- ─── 계정 역할 부여 ───
-- 대시보드 Authentication → Add user(Auto Confirm)로 두 계정을 만든 «뒤에» 실행한다.
-- update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"master"}' where email = 'master@mind2action.kr';
-- update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"son"}'    where email = 'son@mind2action.kr';
