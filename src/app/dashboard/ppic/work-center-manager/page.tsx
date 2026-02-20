import * as React from "react";

interface IWorkCenterManagerPageProps {}

const WorkCenterManagerPage: React.FunctionComponent<
  IWorkCenterManagerPageProps
> = (props) => {
  return (
    <iframe
      src="http://192.168.68.106:3001/asset-dashboard"
      title="iFrame"
      width="100%"
      height="600px"
      scrolling="yes"
      allow="fullscreen"
    ></iframe>
  );
};

export default WorkCenterManagerPage;
