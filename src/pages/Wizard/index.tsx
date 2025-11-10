import { useSearchParams, useNavigate } from 'react-router-dom';

import WizardContainer from '../../components/Wizard/WizardContainer';

const WizardPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const role = params.get('role') || 'admin';

  const handleComplete = () => {
    navigate('/employees');
  };

  return (
    <div className="page">
      <h1>Employee Wizard</h1>
      <p>
        Current Role: <strong>{role}</strong>
      </p>
      <WizardContainer role={role} onComplete={handleComplete} />
    </div>
  );
};

export default WizardPage;
