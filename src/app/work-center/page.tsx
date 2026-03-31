import ChooseWorkCenter from '@/components/view/pages/operator/ChooseWorkCenter';
import { Box, Typography } from '@mui/material';
import * as React from 'react';

interface IWorkCenterPageProps {
}

const WorkCenterPage: React.FunctionComponent<IWorkCenterPageProps> = (props) => {
  return (
   <ChooseWorkCenter />
  )
};

export default WorkCenterPage;
