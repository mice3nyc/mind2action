-- MIND2ACTION 일반 조직판 — 지움(보관) 열 추가 (SPEC-org-edition §12, 11/21)
-- 일반판 Supabase 프로젝트의 SQL Editor에 한 번 붙여 넣는다. ⛔ 보험판 프로젝트에는 실행하지 않는다.
-- 여러 번 실행해도 같다(멱등): 열은 if not exists, 정책은 지우고 다시 만든다, 권한 문은 원래 멱등.
-- ⚠️ 순서: 이 SQL → 그다음 deploy:org. 앱이 먼저 나가면 없는 열(hidden_at)을 걸러 일반판 목록이 깨진다.

-- ─── 열 ───
alter table responses add column if not exists hidden_at timestamptz null;
alter table campaigns add column if not exists hidden_at timestamptz null;

-- ─── 응답: 지움 권한 ───
-- 지금까지 responses에는 update 정책이 없었다(아무도 못 고침). son·master가 hidden_at을 적게 연다.
drop policy if exists "staff hide responses" on responses;
create policy "staff hide responses" on responses
  for update to authenticated
  using (app_role() in ('master', 'son'))
  with check (app_role() in ('master', 'son'));

-- 열 권한으로 묶는다 — 지움 권한이 점수·이름을 고치는 권한이 되지 않게.
--   정책(RLS)은 «어느 행»만 가르고 «어느 열»은 못 가른다. 열은 GRANT가 가른다.
--   Supabase는 새 테이블에 anon·authenticated 모두 표 전체 권한(ALL)을 준다 → update만 걷고 hidden_at 하나만 돌려준다.
--   · authenticated: update는 hidden_at 열만. select·insert·delete 권한은 건드리지 않는다 → 읽기·master 삭제 정책 그대로
--   · anon: update를 걷는다. anon에는 update 정책이 없어 원래도 RLS가 막지만 한 겹 더(열 권한까지 열어 둘 이유가 없다)
--   · anon insert(설문 제출)는 insert 권한이라 이 revoke와 무관 — "anyone insert responses" 정책 그대로
--   · get_campaign_by_code는 campaigns를 security definer로 읽는다 — responses 권한과 무관, 설문 링크 그대로
--   · 앱의 지움 요청은 PATCH 본문이 {"hidden_at": …} 하나라 열 권한에 걸리지 않는다(storage.js setResultHidden)
revoke update on responses from authenticated;
revoke update on responses from anon;
grant update (hidden_at) on responses to authenticated;

-- ─── 캠페인 ───
-- son·master는 이미 캠페인을 고칠 수 있다("staff update campaigns", §4). hidden_at은 열 하나 더일 뿐 — 정책·권한 추가 없음.

-- ─── 확인 (실행 뒤 결과가 이렇게 나와야 한다) ───
-- select column_name from information_schema.columns where table_name in ('responses','campaigns') and column_name = 'hidden_at';
--   → 2행
-- select grantee, privilege_type, column_name from information_schema.column_privileges
--   where table_name = 'responses' and privilege_type = 'UPDATE' and grantee in ('anon','authenticated');
--   → authenticated · UPDATE · hidden_at 한 행만
