/* =========================================
   TRADING DASHBOARD - FINAL VERSION
   Paper Trading Only
========================================= */


/* =========================================
   DEMO MARKET DATA
========================================= */

const marketData = {

    NIFTY: {
        price: 25000,
        change: 0.45
    },

    BANKNIFTY: {
        price: 55000,
        change: 0.32
    },

    SENSEX: {
        price: 82000,
        change: 0.28
    },

    RELIANCE: {
        price: 1400,
        change: 0.75
    },

    TCS: {
        price: 3200,
        change: -0.35
    },

    INFY: {
        price: 1500,
        change: 0.62
    },

    HDFCBANK: {
        price: 1000,
        change: -0.18
    }

};


/* =========================================
   PAPER TRADES ARRAY
========================================= */

let trades = [];


/* =========================================
   MARKET STATUS
========================================= */

function updateMarketStatus() {

    const statusElement =
        document.getElementById("marketStatus");

    if (!statusElement) {
        return;
    }


    const now = new Date();

    const day = now.getDay();

    const hours = now.getHours();

    const minutes = now.getMinutes();

    const currentMinutes =
        hours * 60 + minutes;


    const marketOpen =
        9 * 60 + 15;

    const marketClose =
        15 * 60 + 30;


    if (
        day >= 1 &&
        day <= 5 &&
        currentMinutes >= marketOpen &&
        currentMinutes <= marketClose
    ) {

        statusElement.textContent =
            "OPEN";

    } else {

        statusElement.textContent =
            "CLOSED";

    }

}


/* =========================================
   FORMAT CURRENCY
========================================= */

