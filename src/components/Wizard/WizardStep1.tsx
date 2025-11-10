import { useEffect } from 'react';
import { useDraft } from '../../hooks/useDraft';
import AutoComplete from '../common/AutoComplete';

import type { EmployeeData } from '../../models/types';

interface WizardStep1Props {
  data: EmployeeData;
  setData: (v: EmployeeData) => void;
  onNext: () => void;
}

const WizardStep1 = (props: WizardStep1Props) => {
  const { data, setData, onNext } = props;
  useDraft('draft_admin', data);

  useEffect(() => {
    const saved = localStorage.getItem('draft_admin');
    if (saved) setData(JSON.parse(saved));
  }, [setData]);

  return (
    <div className="wizard-step">
      <h2>Step 1 – Basic Info</h2>

      <div className="form__group">
        <label>Full Name</label>
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>

      <div className="form__group">
        <label>Email</label>
        <input
          type="email"
          value={data.email || ''}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>

      <div className="form__group">
        <label>Department</label>
        <AutoComplete
          endpoint="http://localhost:4001/departments"
          value={data.department || ''}
          onSelect={(v) => setData({ ...data, department: v })}
        />
      </div>

      <button
        className="button"
        disabled={!data.name || !data.email || !data.department}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default WizardStep1;
