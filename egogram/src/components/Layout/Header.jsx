// sub = 브랜드 옆 작은 글자. 일반판 관리 화면에서만 「일반 조직판」(SPEC-org-edition §5)
export default function Header({ sub }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">MIND2ACTION</div>
        {sub && <div className="header-sub">{sub}</div>}
      </div>
    </header>
  );
}
