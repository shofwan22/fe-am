import { useState } from 'react';

import FileUpload from '../common/FileUpload';
import AutoComplete from '../common/AutoComplete';

import { useDraft } from '../../hooks/useDraft';

import { delay } from '../../utils/delay';
import { generateEmployeeId } from '../../utils/generateEmployeeId';

import type { EmployeeData } from '../../models/types';

interface WizardStep2Props {
  role: string;
  basicInfo: EmployeeData;
  data: EmployeeData;
  setData: (v: EmployeeData) => void;
  onPrev?: () => void;
  onComplete: () => void;
}

const WizardStep2 = (props: WizardStep2Props) => {
  const { role, basicInfo, data, setData, onPrev, onComplete } = props;

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  useDraft(`draft_${role}`, { ...basicInfo, ...data });

  const handleSubmit = async () => {
    setLoading(true);
    setProgress(['⏳ Submitting basicInfo…']);

    const res = await fetch('http://localhost:4001/basicInfo');
    const existing = await res.json();
    const empId = generateEmployeeId(basicInfo.department, existing.length);

    const payloadBasic = { ...basicInfo, employeeId: empId };
    const payloadDetails = { ...data, employeeId: empId };

    await delay(3000);
    await fetch('http://localhost:4001/basicInfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadBasic),
    });
    setProgress((p) => [...p, '✅ basicInfo saved!']);

    await delay(3000);
    await fetch('http://localhost:4002/details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadDetails),
    });
    setProgress((p) => [
      ...p,
      '✅ details saved!',
      '🎉 All data processed successfully!',
    ]);

    setLoading(false);
    localStorage.removeItem(`draft_${role}`);
    onComplete();
  };

  return (
    <div className="wizard-step">
      <h2>Step 2 – Details & Submit</h2>

      <div className="form__group">
        <label>Role</label>
        <select
          value={data.role || ''}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="">Select role</option>
          <option>Ops</option>
          <option>Admin</option>
          <option>Engineer</option>
          <option>Finance</option>
        </select>
      </div>

      <div className="form__group">
        <label>Location</label>
        <AutoComplete
          endpoint="http://localhost:4002/locations"
          value={data.location || ''}
          onSelect={(v) => setData({ ...data, location: v })}
        />
      </div>

      <div className="form__group">
        <label>Photo</label>
        <FileUpload onChange={(b64) => setData({ ...data, photo: b64 })} />
      </div>

      <div className="actions">
        {onPrev && (
          <button onClick={onPrev} className="button">
            Back
          </button>
        )}
        <button className="button" disabled={loading} onClick={handleSubmit}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      <div className="progress">
        {progress.map((p, i) => (
          <div key={i}>{p}</div>
        ))}
      </div>
    </div>
  );
};

export default WizardStep2;
