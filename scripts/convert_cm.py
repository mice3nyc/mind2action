#!/usr/bin/env python3
"""
손소장 xlsx → cm_*.yaml 재변환 (v0.9 — 26.0604 회의 반영)

CM2~CM6 + 신규 시트(CM4-5·CM5-1·마지막글)를 라벨 앵커로 읽어 yaml로 변환한다.
행 번호는 직군마다 다르므로 "점수구간"·"구분 TOP 1/2/BOTTOM"·"에고그램 유형"
라벨을 찾아 그 아래 데이터를 읽는다. cm1(자아상태 키워드)·cm8(명언, 렌더 폐기)은
xlsx에 시트가 없어 기존 yaml에서 보존한다.

v0.9 변경:
- 원본 경로: Archives/{role}.xlsx → data_260604_{role}.xlsx
- 신규 블록: cm4_5(단일), cm5_1(60조합 한 줄), closing(마지막글 단일)
- cm6_common: 컨설턴트 CM6공통적용 시트 → cm6_common_consultant.yaml 동시 출력(계약체결 행 제거)
- cm7 폐기: 리크루팅 시트가 전 직군에서 사라짐 → cm7 = {} (렌더는 이미 폐기)
- 에고 라벨 정규화: 일부 콤보 라벨 셀에 "CP(기준,결단)" 한글 표기가 섞임 →
  ego_code()로 코드만 추출해 조회 키 오염 방지

사용: python3 convert_cm.py <코치|리더|컨설턴트> <기존yaml> <출력yaml>
"""
import sys, os, openpyxl, yaml

EGOS = ['CP', 'NP', 'A', 'FC', 'AC']

# 손소장 원본 엑셀에 잔존하는 명백한 오타 일괄 교정 (v0.12.2, 6/16).
# 모두 정상 텍스트엔 나타나지 않는 안전한 정확 문자열 치환이라 어떤 엑셀이 와도 자동 교정된다.
# 교정안이 불확실한 건(코치 FC_NP_A "활을", FC_A_AC 고아문장, 컨설턴트 NP_FC_AC "충분합니다,")은
# 손소장 확인 전까지 제외 — 여기 넣지 않는다.
TYPO_FIXES = [
    ('위헤서', '위해서'),
    ('즉즉,', '즉,'),
    ('조직의 조직의 원칙과', '조직의 원칙과'),
    ('점수가 높기 현재', '점수가 높기 때문에 현재'),
    ('상태을', '상태를'),
    ('활을 짧고', '활동을 짧고'),       # 코치 CM5 AP4(FC_NP_A): 활동→활(동 누락). 피터공 확인 6/16
    ('됩니다。', '됩니다.'),
    ('훌륭합니다.여기에', '훌륭합니다. 여기에'),
    ('이 상황애서', '이 상황에서'),
]


