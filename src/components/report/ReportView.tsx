import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';

import Layout from '../Layout';
import { useParams } from 'react-router-dom';
import { getReport, IReport } from '../../services/report-service';
import Report from './FullReport';

const ReportView: React.FC = () => {

  const [report, setReport] = useState<IReport>()

  const { projectId = '', environmentId = '', reportId = '' } = useParams();

  useEffect(() => {
    (async () => {
      const report = await getReport(projectId, environmentId, reportId);
      setReport(report);
    })()
  }, [projectId])


  return <Layout>
    <Helmet>
      <title>{`Mesmer | Report`}</title>
    </Helmet>
    <main className="sm:px-8 max-w-7xl mx-auto md:py-8">
      <Report report={report}></Report>
    </main>
  </Layout>
}

export default ReportView;