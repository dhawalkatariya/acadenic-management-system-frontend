import React from "react";
import Resource from "../components/Resource";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { CSVLink } from "react-csv";
import { formatDate, getName } from "../common/utils";
import { memo } from "react";

const headers = [
  { label: "First Name", key: "user.first_name" },
  { label: "Last Name", key: "user.last_name" },
  { label: "Username", key: "user.username" },
  { label: "Marks Obtained", key: "marks" },
  { label: "Total Marks", key: "total_marks" },
  { label: "Submission Time", key: "submitted" },
];

const ResponseTable = ({ id, name = "Assignment" }) => (
  <table className="table table-striped table-responsive shadow-md">
    <thead className="table-dark">
      <tr>
        <td>Name of student</td>
        <td>Marks</td>
        <td>Submitted on</td>
      </tr>
    </thead>
    <tbody>
      <Resource
        override
        url={`assignment/${id}/responses/`}
        render={(loading, error, grades) => {
          if (loading)
            return (
              <tr>
                <td colSpan="3">
                  <Spinner />
                </td>
              </tr>
            );
          if (error || grades.length === 0)
            return (
              <tr>
                <td colSpan="3">
                  <Message message={error ? error : "No responses yet."} />
                </td>
              </tr>
            );
          const jsx = grades.map((g) => (
            <tr key={g.id}>
              <td>{getName(g.user)}</td>
              <td>{`${g.marks}/${g.total_marks}`}</td>
              <td>{formatDate(g.submitted)}</td>
            </tr>
          ));
          jsx.push(
            <tr key="export_to_csv">
              <td colSpan="3" className="text-center">
                <CSVLink
                  data={grades}
                  headers={headers}
                  filename={`${name.replaceAll(" ", "_")}_responses.csv`}
                  className="btn btn-primary"
                >
                  Download as CSV
                </CSVLink>
              </td>
            </tr>
          );
          return jsx;
        }}
      />
    </tbody>
  </table>
);

export default memo(ResponseTable);
