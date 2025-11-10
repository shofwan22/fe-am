import { useState } from 'react';

import WizardStep1 from './WizardStep1';
import WizardStep2 from './WizardStep2';

import type { EmployeeData } from '../../models/types';

interface WizardContainerProps {
  role: string;
  onComplete: () => void;
}

const WizardContainer = (props: WizardContainerProps) => {
  const { role, onComplete } = props;
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState<EmployeeData>({});
  const [details, setDetails] = useState<EmployeeData>({});

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <div className="wizard">
      {role === 'admin' && step === 1 && (
        <WizardStep1 data={basicInfo} setData={setBasicInfo} onNext={next} />
      )}
      {((role === 'admin' && step === 2) || role === 'ops') && (
        <WizardStep2
          role={role}
          basicInfo={basicInfo}
          data={details}
          setData={setDetails}
          onPrev={role === 'admin' ? prev : undefined}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};

export default WizardContainer;
