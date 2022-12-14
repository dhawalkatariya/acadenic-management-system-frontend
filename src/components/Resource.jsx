import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import axios from "../common/axios";
import { useSelector } from "react-redux";

const Resource = ({ render, url, override = false }) => {
  const [resource, setResource] = useState({
    data: null,
    loading: true,
    error: false,
  });
  const token = useSelector((state) => state.auth.key);
  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Token ${token}` } })
      .then((res) =>
        setResource({ ...resource, data: res.data, loading: false })
      )
      .catch((err) =>
        setResource({
          ...resource,
          error: "Error fetching the resource",
          loading: false,
        })
      );
  }, [url]);
  if (!override) {
    if (resource.loading) return <Spinner />;
    if (resource.error) return <Message message={resource.error} />;
    return render(resource.data);
  }
  return render(resource.loading, resource.error, resource.data);
};

export default Resource;
