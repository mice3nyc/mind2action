#!/usr/bin/env python3
"""
손소장 Archives xlsx → cm_*.yaml 재변환 (v0.8)

CM2~CM7 시트를 라벨 앵커로 읽어 yaml로 변환한다. 행 번호는 직군마다 다르므로
"점수구간"·"구분 TOP 1/2/BOTTOM"·"에고그램 유형" 라벨을 찾아 그 아래 데이터를 읽는다.
cm1(자아상태 키워드)·cm8(명언, 렌더 폐기)은 xlsx에 없으므로 기존 yaml에서 보존한다.

사용: python3 convert_cm.py <코치|리더|컨설턴트> <기존yaml> <출력yaml>
"""
import sys, openpyxl, yaml

EGOS = ['CP', 'NP', 'A', 'FC', 'AC']

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
        v = cell(ws, header_row, c)
        if v in EGOS and v not in m:
            m[v] = c
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

    AC는 시트에 0~7점/17점이상 두 컬럼이 있다. 트리거 조건(CP/NP/A/FC=0-7,
    AC=17+)에 맞는 컬럼만 채택 — 기존 yaml·코드 동작과 동일.
    """
    TRIGGER = {'CP': '0-7', 'NP': '0-7', 'A': '0-7', 'FC': '0-7', 'AC': '17+'}
    hr = find_row(ws, lambda v: '에고그램 유형' in v)
    # ego별 모든 컬럼 수집 (중복 허용)
    cols_by_ego = {e: [] for e in EGOS}
    for c in range(2, ws.max_column + 1):
        v = cell(ws, hr, c)
        if v in EGOS:
            cols_by_ego[v].append(c)
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
        t1, t2 = cell(ws, r1, c), cell(ws, r2, c)
        if rb:
            keys.append(f"{t1}_{t2}_{cell(ws, rb, c)}")
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


def convert(role, old_path, out_path):
    fn = {'코치': '코치', '리더': '리더', '컨설턴트': '컨설턴트'}[role]
    base = '/Users/p.air15/Neo-Obsi-Sync/Assets/incoming/에고그램/data/Archives'
    wb = openpyxl.load_workbook(f'{base}/{fn}.xlsx', data_only=True)
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
        'cm1': old['cm1'],                                   # 유지
        'cm2': parse_range_ego(sheet('CM2')),
        'cm3': parse_combo_single(sheet('CM3강점추가')),
        'cm4_1': parse_range_ego(sheet('CM4-1')),
        'cm4_2': parse_range_ego(sheet('CM4-2')),
        'cm4_3': parse_cm4_3(sheet('CM4-3'), old),
        'cm4_4': parse_cm4_4(sheet('CM4-4')),
        'cm5': parse_cm5(sheet('CM5')),                      # 시트명 공백 무시 매칭
    }
    if role == '컨설턴트':
        data['cm6'] = parse_combo_single(sheet('CM6'))       # 클로징, TOP1_TOP2 (20)
        data['cm7'] = parse_combo_single(sheet('CM7'))       # 리크루팅, 3레벨 (60)
    else:
        data['cm6'] = old.get('cm6', {})                     # 코치/리더는 비어있음 유지
        data['cm7'] = parse_combo_single(sheet('CM6'))       # 코치/리더 CM6 = 리크루팅 3레벨 → cm7
    data['cm8'] = old['cm8']                                 # 유지(렌더 폐기)

    with open(out_path, 'w') as f:
        yaml.dump(data, f, allow_unicode=True, default_flow_style=False,
                  sort_keys=False, width=10**9)

    # 요약
    print(f"[{role}] → {out_path}")
    for k in ['cm2', 'cm3', 'cm4_1', 'cm4_2', 'cm4_3', 'cm4_4', 'cm5', 'cm6', 'cm7']:
        v = data[k]
        print(f"  {k}: {len(v)} keys")
    wb.close()


if __name__ == '__main__':
    convert(sys.argv[1], sys.argv[2], sys.argv[3])
