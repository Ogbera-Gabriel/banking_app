import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {firstname: "xGuest"}
  return (
    <section className="home">
      <div className="home-content">
        <HeaderBox 
         type="greeting"
         title="Welcome"
         user={loggedIn?.firstname || "xXx.Fresh"}
         subtext="Access and manage your acccount and transactions efficiently"
        />
        <TotalBalanceBox 
         accounts={[]}
         totalBanks={1}
         totalCurrentBalance={1250.35}
        />
      </div>
    </section>
  );
};

export default Home;
