import { useEffect, useState } from 'react';

import type { AutoCompleteProps, Options } from './types';

const AutoComplete = (props: AutoCompleteProps) => {
  const { endpoint, value, onSelect } = props;
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<Options[]>([]);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (query) {
        const res = await fetch(`${endpoint}?name_like=${query}`);
        const data = await res.json();
        setOptions(data);
      } else setOptions([]);
    }, 400);
    return () => clearTimeout(t);
  }, [query, endpoint]);

  return (
    <div className="autocomplete">
      <input
        placeholder="Search…"
        value={query || value || ''}
        onChange={(e) => setQuery(e.target.value)}
      />
      {options.length > 0 && (
        <ul className="autocomplete__list">
          {options.map((o) => (
            <li
              key={o.id}
              onClick={() => {
                onSelect(o.name);
                setQuery(o.name);
                setOptions([]);
              }}
            >
              {o.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