function formatCurrency(value) {

    return "₹" +
        Number(value).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


/* =========================================
   UPDATE MARKET DATA
========================================= */

function updateMarketData() {


    /* NIFTY */

    const niftyPrice =
        document.getElementById("niftyPrice");

    const niftyChange =
        document.getElementById("niftyChange");


    if (niftyPrice) {

        niftyPrice.textContent =
            marketData.NIFTY.price.toLocaleString("en-IN");

    }


    if (niftyChange) {

        niftyChange.textContent =
            formatChange(marketData.NIFTY.change);

    }



    /* BANK NIFTY */

    const bankNiftyPrice =
        document.getElementById("bankNiftyPrice");

    const bankNiftyChange =
        document.getElementById("bankNiftyChange");


    if (bankNiftyPrice) {

        bankNiftyPrice.textContent =
            marketData.BANKNIFTY.price.toLocaleString("en-IN");

    }


    if (bankNiftyChange) {

        bankNiftyChange.textContent =
            formatChange(marketData.BANKNIFTY.change);

    }



    /* SENSEX */

    const sensexPrice =
        document.getElementById("sensexPrice");

    const sensexChange =
        document.getElementById("sensexChange");


    if (sensexPrice) {

        sensexPrice.textContent =
            marketData.SENSEX.price.toLocaleString("en-IN");

    }


    if (sensexChange) {

        sensexChange.textContent =
            formatChange(marketData.SENSEX.change);

    }



    /* RELIANCE */

    updateStockCard(
        "RELIANCE",
        "reliancePrice",
        "relianceChange"
    );


    /* TCS */

    updateStockCard(
        "TCS",
        "tcsPrice",
        "tcsChange"
    );


    /* INFY */

    updateStockCard(
        "INFY",
        "infyPrice",
        "infyChange"
    );


    /* HDFC BANK */

    updateStockCard(
        "HDFCBANK",
        "hdfcPrice",
        "hdfcChange"
    );

}


/* =========================================
   UPDATE STOCK CARD
========================================= */

function updateStockCard(
    stock,
    priceId,
    changeId
) {


    const priceElement =
        document.getElementById(priceId);

    const changeElement =
        document.getElementById(changeId);


    if (priceElement) {

        priceElement.textContent =
            formatCurrency(
                marketData[stock].price
            );

    }


    if (changeElement) {

        changeElement.textContent =
            formatChange(
                marketData[stock].change
            );

    }

}


/* =========================================
   FORMAT CHANGE %
========================================= */

function formatChange(change) {

    if (change >= 0) {

        return "+" +
            change.toFixed(2) +
            "%";

    } else {

        return change.toFixed(2) +
            "%";

    }

}


/* =========================================
   GET CURRENT STOCK PRICE
========================================= */

function getCurrentPrice(stock) {

    if (marketData[stock]) {

        return marketData[stock].price;

    }

    return 0;

}


/* =========================================
   CALCULATE TRADE
========================================= */

function calculateTrade() {


    const stock =
        document.getElementById("stockName").value;


    const tradeType =
        document.getElementById("tradeType").value;


    const entry =
        parseFloat(
            document.getElementById("entryPrice").value
        );


    const stopLoss =
        parseFloat(
            document.getElementById("stopLoss").value
        );


    const target =
        parseFloat(
            document.getElementById("targetPrice").value
        );


    const quantity =
        parseFloat(
            document.getElementById("quantity").value
        );


    const result =
        document.getElementById("tradeResult");


    /* =========================================
       VALIDATION
    ========================================= */

    if (
        isNaN(entry) ||
        isNaN(stopLoss) ||
        isNaN(target) ||
        isNaN(quantity)
    ) {

        result.innerHTML =
            "⚠️ Please enter all trade details.";

        return;

    }


    if (
        entry <= 0 ||
        stopLoss <= 0 ||
        target <= 0 ||
        quantity <= 0
    ) {

        result.innerHTML =
            "⚠️ All values must be greater than zero.";

        return;

    }


    let riskPerShare;

    let rewardPerShare;


    /* =========================================
       BUY LOGIC
    ========================================= */

    if (tradeType === "BUY") {


        if (stopLoss >= entry) {

            result.innerHTML =
                "⚠️ BUY: Stop Loss must be below Entry Price.";

            return;

        }


        if (target <= entry) {

            result.innerHTML =
                "⚠️ BUY: Target must be above Entry Price.";

            return;

        }


        riskPerShare =
            entry - stopLoss;


        rewardPerShare =
            target - entry;

    }


    /* =========================================
       SELL LOGIC
    ========================================= */

    else {


        if (stopLoss <= entry) {

            result.innerHTML =
                "⚠️ SELL: Stop Loss must be above Entry Price.";

            return;

        }


        if (target >= entry) {

            result.innerHTML =
                "⚠️ SELL: Target must be below Entry Price.";

            return;

        }


        riskPerShare =
            stopLoss - entry;


        rewardPerShare =
            entry - target;

    }


    /* =========================================
       CALCULATIONS
    ========================================= */

    const totalRisk =
        riskPerShare * quantity;


    const potentialProfit =
        rewardPerShare * quantity;


    const riskRewardRatio =
        rewardPerShare / riskPerShare;


    const investment =
        entry * quantity;


    /* =========================================
       DISPLAY RESULT
    ========================================= */

    result.innerHTML = `

        <h3>
            ${stock} - ${tradeType}
        </h3>

        <p>
            Entry Price:
            <strong>
                ${formatCurrency(entry)}
            </strong>
        </p>

        <p>
            Stop Loss:
            <strong>
                ${formatCurrency(stopLoss)}
            </strong>
        </p>

        <p>
            Target:
            <strong>
                ${formatCurrency(target)}
            </strong>
        </p>

        <p>
            Quantity:
            <strong>
                ${quantity}
            </strong>
        </p>

        <hr>

        <p>
            Investment:
            <strong>
                ${formatCurrency(investment)}
            </strong>
        </p>

        <p>
            Risk / Share:
            <strong>
                ${formatCurrency(riskPerShare)}
            </strong>
        </p>

        <p>
            Reward / Share:
            <strong>
                ${formatCurrency(rewardPerShare)}
            </strong>
        </p>

        <p>
            Total Risk:
            <strong>
                ${formatCurrency(totalRisk)}
            </strong>
        </p>

        <p>
            Potential Profit:
            <strong>
                ${formatCurrency(potentialProfit)}
            </strong>
        </p>

        <p>
            Risk : Reward:
            <strong>
                1 : ${riskRewardRatio.toFixed(2)}
            </strong>
        </p>

    `;

}


/* =========================================
   ADD TRADE TO JOURNAL
========================================= */

function addTrade() {


    const stock =
        document.getElementById("stockName").value;


    const tradeType =
        document.getElementById("tradeType").value;


    const entry =
        parseFloat(
            document.getElementById("entryPrice").value
        );


    const stopLoss =
        parseFloat(
            document.getElementById("stopLoss").value
        );


    const target =
        parseFloat(
            document.getElementById("targetPrice").value
        );


    const quantity =
        parseFloat(
            document.getElementById("quantity").value
        );


    /* =========================================
       VALIDATION
    ========================================= */

    if (
        isNaN(entry) ||
        isNaN(stopLoss) ||
        isNaN(target) ||
        isNaN(quantity)
    ) {

        alert(
            "Please enter all trade details."
        );

        return;

    }


    if (
        entry <= 0 ||
        stopLoss <= 0 ||
        target <= 0 ||
        quantity <= 0
    ) {

        alert(
            "All values must be greater than zero."
        );

        return;

    }


    let riskPerShare;

    let rewardPerShare;


    /* =========================================
       BUY
    ========================================= */

    if (tradeType === "BUY") {


        if (
            stopLoss >= entry ||
            target <= entry
        ) {

            alert(
                "For BUY: SL should be below Entry and Target should be above Entry."
            );

            return;

        }


        riskPerShare =
            entry - stopLoss;


        rewardPerShare =
            target - entry;

    }


    /* =========================================
       SELL
    ========================================= */

    else {


        if (
            stopLoss <= entry ||
            target >= entry
        ) {

            alert(
                "For SELL: SL should be above Entry and Target should be below Entry."
            );

            return;

        }


        riskPerShare =
            stopLoss - entry;


        rewardPerShare =
            entry - target;

    }


    /* =========================================
       TRADE CALCULATIONS
    ========================================= */

    const totalRisk =
        riskPerShare * quantity;


    const totalReward =
        rewardPerShare * quantity;


    const ratio =
        rewardPerShare / riskPerShare;


    const investment =
        entry * quantity;


    const currentPrice =
        getCurrentPrice(stock);


    /* =========================================
       INITIAL P&L
    ========================================= */

    let pnl = 0;


    if (tradeType === "BUY") {

        pnl =
            (currentPrice - entry) *
            quantity;

    } else {

        pnl =
            (entry - currentPrice) *
            quantity;

    }


    /* =========================================
       CREATE TRADE OBJECT
    ========================================= */

    const trade = {

        stock: stock,

        type: tradeType,

        entry: entry,

        stopLoss: stopLoss,

        target: target,

        quantity: quantity,

        investment: investment,

        currentPrice: currentPrice,

        risk: totalRisk,

        reward: totalReward,

        ratio: ratio,

        pnl: pnl

    };


    /* =========================================
       ADD TO ARRAY
    ========================================= */

    trades.push(trade);


    /* =========================================
       UPDATE DISPLAY
    ========================================= */

    displayTrades();


    updatePnLSummary();


    alert(
        "Trade added to Paper Trading Journal ✅"
    );

}


/* =========================================
   DISPLAY TRADES
========================================= */

function displayTrades() {


    const tableBody =
        document.getElementById("tradeTableBody");


    if (!tableBody) {

        return;

    }


    tableBody.innerHTML = "";


    trades.forEach(
        (trade, index) => {


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${trade.stock}
                </td>

                <td>
                    ${trade.type}
                </td>

                <td>
                    ${formatCurrency(trade.entry)}
                </td>

                <td>
                    ${formatCurrency(trade.stopLoss)}
                </td>

                <td>
                    ${formatCurrency(trade.target)}
                </td>

                <td>
                    ${trade.quantity}
                </td>

                <td>
                    ${formatCurrency(trade.currentPrice)}
                </td>

                <td>
                    ${formatCurrency(trade.risk)}
                </td>

                <td>
                    ${formatCurrency(trade.reward)}
                </td>

                <td>
                    ${formatCurrency(trade.pnl)}
                </td>

                <td>
                    1 : ${trade.ratio.toFixed(2)}
                </td>

            `;


            tableBody.appendChild(row);

        }
    );

}


/* =========================================
   UPDATE P&L
========================================= */

function updatePnL() {


    trades.forEach(
        trade => {


            const currentPrice =
                getCurrentPrice(
                    trade.stock
                );


            trade.currentPrice =
                currentPrice;


            if (trade.type === "BUY") {

                trade.pnl =
                    (
                        currentPrice -
                        trade.entry
                    ) *
                    trade.quantity;

            } else {

                trade.pnl =
                    (
                        trade.entry -
                        currentPrice
                    ) *
                    trade.quantity;

            }

        }
    );


    displayTrades();


    updatePnLSummary();

}


/* =========================================
   UPDATE P&L SUMMARY
========================================= */

function updatePnLSummary() {


    const totalInvestmentElement =
        document.getElementById(
            "totalInvestment"
        );


    const totalPnLElement =
        document.getElementById(
            "totalPnL"
        );


    const winningTradesElement =
        document.getElementById(
            "winningTrades"
        );


    const losingTradesElement =
        document.getElementById(
            "losingTrades"
        );


    let totalInvestment = 0;

    let totalPnL = 0;

    let winningTrades = 0;

    let losingTrades = 0;


    trades.forEach(
        trade => {


            totalInvestment +=
                trade.investment;


            totalPnL +=
                trade.pnl;


            if (trade.pnl > 0) {

                winningTrades++;

            }


            if (trade.pnl < 0) {

                losingTrades++;

            }

        }
    );


    if (totalInvestmentElement) {

        totalInvestmentElement.textContent =
            formatCurrency(
                totalInvestment
            );

    }


    if (totalPnLElement) {

        totalPnLElement.textContent =
            formatCurrency(
                totalPnL
            );

    }


    if (winningTradesElement) {

        winningTradesElement.textContent =
            winningTrades;

    }


    if (losingTradesElement) {

        losingTradesElement.textContent =
            losingTrades;

    }

}


/* =========================================
   AUTO UPDATE MARKET / P&L
========================================= */

function refreshDashboard() {

    updateMarketStatus();

    updateMarketData();

    updatePnL();

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        refreshDashboard();

        /*
            Refresh every 10 seconds.

            NOTE:
            This is DEMO market data.
            It is NOT live exchange data.
        */

        setInterval(
            refreshDashboard,
            10000
        );

    }
);