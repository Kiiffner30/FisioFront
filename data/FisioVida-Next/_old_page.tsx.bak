'use client';

import './globals.css';

function enterApp() {
  document.getElementById('view-login')?.classList.add('hidden');
  document.getElementById('view-app')?.classList.remove('hidden');
}

function exitApp() {
  document.getElementById('view-app')?.classList.add('hidden');
  document.getElementById('view-login')?.classList.remove('hidden');
}

function goPage(name: string) {
  document.querySelectorAll<HTMLElement>('[id^="page-"]').forEach((page) => {
    page.classList.add('hidden');
  });

  const target = document.getElementById(`page-${name}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll<HTMLElement>('.nav-item[data-page]').forEach((item) => {
    item.classList.remove('active');
  });

  const match = document.querySelector<HTMLElement>(`.nav-item[data-page="${name}"]`);
  if (match) match.classList.add('active');

  document.querySelector<HTMLElement>('.content')?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  if (window.innerWidth <= 900) toggleSidebar(false);
}

function toggleSidebar(open: boolean) {
  document.getElementById('sidebar')?.classList.toggle('open', open);
}

function goSettings(name: string) {
  document.querySelectorAll<HTMLElement>('.settings-pane').forEach((pane) => {
    pane.classList.remove('active');
  });

  document.getElementById(`settings-${name}`)?.classList.add('active');

  document.querySelectorAll<HTMLElement>('.settings-nav button').forEach((button) => {
    button.classList.remove('active');
  });

  const activeButton = document.querySelector<HTMLElement>(
    `.settings-nav button[data-settings="${name}"]`,
  );
  if (activeButton) activeButton.classList.add('active');
}

function togglePassword() {
  const input = document.getElementById('pwd-input') as HTMLInputElement | null;
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

export default function Home() {
  return (
    <>

      <section id="view-login">
      <div className="login-art">
      <div className="brand">
      <div className="brand-mark">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20c3-6 3-11 0-16"></path><path d="M13 20c3-6 3-11 0-16"></path><path d="M20 4c-3 6-3 11 0 16"></path></svg>
</div>
      <div>
      <div className="brand-name">FisioVida</div>
      <div className="brand-sub">Clínica de Fisioterapia</div>
</div>
</div>
      <div>
<h1>Mais movimento, mais qualidade de vida.</h1>
<p>Gestão completa para cuidar de quem mais importa: seus pacientes.</p>
      <div className="art-figure">
      <div className="art-chip"><b>248</b><span>Pacientes cadastrados</span></div>
      <div className="art-chip"><b>12</b><span>Consultas hoje</span></div>
      <div className="art-chip"><b>3</b><span>Perfis de acesso</span></div>
</div>
</div>
      <div className="login-foot">© 2026 FisioVida — painel de uso interno da clínica</div>
</div>
      <div className="login-form-wrap">
      <div className="login-card">
<h2>Bem-vindo de volta</h2>
<p>Acesse o painel administrativo da clínica.</p>
      <div className="field">
<label>E-mail</label>
      <div className="input-wrap"><input type="email" placeholder="seu@email.com" /></div>
</div>
      <div className="field">
<label>Senha</label>
      <div className="input-wrap">
<input id="pwd-input" type="password" placeholder="Digite sua senha" />
<button className="toggle-eye" onClick={togglePassword} aria-label="Mostrar senha">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
</button>
</div>
</div>
      <div className="row-between">
<label className="check-line"><input type="checkbox" />Lembrar de mim</label>
<a className="link" href="#">Esqueci minha senha</a>
</div>
<button className="btn btn-primary" onClick={enterApp}>Entrar</button>
      <div className="divider-or">ou</div>
<button className="btn btn-ghost">Recuperar senha</button>
</div>
</div>
</section>

      <section id="view-app" className="hidden">
      <div className="sidebar" id="sidebar">
      <div className="side-brand">
      <div className="brand-mark">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20c3-6 3-11 0-16"></path><path d="M13 20c3-6 3-11 0-16"></path><path d="M20 4c-3 6-3 11 0 16"></path></svg>
</div>
      <div>
      <div className="side-brand-name">FisioVida</div>
      <div className="side-brand-sub">Clínica de Fisioterapia</div>
</div>
<button className="side-close" onClick={() => toggleSidebar(false)}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"></path></svg>
</button>
</div>
<nav className="nav-group">
<button className="nav-item active" data-page="dashboard" onClick={() => goPage('dashboard')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1.5"></rect><rect x="14" y="3" width="7" height="5" rx="1.5"></rect><rect x="14" y="12" width="7" height="9" rx="1.5"></rect><rect x="3" y="16" width="7" height="5" rx="1.5"></rect></svg>
        Dashboard
      </button>
<button className="nav-item" data-page="agenda" onClick={() => goPage('agenda')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg>
        Agenda
      </button>
<button className="nav-item" data-page="pacientes" onClick={() => goPage('pacientes')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        Pacientes
      </button>
<button className="nav-item" data-page="consultas" onClick={() => goPage('consultas')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="8" y="2" width="8" height="4" rx="1"></rect><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"></path><path d="M9 12h6M9 16h6"></path></svg>
        Consultas
      </button>
<button className="nav-item" data-page="tipos" onClick={() => goPage('tipos')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m20.6 13.5-7.1 7.1a2 2 0 0 1-2.8 0l-7.4-7.4a2 2 0 0 1-.6-1.4V4.7a2 2 0 0 1 2-2h7.1a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8Z"></path><circle cx="7.5" cy="7.5" r="1.2"></circle></svg>
        Tipos de consulta
      </button>
<button className="nav-item" data-page="horarios" onClick={() => goPage('horarios')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg>
        Horários
      </button>
<button className="nav-item" data-page="clinica" onClick={() => goPage('clinica')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M6 21V7l6-4 6 4v14M10 21v-6h4v6"></path></svg>
        Clínica
      </button>
</nav>
      <div className="nav-spacer"></div>
      <div className="nav-group nav-foot">
<button className="nav-item" data-page="config" onClick={() => goPage('config')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"></path></svg>
        Configurações
      </button>
<button className="nav-item" onClick={exitApp}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5M21 12H9"></path></svg>
        Sair
      </button>
</div>
</div>
      <div className="main" onClick={() => { if (window.innerWidth <= 900) toggleSidebar(false); }}>
      <div className="topbar" onClick={(e) => e.stopPropagation()}>
<button className="burger" onClick={() => toggleSidebar(true)}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
</button>
      <div className="search-wrap">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>
<input placeholder="Pesquisar pacientes, consultas..." />
</div>
      <div className="topbar-spacer"></div>
<button className="icon-btn"><span className="ping"></span>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.7 21a2 2 0 0 1-3.4 0"></path></svg>
</button>
      <div className="who">
      <div className="avatar" style={{"background": "var(--teal-500)"}}>AD</div>
      <div>
      <div className="who-name">Administrador</div>
      <div className="who-role">Administrador</div>
</div>
</div>
</div>
      <div className="content">

      <div id="page-dashboard">
      <div className="page-head">
<h1>Dashboard</h1>
<p>Visão geral da clínica</p>
</div>
      <div className="kpi-grid">
      <div className="card kpi">
      <div className="kpi-top">
      <div className="kpi-icon" style={{"background": "var(--blue-bg)", "color": "var(--blue)"}}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
</div>
<span className="kpi-delta up">▲ 12%</span>
</div>
      <div className="kpi-label">Total de pacientes</div>
      <div className="kpi-value">248</div>
</div>
      <div className="card kpi">
      <div className="kpi-top">
      <div className="kpi-icon" style={{"background": "var(--green-bg)", "color": "var(--green)"}}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.9-9.14"></path><path d="m22 4-10 10-3-3"></path></svg>
</div>
<span className="kpi-delta up">▲ 10%</span>
</div>
      <div className="kpi-label">Pacientes ativos</div>
      <div className="kpi-value">221</div>
</div>
      <div className="card kpi">
      <div className="kpi-top">
      <div className="kpi-icon" style={{"background": "var(--teal-100)", "color": "var(--teal-700)"}}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg>
</div>
<span className="kpi-delta up">▲ 20%</span>
</div>
      <div className="kpi-label">Consultas hoje</div>
      <div className="kpi-value">12</div>
</div>
      <div className="card kpi">
      <div className="kpi-top">
      <div className="kpi-icon" style={{"background": "var(--teal-100)", "color": "var(--teal-700)"}}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
</div>
<span className="kpi-delta up">▲ 8%</span>
</div>
      <div className="kpi-label">Consultas da semana</div>
      <div className="kpi-value">68</div>
</div>
      <div className="card kpi">
      <div className="kpi-top">
      <div className="kpi-icon" style={{"background": "var(--blue-bg)", "color": "var(--blue)"}}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 17l4-9 4 9M9.5 14h5"></path></svg>
</div>
<span className="kpi-delta up">▲ 15%</span>
</div>
      <div className="kpi-label">Atendimentos realizados</div>
      <div className="kpi-value">186</div>
</div>
      <div className="card kpi">
      <div className="kpi-top">
      <div className="kpi-icon" style={{"background": "var(--red-bg)", "color": "var(--red)"}}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="m9 9 6 6M15 9l-6 6"></path></svg>
</div>
<span className="kpi-delta down">▼ 2%</span>
</div>
      <div className="kpi-label">Consultas canceladas</div>
      <div className="kpi-value">6</div>
</div>
      <div className="card kpi">
      <div className="kpi-top">
      <div className="kpi-icon" style={{"background": "var(--green-bg)", "color": "var(--green)"}}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
</div>
<span className="kpi-delta up">▲ 18%</span>
</div>
      <div className="kpi-label">Receita prevista</div>
      <div className="kpi-value">R$ 8.450,00</div>
</div>
      <div className="card kpi">
      <div className="kpi-top">
      <div className="kpi-icon" style={{"background": "var(--teal-100)", "color": "var(--teal-700)"}}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg>
</div>
</div>
      <div className="kpi-label">Próximo atendimento</div>
      <div className="kpi-value" style={{"fontSize": "1.1rem"}}>08:00 — João Silva</div>
</div>
</div>
      <div className="grid-2col">
      <div className="card">
      <div className="card-head"><h3>Agenda do dia</h3><a className="link" href="#" onClick={(e) => { e.preventDefault(); goPage('agenda'); }}>Ver todos</a></div>
      <div style={{"paddingTop": "8px"}}>
      <div className="appt-row">
<span className="appt-time">08:00</span>
      <div className="avatar" style={{"background": "#3672c9"}}>JS</div>
      <div><div className="appt-name">João Silva</div><div className="appt-type">Fisioterapia Ortopédica</div></div>
<span className="appt-status badge blue"><span className="dot"></span>Confirmada</span>
<button className="dots-btn">⋮</button>
</div>
      <div className="appt-row">
<span className="appt-time">09:00</span>
      <div className="avatar" style={{"background": "#c2588a"}}>MO</div>
      <div><div className="appt-name">Maria Oliveira</div><div className="appt-type">Avaliação Fisioterapêutica</div></div>
<span className="appt-status badge blue"><span className="dot"></span>Confirmada</span>
<button className="dots-btn">⋮</button>
</div>
      <div className="appt-row">
<span className="appt-time">10:30</span>
      <div className="avatar" style={{"background": "#c58a1f"}}>CS</div>
      <div><div className="appt-name">Carlos Santos</div><div className="appt-type">Reabilitação</div></div>
<span className="appt-status badge amber"><span className="dot"></span>Aguardando</span>
<button className="dots-btn">⋮</button>
</div>
      <div className="appt-row">
<span className="appt-time">14:00</span>
      <div className="avatar" style={{"background": "#1c9a63"}}>AS</div>
      <div><div className="appt-name">Ana Souza</div><div className="appt-type">Fisioterapia</div></div>
<span className="appt-status badge blue"><span className="dot"></span>Confirmada</span>
<button className="dots-btn">⋮</button>
</div>
</div>
</div>
      <div className="card">
      <div className="card-head"><h3>Consultas por semana</h3><span className="select-mini">Esta semana</span></div>
      <div className="bars">
      <div className="bar-col"><div className="bar" style={{"height": "52%"}}></div><span className="bar-day">Seg</span></div>
      <div className="bar-col"><div className="bar" style={{"height": "70%"}}></div><span className="bar-day">Ter</span></div>
      <div className="bar-col"><div className="bar" style={{"height": "40%"}}></div><span className="bar-day">Qui</span></div>
      <div className="bar-col"><div className="bar" style={{"height": "88%"}}></div><span className="bar-day">Sex</span></div>
      <div className="bar-col"><div className="bar" style={{"height": "78%"}}></div><span className="bar-day">Sáb</span></div>
      <div className="bar-col"><div className="bar" style={{"height": "20%"}}></div><span className="bar-day">Dom</span></div>
</div>
</div>
      <div className="card">
      <div className="card-head"><h3>Tipos de consulta</h3></div>
      <div className="donut-wrap">
      <div className="donut" style={{"background": "conic-gradient(var(--teal-500) 0 45%, var(--blue) 45% 70%, var(--amber) 70% 85%, #7a5cc9 85% 95%, var(--ink-300) 95% 100%)"}}></div>
      <div className="legend">
      <div className="legend-item"><span className="sw" style={{"background": "var(--teal-500)"}}></span>Fisioterapia<b>45%</b></div>
      <div className="legend-item"><span className="sw" style={{"background": "var(--blue)"}}></span>Reabilitação<b>25%</b></div>
      <div className="legend-item"><span className="sw" style={{"background": "var(--amber)"}}></span>Avaliação<b>15%</b></div>
      <div className="legend-item"><span className="sw" style={{"background": "#7a5cc9"}}></span>Ortopédica<b>10%</b></div>
      <div className="legend-item"><span className="sw" style={{"background": "var(--ink-300)"}}></span>Outros<b>5%</b></div>
</div>
</div>
</div>
</div>
</div>

      <div id="page-agenda" className="hidden">
      <div className="page-head page-head-row">
      <div>
<h1>Agenda</h1>
<p>Visualize e gerencie os atendimentos da clínica.</p>
</div>
      <div style={{"display": "flex", "gap": "10px", "alignItems": "center"}}>
<button className="select-box">Hoje</button>
<button className="select-box">23 de abril de 2025</button>
      <div className="tabs-row">
<button className="tab-btn active">Dia</button>
<button className="tab-btn">Semana</button>
<button className="tab-btn">Mês</button>
</div>
</div>
</div>
      <div className="agenda-layout">
      <div>
      <div className="card mini-cal">
      <div className="mini-cal-head"><span>Abril 2025</span><span style={{"display": "flex", "gap": "8px"}}><button>‹</button><button>›</button></span></div>
      <div className="mini-cal-grid">
<span className="dow">D</span><span className="dow">S</span><span className="dow">T</span><span className="dow">Q</span><span className="dow">Q</span><span className="dow">S</span><span className="dow">S</span>
<span className="day muted">30</span><span className="day muted">31</span><span className="day">1</span><span className="day">2</span><span className="day">3</span><span className="day">4</span><span className="day">5</span>
<span className="day">6</span><span className="day">7</span><span className="day">8</span><span className="day">9</span><span className="day">10</span><span className="day">11</span><span className="day">12</span>
<span className="day">13</span><span className="day">14</span><span className="day">15</span><span className="day">16</span><span className="day">17</span><span className="day">18</span><span className="day">19</span>
<span className="day">20</span><span className="day">21</span><span className="day">22</span><span className="day selected">23</span><span className="day">24</span><span className="day">25</span><span className="day">26</span>
<span className="day">27</span><span className="day">28</span><span className="day muted">29</span><span className="day muted">30</span><span className="day muted">1</span><span className="day muted">2</span><span className="day muted">3</span>
</div>
</div>
      <div className="card filter-card">
<h4>Filtros</h4>
      <div className="filter-field"><label>Tipo de consulta</label><select className="select-box" style={{"width": "100%"}}><option>Todos</option></select></div>
      <div className="filter-field" style={{"marginBottom": "0"}}><label>Profissional</label><select className="select-box" style={{"width": "100%"}}><option>Todos</option></select></div>
</div>
</div>
      <div className="card">
      <div className="table-wrap">
<table>
<thead><tr><th>Horário</th><th>Paciente</th><th>Tipo de consulta</th><th>Status</th><th>Ações</th></tr></thead>
<tbody>
<tr><td>08:00</td><td className="cell-person"><div className="avatar" style={{"background": "#3672c9", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>JS</div>João Silva</td><td>Fisioterapia Ortopédica</td><td><span className="badge blue"><span className="dot"></span>Confirmada</span></td><td>⋮</td></tr>
<tr><td>09:00</td><td className="cell-person"><div className="avatar" style={{"background": "#c2588a", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>MO</div>Maria Oliveira</td><td>Avaliação Fisioterapêutica</td><td><span className="badge blue"><span className="dot"></span>Confirmada</span></td><td>⋮</td></tr>
<tr><td>10:30</td><td className="cell-person"><div className="avatar" style={{"background": "#c58a1f", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>CS</div>Carlos Santos</td><td>Reabilitação</td><td><span className="badge amber"><span className="dot"></span>Aguardando</span></td><td>⋮</td></tr>
<tr><td>14:00</td><td className="cell-person"><div className="avatar" style={{"background": "#1c9a63", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>AS</div>Ana Souza</td><td>Fisioterapia</td><td><span className="badge blue"><span className="dot"></span>Confirmada</span></td><td>⋮</td></tr>
<tr><td>15:30</td><td className="cell-person"><div className="avatar" style={{"background": "#7a5cc9", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>LP</div>Lucas Pereira</td><td>Ortopédica</td><td><span className="badge blue"><span className="dot"></span>Confirmada</span></td><td>⋮</td></tr>
<tr><td>17:00</td><td className="cell-person"><div className="avatar" style={{"background": "#d64545", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>FL</div>Fernanda Lima</td><td>Reabilitação</td><td><span className="badge red"><span className="dot"></span>Cancelada</span></td><td>⋮</td></tr>
</tbody>
</table>
</div>
</div>
</div>
</div>

      <div id="page-pacientes" className="hidden">
      <div className="page-head page-head-row">
      <div>
<h1>Pacientes</h1>
<p>Gerencie os pacientes cadastrados na clínica.</p>
</div>
<button className="btn-new">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"></path></svg>
            Novo paciente
          </button>
</div>
      <div className="toolbar">
      <div className="input-search">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>
<input placeholder="Buscar por nome, CPF ou telefone" />
</div>
<select className="select-box"><option>Todos</option></select>
</div>
      <div className="card">
      <div className="table-wrap">
<table>
<thead><tr><th>Nome</th><th>Telefone</th><th>Status</th><th>Última consulta</th><th>Ações</th></tr></thead>
<tbody>
<tr onClick={() => goPage('paciente')} style={{"cursor": "pointer"}}>
<td className="cell-person"><div className="avatar" style={{"background": "#3672c9"}}>JS</div>João Silva</td><td>(11) 98765-4321</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>12/04/2025</td><td>⋮</td>
</tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#c2588a"}}>MO</div>Maria Oliveira</td><td>(11) 91234-5678</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>10/04/2025</td><td>⋮</td></tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#c58a1f"}}>CS</div>Carlos Santos</td><td>(11) 99876-5432</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>08/04/2025</td><td>⋮</td></tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#1c9a63"}}>AS</div>Ana Souza</td><td>(11) 97654-3210</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>05/04/2025</td><td>⋮</td></tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#7a5cc9"}}>LP</div>Lucas Pereira</td><td>(11) 95555-6666</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>02/04/2025</td><td>⋮</td></tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#d64545"}}>FL</div>Fernanda Lima</td><td>(11) 94444-7777</td><td><span className="badge red"><span className="dot"></span>Inativo</span></td><td>28/03/2025</td><td>⋮</td></tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#3f6f6d"}}>RC</div>Rafael Costa</td><td>(11) 93333-8888</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>25/03/2025</td><td>⋮</td></tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#9c6b3f"}}>JA</div>Juliana Alves</td><td>(11) 92222-9999</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>20/03/2025</td><td>⋮</td></tr>
</tbody>
</table>
</div>
      <div className="pagination">
<span className="info">Mostrando 1 – 8 de 248</span>
      <div className="page-btns">
<button className="page-btn">‹</button>
<button className="page-btn active">1</button>
<button className="page-btn">2</button>
<button className="page-btn">3</button>
<button className="page-btn">4</button>
<button className="page-btn">5</button>
<button className="page-btn">…</button>
<button className="page-btn">31</button>
<button className="page-btn">›</button>
</div>
</div>
</div>
</div>

      <div id="page-paciente" className="hidden">
<button className="back-btn" onClick={() => goPage('pacientes')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"></path></svg>
          Voltar
        </button>
      <div className="detail-head">
      <div className="pat-avatar" style={{"background": "#3672c9"}}>JS</div>
      <div style={{"flex": "1"}}>
<h2 className="pat-name">João Silva</h2>
      <div className="pat-sub">#P00123  ·  32 anos  ·  CPF 123.456.789-00</div>
</div>
<button className="btn-new">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
            Editar
          </button>
</div>
      <div className="tabs-row" style={{"marginBottom": "16px"}}>
<button className="tab-btn active">Informações</button>
<button className="tab-btn">Histórico de consultas</button>
<button className="tab-btn">Histórico clínico</button>
<button className="tab-btn">Anotações</button>
</div>
      <div className="detail-grid">
      <div className="card card-pad">
<h3 style={{"margin": "0 0 6px", "fontSize": ".98rem"}}>Informações pessoais</h3>
      <div className="info-row"><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span><div><div className="lbl">Nome completo</div><div className="val">João Silva</div></div></div>
      <div className="info-row"><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"></path></svg></span><div><div className="lbl">Telefone</div><div className="val">(11) 98765-4321</div></div></div>
      <div className="info-row"><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m2 7 10 6 10-6"></path></svg></span><div><div className="lbl">E-mail</div><div className="val">joao@email.com</div></div></div>
      <div className="info-row"><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg></span><div><div className="lbl">Data de nascimento</div><div className="val">12/03/1993</div></div></div>
      <div className="info-row"><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M7 8h10M7 12h6"></path></svg></span><div><div className="lbl">CPF</div><div className="val">123.456.789-00</div></div></div>
      <div className="info-row"><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></span><div><div className="lbl">Endereço</div><div className="val">Av. Paulista, 1000 — São Paulo/SP</div></div></div>
</div>
      <div className="stack-16">
      <div className="card card-pad">
<h3 style={{"margin": "0 0 12px", "fontSize": ".98rem"}}>Status</h3>
<span className="badge green" style={{"fontSize": ".82rem", "padding": "6px 14px"}}><span className="dot"></span>Ativo</span>
</div>
      <div className="card card-pad">
<h3 style={{"margin": "0 0 12px", "fontSize": ".98rem"}}>Última consulta</h3>
      <div className="info-row" style={{"paddingTop": "0"}}><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg></span><div><div className="val" style={{"fontWeight": "700"}}>12/04/2025</div></div></div>
      <div className="info-row" style={{"paddingTop": "0", "borderBottom": "none"}}><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg></span><div><div className="val" style={{"fontWeight": "700"}}>Fisioterapia Ortopédica</div></div></div>
<button className="btn-ghost" style={{"marginTop": "8px"}}>Ver todas as consultas</button>
</div>
      <div className="card card-pad">
<h3 style={{"margin": "0 0 10px", "fontSize": ".98rem"}}>Observações</h3>
<p style={{"margin": "0", "fontSize": ".85rem", "color": "var(--ink-700)", "lineHeight": "1.55"}}>Paciente em tratamento para dor lombar. Evolução positiva.</p>
</div>
</div>
</div>
</div>

      <div id="page-consultas" className="hidden">
      <div className="page-head page-head-row">
      <div><h1>Consultas</h1><p>Histórico completo de atendimentos da clínica.</p></div>
<button className="btn-new">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"></path></svg>
            Nova consulta
          </button>
</div>
      <div className="kpi-grid" style={{"gridTemplateColumns": "repeat(4,1fr)"}}>
      <div className="card kpi">
      <div className="kpi-icon" style={{"background": "var(--teal-100)", "color": "var(--teal-700)"}}><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg></div>
      <div className="kpi-label">Consultas no mês</div><div className="kpi-value">312</div>
</div>
      <div className="card kpi">
      <div className="kpi-icon" style={{"background": "var(--green-bg)", "color": "var(--green)"}}><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m20 6-11 11-5-5"></path></svg></div>
      <div className="kpi-label">Realizadas</div><div className="kpi-value">276</div>
</div>
      <div className="card kpi">
      <div className="kpi-icon" style={{"background": "var(--amber-bg)", "color": "var(--amber)"}}><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg></div>
      <div className="kpi-label">Faltas</div><div className="kpi-value">18</div>
</div>
      <div className="card kpi">
      <div className="kpi-icon" style={{"background": "var(--red-bg)", "color": "var(--red)"}}><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="m9 9 6 6M15 9l-6 6"></path></svg></div>
      <div className="kpi-label">Canceladas</div><div className="kpi-value">18</div>
</div>
</div>
      <div className="toolbar">
      <div className="input-search">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>
<input placeholder="Buscar por paciente ou profissional" />
</div>
<select className="select-box"><option>Todos os status</option><option>Confirmada</option><option>Realizada</option><option>Falta</option><option>Cancelada</option></select>
<select className="select-box"><option>Todos os profissionais</option></select>
<button className="select-box">Abril 2025</button>
</div>
      <div className="card">
      <div className="table-wrap">
<table>
<thead><tr><th>Data</th><th>Horário</th><th>Paciente</th><th>Profissional</th><th>Tipo</th><th>Status</th><th>Ações</th></tr></thead>
<tbody>
<tr><td>23/04/2025</td><td>08:00</td><td className="cell-person"><div className="avatar" style={{"background": "#3672c9", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>JS</div>João Silva</td><td>Dra. Beatriz Lima</td><td>Ortopédica</td><td><span className="badge blue"><span className="dot"></span>Confirmada</span></td><td>⋮</td></tr>
<tr><td>23/04/2025</td><td>09:00</td><td className="cell-person"><div className="avatar" style={{"background": "#c2588a", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>MO</div>Maria Oliveira</td><td>Dr. Pedro Nunes</td><td>Avaliação</td><td><span className="badge blue"><span className="dot"></span>Confirmada</span></td><td>⋮</td></tr>
<tr><td>22/04/2025</td><td>16:00</td><td className="cell-person"><div className="avatar" style={{"background": "#c58a1f", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>CS</div>Carlos Santos</td><td>Dra. Beatriz Lima</td><td>Reabilitação</td><td><span className="badge green"><span className="dot"></span>Realizada</span></td><td>⋮</td></tr>
<tr><td>22/04/2025</td><td>11:00</td><td className="cell-person"><div className="avatar" style={{"background": "#1c9a63", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>AS</div>Ana Souza</td><td>Dr. Pedro Nunes</td><td>Fisioterapia</td><td><span className="badge amber"><span className="dot"></span>Falta</span></td><td>⋮</td></tr>
<tr><td>21/04/2025</td><td>15:30</td><td className="cell-person"><div className="avatar" style={{"background": "#7a5cc9", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>LP</div>Lucas Pereira</td><td>Dra. Camila Reis</td><td>Ortopédica</td><td><span className="badge green"><span className="dot"></span>Realizada</span></td><td>⋮</td></tr>
<tr><td>21/04/2025</td><td>17:00</td><td className="cell-person"><div className="avatar" style={{"background": "#d64545", "width": "30px", "height": "30px", "fontSize": ".68rem"}}>FL</div>Fernanda Lima</td><td>Dr. Pedro Nunes</td><td>Reabilitação</td><td><span className="badge red"><span className="dot"></span>Cancelada</span></td><td>⋮</td></tr>
</tbody>
</table>
</div>
      <div className="pagination">
<span className="info">Mostrando 1 – 6 de 312</span>
      <div className="page-btns">
<button className="page-btn">‹</button>
<button className="page-btn active">1</button>
<button className="page-btn">2</button>
<button className="page-btn">3</button>
<button className="page-btn">…</button>
<button className="page-btn">39</button>
<button className="page-btn">›</button>
</div>
</div>
</div>
</div>
      <div id="page-tipos" className="hidden">
      <div className="page-head page-head-row">
      <div><h1>Tipos de consulta</h1><p>Cadastre e organize as categorias de atendimento.</p></div>
<button className="btn-new">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"></path></svg>
            Novo tipo
          </button>
</div>
      <div className="type-grid">
      <div className="card type-card">
      <div className="type-card-top">
      <div className="type-swatch" style={{"background": "var(--teal-500)"}}></div>
      <div><div className="type-name">Fisioterapia</div><div className="type-meta">Atendimento padrão</div></div>
</div>
      <div className="type-row"><span>Duração</span><b>50 min</b></div>
      <div className="type-row"><span>Valor</span><b>R$ 130,00</b></div>
      <div className="type-foot"><span className="badge green"><span className="dot"></span>Ativo</span><button className="dots-btn">⋮</button></div>
</div>
      <div className="card type-card">
      <div className="type-card-top">
      <div className="type-swatch" style={{"background": "var(--blue)"}}></div>
      <div><div className="type-name">Reabilitação</div><div className="type-meta">Pós-cirúrgico e crônico</div></div>
</div>
      <div className="type-row"><span>Duração</span><b>60 min</b></div>
      <div className="type-row"><span>Valor</span><b>R$ 150,00</b></div>
      <div className="type-foot"><span className="badge green"><span className="dot"></span>Ativo</span><button className="dots-btn">⋮</button></div>
</div>
      <div className="card type-card">
      <div className="type-card-top">
      <div className="type-swatch" style={{"background": "var(--amber)"}}></div>
      <div><div className="type-name">Avaliação Fisioterapêutica</div><div className="type-meta">Primeira consulta</div></div>
</div>
      <div className="type-row"><span>Duração</span><b>40 min</b></div>
      <div className="type-row"><span>Valor</span><b>R$ 110,00</b></div>
      <div className="type-foot"><span className="badge green"><span className="dot"></span>Ativo</span><button className="dots-btn">⋮</button></div>
</div>
      <div className="card type-card">
      <div className="type-card-top">
      <div className="type-swatch" style={{"background": "#7a5cc9"}}></div>
      <div><div className="type-name">Ortopédica</div><div className="type-meta">Lesões e traumas ortopédicos</div></div>
</div>
      <div className="type-row"><span>Duração</span><b>50 min</b></div>
      <div className="type-row"><span>Valor</span><b>R$ 140,00</b></div>
      <div className="type-foot"><span className="badge green"><span className="dot"></span>Ativo</span><button className="dots-btn">⋮</button></div>
</div>
      <div className="card type-card">
      <div className="type-card-top">
      <div className="type-swatch" style={{"background": "#3f6f6d"}}></div>
      <div><div className="type-name">Pilates Clínico</div><div className="type-meta">Sessão individual</div></div>
</div>
      <div className="type-row"><span>Duração</span><b>50 min</b></div>
      <div className="type-row"><span>Valor</span><b>R$ 120,00</b></div>
      <div className="type-foot"><span className="badge green"><span className="dot"></span>Ativo</span><button className="dots-btn">⋮</button></div>
</div>
      <div className="card type-card">
      <div className="type-card-top">
      <div className="type-swatch" style={{"background": "var(--ink-300)"}}></div>
      <div><div className="type-name">Outros</div><div className="type-meta">Procedimentos avulsos</div></div>
</div>
      <div className="type-row"><span>Duração</span><b>30 min</b></div>
      <div className="type-row"><span>Valor</span><b>R$ 90,00</b></div>
      <div className="type-foot"><span className="badge red"><span className="dot"></span>Inativo</span><button className="dots-btn">⋮</button></div>
</div>
</div>
</div>
      <div id="page-horarios" className="hidden">
      <div className="page-head page-head-row">
      <div><h1>Horários</h1><p>Defina a disponibilidade dos fisioterapeutas.</p></div>
<button className="btn-new">
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"></path></svg>
            Novo bloqueio
          </button>
</div>
      <div className="card">
      <div className="card-head"><h3>Fisioterapeutas</h3><span className="select-mini">6 profissionais</span></div>
      <div style={{"paddingTop": "6px"}}>
      <div className="prof-card">
      <div className="avatar" style={{"background": "#3672c9"}}>BL</div>
      <div className="prof-info"><div className="prof-name">Dra. Beatriz Lima</div><div className="prof-role">Ortopedia</div></div>
      <div className="hours-strip">
<span className="hours-chip">Seg 08–17h</span><span className="hours-chip">Ter 08–17h</span><span className="hours-chip">Qua 08–17h</span>
<span className="hours-chip">Qui 08–17h</span><span className="hours-chip">Sex 08–12h</span><span className="hours-chip off">Sáb folga</span><span className="hours-chip off">Dom folga</span>
</div>
<button className="dots-btn">⋮</button>
</div>
      <div className="prof-card">
      <div className="avatar" style={{"background": "#c58a1f"}}>PN</div>
      <div className="prof-info"><div className="prof-name">Dr. Pedro Nunes</div><div className="prof-role">Reabilitação</div></div>
      <div className="hours-strip">
<span className="hours-chip">Seg 09–18h</span><span className="hours-chip">Ter 09–18h</span><span className="hours-chip off">Qua folga</span>
<span className="hours-chip">Qui 09–18h</span><span className="hours-chip">Sex 09–18h</span><span className="hours-chip">Sáb 08–12h</span><span className="hours-chip off">Dom folga</span>
</div>
<button className="dots-btn">⋮</button>
</div>
      <div className="prof-card">
      <div className="avatar" style={{"background": "#7a5cc9"}}>CR</div>
      <div className="prof-info"><div className="prof-name">Dra. Camila Reis</div><div className="prof-role">Fisioterapia geral</div></div>
      <div className="hours-strip">
<span className="hours-chip">Seg 07–16h</span><span className="hours-chip">Ter 07–16h</span><span className="hours-chip">Qua 07–16h</span>
<span className="hours-chip">Qui 07–16h</span><span className="hours-chip">Sex 07–16h</span><span className="hours-chip off">Sáb folga</span><span className="hours-chip off">Dom folga</span>
</div>
<button className="dots-btn">⋮</button>
</div>
      <div className="prof-card">
      <div className="avatar" style={{"background": "#1c9a63"}}>RT</div>
      <div className="prof-info"><div className="prof-name">Dr. Rafael Torres</div><div className="prof-role">Pilates clínico</div></div>
      <div className="hours-strip">
<span className="hours-chip off">Seg folga</span><span className="hours-chip">Ter 10–19h</span><span className="hours-chip">Qua 10–19h</span>
<span className="hours-chip">Qui 10–19h</span><span className="hours-chip">Sex 10–19h</span><span className="hours-chip">Sáb 09–13h</span><span className="hours-chip off">Dom folga</span>
</div>
<button className="dots-btn">⋮</button>
</div>
</div>
</div>
</div>
      <div id="page-clinica" className="hidden">
      <div className="page-head page-head-row">
      <div><h1>Clínica</h1><p>Dados gerais e unidades da clínica.</p></div>
<button className="btn-new">Salvar alterações</button>
</div>
      <div className="detail-grid">
      <div className="card card-pad">
<h3 style={{"margin": "0 0 16px", "fontSize": ".98rem"}}>Dados gerais</h3>
      <div className="form-grid">
      <div className="form-field"><label>Nome da clínica</label><input defaultValue="FisioVida \u2014 Cl\u00ednica de Fisioterapia" /></div>
      <div className="form-field"><label>CNPJ</label><input defaultValue="12.345.678/0001-90" /></div>
      <div className="form-field"><label>Telefone</label><input defaultValue="(11) 3456-7890" /></div>
      <div className="form-field"><label>E-mail</label><input defaultValue="contato@fisiovida.com.br" /></div>
      <div className="form-field" style={{"gridColumn": "1/-1"}}><label>Endereço</label><input defaultValue="Av. Paulista, 1000 \u2014 S\u00e3o Paulo/SP" /></div>
      <div className="form-field"><label>Horário de funcionamento</label><input defaultValue="Seg a Sex, 07h \u00e0s 20h" /></div>
      <div className="form-field"><label>Fuso horário</label><select><option>América/São Paulo (GMT-3)</option></select></div>
</div>
</div>
      <div className="stack-16">
      <div className="card card-pad">
<h3 style={{"margin": "0 0 12px", "fontSize": ".98rem"}}>Unidades</h3>
      <div className="info-row"><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></span><div><div className="lbl">Unidade Paulista</div><div className="val">Matriz · 8 salas</div></div></div>
      <div className="info-row" style={{"borderBottom": "none"}}><span className="ii"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></span><div><div className="lbl">Unidade Moema</div><div className="val">Filial · 4 salas</div></div></div>
</div>
      <div className="card card-pad">
<h3 style={{"margin": "0 0 12px", "fontSize": ".98rem"}}>Resumo</h3>
      <div className="type-row"><span>Profissionais ativos</span><b>6</b></div>
      <div className="type-row"><span>Pacientes cadastrados</span><b>248</b></div>
      <div className="type-row"><span>Unidades</span><b>2</b></div>
</div>
</div>
</div>
</div>
      <div id="page-config" className="hidden">
      <div className="page-head"><h1>Configurações</h1><p>Preferências do sistema e da conta.</p></div>
      <div className="settings-shell">
      <div className="card card-pad settings-nav">
<button className="active" data-settings="perfil" onClick={() => goSettings('perfil')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Perfil
            </button>
<button data-settings="usuarios" onClick={() => goSettings('usuarios')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Usuários e perfis
            </button>
<button data-settings="notif" onClick={() => goSettings('notif')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.7 21a2 2 0 0 1-3.4 0"></path></svg>
              Notificações
            </button>
<button data-settings="seguranca" onClick={() => goSettings('seguranca')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5Z"></path></svg>
              Segurança
            </button>
<button data-settings="auditoria" onClick={() => goSettings('auditoria')}>
<svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
              Auditoria
            </button>
</div>
      <div>
      <div className="card card-pad settings-pane active" id="settings-perfil">
<h3 style={{"margin": "0 0 16px", "fontSize": ".98rem"}}>Dados do perfil</h3>
      <div className="form-grid">
      <div className="form-field"><label>Nome</label><input defaultValue="Administrador" /></div>
      <div className="form-field"><label>E-mail</label><input defaultValue="admin@fisiovida.com.br" /></div>
      <div className="form-field"><label>Cargo</label><input defaultValue="Administrador" /></div>
      <div className="form-field"><label>Telefone</label><input defaultValue="(11) 90000-0000" /></div>
</div>
      <div style={{"marginTop": "18px"}}><button className="btn-new">Salvar alterações</button></div>
</div>
      <div className="card card-pad settings-pane" id="settings-usuarios">
      <div className="card-head" style={{"padding": "0 0 14px"}}><h3>Usuários do sistema</h3><button className="btn-new">Novo usuário</button></div>
      <div className="table-wrap">
<table>
<thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Status</th><th>Ações</th></tr></thead>
<tbody>
<tr><td className="cell-person"><div className="avatar" style={{"background": "var(--teal-500)"}}>AD</div>Administrador</td><td>admin@fisiovida.com.br</td><td>ADMIN</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>⋮</td></tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#c2588a"}}>MF</div>Mariana Freitas</td><td>mariana@fisiovida.com.br</td><td>ATENDENTE</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>⋮</td></tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#3672c9"}}>BL</div>Dra. Beatriz Lima</td><td>beatriz@fisiovida.com.br</td><td>FISIOTERAPEUTA</td><td><span className="badge green"><span className="dot"></span>Ativo</span></td><td>⋮</td></tr>
<tr><td className="cell-person"><div className="avatar" style={{"background": "#c58a1f"}}>PN</div>Dr. Pedro Nunes</td><td>pedro@fisiovida.com.br</td><td>FISIOTERAPEUTA</td><td><span className="badge red"><span className="dot"></span>Inativo</span></td><td>⋮</td></tr>
</tbody>
</table>
</div>
</div>
      <div className="card card-pad settings-pane" id="settings-notif">
<h3 style={{"margin": "0 0 6px", "fontSize": ".98rem"}}>Preferências de notificação</h3>
      <div className="switch-row"><div><div className="lbl2">Novas consultas</div><div className="sub2">Avisar quando um agendamento for criado</div></div><div className="switch on" onClick={(e) => e.currentTarget.classList.toggle('on')}></div></div>
      <div className="switch-row"><div><div className="lbl2">Cancelamentos</div><div className="sub2">Avisar quando uma consulta for cancelada</div></div><div className="switch on" onClick={(e) => e.currentTarget.classList.toggle('on')}></div></div>
      <div className="switch-row"><div><div className="lbl2">Faltas de pacientes</div><div className="sub2">Avisar quando um paciente faltar</div></div><div className="switch" onClick={(e) => e.currentTarget.classList.toggle('on')}></div></div>
      <div className="switch-row"><div><div className="lbl2">Relatório semanal</div><div className="sub2">Resumo por e-mail toda segunda-feira</div></div><div className="switch on" onClick={(e) => e.currentTarget.classList.toggle('on')}></div></div>
</div>
      <div className="card card-pad settings-pane" id="settings-seguranca">
<h3 style={{"margin": "0 0 16px", "fontSize": ".98rem"}}>Segurança da conta</h3>
      <div className="form-grid">
      <div className="form-field"><label>Senha atual</label><input type="password" defaultValue="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" /></div>
      <div className="form-field"></div>
      <div className="form-field"><label>Nova senha</label><input type="password" placeholder="Digite a nova senha" /></div>
      <div className="form-field"><label>Confirmar nova senha</label><input type="password" placeholder="Repita a nova senha" /></div>
</div>
      <div className="switch-row" style={{"marginTop": "8px"}}><div><div className="lbl2">Autenticação em duas etapas</div><div className="sub2">Exigir um código adicional ao entrar</div></div><div className="switch" onClick={(e) => e.currentTarget.classList.toggle('on')}></div></div>
      <div style={{"marginTop": "18px"}}><button className="btn-new">Atualizar senha</button></div>
</div>
      <div className="card settings-pane" id="settings-auditoria">
      <div className="card-head"><h3>Histórico de ações</h3><span className="select-mini">Últimos 30 dias</span></div>
      <div className="table-wrap">
<table>
<thead><tr><th>Data</th><th>Usuário</th><th>Ação</th><th>Detalhe</th></tr></thead>
<tbody>
<tr><td>23/04/2025 09:12</td><td>Administrador</td><td>Editou paciente</td><td>João Silva</td></tr>
<tr><td>22/04/2025 17:40</td><td>Mariana Freitas</td><td>Cancelou consulta</td><td>Fernanda Lima · 17:00</td></tr>
<tr><td>22/04/2025 08:05</td><td>Dra. Beatriz Lima</td><td>Registrou falta</td><td>Ana Souza</td></tr>
<tr><td>21/04/2025 14:22</td><td>Administrador</td><td>Criou usuário</td><td>Dr. Rafael Torres</td></tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>


    </>
  );
}
