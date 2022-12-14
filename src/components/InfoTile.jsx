import React, { memo } from "react";
import { getName } from "../common/utils";

const InfoTile = ({ createdBy, name, invitation_code }) => (
  <div className="card card-body my-2 p-4 info-tile shadow-md">
    <h1 className="display-3">{name}</h1>
    <h3 className="font-weight-light">Teacher - {getName(createdBy)}</h3>
    <h5 className="mb-0 font-weight-light">
      Code - <span className="badge bg-dark">{invitation_code}</span>
    </h5>
  </div>
);

export default memo(InfoTile);
