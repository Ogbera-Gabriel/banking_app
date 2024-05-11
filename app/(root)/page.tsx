import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {

  const loggedIn = await getLoggedInUser();
  console.log(loggedIn);
  return (
    <section className="home">
      <div className="home-content">
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.name || "Guest"}
          subtext="Access and manage your acccount and transactions efficiently"
        />
        <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={5000.35}
        />
      </div>
      <RightSideBar user={loggedIn} transactions={[]} banks={[{ currentBalance: 1250.35 }, {currentBalance: 1250.70}]} />
    </section>
  );
};

export default Home;
