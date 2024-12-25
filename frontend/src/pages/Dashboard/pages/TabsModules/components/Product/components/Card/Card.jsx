import React from "react";
import Config from "../../../../../../../../components/config";
import "./Card.css";
import AddToPage from "./components/AddToPage/AddToPage";

function Card({ data, module_name, pageId, sectionId }) {
    return (

        <div className="tab-card"  >
            <div className="tab-card-image">
                <img src={`${Config.baseURL}${data?.image}`} alt={data?.name} />
            </div>
            <div className="tab-card-content">
                <h3 className="ctab-ard-title">{data?.name}</h3>
                <p className="tab-card-text">
                    {data?.ssku}
                </p>
                <AddToPage Id={data?.id} pageId={pageId} sectionId={sectionId} module_name={module_name} />
            </div>
        </div>
    );
}

export default Card;