def fix_typos(obj):
    if isinstance(obj, dict):
        return {k: fix_typos(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [fix_typos(v) for v in obj]
    if isinstance(obj, str):
        for a, b in TYPO_FIXES:
            obj = obj.replace(a, b)
        return obj
    return obj

CM6_COMMON_OUT = '/Users/p.air15/Neo-Obsi-Sync/_dev/mind2action/egogram/src/data/cm6_common_consultant.yaml'

# 직군별 원본 xlsx 파일명. 파일명 패턴이 직군마다 달라 명시적 매핑으로 둔다.
#   v0.9(6/5): data_260604_{코치|리더|컨설턴트}.xlsx
#   v0.10(6/9): 손소장 260609 수정본 (260609_수정사항.md 14건 반영)
#   v0.11(6/11): 손소장 26.0611 수정본 (6월11일 수정요청 내용 - 정리.csv 11건)
#   v0.12(6/15): 손소장 26.0615 수정본. cm5(말투) 전면 개정 — 코치/리더 각 60조합,
#     컨설턴트 44조합 + cm5_1 4 + 컨설턴트 cm6 클로징 20 + cm6_common items 2.
#     컨설턴트 cm6 A_CP는 6/11 오삽입(AC 본문)을 올바른 분석·결단형 본문으로 교정.
#     ※ 컨설턴트 cm5_1 4조합(NP_AC_FC·FC_AC_NP·AC_NP_FC·AC_FC_NP)에 "결단력과"가
#       새로 붙음(CP 없는 조합 = 규칙 이탈). 손소장 의도 확인 전까지 6/11판 유지(후처리로 복원).
ROLE_FILE = {
    '리더':   '26.0615_리더로 수정 - 손소장.xlsx',
    '컨설턴트': '26.0615_컨설턴트로 수정 - 손소장.xlsx',
    '코치':   '26.0615_코치로 통합 수정-손소장.xlsx',
}


def ego_code(s):
    """라벨 셀에서 에고 코드만 추출. 'CP(기준,결단)'→'CP', 'AC '→'AC'."""
    head = (s or '').split('(')[0].replace(' ', '').strip()
    return head if head in EGOS else None

# ---- yaml 출력: 멀티라인은 literal block(|), 그 외는 자동 인용 ----
def str_presenter(dumper, data):
    if '\n' in data:
        return dumper.represent_scalar('tag:yaml.org,2002:str', data, style='|')
    return dumper.represent_scalar('tag:yaml.org,2002:str', data)
yaml.add_representer(str, str_presenter)


def cell(ws, r, c):
    v = ws.cell(r, c).value
    if v is None:
        return ''
    return str(v).strip()


def norm_range(label):
    """점수 라벨 → 구간 키. '17점 이상'→'17-20' 등. 숫자 기반."""
    s = label.replace(' ', '')
    if s.startswith('17'):
        return '17-20'
    if s.startswith('14'):
        return '14-16'
    if s.startswith('11'):
        return '11-13'
    if s.startswith('8'):
        return '8-10'
    if s.startswith('0'):
        return '0-7'
    return None


def find_row(ws, predicate):
    for r in range(1, ws.max_row + 1):
        if predicate(cell(ws, r, 1)):
            return r
    return None


def ego_cols(ws, header_row):
    """헤더 행에서 자아상태가 있는 컬럼 인덱스 매핑 {ego: col}."""
    m = {}
    for c in range(2, ws.max_column + 1):
        e = ego_code(cell(ws, header_row, c))
        if e and e not in m:
            m[e] = c
    return m


def parse_range_ego(ws, faithful_empty=True):
    """CM2 / CM4-1 / CM4-2: 점수구간×자아상태."""
    hr = find_row(ws, lambda v: '점수구간' in v)
    cols = ego_cols(ws, hr)
    out = {}
    for r in range(hr + 1, ws.max_row + 1):
        rng = norm_range(cell(ws, r, 1))
        if not rng:
            continue
        out[rng] = {ego: cell(ws, r, cols[ego]) for ego in EGOS if ego in cols}
    return out


def parse_cm4_4(ws):
    """CM4-4: 헤더 '에고그램 유형' 아래 condition/trait/coaching/script 4행.

    v0.11(26.0611 item 9): AC도 0~7점 단일 컬럼으로 교체(이중 컬럼 폐지).
    전 성향 트리거 = 0-7. (구 v0.10: AC만 17+ 컬럼 채택)
    """
    TRIGGER = {'CP': '0-7', 'NP': '0-7', 'A': '0-7', 'FC': '0-7', 'AC': '0-7'}
    hr = find_row(ws, lambda v: '에고그램 유형' in v)
    # ego별 모든 컬럼 수집 (중복 허용)
    cols_by_ego = {e: [] for e in EGOS}
    for c in range(2, ws.max_column + 1):
        e = ego_code(cell(ws, hr, c))
        if e:
            cols_by_ego[e].append(c)
    # cols_by_ego는 위에서 v in EGOS로 수집 → ego_code로 보강
    out = {}
    for ego in EGOS:
        cands = cols_by_ego[ego]
        if not cands:
            continue
        want = TRIGGER[ego]
        chosen = None
        for c in cands:
            cond = cell(ws, hr + 1, c)
            cond_key = '17+' if '17' in cond else '0-7'
            if cond_key == want:
                chosen = (c, cond_key)
                break
        if chosen is None:  # 조건 일치 없으면 첫 컬럼
            c = cands[0]
            chosen = (c, '17+' if '17' in cell(ws, hr + 1, c) else '0-7')
        c, cond_key = chosen
        # yaml condition은 기존 표기('17-20'/'0-7')에 맞춤
        out[ego] = {
            'condition': '17-20' if cond_key == '17+' else '0-7',
            'trait': cell(ws, hr + 2, c),
            'coaching': cell(ws, hr + 3, c),
            'script': cell(ws, hr + 4, c),
        }
    return out


def parse_cm4_3(ws, old):
    """CM4-3: '모든 점수가...' 헤더 다음 행 A열 = all_no_coaching 본문.

    some_coaching은 5/18 폐기(코드 미참조, cmLookup.js는 all_no_coaching만 읽음).
    옛 호칭이 남은 죽은 데이터이므로 빈 문자열로 둔다.
    """
    hr = find_row(ws, lambda v: v.startswith('모든 점수가'))
    return {
        'all_no_coaching': cell(ws, hr + 1, 1),
        'some_coaching': '',
    }


def combo_block(ws):
    """'구분 TOP 1' 앵커로 top1/top2/bottom 행 + 본문 행들 위치 파악.
    반환: (ncols, top1_row, top2_row, bottom_row|None, [body_rows])."""
    r1 = find_row(ws, lambda v: v == '구분 TOP 1')
    r2 = r1 + 1
    assert cell(ws, r2, 1) == '구분 TOP 2', f"TOP2 행 불일치 @ {r2}"
    rb = None
    if cell(ws, r1 + 2, 1) == '구분 BOTTOM':
        rb = r1 + 2
        body_start = rb + 1
    else:
        body_start = r2 + 1
    # ncols = TOP1 행의 연속 비어있지 않은 셀 수
    ncols = 0
    for c in range(2, ws.max_column + 1):
        if cell(ws, r1, c):
            ncols += 1
        else:
            break
    # 본문 행: body_start부터 본문셀이 ncols의 절반 이상인 연속 행
    body_rows = []
    r = body_start
    while r <= ws.max_row:
        filled = sum(1 for c in range(2, 2 + ncols) if cell(ws, r, c))
        if filled >= ncols // 2 and filled > 0:
            body_rows.append(r)
            r += 1
        else:
            break
    return ncols, r1, r2, rb, body_rows


def combo_keys(ws, ncols, r1, r2, rb):
    keys = []
    for i in range(ncols):
        c = 2 + i
        t1, t2 = ego_code(cell(ws, r1, c)), ego_code(cell(ws, r2, c))
        if rb:
            keys.append(f"{t1}_{t2}_{ego_code(cell(ws, rb, c))}")
        else:
            keys.append(f"{t1}_{t2}")
    return keys


def parse_combo_single(ws):
    """CM3 / 컨설턴트 CM6 / CM6·CM7(리크루팅): 단일 본문 문자열."""
    ncols, r1, r2, rb, body = combo_block(ws)
    keys = combo_keys(ws, ncols, r1, r2, rb)
    br = body[0]
    return {keys[i]: cell(ws, br, 2 + i) for i in range(ncols)}


def parse_cm5(ws):
    """CM5: manner(+improvement). 본문 1~2행."""
    ncols, r1, r2, rb, body = combo_block(ws)
    keys = combo_keys(ws, ncols, r1, r2, rb)
    manner_r = body[0]
    impr_r = body[1] if len(body) >= 2 else None
    out = {}
    for i in range(ncols):
        out[keys[i]] = {
            'manner': cell(ws, manner_r, 2 + i),
            'improvement': cell(ws, impr_r, 2 + i) if impr_r else '',
        }
    return out


def parse_single(ws):
    """CM4-5 / 마지막글: 첫 비어있지 않은 셀 하나(단일 본문)."""
    for r in range(1, ws.max_row + 1):
        for c in range(1, ws.max_column + 1):
            v = cell(ws, r, c)
            if v:
                return v
    return ''


def parse_cm6_common(ws):
    """CM6 공통적용: 헤더('상담 단계 | ...') 아래 (좌열 소제목, 우열 본문) 행들.

    v0.9: 계약체결(최종 진행 멘트) 행은 손소장이 시트에서 제거 → 자연히 빠짐.
    """
    hr = find_row(ws, lambda v: '상담' in v and '단계' in v)
    start = (hr + 1) if hr else 1
    items = []
    for r in range(start, ws.max_row + 1):
        title, body = cell(ws, r, 1), cell(ws, r, 2)
        if title and body:
            items.append({'title': title, 'body': body})
    return {'items': items}


def convert(role, old_path, out_path):
    base = '/Users/p.air15/Neo-Obsi-Sync/Assets/incoming/에고그램/data'
    src = f'{base}/{ROLE_FILE[role]}'
    if not os.path.exists(src):
        raise FileNotFoundError(f"원본 xlsx 없음: {src}")
    wb = openpyxl.load_workbook(src, data_only=True)
    old = yaml.safe_load(open(old_path))

    def sheet(name):
        target = name.replace(' ', '')
        # 정확 매칭 우선
        for sn in wb.sheetnames:
            if sn.replace(' ', '') == target:
                return wb[sn]
        # 접두어 매칭 (CM5 → 'CM5 코칭 추가'/'CM5추가')
        for sn in wb.sheetnames:
            if sn.replace(' ', '').startswith(target):
                return wb[sn]
        raise KeyError(f"{name} 시트 없음 (있는 시트: {wb.sheetnames})")

    data = {
        'job_type': old['job_type'],
        'job_label': old['job_label'],
        'cm1': old['cm1'],                                   # 유지(자아상태 키워드, 시트 없음)
        'cm2': parse_range_ego(sheet('CM2')),
        'cm3': parse_combo_single(sheet('CM3강점추가')),
        'cm4_1': parse_range_ego(sheet('CM4-1')),
        'cm4_2': parse_range_ego(sheet('CM4-2')),
        'cm4_3': parse_cm4_3(sheet('CM4-3'), old),
        'cm4_4': parse_cm4_4(sheet('CM4-4')),
        'cm4_5': parse_single(sheet('CM4-5')),               # v0.9 신규 (단일)
        'cm5': parse_cm5(sheet('CM5')),                      # 시트명 공백 무시 매칭
        'cm5_1': parse_combo_single(sheet('CM5-1')),         # v0.9 신규 (60조합 한 줄)
        'closing': parse_single(sheet('마지막글')),           # v0.9 신규 (단일)
    }
    if role == '컨설턴트':
        data['cm6'] = parse_combo_single(sheet('CM6'))       # 클로징, TOP1_TOP2 (20)
    else:
        data['cm6'] = old.get('cm6', {}) or {}               # 코치/리더는 비어있음 유지
    data['cm7'] = {}                                         # v0.9 폐기 (리크루팅 시트 사라짐)
    data['cm8'] = old['cm8']                                 # 유지(렌더 폐기)

    data = fix_typos(data)                                   # v0.12.2 명백 오타 일괄 교정

    with open(out_path, 'w') as f:
        yaml.dump(data, f, allow_unicode=True, default_flow_style=False,
                  sort_keys=False, width=10**9)

    # 컨설턴트면 cm6_common도 동시 출력 (계약체결 행 제거 반영)
    if role == '컨설턴트':
        cmc = fix_typos(parse_cm6_common(sheet('CM6공통적용')))
        with open(CM6_COMMON_OUT, 'w') as f:
            yaml.dump(cmc, f, allow_unicode=True, default_flow_style=False,
                      sort_keys=False, width=10**9)
        print(f"  cm6_common → {os.path.basename(CM6_COMMON_OUT)}: {len(cmc['items'])} items")

    # 요약
    print(f"[{role}] → {out_path}")
    for k in ['cm2', 'cm3', 'cm4_1', 'cm4_2', 'cm4_3', 'cm4_4', 'cm5', 'cm5_1', 'cm6', 'cm7']:
        v = data[k]
        n = len(v) if hasattr(v, '__len__') else v
        print(f"  {k}: {len(v) if isinstance(v,(dict,list)) else 'str' } keys")
    print(f"  cm4_5: {'있음' if data['cm4_5'] else '없음'} / closing: {'있음' if data['closing'] else '없음'}")
    wb.close()


if __name__ == '__main__':
    convert(sys.argv[1], sys.argv[2], sys.argv[3])
