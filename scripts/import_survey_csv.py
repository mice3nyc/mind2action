#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
손소장 구글폼 설문 응답 CSV → supabase responses 일괄 적재용 SQL 생성.
- 점수는 CSV 집계값 그대로 사용(재계산 안 함), top1/top2/bottom·grades는 scoreEngine 로직 재현
- 캠페인 하나로 묶어 campaign_id 부여 ("마치 설문받은 것처럼")
- 26.0604 아리공. 재사용: CSV/캠페인명만 바꿔 다음 데이터에도.

사용: python3 import_survey_csv.py
출력: 같은 data 폴더에 import_<client>.sql
"""
import csv, re, uuid, sys

DATA_DIR = "/Users/p.air15/Neo-Obsi-Sync/Assets/incoming/에고그램/data"
CSV_FILE = f"{DATA_DIR}/Archives/성향분석 코칭 설문지(20260320)의 정석.csv"
CLIENT   = "DB손해보험_260320"
CODE     = "dbsj260320"     # 캠페인 code (unique). 일회성.
MEMO     = "손소장 정석 데이터 (20260320 구글폼 응답) 일괄 적재 — 아리공 26.0604"
# ※ 26.0611: DB손해보험은 이미 적재돼 있음(재실행 금지 — 중복 적재). 다음 외부 데이터 적재 시 상수만 교체해 사용.
OUT_FILE = f"{DATA_DIR}/import_{CLIENT}.sql"

EGO = ['CP', 'NP', 'A', 'FC', 'AC']          # CSV 점수 컬럼 순서(col58~62)
TIE = ['A', 'CP', 'NP', 'FC', 'AC']          # scoreEngine TIE_PRIORITY (v0.11 — 손소장 26.0611 item 1)

# 직무 자유텍스트 → 설문 직군 코드 (컨설턴트=sales / 리더=sales_leader / 코치=coach)
JOB_MAP = {
    # 컨설턴트
    '영업': 'sales', '설계사': 'sales', '설계사(영업)': 'sales', '팀원': 'sales', '신입': 'sales',
    # 리더
    '영업팀장': 'sales_leader', '센터장': 'sales_leader', '팀장': 'sales_leader',
    '교육팀장': 'sales_leader', '본부표준센타장': 'sales_leader', '매니저': 'sales_leader',
    '엉업팀장': 'sales_leader', '영업팅장': 'sales_leader', '팀잔': 'sales_leader',
    # 코치
    '멘토': 'coach', '육성멘토': 'coach',
    # 애매 → 임시 컨설턴트(sales). 손소장 확인 후 정정 대상.
    'TCR': 'sales', 'Tcr': 'sales', 'PA': 'sales', 'Pa8': 'sales', '.': 'sales', '11': 'sales',
}
AMBIGUOUS = {'TCR', 'Tcr', 'PA', 'Pa8', '.', '11'}

# 소득 텍스트(구글폼 '이상' 표기) → INCOME_OPTIONS 코드 (근사, 하한 기준)
INCOME_MAP = {
    '월 200만원 미만': 'under200',
    '월 200만원 이상': '200-400',
    '월 300만원 이상': '200-400',
    '월 500만원 이상': '400-600',
    '월 700만원 이상': '600-800',
    '월 1000만원 이상': '1000-1500',
    '월 1500만원 이상': '1500-2000',
    '월 2000만원 이상': 'over2000',
}
COMPANY_PATS = ['DB손해보험', '디비손해보험', 'DB손보', '디비손보', 'Db손해보험',
                'Db손해보헌', 'db손해보험', 'Db손해보험', 'DB손해보헌']


def grade(s):
    if s >= 17: return '극고'
    if s >= 14: return '고'
    if s >= 11: return '중'
    if s >= 8:  return '저'
    return '극저'


def compute_tops(sc):
    srt = sorted(EGO, key=lambda e: (-sc[e], TIE.index(e)))
    asc = sorted(EGO, key=lambda e: (sc[e], TIE.index(e)))
    return srt[0], srt[1], asc[0]


def map_job(t):
    return JOB_MAP.get(t.strip(), 'sales')


def map_income(t):
    return INCOME_MAP.get(re.sub(r'\s+', ' ', t.strip()), '')


def split_company_dept(raw):
    s = re.sub(r'\s+', ' ', raw.strip())
    dept = s
    for pat in COMPANY_PATS:
        if dept.startswith(pat):
            dept = dept[len(pat):].lstrip(' .')
            break
    if not dept:
        dept = s
    return 'DB손해보험', dept


def parse_ts(raw):
    # "2026. 3. 26 오후 3:44:01" → "2026-03-26 15:44:01"
    m = re.match(r'(\d+)\.\s*(\d+)\.\s*(\d+)\s*(오전|오후)\s*(\d+):(\d+):(\d+)', raw.strip())
    if not m:
        return None
    y, mo, d, ap, h, mi, se = m.groups()
    h = int(h)
    if ap == '오후' and h != 12: h += 12
    if ap == '오전' and h == 12: h = 0
    return f"{int(y):04d}-{int(mo):02d}-{int(d):02d} {h:02d}:{int(mi):02d}:{int(se):02d}"


def esc(s):
    return str(s).replace("'", "''")


def jsonlit(d):
    # grades dict → postgres jsonb 리터럴
    inner = ",".join(f'"{k}":"{v}"' for k, v in d.items())
    return "'{" + inner + "}'"


def main():
    rows = list(csv.reader(open(CSV_FILE, encoding='utf-8')))
    data = [r for r in rows[1:] if len(r) > 1 and r[1].strip()]

    cid = str(uuid.uuid4())
    job_dist, amb_names, mismatch = {}, [], []
    values = []

    for r in data:
        name = r[1].strip()
        birth = r[2].strip()
        career = re.sub(r'[^0-9]', '', r[3])
        comp, dept = split_company_dept(r[4])
        raw_job = r[5].strip()
        jt = map_job(raw_job)
        inc = map_income(r[6])
        sc = {e: int(r[58 + i]) for i, e in enumerate(EGO)}
        total = int(r[63])
        if total != sum(sc.values()):
            mismatch.append((name, total, sum(sc.values())))
        t1, t2, bot = compute_tops(sc)
        grades = {e: grade(sc[e]) for e in EGO}
        created = parse_ts(r[0])

        job_dist[jt] = job_dist.get(jt, 0) + 1
        if raw_job in AMBIGUOUS:
            amb_names.append((name, raw_job, jt))

        created_lit = f"'{created}'" if created else "now()"
        v = (f"('{cid}','{esc(CLIENT)}','{esc(name)}','{esc(birth)}','{esc(career)}',"
             f"'{esc(comp)}','{esc(dept)}','{jt}','{inc}','',"
             f"{sc['CP']},{sc['NP']},{sc['A']},{sc['FC']},{sc['AC']},{total},"
             f"'{t1}','{t2}','{bot}',{jsonlit(grades)},{created_lit})")
        values.append(v)

    sql = []
    sql.append("-- 손소장 정석 데이터 일괄 적재 (아리공 26.0604)")
    sql.append("-- Supabase SQL Editor에서 통째로 실행. 캠페인 1건 + 응답 %d건." % len(values))
    sql.append("begin;")
    sql.append(
        "insert into campaigns (id, code, client_name, status, expected_count, memo) values\n"
        f"('{cid}','{CODE}','{esc(CLIENT)}','closed',{len(values)},'{esc(MEMO)}');")
    sql.append(
        "insert into responses\n"
        "(campaign_id, group_name, name, birth_date, career_months, company, department,"
        " job_type, income_range, recruit_count,"
        " score_cp, score_np, score_a, score_fc, score_ac, total, top1, top2, bottom, grades, created_at)\nvalues")
    sql.append(",\n".join(values) + ";")
    sql.append("commit;")

    open(OUT_FILE, 'w', encoding='utf-8').write("\n".join(sql) + "\n")

    # ── 리포트 ──
    print(f"응답 {len(values)}명 → {OUT_FILE}")
    print(f"campaign id = {cid}  / code = {CODE}")
    print("직군 분포:", job_dist)
    print(f"애매 직무 임시 sales 처리 {len(amb_names)}명:", amb_names)
    print("점수합 불일치:", mismatch if mismatch else "없음 (전건 일치)")
    # 검증 샘플 3명
    print("\n=== 검증 샘플 3명 (CSV원본 vs 생성) ===")
    for r in data[:3]:
        sc = {e: int(r[58 + i]) for i, e in enumerate(EGO)}
        t1, t2, bot = compute_tops(sc)
        comp, dept = split_company_dept(r[4])
        print(f"  {r[1].strip()} | 직무'{r[5].strip()}'→{map_job(r[5])} | 점수{sc} 합{r[63]} "
              f"| top1={t1} top2={t2} bot={bot} | {comp}/{dept}")


if __name__ == '__main__':
    main()
