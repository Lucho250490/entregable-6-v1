import React from "react";
import { formatDateDDMMYY } from "../../utils/date";

import "./styles/PurchasesCard.css"

const PurchaseCard = ({ purchase }) => {
  return (
    <div className="purshaces">
      <article className="purshaces__article">
        <div className="purshaces__imgs">
          <div className="purshaces__img">
            <img src={purchase.product.images[0].url} alt="" />
          </div>
        </div>

        <div className="purshaces__title">
          <h3>{purchase.product.title}</h3>
        </div>

        <div className="purshaces__date">
          <h5 className="purshaces__date-format">
            {formatDateDDMMYY(purchase.createdAt)}
          </h5>

          <div className="purshaces__quantity">
            <div>{purchase.quantity}</div>
          </div>

          <h4 className="purshaces__price">{purchase.product.price}</h4>
        </div>
      </article>
    </div>
  );
};

export default PurchaseCard;
