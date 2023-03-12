import React, { useEffect, useState } from "react";
import PurchaseCard from "../components/purchases/PurchaseCard";
import { axiosEcomerce, getConfig } from "../utils/axiosConfig";
import "./styles/Purshases.css"

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    axiosEcomerce
      .get("/purchases", getConfig())
      .then((res) => setPurchases(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="purchases">
      <section className="purchaces__main">
        <section className="purchaces__section">
          <h3 className="purchaces__title-purchase"> My Purchases</h3>
          <section className="purchaces__card">
            {purchases.map((purchase) => (
              <PurchaseCard purchase={purchase} key={purchase.id} />
            ))}
          </section>
        </section>
      </section>
    </main>
  );
};

export default Purchases;
