import React, { memo } from "react";
import ReduxResource from "../components/ReduxResource";
import EmptyPage from "../components/EmptyPage";
import { formatDate, getName } from "../common/utils";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClassroom } from "../store/actions/action";

const ClassTile = memo(({ classroom, created = false }) => {
  const dispatch = useDispatch();
  const { created_by, created_on, name, invitation_code, id } = classroom;
  return (
    <div className="card card-body my-2 shadow-md class-tile">
      <div className="text-center">
        <h2 className="display-4">
          <Link
            to={`/classroom/${invitation_code}/stream`}
            onClick={() => dispatch(setClassroom(id, created))}
          >
            {name}
          </Link>
        </h2>
        <h4 style={{ fontWeight: "400" }}>
          Created by - {getName(created_by)} on {formatDate(created_on)}
        </h4>
        <h5>
          <span style={{ fontWeight: "400" }}>Invitation Code - </span>
          <span className="badge badge-bg">{invitation_code}</span>
        </h5>
      </div>
    </div>
  );
});

const RenderClass = ({ type = "created", created = true }) => (
  <ReduxResource
    resourceKey={type}
    render={(classrooms) => {
      if (classrooms.length === 0)
        return <EmptyPage>You haven't created any classes.</EmptyPage>;
      return classrooms.map((cl) => (
        <ClassTile created={created} classroom={cl} key={cl.invitation_code} />
      ));
    }}
  />
);

export default memo(RenderClass);
