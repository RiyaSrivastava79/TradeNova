import React from "react";

const appItems = [
  {
    name: "Kite Connect",
    description: "Build and automate your own trading strategy APIs.",
    logo: "https://img.icons8.com/color/96/api-settings.png",
  },
  {
    name: "Console",
    description: "Portfolio analytics, P&L reports and tax-ready insights.",
    logo: "https://img.icons8.com/color/96/combo-chart--v1.png",
  },
  {
    name: "Coin",
    description: "Direct mutual funds with no commission drag.",
    logo: "https://img.icons8.com/color/96/coins.png",
  },
  {
    name: "Pulse",
    description: "Curated market news and alerts in one feed.",
    logo: "https://img.icons8.com/color/96/news.png",
  },
  {
    name: "Varsity",
    description: "Learn markets with modules, notes and quizzes.",
    logo: "https://img.icons8.com/color/96/student-center.png",
  },
  {
    name: "Streak",
    description: "Create, backtest and deploy rule-based strategies.",
    logo: "https://img.icons8.com/color/96/line-chart--v1.png",
  },
];

const Apps = () => {
  return (
    <section className="apps-page">
      <h2 className="title">Apps</h2>
      <p className="apps-subtitle">Discover tools to trade, invest and analyze better.</p>

      <div className="apps-grid">
        {appItems.map((app) => (
          <article className="apps-card" key={app.name}>
            <img src={app.logo} alt={`${app.name} logo`} className="apps-logo" loading="lazy" />
            <h4>{app.name}</h4>
            <p>{app.description}</p>
            <button className="apps-open-btn">Open App</button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Apps;