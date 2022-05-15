import React from 'react';
import {FormControl, Text, Input, Stack} from 'native-base';

type Props = {
  label: string;
  placeholder?: string;
  isInvalid: boolean;
  errorMsg?: string;
};
const TextInput: React.FC<Props> = ({
  label,
  placeholder,
  isInvalid,
  errorMsg,
}) => {
  return (
    <FormControl width="100%" isInvalid={isInvalid}>
      <Stack>
        <FormControl.Label>
          <Text fontFamily={'Cairo'} color="trueGray.400" fontWeight="600">
            {label}
          </Text>
        </FormControl.Label>
        <Input
          p={2}
          fontSize={12}
          fontFamily={'Cairo'}
          fontWeight="600"
          textAlign="right"
          placeholder={placeholder}
        />
        <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};

export default TextInput;
