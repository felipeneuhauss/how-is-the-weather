/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import React, { useState } from 'react';
import axios from 'axios';
import { AutocompleteGooglePlaceResponse, Candidate } from 'shared/types';
import { Box, Button } from 'theme-ui';
import { colors } from 'shared/consts';

type AutocompletePlacesProps = {
    onPlaceSelected: (candidate: Candidate) => void
}

const AutocompletePlaces: React.FC<AutocompletePlacesProps> = ({ onPlaceSelected }) => {
  const [currentCandidates, setCurrentCandidates] = useState<Candidate[]>([]);
  const [value, setValue] = useState('');

  const onValueChanged = async (newValue: string) => {
    setValue(newValue);
    if (newValue.length < 3) return;
    const { data: { candidates } } = await axios.get<AutocompleteGooglePlaceResponse>(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${newValue}&inputtype=textquery&fields=formatted_address,name,rating,geometry&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    );
    setCurrentCandidates(candidates);
  };

  const handlePlaceSelected = (candidate: Candidate) => {
    onPlaceSelected(candidate);
    setValue(candidate.formatted_address);
  };

  return (
    <>
      <input
        data-cy="autocomplete-el"
        value={value}
        type="search"
        onChange={(e) => onValueChanged(e.target.value)}
        style={{
          fontSize: 14, paddingTop: 8, paddingBottom: 8, paddingLeft: 4, paddingRight: 4,
        }}
      />
      {!!currentCandidates.length && (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <ul sx={{
          listStyle: 'none', background: 'white', p: 0, position: 'absolute', top: 0, left: 0, width: '100%', m: 0,
        }}
        >
          {currentCandidates.map((candidate) => (
            <li sx={{ borderBottom: '1px solid #e4e4e4' }} key={candidate.formatted_address}>
              <Button
                onClick={() => {
                  handlePlaceSelected(candidate);
                  setCurrentCandidates([]);
                }}
                sx={{
                  background: 'transparent',
                  color: 'black',
                  width: '100%',
                  borderRadius: 0,
                  textAlign: 'left',
                  ':hover': {
                    background: colors.background,
                    color: 'white',
                  },
                }}
              >
                {candidate.formatted_address}
              </Button>
            </li>
          ))}
        </ul>
      </Box>
      )}
    </>
  );
};

export default AutocompletePlaces;
