import React, { memo, useEffect } from "react";
import EmptyPage from "../components/EmptyPage";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { deleteMaterial, fetchMaterial } from "../store/actions/material";
import { formatDate } from "../common/utils";
import { connect } from "react-redux";

const Material = memo(({ material, onDelete = null }) => {
  const { id, message, arrived, url, attachment } = material;
  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between">
          <span>Message</span>
          {onDelete && (
            <i
              className="fa fa-times pl-2"
              role="button"
              onClick={() => onDelete(id)}
            ></i>
          )}
        </h5>
        <p className="mb-0">{message}</p>
        {(url || attachment) && <h5 className="my-2">Resource(s)</h5>}
        {url && (
          <a href={url} className="btn btn-url mr-2" target="blank">
            <i className="fa fa-globe"></i> Open Link
          </a>
        )}
        {attachment && (
          <a href={attachment} className="btn btn-download" target="blank">
            <i className="fa fa-file-text"></i> Download File
          </a>
        )}
      </div>
      <div className="card-footer">
        <p className="mb-0">{formatDate(arrived)}</p>
      </div>
    </div>
  );
});

const Materials = (props) => {
  const { error, material, loading, id, created } = props;
  useEffect(() => {
    if (!material) props.fetchMaterial(id);
  }, []);
  if (error) return <Message message={error} />;
  if (loading || !material) return <Spinner />;
  if (material.length === 0)
    return <EmptyPage backButton>No Material</EmptyPage>;
  if (created)
    return material.map((m) => (
      <Material material={m} key={m.id} onDelete={props.deleteMaterial} />
    ));
  return material.map((m) => <Material material={m} key={m.id} />);
};

const mapStateToProps = (state) => ({
  id: state.action.classroom.id,
  created: state.action.classroom.created,
  material: state.material,
  loading: state.action.loading,
  error: state.action.error,
});

const mapDispatchToProps = {
  fetchMaterial,
  deleteMaterial,
};

export default connect(mapStateToProps, mapDispatchToProps)(Materials);
