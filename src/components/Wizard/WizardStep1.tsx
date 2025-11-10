import { useEffect, useState } from 'react';
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
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    department?: string;
  }>({});

  useDraft('draft_admin', data);

  useEffect(() => {
    const saved = localStorage.getItem('draft_admin');
    if (saved) setData(JSON.parse(saved));
  }, [setData]);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!data.name || data.name.trim().length < 3) {
      newErrors.name = 'Full name is required (min 3 characters)';
    }

    if (!data.email || !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.department || data.department.trim().length === 0) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="wizard-step">
      <h2>Step 1 – Basic Info</h2>

      <div className="form__group">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={data.name || ''}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className={errors.name ? 'input--error' : ''}
          placeholder="Enter full name"
        />
        {errors.name && <p className="form__error">{errors.name}</p>}
      </div>

      <div className="form__group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={data.email || ''}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className={errors.email ? 'input--error' : ''}
          placeholder="Enter email"
        />
        {errors.email && <p className="form__error">{errors.email}</p>}
      </div>

      <div className="form__group">
        <label htmlFor="department">Department</label>
        <AutoComplete
          endpoint="http://localhost:4001/departments"
          value={data.department || ''}
          onSelect={(v) => setData({ ...data, department: v })}
        />
        {errors.department && (
          <p className="form__error">{errors.department}</p>
        )}
      </div>

      <button className="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default WizardStep1;
