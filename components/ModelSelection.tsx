'use client';
import React from 'react';
import useSWR from 'swr';
import Select from 'react-select';

type Option = { value: string; label: string };
type Data = { modelOptions: Option[] };

const fetcher = async (url: string): Promise<Data> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

function ModelSelection() {
  const { data, isLoading, error } = useSWR<Data>('/api/getEngines', fetcher);

  // selected model holding by SWR
  const { data: model, mutate: setModel } = useSWR<string>('model', {
    fallbackData: 'gpt-5',
  });

  const options = data?.modelOptions ?? [];

  return (
    <div className="m-2">
      <Select
        instanceId="model-select"
        options={options}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNamePrefix="react-select"
        placeholder={model}
        value={options.find((o) => o.value === model)}
        onChange={(e) => e && setModel(e.value)}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#184060' : '#1d1a4c',
            color: 'white',
            borderColor: state.isFocused ? '#1d1a4c' : '#444',
            boxShadow: state.isFocused ? '0 0 0 1px #1d1a4c' : 'none',
            '&:hover': {
              borderColor: '#184060',
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: 'white',
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: '#1d1a4c',
            color: 'white',
          }),

          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#555' : '#184060',
            color: state.isSelected ? '#ff5555' : 'white',
            cursor: 'pointer',
          }),
        }}
      />
      {error && (
        <p className="text-red-500 mt-2">Nie udało się pobrać modeli.</p>
      )}
    </div>
  );
}

export default ModelSelection;
