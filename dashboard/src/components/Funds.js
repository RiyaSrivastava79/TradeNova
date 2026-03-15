import React from "react";
import { Link } from "react-router-dom";
import { funds } from "../data/data";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const formatAmount = (value) => `${value >= 0 ? "+" : "-"}${formatCurrency(Math.abs(value))}`;

const Funds = () => {
  const { equity = {}, commodity = {} } = funds;
  const equityBreakdown = equity.breakdown || [];
  const equityCollateral = equity.collateral || [];
  const recentActivity = equity.recentActivity || [];
  const commodityBreakdown = commodity.breakdown || [];

  return (
    <>
      <div className="funds">
        <p>{equity.headline}</p>
        <Link className="btn btn-green">Add funds</Link>
        <Link className="btn btn-blue">Withdraw</Link>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{formatCurrency(equity.availableMargin)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{formatCurrency(equity.usedMargin)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{formatCurrency(equity.availableCash)}</p>
            </div>
            <hr />
            {equityBreakdown.map((item) => (
              <div className="data" key={item.label}>
                <p>{item.label}</p>
                <p>{formatCurrency(item.value)}</p>
              </div>
            ))}
            <hr />
            {equityCollateral.map((item) => (
              <div className="data" key={item.label}>
                <p>{item.label}</p>
                <p>{formatCurrency(item.value)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>
              {commodity.enabled
                ? "Commodity segment demo balance"
                : "You don't have a commodity account"}
            </p>
            {commodity.enabled ? (
              <div className="table">
                <div className="data">
                  <p>Available margin</p>
                  <p className="imp colored">{formatCurrency(commodity.availableMargin)}</p>
                </div>
                <div className="data">
                  <p>Margin used</p>
                  <p className="imp">{formatCurrency(commodity.marginUsed)}</p>
                </div>
                <div className="data">
                  <p>Available cash</p>
                  <p className="imp">{formatCurrency(commodity.availableCash)}</p>
                </div>
                <hr />
                {commodityBreakdown.map((item) => (
                  <div className="data" key={item.label}>
                    <p>{item.label}</p>
                    <p>{formatCurrency(item.value)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <Link className="btn btn-blue">Open Account</Link>
            )}
          </div>
        </div>
      </div>

      <div className="funds-activity-section">
        <h3 className="title">Recent fund activity</h3>
        <div className="order-table funds-activity-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Source</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item) => (
                <tr key={`${item.date}-${item.type}`}>
                  <td className="align-left">{item.date}</td>
                  <td>{item.type}</td>
                  <td>{item.source}</td>
                  <td>{item.status}</td>
                  <td className={item.amount >= 0 ? "profit" : "loss"}>
                    {formatAmount(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Funds;