import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "Gaboski",
    lastName: "Ogbera",
    email: "xguest@gmail.com",
  };
  return (
    <section className="home">
      <div className="home-content">
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || "xXx.Fresh"}
          subtext="Access and manage your acccount and transactions efficiently"
        />
        <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.35}
        />
      </div>
      <RightSideBar user={loggedIn} transactions={[]} banks={[{ currentBalance: 1250.35 }, {currentBalance: 1250.70}]} />
    </section>
  );
};

export default Home;
